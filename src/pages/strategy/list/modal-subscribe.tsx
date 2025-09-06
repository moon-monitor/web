import { NotifyType } from '@/api/enum'
import { TeamStrategyItem } from '@/api/request/types'
import { Checkbox, Form, Modal, ModalProps, Typography } from 'antd'
import { useEffect, useState } from 'react'

export interface ModalSubscribeProps extends ModalProps {
  onOk?: () => void
  item?: TeamStrategyItem
}

const { Text } = Typography

export const ModalSubscribe = (props: ModalSubscribeProps) => {
  const { open, onClose, onOk, item, ...reset } = props

  const [form] = Form.useForm<{ notifyTypes: NotifyType[] }>()
  const [loading, setLoading] = useState(false)



  const handleSubmit = () => {
    if (!item || !item.strategyId) return
    setLoading(true)
    form.validateFields().then((values) => {
      // TODO: 实现订阅逻辑
      console.log('Subscribe values:', values)
      setLoading(false)
      onOk?.()
    }).catch(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
  }, [open, form])

  return (
    <Modal open={open} onCancel={onClose} onOk={handleSubmit} {...reset} confirmLoading={loading}>
      <Form form={form} layout='vertical'>
        <Form.Item label='通知类型' name='notifyTypes'>
          <Checkbox.Group
            options={[
              { label: '手机', value: NotifyType.NOTIFY_PHONE, disabled: true },
              { label: '邮件', value: NotifyType.NOTIFY_EMAIL },
              { label: '短信', value: NotifyType.NOTIFY_SMS, disabled: true }
            ]}
          />
        </Form.Item>
      </Form>
      <div className='mt-4 text-sm text-gray-500 flex flex-col gap-2'>
        <label>备注</label>
        <Text type='secondary'>{item?.remark}</Text>
      </div>
    </Modal>
  )
}
