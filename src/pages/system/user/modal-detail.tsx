import { UserItem } from '@/api/common.types'
import { UserPosition } from '@/api/enum'
import { UserStatusData } from '@/api/global'
import { getUser } from '@/api/request/system'
import { useRequest } from 'ahooks'
import { Avatar, Badge, Descriptions, type DescriptionsProps, Modal } from 'antd'
import { useEffect, useState } from 'react'

export interface UserDetailModalProps {
  userId: number
  open?: boolean
  onCancel?: () => void
  onOk?: () => void
}

export function DetailModal(props: UserDetailModalProps) {
  const { userId, open, onCancel, onOk } = props

  const [detail, setDetail] = useState<UserItem>({} as UserItem)

  const { run: initUserDetail, loading: initUserDetailLoading } = useRequest(getUser, {
    manual: true,
    onSuccess: (data) => {
      setDetail(data)
    }
  })

  useEffect(() => {
    if (userId && open) {
      initUserDetail({ userId })
    }
  }, [userId, open, initUserDetail])

  const items: DescriptionsProps['items'] = [
    {
      label: '名称',
      children: (
        <div className='flex items-center gap-2'>
          <Avatar src={detail?.avatar}>{detail?.nickname || detail?.username}</Avatar>
          {detail?.nickname || detail?.username}
          <Badge color={UserStatusData[detail?.status]?.color} />
        </div>
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '角色',
      children: UserPosition[detail?.position],
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },

    {
      label: '昵称',
      children: detail?.nickname || '-',
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '邮箱',
      children: detail?.email || '-',
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '创建时间',
      children: detail?.createdAt,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '更新时间',
      children: detail?.updatedAt,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '备注',
      children: detail?.remark || '-'
    }
  ]

  useEffect(() => {
    if (userId && open) {
      initUserDetail({ userId })
    }
  }, [userId, open, initUserDetail])

  return (
    <>
      <Modal
        width='50%'
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        loading={initUserDetailLoading}
        footer={null}
      >
        <Descriptions title='成员信息' bordered items={items} />
      </Modal>
    </>
  )
}
