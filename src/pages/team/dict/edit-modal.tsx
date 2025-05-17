import { TeamDictItem } from '@/api2/common.types'
import { getTeamDict, saveTeamDict } from '@/api2/team/team-dict'
import { SaveTeamDictRequest } from '@/api2/team/team-dict.types'
import { DataFrom } from '@/components/data/form'
import { useRequest } from 'ahooks'
import { Form, Modal, type ModalProps } from 'antd'
import type React from 'react'
import { useEffect, useState } from 'react'
import { editModalFormItems } from './options'

export interface GroupEditModalProps extends ModalProps {
  groupId?: number
  disabled?: boolean
  onOk?: () => void
}

export const GroupEditModal: React.FC<GroupEditModalProps> = (props) => {
  const { onCancel, open, title, groupId, disabled, onOk } = props
  const [form] = Form.useForm()
  const [grounpDetail, setGroupDetail] = useState<TeamDictItem>()

  const { run: getGroupDetail, loading: getGroupDetailLoading } = useRequest(getTeamDict, {
    manual: true,
    onSuccess: (data) => {
      setGroupDetail(data)
    }
  })

  const { run: editDict, loading: editDictLoading } = useRequest(saveTeamDict, {
    manual: true,
    onSuccess: () => {
      form?.resetFields()
      setGroupDetail(undefined)
      onOk?.()
    }
  })

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e)
    form?.resetFields()
    setGroupDetail(undefined)
  }

  const handleOnOk = () => {
    if (disabled) {
      return
    }
    form?.validateFields().then((formValues) => {
      console.log(formValues)
      const data: SaveTeamDictRequest = {
        ...formValues,
        ...(formValues.color && typeof formValues.color !== 'string' && { color: formValues.color.toHexString() }),
        status: 'GLOBAL_STATUS_ENABLE'
      }
      editDict({ ...data, ...(groupId && { dictId: groupId }) })
    })
  }

  useEffect(() => {
    if (open && form && grounpDetail) {
      form?.setFieldsValue(grounpDetail)
      return
    }
    form?.resetFields()
  }, [grounpDetail, open, form])

  useEffect(() => {
    if (groupId) {
      getGroupDetail({ dictId: groupId })
    }
  }, [getGroupDetail, groupId])

  return (
    <>
      <Modal
        {...props}
        title={title}
        open={open}
        loading={getGroupDetailLoading}
        onCancel={handleOnCancel}
        onOk={handleOnOk}
        confirmLoading={editDictLoading}
      >
        <DataFrom
          items={editModalFormItems()}
          props={{
            form,
            layout: 'vertical',
            autoComplete: 'off',
            disabled: disabled || editDictLoading
          }}
        />
      </Modal>
    </>
  )
}
