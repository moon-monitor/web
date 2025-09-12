import { AlarmSendType } from '@/api/enum'
import { dingTalkTemplates } from '@/components/data/child/config/ding-talk'
import { feishuTemplates } from '@/components/data/child/config/feishu'
import { wechatTemplates } from '@/components/data/child/config/wechat'
import { DingTemplateEditor } from '@/components/data/child/template-editor-ding'
import { EmailTemplateEditor } from '@/components/data/child/template-editor-eamil'
import { FeishuTemplateEditor } from '@/components/data/child/template-editor-feishu'
import { JsonTemplateEditor } from '@/components/data/child/template-editor-json'
import { WechatTemplateEditor } from '@/components/data/child/template-editor-wechat'
import { DataFrom } from '@/components/data/form'
import { handleFormError } from '@/utils'
import { validateJson } from '@/utils/json'
import { useRequest } from 'ahooks'
import { Form, Input, message, Modal, Select, type ModalProps } from 'antd'
import { useEffect } from 'react'
import { editModalFormItems } from './options'
// import { createTemplate, getTemplate, updateTemplate, type CreateTemplateRequest } from '@/api/notify/template' // TODO: 实现 template API

// 占位符类型和函数，待实现
type CreateTemplateRequest = {
  name: string
  content: string
  sendType: number
  status: number
  remark?: string
}

const createTemplate = async (data: CreateTemplateRequest) => {
  console.warn('createTemplate API not implemented yet')
  return Promise.resolve()
}

const getTemplate = async (id: number): Promise<{ detail: CreateTemplateRequest }> => {
  console.warn('getTemplate API not implemented yet')
  return Promise.resolve({
    detail: {
      name: '示例模板',
      content: '模板内容',
      sendType: 0,
      status: 0,
      remark: '这是一个示例模板'
    }
  })
}

const updateTemplate = async (params: { id: number, data: CreateTemplateRequest }) => {
  console.warn('updateTemplate API not implemented yet')
  return Promise.resolve()
}

export interface EditSendTemplateModalProps extends ModalProps {
  sendTemplateId?: number
  onOk?: () => void
  onCancel?: () => void
}

export function EditSendTemplateModal(props: EditSendTemplateModalProps) {
  const { open, sendTemplateId, onOk, onCancel, ...rest } = props

  const [form] = Form.useForm<CreateTemplateRequest>()
  const sendType = Form.useWatch<AlarmSendType>('sendType', form)

  const { run: initSendTemplateDetail, loading: initSendTemplateDetailLoading } = useRequest(getTemplate, {
    manual: true,
    onSuccess: (res) => {
      form?.setFieldsValue(res.detail)
    }
  })

  const { runAsync: addSendTemplate, loading: addSendTemplateLoading } = useRequest(createTemplate, {
    manual: true
  })

  const { runAsync: updateSendTemplate, loading: updateSendTemplateLoading } = useRequest(updateTemplate, {
    manual: true
  })

  const handleOnOk = () => {
    form.validateFields().then((values) => {
      if (sendType !== AlarmSendType.AlarmSendTypeEmail && sendType !== AlarmSendType.AlarmSendTypeCustom) {
        const { isValid, error } = validateJson(values.content)
        if (!isValid) {
          message.error(`模板内容格式错误: ${error}`)
          return
        }
      }
      Promise.all([
        sendTemplateId ? updateSendTemplate({ id: sendTemplateId, data: values }, true) : addSendTemplate(values, true)
      ])
        .then(() => {
          form.resetFields()
          onOk?.()
        })
        .catch((err) => {
          handleFormError(form, err)
        })
    })
  }

  const handleOnCancel = () => {
    onCancel?.()
  }

  useEffect(() => {
    if (sendTemplateId && open) {
      initSendTemplateDetail(sendTemplateId, true)
    }
    if (!open) {
      form.resetFields()
    }
  }, [sendTemplateId, open, initSendTemplateDetail, form])

  const getCendTypeContent = (t: AlarmSendType) => {
    const height = '40vh'
    switch (t) {
      case AlarmSendType.AlarmSendTypeFeiShu:
        return <FeishuTemplateEditor height={height} />
      case AlarmSendType.AlarmSendTypeDingTalk:
        return <DingTemplateEditor height={height} />
      case AlarmSendType.AlarmSendTypeWeChat:
        return <WechatTemplateEditor height={height} />
      case AlarmSendType.AlarmSendTypeCustom:
        return <JsonTemplateEditor height={height} />
      case AlarmSendType.AlarmSendTypeEmail:
        return <EmailTemplateEditor height={height} />
      default:
        return <Input.TextArea rows={10} showCount placeholder='请输入模板内容' />
    }
  }

  const getTemplateType = (t: AlarmSendType) => {
    form.setFieldsValue({
      templateType: undefined
    })
    let options: { label: string; value: string }[] = []
    switch (t) {
      case AlarmSendType.AlarmSendTypeFeiShu:
        options = feishuTemplates.map((item): { label: string; value: string } => ({
          label: item.name,
          value: JSON.stringify(item.template, null, 2)
        }))
        break
      case AlarmSendType.AlarmSendTypeDingTalk:
        options = dingTalkTemplates.map((item): { label: string; value: string } => ({
          label: item.name,
          value: JSON.stringify(item.template, null, 2)
        }))
        break
      case AlarmSendType.AlarmSendTypeWeChat:
        options = wechatTemplates.map((item): { label: string; value: string } => ({
          label: item.name,
          value: JSON.stringify(item.template, null, 2)
        }))
        break
    }
    return (
      <Select
        placeholder='请选择模板类型'
        options={options}
        disabled={!options.length}
        onChange={(value) => form.setFieldsValue({ content: value })}
      />
    )
  }

  return (
    <>
      <Modal
        {...rest}
        forceRender
        centered
        title={`${sendTemplateId ? '编辑' : '新增'}通知模板`}
        open={open}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
        loading={initSendTemplateDetailLoading}
        confirmLoading={addSendTemplateLoading || updateSendTemplateLoading}
      >
        <DataFrom
          items={editModalFormItems}
          props={{
            form,
            layout: 'vertical'
          }}
          slot={{
            content: getCendTypeContent(sendType),
            templateType: getTemplateType(sendType)
          }}
        />
      </Modal>
    </>
  )
}
