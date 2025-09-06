import { TeamStrategyItem } from '@/api/common.types'
import { saveTeamStrategy } from '@/api/team/team-strategy'
import { DataFrom } from '@/components/data/form'
import { useRequest } from 'ahooks'
import { Form, message, Modal, ModalProps } from 'antd'
import { useEffect } from 'react'
import { basicFormItems } from './options'

export interface BasicModalProps extends ModalProps {
  strategyDetail?: TeamStrategyItem
  onOk?: () => void
}

export const BasicModal: React.FC<BasicModalProps> = (props) => {
  const { onClose, onOk, loading, strategyDetail } = props
  const [form] = Form.useForm()
  const strategyType = Form.useWatch('strategyType', form)
  const { run: saveStrategy } = useRequest(saveTeamStrategy, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功')
      onOk?.()
    }
  })

  const handleOnOk = () => {
    form.validateFields().then((values) => {
      saveStrategy({
        ...values,
        strategyId: props.strategyDetail?.strategyId
      })
    })
  }

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClose?.(e)
    form?.resetFields()
  }

  useEffect(() => {
    if (strategyDetail && form) {
      form.setFieldsValue(strategyDetail)
    }
  }, [strategyDetail, form])

  return (
    <Modal {...props} onCancel={handleOnCancel} onOk={handleOnOk} confirmLoading={loading}>
      <DataFrom items={basicFormItems(strategyType)} props={{ form, layout: 'vertical' }} />
    </Modal>
  )
}
