import { inviteMember } from '@/api2/team'
import { InviteMemberRequest } from '@/api2/team/types'
import { DataFrom } from '@/components/data/form'
import { handleFormError } from '@/utils'
import { useRequest } from 'ahooks'
import { Form, Modal, message } from 'antd'
import type React from 'react'
import { useEffect } from 'react'
import { inviteModalFormItems } from './options'

export interface InviteProps {
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const Invite: React.FC<InviteProps> = (props) => {
  const { open, setOpen } = props

  const [form] = Form.useForm<InviteMemberRequest>()

  const { run: submitInvite, loading: inviteUserLoading } = useRequest(inviteMember, {
    manual: true,
    onSuccess: () => {
      message.info('邀请发送成功')
      setOpen?.(false)
    },
    onError: (err) => {
      handleFormError(form, err)
    }
  })

  const onSubmit = () => {
    form.validateFields().then((values) => {
      submitInvite(values)
    })
  }

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, form])

  return (
    <Modal
      open={open}
      onOk={onSubmit}
      onCancel={() => setOpen?.(false)}
      title='邀请成员'
      width={800}
      confirmLoading={inviteUserLoading}
    >
      <DataFrom items={inviteModalFormItems} props={{ form, disabled: inviteUserLoading, layout: 'vertical' }} />
    </Modal>
  )
}
