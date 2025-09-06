import { NoticeGroupItem } from '@/api/common.types'
import { getTeamNoticeGroup, saveTeamNoticeGroup } from '@/api/team/team-notice'
import { SaveTeamNoticeGroupRequest, SaveTeamNoticeGroupRequestMember } from '@/api/team/team-notice.types'
import { DataFrom } from '@/components/data/form'
import { useRequest } from 'ahooks'
import { Form, Modal, type ModalProps, message } from 'antd'
import type React from 'react'
import { useEffect, useState } from 'react'
import { MemberSelect } from './member-select'
import { editModalFormItems } from './options'

export interface GroupEditModalProps extends ModalProps {
  groupId?: number
  disabled?: boolean
  onOk?: () => void
}

export const GroupEditModal: React.FC<GroupEditModalProps> = (props) => {
  const { onCancel, onOk, open, title, groupId, disabled } = props
  const [form] = Form.useForm<SaveTeamNoticeGroupRequest & { noticeMember: SaveTeamNoticeGroupRequestMember[] }>()
  const [groupDetail, setGroupDetail] = useState<NoticeGroupItem>()

  const { run: initGroupDetail, loading: initGroupDetailLoading } = useRequest(getTeamNoticeGroup, {
    manual: true,
    onSuccess: (data) => {
      setGroupDetail(data)
    }
  })

  const { runAsync: saveGroup, loading: saveGroupLoading } = useRequest(saveTeamNoticeGroup, {
    manual: true,
    onSuccess: () => {
      message.success('编辑告警组成功')
      onOk?.()
    }
  })

  useEffect(() => {
    if (groupId) {
      initGroupDetail({ groupId })
    }
  }, [groupId, initGroupDetail])

  useEffect(() => {
    if (open && form && groupDetail) {
      form?.setFieldsValue({
        ...groupDetail,
        hookIds: groupDetail?.hooks?.map((item) => item.noticeHookId),
        members: groupDetail?.members?.map((item) => ({
          memberId: item.id,
          noticeType: item.position
        }))
        // timeEngines: groupDetail?.timeEngines?.map((item) => item.id),
        // templates: groupDetail?.templates?.map((item) => item.id)
      })
      return
    }
    form?.resetFields()
  }, [groupDetail, open, form])

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    form?.resetFields()
    setGroupDetail(undefined)
    onCancel?.(e)
  }

  const handleOnOk = () => {
    form?.validateFields().then((formValues) => {
      const data = {
        ...formValues,
        members: formValues.noticeMember?.map((item: SaveTeamNoticeGroupRequestMember) => ({
          memberId: item.memberId,
          noticeType: item.noticeType
        }))
      }
      saveGroup({ ...data, groupId })
    })
  }

  return (
    <>
      <Modal
        {...props}
        title={title}
        open={open}
        onCancel={handleOnCancel}
        loading={initGroupDetailLoading}
        onOk={handleOnOk}
        confirmLoading={saveGroupLoading}
      >
        <DataFrom
          items={editModalFormItems}
          props={{
            form,
            layout: 'vertical',
            autoComplete: 'off',
            disabled: disabled || initGroupDetailLoading || saveGroupLoading
          }}
        >
          <Form.Item label='成员列表' name='noticeMember'>
            <MemberSelect />
          </Form.Item>
        </DataFrom>
      </Modal>
    </>
  )
}
