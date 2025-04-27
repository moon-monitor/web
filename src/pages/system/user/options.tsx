import { type Role } from '@/api/enum'
import { ActionKey, RoleData } from '@/api/global'
import { UserItem } from '@/api2/common.types'
import { UserPosition, UserStatus, UserStatusMap } from '@/api2/enum'
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
        allowClear: true
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
        options: Object.entries(UserStatus).map(([key, value]) => {
          return {
            label: key === 'USER_STATUS_UNKNOWN' ? '全部' : value,
            value: key
          }
        })
      }
    }
  },
  {
    name: 'role',
    label: '角色',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '角色',
        allowClear: true,
        mode: 'multiple',
        options: Object.entries(UserPosition).map(([key, value]) => {
          return {
            label: key === 'USER_POSITION_UNKNOWN' ? '全部' : value,
            value: key
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
    record.status === 'USER_STATUS_FORBIDDEN'
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
      width: 50,
      render: (avatar: string, record: UserItem) => {
        return <Avatar src={avatar}>{avatar ? '' : record.username?.at(0)?.toUpperCase()}</Avatar>
      }
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: Role) => {
        return <Tag color='blue'>{RoleData[role]}</Tag>
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
      render: (status: keyof typeof UserStatus) => {
        return <Badge color={UserStatusMap[status].color} text={UserStatus[status]} />
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
