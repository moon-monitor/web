import { TeamStrategyItem } from '@/api2/common.types'
import { saveTeamStrategy } from '@/api2/team/team-strategy'
import { DataFrom, DataFromItem } from '@/components/data/form'
import { useRequest } from 'ahooks'
import { Form, message, Modal, ModalProps } from 'antd'
import { useEffect, useState } from 'react'
import { basicFormItems } from './options'

export interface BasicModalProps extends ModalProps {
  strategyDetail?: TeamStrategyItem
  onOk?: () => void
}

export const BasicModal: React.FC<BasicModalProps> = (props) => {
  const { onClose, onOk, loading, open } = props
  const [form] = Form.useForm()
  const [formItems, setFormItems] = useState<(DataFromItem | DataFromItem[])[]>([])
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
  }

  useEffect(() => {
    if (props.strategyDetail) {
      form.setFieldsValue(props.strategyDetail)
    }
  }, [props.strategyDetail])

  useEffect(() => {
    if (open && !props.strategyDetail) {
      setFormItems(basicFormItems)
    } else {
      setFormItems(
        basicFormItems.map((item) => {
          if (item && item?.name === 'strategyType') {
            return {
              ...item,
              props: {
                ...item?.props,
                disabled: true
              }
            }
          } else {
            return item
          }
        })
      )
    }
  }, [open])

  return (
    <Modal {...props} onCancel={handleOnCancel} onOk={handleOnOk} confirmLoading={loading}>
      <DataFrom items={formItems} props={{ form, layout: 'vertical' }} />
    </Modal>
  )
}
