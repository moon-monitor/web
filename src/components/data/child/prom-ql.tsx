/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MutableRefObject, useContext, useEffect, useRef } from 'react'

import { defaultKeymap, history, historyKeymap, insertNewlineAndIndent } from '@codemirror/commands'
import { bracketMatching, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { Compartment, EditorState, Prec } from '@codemirror/state'
import {
  EditorView,
  highlightSpecialChars,
  keymap,
  placeholder as placeholderPlugin,
  ViewUpdate
} from '@codemirror/view'

import request from '@/api/request'
import { GlobalContext } from '@/utils/context'
import { ThunderboltOutlined } from '@ant-design/icons'
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { lintKeymap } from '@codemirror/lint'
import { highlightSelectionMatches } from '@codemirror/search'
import { PromQLExtension } from '@prometheus-io/codemirror-promql'
import { newCompleteStrategy } from '@prometheus-io/codemirror-promql/dist/esm/complete'
import { useRequest } from 'ahooks'
import { Button, Form, theme } from 'antd'
import type { ValidateStatus } from 'antd/es/form/FormItem'
import { baseTheme, darkPromqlHighlighter, darkTheme, lightTheme, promqlHighlighter } from './prom/CMTheme'
import { HistoryCompleteStrategy } from './prom/HistoryCompleteStrategy'
import './prom/index.css'

export type PromValidate = {
  help?: string
  validateStatus?: ValidateStatus
}

export interface PromQLInputProps {
  pathPrefix: string
  formatExpression?: boolean
  ref?: MutableRefObject<any>
  buttonRef?: MutableRefObject<any>
  showBorder?: boolean
  name?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (expression?: string) => void
  disabled?: boolean
  subfix?: React.ReactNode
}

const promqlExtension = new PromQLExtension()
const dynamicConfigCompartment = new Compartment()
const { useToken } = theme

const buildPathPrefix = (s?: string) => {
  if (!s) {
    return ''
  }
  // 去除末尾/
  const promPathPrefix = s?.replace(/\/$/, '')
  return promPathPrefix
}

// eslint-disable-next-line react-refresh/only-export-components
export const formatExpressionFunc = (pathPrefix: string, doc?: string) => {
  const prefix = buildPathPrefix(pathPrefix)
  if (!doc) {
    return Promise.reject('请输入PromQL查询语句')
  }
  if (!prefix || prefix === '') {
    return Promise.reject('请配置一个数据源用于智能提示')
  }
  return request
    .GET(
      `${prefix}/api/v1/query?${new URLSearchParams({
        query: doc || ''
      })}`
    )
    .then((data) => {
      return Response.json(data, {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
    .then((resp: any) => {
      if (!resp.ok && resp.status !== 400) {
        return Promise.reject(`HTTP 请求失败: ${resp.statusText}`)
      }

      return resp.json()
    })
    .then((json: { data: string; status: 'success' | 'error'; error: string; errorType: string }) => {
      if (json.status !== 'success') {
        return Promise.reject(json.error || 'invalid response JSON')
      }
      return json
    })
    .catch((err) => {
      return Promise.reject(err.toString())
    })
}

const PromQLInput: React.FC<PromQLInputProps> = (props) => {
  const { token } = useToken()
  const {
    pathPrefix,
    onChange,
    formatExpression,
    placeholder = '请输入查询语句',
    value,
    name = 'expr',
    defaultValue,
    ref,
    buttonRef,
    disabled,
    showBorder = true,
    subfix
  } = props

  const prefix = buildPathPrefix(pathPrefix)

  const { theme } = useContext(GlobalContext)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  // const [doc, setDoc] = useState<string>()
  const { status } = Form.Item.useStatus()
  const form = Form.useFormInstance()

  const onExpressionChange = (expression: string) => {
    onChange?.(expression)
  }

  useEffect(() => {
    if (!containerRef || !containerRef.current) return
    promqlExtension.activateCompletion(true).activateLinter(true)
    promqlExtension.setComplete({
      completeStrategy: new HistoryCompleteStrategy(
        newCompleteStrategy({
          remote: {
            url: prefix,
            fetchFn: async (input: RequestInfo) => {
              const response = await request.GET(input as string)
              return new Response(JSON.stringify(response), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            },
            httpMethod: 'GET'
          }
        }),
        []
      )
    })

    let highlighter = syntaxHighlighting(theme === 'dark' ? darkPromqlHighlighter : promqlHighlighter)
    if (theme === 'dark') {
      highlighter = syntaxHighlighting(darkPromqlHighlighter)
    }

    const dynamicConfig = [highlighter, promqlExtension.asExtension(), theme === 'dark' ? darkTheme : lightTheme]
    const startState = EditorState.create({
      doc: (value || defaultValue) as string,
      extensions: [
        baseTheme,
        highlightSpecialChars(),
        history(),
        EditorState.allowMultipleSelections.of(true),
        // 设置为不可编辑
        EditorView.editable.of(disabled ? false : true),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        highlightSelectionMatches(),
        EditorView.lineWrapping,
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, ...completionKeymap, ...lintKeymap]),
        placeholderPlugin(placeholder),
        dynamicConfigCompartment.of(dynamicConfig),
        keymap.of([
          {
            key: 'Escape',
            run: (v: EditorView): boolean => {
              v.contentDOM.blur()
              return false
            }
          }
        ]),
        Prec.highest(
          keymap.of([
            {
              key: 'Shift-Enter',
              run: (): boolean => {
                return true
              }
            },
            {
              key: 'Enter',
              run: insertNewlineAndIndent
            }
          ])
        ),
        EditorView.updateListener.of((update: ViewUpdate): void => {
          if (update.docChanged) {
            onExpressionChange(update.state.doc.toString())
          }
        })
      ]
    })
    const view = viewRef.current
    if (view === null) {
      if (!containerRef.current) {
        throw new Error('expected CodeMirror container element to exist')
      }

      const view = new EditorView({
        state: startState,
        parent: containerRef.current
      })

      viewRef.current = view
    } else {
      view.dispatch(
        view.state.update({
          effects: dynamicConfigCompartment.reconfigure(dynamicConfig),
          scrollIntoView: true,
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: value
          }
        })
      )
      const view2 = new EditorView({
        state: startState
        // parent: containerRef.current as any,
      })

      viewRef.current = view2
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, containerRef, pathPrefix, placeholder, prefix, theme, value])

  const { run: formatExpressionRequest } = useRequest(formatExpressionFunc, {
    manual: true,
    onSuccess: () => {
      onChange?.(value)
      form?.setFields([
        {
          name: name,
          errors: [],
          value: value
        }
      ])
    },
    onError: (err) => {
      form?.setFields([
        {
          name: name,
          errors: [err.toString()],
          value: undefined,
          touched: true,
          validating: false,
          validated: false
        }
      ])
    }
  })

  useEffect(() => {
    if (disabled || !value) return
    formatExpressionRequest(prefix, value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!defaultValue && !value) {
      return
    }
    onChange?.(defaultValue || value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div ref={ref}>
      <div className='promInputContent'>
        <div
          className={`${!disabled ? 'promInput' : 'w-full'} cm-expression-input input-border ${status}`}
          style={{
            minHeight: 40,
            padding: '4px 11px',
            fontSize: '14px',
            lineHeight: 1.5714285714285714,
            background: showBorder ? (disabled ? token.colorBgContainerDisabled : token.colorBgContainer) : '',
            color: token.colorTextBase
          }}
          ref={containerRef}
        />

        {!subfix && formatExpression && (
          <Button
            ref={buttonRef}
            // onClick={handleOpenModal}
            type='primary'
            size='large'
            style={{
              borderRadius: '0 6px 6px 0'
            }}
            disabled={!value || !prefix || status !== 'success'}
            icon={<ThunderboltOutlined />}
          />
        )}
        {subfix}
      </div>
    </div>
  )
}

export default PromQLInput
