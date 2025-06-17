import { UserItem } from '@/api2/common.types'
import { ActionKey, UserPosition, UserStatus } from '@/api2/enum'
import { UserPositionData, UserStatusData } from '@/api2/global'
import type { SearchFormItem } from '@/components/data/search-box'
import type { MoreMenuProps } from '@/components/moreMenu'
import MoreMenu from '@/components/moreMenu'
import { Avatar, Badge, Button, Space, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export const formList: SearchFormItem[] = [
  {
    name: 'keyword',
    label: '名称',
    dataProps: {
      type: 'input',
      itemProps: {
        placeholder: '用户名称',
        allowClear: true,
        maxLength: 20,
        showCount: true
      }
    }
  },
  {
    name: 'status',
    label: '状态',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '状态',
        allowClear: true,
        mode: 'multiple',
        options: Object.entries(UserStatusData).map(([key, value]) => {
          return {
            label: +key === UserStatus.USER_STATUS_UNKNOWN ? '全部' : value.label,
            value: +key
          }
        })
      }
    }
  },
  {
    name: 'position',
    label: '角色',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '角色',
        allowClear: true,
        mode: 'multiple',
        options: Object.entries(UserPositionData).map(([key, value]) => {
          return {
            label: +key === UserPosition.USER_POSITION_UNKNOWN ? '全部' : value.label,
            value: +key
          }
        })
      }
    }
  }
]

interface GroupColumnProps {
  onHandleMenuOnClick: (item: UserItem, key: ActionKey) => void
  current: number
  pageSize: number
}

export const getColumnList = (props: GroupColumnProps): ColumnsType<UserItem> => {
  const { onHandleMenuOnClick, current, pageSize } = props
  const tableOperationItems = (record: UserItem): MoreMenuProps['items'] => [
    record.status === UserStatus.USER_STATUS_FORBIDDEN
      ? {
          key: ActionKey.ENABLE,
          label: (
            <Button type='link' size='small'>
              启用
            </Button>
          )
        }
      : {
          key: ActionKey.DISABLE,
          label: (
            <Button type='link' size='small' danger>
              禁用
            </Button>
          )
        },
    {
      key: ActionKey.UPDATE_ROLE,
      label: (
        <Button type='link' size='small'>
          设置角色
        </Button>
      )
    },
    {
      key: ActionKey.RESET_PASSWORD,
      label: (
        <Button type='link' size='small'>
          重置密码
        </Button>
      )
    }
  ]

  return [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      fixed: 'left',
      render: (_, __, index: number) => {
        return <span>{(current - 1) * pageSize + index + 1}</span>
      }
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      width: 100,
      render: (avatar: string, record: UserItem) => {
        return <Avatar src={avatar}>{avatar ? '' : record.username?.at(0)?.toUpperCase()}</Avatar>
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 200
    },
    {
      title: '角色',
      dataIndex: 'position',
      key: 'position',
      width: 120,
      render: (position: UserPosition) => {
        const { color, label } = UserPositionData[position]
        return <Tag color={color}>{label}</Tag>
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 200,
      ellipsis: true,
      render: (nickname: string) => {
        return nickname || '-'
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      render: (status: UserStatus) => {
        const { color, label } = UserStatusData[status]
        return <Badge color={color} text={label} />
      }
    },

    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
      width: 300,
      ellipsis: true,
      render: (remark: string) => {
        return remark || '-'
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      ellipsis: true,
      fixed: 'right',
      width: 120,
      render: (_, record: UserItem) => (
        <Space size={20}>
          <Button size='small' type='link' onClick={() => onHandleMenuOnClick(record, ActionKey.DETAIL)}>
            详情
          </Button>
          {tableOperationItems && tableOperationItems?.length > 0 && (
            <MoreMenu
              items={tableOperationItems(record)}
              onClick={(key: ActionKey) => {
                onHandleMenuOnClick(record, key)
              }}
            />
          )}
        </Space>
      )
    }
  ]
}
