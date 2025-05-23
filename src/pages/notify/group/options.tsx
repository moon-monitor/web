import { NoticeGroupItem, NoticeHookItem } from '@/api2/common.types'
import { ActionKey, GlobalStatus } from '@/api2/enum'
import { defaultPaginationReq, GlobalStatusData, HookAppData } from '@/api2/global'
import { listTeamNoticeHook } from '@/api2/team/team-notice'
import type { DataFromItem } from '@/components/data/form'
import type { SearchFormItem } from '@/components/data/search-box'
import type { MoreMenuProps } from '@/components/moreMenu'
import MoreMenu from '@/components/moreMenu'
import { Avatar, Badge, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// eslint-disable-next-line react-refresh/only-export-components
export const formList: SearchFormItem[] = [
  {
    name: 'keyword',
    label: '名称',
    dataProps: {
      type: 'input',
      itemProps: {
        placeholder: '告警组名称模糊查询',
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
        placeholder: '告警组状态',
        allowClear: true,
        options: Object.entries(GlobalStatus).map(([key, value]) => {
          return {
            label: value,
            value: key
          }
        })
      }
    }
  }
]

interface GroupColumnProps {
  onHandleMenuOnClick: (item: NoticeGroupItem, key: ActionKey) => void
  current: number
  pageSize: number
}

// eslint-disable-next-line react-refresh/only-export-components
export const getColumnList = (props: GroupColumnProps): ColumnsType<NoticeGroupItem> => {
  const { onHandleMenuOnClick, current, pageSize } = props
  const tableOperationItems = (record: NoticeGroupItem): MoreMenuProps['items'] => [
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
      width: 120,
      render: (status: GlobalStatus) => {
        return <Badge {...GlobalStatusData[status]} />
      }
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
      render: (text: string) => {
        return text || '-'
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      ellipsis: true,
      fixed: 'right',
      width: 120,
      render: (_, record: NoticeGroupItem) => (
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

export interface HookAvatarProps extends NoticeHookItem {}

export const HookAvatar: React.FC<HookAvatarProps> = (props) => {
  const { name, app } = props

  return (
    <Space direction='horizontal'>
      <Avatar size='small' shape='square' icon={HookAppData[app].icon} />
      {name}
    </Space>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const editModalFormItems: (DataFromItem | DataFromItem[])[] = [
  {
    name: 'name',
    label: '名称',
    type: 'input',
    formProps: {
      rules: [{ required: true, message: '请输入告警组名称' }]
    },
    props: {
      placeholder: '请输入告警组名称'
    }
  },
  {
    name: 'remark',
    label: '描述',
    type: 'textarea',
    props: {
      placeholder: '请输入描述',
      maxLength: 200,
      showCount: true
    }
  },
  // {
  //   name: 'timeEngines',
  //   label: '时间引擎',
  //   type: 'select-fetch',
  //   props: {
  //     handleFetch: (value: string) => {
  //       return listTimeEngine({
  //         keyword: value,
  //         pagination: defaultPaginationReq
  //       }).then((res) =>
  //         res.list.map((item) => ({
  //           label: item.name,
  //           value: item.id
  //         }))
  //       )
  //     },
  //     selectProps: {
  //       placeholder: '请选择时间引擎',
  //       mode: 'multiple'
  //     }
  //   }
  // },
  {
    name: 'hookIds',
    label: 'hook列表',
    type: 'select-fetch',
    props: {
      handleFetch: (value: string) => {
        return listTeamNoticeHook({
          keyword: value,
          pagination: defaultPaginationReq
        }).then((res) =>
          res.items.map((item) => ({
            label: <HookAvatar {...item} />,
            value: item.noticeHookId,
            disabled: item.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
          }))
        )
      },
      selectProps: {
        placeholder: '请选择hook列表',
        mode: 'multiple'
      }
    }
  }
  // {
  //   name: 'templates',
  //   label: '模板',
  //   type: 'select-fetch',
  //   props: {
  //     handleFetch: (value: string) => {
  //       return getTemplateList({
  //         keyword: value,
  //         pagination: defaultPaginationReq
  //       }).then((res) =>
  //         res.list.map((item) => ({
  //           label: item.name,
  //           value: item.id
  //         }))
  //       )
  //     },
  //     selectProps: {
  //       placeholder: '请选择模板',
  //       mode: 'multiple'
  //     }
  //   }
  // }
]
