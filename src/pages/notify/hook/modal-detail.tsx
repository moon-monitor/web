import { NoticeHookItem } from '@/api2/common.types'
import { GlobalStatusData, HookAppData, MethodData } from '@/api2/global'
import { getTeamNoticeHook } from '@/api2/team/team-notice'
import { useRequest } from 'ahooks'
import { Avatar, Badge, Descriptions, DescriptionsProps, Modal, Space, Tooltip, Typography } from 'antd'
import { useEffect, useState } from 'react'

export interface HookDetailModalProps {
  hookId: number
  open?: boolean
  onCancel?: () => void
  onOk?: () => void
}

const { Text } = Typography

export function HookDetailModal(props: HookDetailModalProps) {
  const { hookId, open, onCancel, onOk } = props

  const [detail, setDetail] = useState<NoticeHookItem>()
  const { run: getHookDetail } = useRequest(getTeamNoticeHook, {
    manual: true, // 手动触发请求
    onSuccess: (res) => {
      setDetail(res)
    }
  })

  const items: DescriptionsProps['items'] = [
    {
      label: '名称',
      children: detail?.name,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '类型',
      children: !!detail && (
        <Space direction='horizontal'>
          <Avatar size='small' shape='square' icon={HookAppData[detail.app]?.icon} />
          {HookAppData[detail.app].text}
        </Space>
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '状态',
      children: detail ? <Badge {...GlobalStatusData[detail.status]} /> : '-',
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '创建人',
      children: (
        <Tooltip title={detail?.creator?.nickname || detail?.creator?.username}>
          <div className='flex items-center gap-2'>
            <Avatar src={detail?.creator?.avatar}>{detail?.creator?.nickname || detail?.creator?.username}</Avatar>
            {detail?.creator?.nickname || detail?.creator?.username}
          </div>
        </Tooltip>
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: 'URL',
      children: detail?.url,
      span: 3
    },
    {
      label: '密钥',
      children: detail?.secret || '-',
      span: 3
    },
    {
      label: '请求方法',
      children: detail ? <Badge {...MethodData[detail.method]} /> : '-',
      span: 3
    },
    {
      label: '请求头',
      children: detail ? (
        <div className='flex flex-col gap-2'>
          {detail?.headers?.map((item) => (
            <Text
              copyable={{ text: `${item.key}:${item.value}` }}
              key={item.key}
              className='flex items-center gap-2 text-sm'
            >
              <div className='text-orange-500 font-bold'>{item.key}</div>
              <div>:</div>
              <div className='text-green-500'>{item.value}</div>
            </Text>
          ))}
        </div>
      ) : (
        '-'
      ),
      span: 3
    },
    {
      label: '备注',
      children: detail?.remark || '-',
      span: 3
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
    }
  ]

  useEffect(() => {
    if (hookId && open) {
      getHookDetail({ hookId })
    }
  }, [hookId, open, getHookDetail])

  return (
    <>
      <Modal width='50%' centered open={open} onOk={onOk} onCancel={onCancel} footer={null}>
        <Descriptions title='Hook信息' bordered items={items} />
      </Modal>
    </>
  )
}
