import { NoticeHookItem } from '@/api/common.types'
import { getTeamNoticeHook, saveTeamNoticeHook } from '@/api/team/team-notice'
import { SaveTeamNoticeHookRequest } from '@/api/team/team-notice.types'
import { DataFrom } from '@/components/data/form'
import { handleFormError } from '@/utils'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { useEffect, useState } from 'react'
import { saveFormList } from './options'

export interface EditHookModalProps {
  open?: boolean
  hookId?: number
  onOk?: (hook: SaveTeamNoticeHookRequest) => void
  onCancel?: () => void
}

export function EditHookModal(props: EditHookModalProps) {
  const { open, hookId, onOk, onCancel } = props

  const [form] = Form.useForm<SaveTeamNoticeHookRequest>()
  const [detail, setDetail] = useState<NoticeHookItem>()

  const { run: saveHook, loading: saveLoading } = useRequest(saveTeamNoticeHook, {
    manual: true,
    onSuccess: () => {
      form.resetFields()
      setDetail(undefined)
      onOk?.(form.getFieldsValue())
    },
    onError: (err: Error) => {
      handleFormError(form, err)
    }
  })
  const handleOnOk = () => {
    form.validateFields().then((values) => {
      saveHook({ ...values, hookId })
    })
  }

  const handleOnCancel = () => {
    form.resetFields()
    setDetail(undefined)
    onCancel?.()
  }

  const { run: handleGetHookDetail } = useRequest(getTeamNoticeHook, {
    manual: true, // 手动触发请求
    onSuccess: (res) => {
      setDetail(res)
    }
  })

  useEffect(() => {
    if (detail) {
      form.setFieldsValue(detail)
    } else {
      form.resetFields()
    }
  }, [detail, form])

  useEffect(() => {
    if (hookId && open) {
      handleGetHookDetail({ hookId })
    }
  }, [hookId, open, handleGetHookDetail])

  return (
    <>
      <Modal
        title={`${hookId ? '编辑' : '新增'}告警Hook`}
        open={open}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
        confirmLoading={saveLoading}
        width='60%'
      >
        <DataFrom
          items={saveFormList}
          props={{ form, layout: 'vertical' }}
          slot={{
            headers: (
              <Form.List name='headers'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Row key={field.key} gutter={[16, 16]}>
                        <Col span={10}>
                          <Form.Item
                            name={[field.name, 'key']}
                            label={`请求头.${field.key}.键`}
                            rules={[{ required: true, message: `请输入请求头.${field.key}.键` }]}
                          >
                            <Input placeholder={`请输入请求头.${field.key + 1}.键`} />
                          </Form.Item>
                        </Col>
                        <Col span={13}>
                          <Form.Item
                            name={[field.name, 'value']}
                            label={`请求头.${field.key}.值`}
                            rules={[{ required: true, message: `请输入请求头.${field.key}.值` }]}
                          >
                            <Input placeholder={`请输入请求头.${field.key}.值`} />
                          </Form.Item>
                        </Col>
                        <Col span={1} className='flex justify-center items-center'>
                          <Button type='link' danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                        </Col>
                      </Row>
                    ))}
                    <Button className='w-full mt-2' type='dashed' onClick={() => add({ key: '', value: '' })}>
                      <PlusOutlined />
                    </Button>
                  </>
                )}
              </Form.List>
            )
          }}
        />
      </Modal>
    </>
  )
}
