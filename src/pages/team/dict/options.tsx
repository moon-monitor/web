import { TeamDictItem } from '@/api2/common.types'
import { ActionKey, DictType, GlobalStatus } from '@/api2/enum'
import { DictTypeData, GlobalStatusData } from '@/api2/global'
import type { DataFromItem } from '@/components/data/form'
import type { SearchFormItem } from '@/components/data/search-box'
import type { MoreMenuProps } from '@/components/moreMenu'
import MoreMenu from '@/components/moreMenu'
import { Badge, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export const formList: SearchFormItem[] = [
  {
    name: 'keyword',
    label: '名称',
    dataProps: {
      type: 'input',
      itemProps: {
        placeholder: '字典名称',
        allowClear: true
      }
    }
  },
  {
    name: 'dictTypes',
    label: '字典类型',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '字典类型',
        allowClear: true,
        mode: 'multiple',
        options: Object.entries(DictTypeData).map(([key, value]) => {
          return {
            label: value,
            value: +key
          }
        })
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
        options: Object.entries(GlobalStatusData).map(([key, value]) => {
          return {
            label: value.text,
            value: +key
          }
        })
      }
    }
  }
]

interface GroupColumnProps {
  onHandleMenuOnClick: (item: TeamDictItem, key: ActionKey) => void
  current: number
  pageSize: number
}

export const getColumnList = (props: GroupColumnProps): ColumnsType<TeamDictItem> => {
  const { onHandleMenuOnClick, current, pageSize } = props
  const tableOperationItems = (record: TeamDictItem): MoreMenuProps['items'] => [
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
      fixed: 'left',
      render: (_, __, index: number) => {
        return <span>{(current - 1) * pageSize + index + 1}</span>
      }
    },
    {
      title: '名称',
      dataIndex: 'value',
      key: 'value',
      width: 200,
      render: (name: string, record: TeamDictItem) => {
        return (
          <Space className='w-full'>
            <div className='w-4 h-4' style={{ background: record.color }} />
            {name}
          </Space>
        )
      }
    },
    {
      title: '编码',
      dataIndex: 'key',
      key: 'key',
      width: 160
    },
    {
      title: '语言',
      dataIndex: 'lang',
      key: 'lang',
      width: 160
    },
    {
      title: '类型',
      dataIndex: 'dictType',
      key: 'dictType',
      width: 160,
      render: (dictType: DictType) => {
        return <>{DictTypeData[dictType]}</>
      }
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
      render: (remark: string) => {
        return remark || '-'
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
      render: (_, record: TeamDictItem) => (
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

export const editModalFormItems = (): (DataFromItem | DataFromItem[])[] => [
  {
    name: 'dictType',
    label: '字典类型',
    type: 'select',
    formProps: {
      rules: [{ required: true, message: '请选择字典类型' }]
    },
    props: {
      placeholder: '请选择字典类型',
      options: Object.entries(DictTypeData)
        .filter(([key]) => {
          return +key !== DictType.DICT_TYPE_UNKNOWN
        })
        .map(([key, value]) => {
          return {
            label: value,
            value: +key
          }
        })
    }
  },
  {
    name: 'value',
    label: '名称',
    type: 'input',
    formProps: {
      rules: [{ required: true, message: '请输入字典名称' }]
    },
    props: {
      placeholder: '请输入字典名称'
    }
  },
  {
    name: 'key',
    label: '编码',
    type: 'input',
    formProps: {
      rules: [{ required: true, message: '请输入字典编码' }]
    },
    props: {
      placeholder: '请输入字典编码'
    }
  },
  {
    name: 'lang',
    label: '语言',
    type: 'select',
    props: {
      placeholder: '请输入语言',
      options: ['zh-CN', 'en-US'].map((item) => ({
        label: item,
        value: item
      }))
    }
  },
  {
    name: 'color',
    label: '颜色',
    type: 'color'
    // props: {
    //   format: colorType,
    //   showText: true
    // }
  }
]
