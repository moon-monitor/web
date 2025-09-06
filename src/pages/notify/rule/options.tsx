import { ActionKey, GlobalStatus, TimeEngineRuleType } from '@/api/enum'
import { GlobalStatusData } from '@/api/global'
import { PaginationRequest, TimeEngineItemRule } from '@/api/request/types'
import { TimeEngineItem, } from '@/api/request/types/model-types'

import { SearchFormItem } from '@/components/data/search-box'
import MoreMenu, { MoreMenuProps } from '@/components/moreMenu'
import { Badge, Button, Space } from 'antd'
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
    name: 'category',
    label: '类型',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '类型',
        allowClear: true,
        mode: 'multiple',
        options: Object.entries(TimeEngineRuleType).map(([key, value]) => {
          // const { label, icon } = value
          // return {
          //   label: (
          //     <Space direction='horizontal'>
          //       <Avatar size='small' shape='square' icon={icon} />
          //       {label}
          //     </Space>
          //   ),
          //   value: key
          // }
          return {
            label: value,
            value: key
          }
        })
      }
    }
  }
]

export const engineFormList: SearchFormItem[] = [
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
  }
]

interface NotifyRuleColumnProps {
  onHandleMenuOnClick: (item: TimeEngineItemRule, key: ActionKey) => void
  pagination: PaginationRequest
}

export const getColumnList = (props: NotifyRuleColumnProps): ColumnsType<TimeEngineItemRule> => {
  const {
    onHandleMenuOnClick,
    pagination: { page, pageSize }
  } = props
  const tableOperationItems = (record: TimeEngineItemRule): MoreMenuProps['items'] => [
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
        return <span>{(page - 1) * pageSize + index + 1}</span>
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '类型',
      dataIndex: 'category',
      key: 'category',
      width: 160,
      render: (category: TimeEngineRuleType) => {
        // const { label, icon } = TimeEngineRuleTypeData[category]
        // return (
        //   <Space direction='horizontal'>
        //     <Avatar size='small' shape='square' icon={icon} />
        //     {label}
        //   </Space>
        // )
        return TimeEngineRuleType[category]
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 160,
      render: (status: GlobalStatus) => {
        const data = GlobalStatusData[status]
        return <Badge color={data?.color} text={data?.label} />
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
      render: (record: TimeEngineItemRule) => (
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

interface NotifyEngineColumnProps {
  onHandleMenuOnClick: (item: TimeEngineItem, key: ActionKey) => void
  pagination: PaginationRequest
}

export const getEngineColumnList = (props: NotifyEngineColumnProps): ColumnsType<TimeEngineItem> => {
  const {
    onHandleMenuOnClick,
    pagination: { page, pageSize }
  } = props
  const tableOperationItems = (record: TimeEngineItem): MoreMenuProps['items'] => [
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
        return <span>{(page - 1) * pageSize + index + 1}</span>
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
        const data = GlobalStatusData[status]
        return <Badge color={data?.color} text={data?.label} />
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
      render: (record: TimeEngineItem) => (
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

export const weekOptions = [
  {
    label: '星期一',
    value: 1
  },
  {
    label: '星期二',
    value: 2
  },
  {
    label: '星期三',
    value: 3
  },
  {
    label: '星期四',
    value: 4
  },
  {
    label: '星期五',
    value: 5
  },
  {
    label: '星期六',
    value: 6
  },
  {
    label: '星期日',
    value: 7
  }
]

export const monthOptions = [
  {
    label: '一月',
    value: 1
  },
  {
    label: '二月',
    value: 2
  },
  {
    label: '三月',
    value: 3
  },
  {
    label: '四月',
    value: 4
  },
  {
    label: '五月',
    value: 5
  },
  {
    label: '六月',
    value: 6
  },
  {
    label: '七月',
    value: 7
  },
  {
    label: '八月',
    value: 8
  },
  {
    label: '九月',
    value: 9
  },
  {
    label: '十月',
    value: 10
  },
  {
    label: '十一月',
    value: 11
  },
  {
    label: '十二月',
    value: 12
  }
]

export const dayOptions = Array.from({ length: 31 }, (_, index) => ({
  label: `${index + 1} 日`,
  value: index + 1
}))

export const hourOptions = Array.from({ length: 24 }, (_, index) => ({
  label: `${index < 10 ? '0' + index : index} 时`,
  value: index
}))
