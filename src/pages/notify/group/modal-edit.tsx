import { getTeamNoticeGroup, saveTeamNoticeGroup } from '@/api/request/teamnotice'
import { NoticeGroupItem, SaveTeamNoticeGroupRequest, SaveTeamNoticeGroupRequest_Member } from '@/api/request/types'
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
  const [form] = Form.useForm<SaveTeamNoticeGroupRequest & { noticeMember: SaveTeamNoticeGroupRequest_Member[] }>()
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
        hookIds: groupDetail?.hooks?.map((item: any) => item.noticeHookId),
        emailConfigId: (groupDetail as any)?.emailConfigId,
        smsConfigId: (groupDetail as any)?.smsConfigId,
        members: groupDetail?.noticeMembers?.map((item: any) => ({
          memberId: item.userId,
          noticeType: item.noticeType
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
      const apiData: SaveTeamNoticeGroupRequest = {
        name: formValues.name,
        remark: formValues.remark,
        hookIds: formValues.hookIds,
        emailConfigId: formValues.emailConfigId,
        smsConfigId: formValues.smsConfigId,
        members: formValues.noticeMember?.map((item) => ({
          memberId: item.memberId,
          noticeType: item.noticeType
        })) || []
      }

      if (groupId) {
        saveGroup({ ...apiData, groupId })
      } else {
        saveGroup(apiData)
      }
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
