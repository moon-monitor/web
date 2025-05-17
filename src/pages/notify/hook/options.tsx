import { NoticeHookItem } from '@/api2/common.types'
import { ActionKey, GlobalStatus, HookAPP } from '@/api2/enum'
import { GlobalStatusData, HookAppData } from '@/api2/global'
import { SearchFormItem } from '@/components/data/search-box'
import MoreMenu, { MoreMenuProps } from '@/components/moreMenu'
import { Avatar, Badge, Button, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'

export const formList: SearchFormItem[] = [
  {
    name: 'keyword',
    label: '名称',
    dataProps: {
      type: 'input',
      itemProps: {
        placeholder: '名称模糊查询',
        allowClear: true,
        autoComplete: 'off'
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
        options: Object.entries(GlobalStatus).map(([key, value]) => {
          return {
            label: value,
            value: key
          }
        })
      }
    }
  },
  {
    name: 'app',
    label: '类型',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '类型',
        allowClear: true,
        mode: 'multiple',
        options: Object.entries(HookAppData).map(([key, value]) => {
          const { text, icon } = value
          return {
            label: (
              <Space direction='horizontal'>
                <Avatar size='small' shape='square' icon={icon} />
                {text}
              </Space>
            ),
            value: +key
          }
        })
      }
    }
  }
]

interface NotifyHookColumnProps {
  onHandleMenuOnClick: (item: NoticeHookItem, key: ActionKey) => void
  current: number
  pageSize: number
}

export const getColumnList = (props: NotifyHookColumnProps): ColumnsType<NoticeHookItem> => {
  const { onHandleMenuOnClick, current, pageSize } = props
  const tableOperationItems = (record: NoticeHookItem): MoreMenuProps['items'] => [
    record.status === GlobalStatus.GLOBAL_STATUS_DISABLE
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
      key: ActionKey.OPERATION_LOG,
      label: (
        <Button size='small' type='link'>
          操作日志
        </Button>
      )
    },
    {
      key: ActionKey.EDIT,
      label: (
        <Button size='small' type='link'>
          编辑
        </Button>
      )
    },
    {
      key: ActionKey.DELETE,
      label: (
        <Button type='link' size='small' danger>
          删除
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
      render: (_, __, index: number) => {
        return <span>{(current - 1) * pageSize + index + 1}</span>
      }
    },
    {
      title: '类型',
      dataIndex: 'app',
      key: 'app',
      width: 100,
      render: (app: HookAPP) => {
        const { text, icon } = HookAppData[app]
        return (
          <Space direction='horizontal'>
            <Avatar size='small' shape='square' icon={icon} />
            {text}
          </Space>
        )
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 160,
      render: (status: GlobalStatus) => {
        return <Badge {...GlobalStatusData[status]} />
      }
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
      width: 300,
      ellipsis: true,
      render: (text: string) => {
        return text || '-'
      }
    },

    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      ellipsis: true,
      fixed: 'right',
      width: 120,
      render: (record: NoticeHookItem) => (
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
