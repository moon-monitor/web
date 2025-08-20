import { TeamDictItem, TeamStrategyGroupItem, TeamStrategyItem, TeamStrategyMetricLevelItem } from '@/api2/common.types'
import { ActionKey, ConditionMetric, GlobalStatus, SampleMode, StrategyType } from '@/api2/enum'
import { ConditionMetricData, GlobalStatusData, SampleModeData, StrategyTypeData } from '@/api2/global'
import { DataFromItem } from '@/components/data/form'
import type { SearchFormItem } from '@/components/data/search-box'
import type { MoreMenuProps } from '@/components/moreMenu'
import MoreMenu from '@/components/moreMenu'
import { EllipsisOutlined } from '@ant-design/icons'
import { Badge, Button, Space, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export type StrategyLabelType = {
  alarmGroupIds: number[]
  name: string
  value: string
}

export type LevelItemType = {
  condition: ConditionMetric
  count: number
  duration: number
  levelId: number
  sustainType: SampleMode
  threshold: number
  status: GlobalStatus
  strategyLabels: StrategyLabelType[]
  id?: number
}

export const formList: SearchFormItem[] = [
  {
    name: 'keyword',
    label: '策略名称',
    dataProps: {
      type: 'input',
      itemProps: {
        placeholder: '请输入策略名称',
        allowClear: true,
        autoComplete: 'off',
        maxLength: 20,
        showCount: true
      }
    }
  },
  {
    name: 'strategyTypes',
    label: '策略类型',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '请选择策略类型',
        allowClear: true,
        mode: 'multiple',
        maxTagCount: 1,
        options: Object.entries(StrategyTypeData)
          .filter(([key]) => +key !== StrategyType.STRATEGY_TYPE_UNKNOWN)
          .map(([key, value]) => {
            return {
              label: <Tag color={value.color}>{value.label}</Tag>,
              value: key
            }
          })
      }
    }
  },
  {
    name: 'status',
    label: '策略状态',
    dataProps: {
      type: 'radio-group',
      itemProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        defaultValue: GlobalStatus.GLOBAL_STATUS_UNKNOWN,
        options: Object.entries(GlobalStatusData).map(([key, value]) => {
          return {
            label: +key === GlobalStatus.GLOBAL_STATUS_UNKNOWN ? '全部' : value.text,
            value: +key
          }
        })
      }
    }
  }
]

interface GroupColumnProps {
  onHandleMenuOnClick: (item: TeamStrategyItem, key: ActionKey) => void
  current: number
  pageSize: number
}

export const getColumnList = (props: GroupColumnProps): ColumnsType<TeamStrategyItem> => {
  const { onHandleMenuOnClick } = props
  const tableOperationItems = (record: TeamStrategyItem): MoreMenuProps['items'] => [
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
      key: ActionKey.EDIT,
      label: (
        <Button size='small' type='link'>
          编辑
        </Button>
      )
    },
    {
      key: ActionKey.IMMEDIATELY_PUSH,
      label: (
        <Button size='small' type='link'>
          立即推送
        </Button>
      )
    },
    record.strategyType === StrategyType.STRATEGY_TYPE_METRIC || !record.strategyType
      ? {
          key: ActionKey.CHART,
          label: (
            <Button size='small' type='link'>
              策略图表
            </Button>
          )
        }
      : null,
    {
      key: ActionKey.SUBSCRIBE,
      label: (
        <Button size='small' type='link'>
          订阅
        </Button>
      )
    },
    {
      key: ActionKey.SUBSCRIBER,
      label: (
        <Button size='small' type='link'>
          订阅者
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
      key: ActionKey.DELETE,
      label: (
        <Button type='link' size='small' danger>
          删除
        </Button>
      )
    },
    {
      key: ActionKey.ASSOCIATED_DATA,
      label: (
        <Button size='small' type='link'>
          关联数据
        </Button>
      )
    }
  ]

  return [
    {
      title: '类型',
      dataIndex: 'strategyType',
      key: 'strategyType',
      align: 'center',
      width: 80,
      render: (strategyType: StrategyType) => {
        const { color, label } = StrategyTypeData[strategyType]
        return <Tag color={color}>{label}</Tag>
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 80,
      render: (status: GlobalStatus) => {
        return <Badge {...GlobalStatusData[status]} />
      }
    },
    {
      title: '策略组',
      dataIndex: 'group',
      key: 'group',
      width: 160,
      render: (groupInfo: TeamStrategyGroupItem) => {
        return groupInfo?.name || '-'
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
      render: (record: TeamStrategyItem) => (
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

export const basicFormItems: (DataFromItem | DataFromItem[])[] = [
  [
    {
      name: 'name',
      label: '名称',
      type: 'input',
      formProps: {
        rules: [{ required: true, message: '请输入仪表盘名称' }]
      },
      props: {
        placeholder: '请输入仪表盘名称'
      }
    },
    {
      name: 'groupId',
      label: '策略组',
      type: 'select',
      props: {
        placeholder: '请选择策略组',
        mode: 'multiple',
        maxTagCount: 'responsive',
        options: [
          {
            label: '策略组1',
            value: 1
          },
          {
            label: '策略组2',
            value: 2
          }
        ]
      },
      formProps: {
        rules: [{ required: true, message: '请选择策略组' }]
      }
    }
  ],
  {
    name: 'remark',
    label: '描述',
    type: 'textarea',
    props: {
      placeholder: '请输入描述',
      maxLength: 200,
      showCount: true
    }
  }
]

export const metricStrategyFormItems: (DataFromItem | DataFromItem[])[] = [
  {
    name: 'metric',
    label: '指标',
    type: 'input',
    props: {
      placeholder: '请输入指标',
      maxLength: 100
    }
  },
  {
    name: 'unit',
    label: '单位',
    type: 'input',
    props: {
      placeholder: '请输入单位',
      maxLength: 100
    }
  }
]

export const metricStrategyLevelsformItems: (DataFromItem | DataFromItem[])[] = [
  {
    name: 'unit',
    label: '单位',
    type: 'input',
    props: {
      placeholder: '请输入单位',
      maxLength: 100
    }
  }
]

interface MetricLevelColumnsProps {
  onHandleMenuOnClick: (item: TeamStrategyMetricLevelItem, key: ActionKey) => void
}
export const metricLevelColumns = (props: MetricLevelColumnsProps): ColumnsType<TeamStrategyMetricLevelItem> => {
  const { onHandleMenuOnClick } = props
  return [
    {
      title: '告警等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: TeamDictItem) => {
        return level ? <Tag color={level.color}>{level.value}</Tag> : '-'
      }
    },
    {
      title: '判断条件',
      dataIndex: 'condition',
      key: 'condition',
      align: 'center',
      render: (condition: ConditionMetric) => {
        return ConditionMetricData[condition]
      }
    },
    {
      title: '阈值',
      dataIndex: 'values',
      key: 'values',
      align: 'center',
      render: (values: number[]) => {
        return values.join('~')
      }
    },
    {
      title: '触发类型',
      dataIndex: 'sampleMode',
      key: 'sampleMode',
      align: 'center',
      render: (sampleMode: SampleMode) => {
        return SampleModeData[sampleMode]
      }
    },
    {
      title: '持续时间(秒)',
      dataIndex: 'duration',
      key: 'duration',
      align: 'center'
    },
    {
      title: '持续次数',
      dataIndex: 'total',
      key: 'total',
      align: 'center'
    },
    {
      title: '告警页面',
      dataIndex: 'alarmPages',
      key: 'alarmPages',
      render: (alarmPages: TeamDictItem[]) => {
        if (alarmPages.length === 0) {
          return '-'
        } else if (alarmPages.length < 3) {
          return alarmPages.map((item) => <Tag color={item.color}>{item.value}</Tag>)
        } else {
          return (
            <Tooltip title={alarmPages.map((item) => item.value).join(',')}>
              {/* 做省略 */}
              <Tag color={alarmPages[0].color}>{alarmPages[0].value}</Tag>
              <Tag color={alarmPages[1].color}>{alarmPages[1].value}</Tag>
              <EllipsisOutlined />
            </Tooltip>
          )
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (record: TeamStrategyMetricLevelItem) => {
        return (
          <>
            <Button type='link' size='small' onClick={() => onHandleMenuOnClick(record, ActionKey.EDIT)}>
              编辑
            </Button>
            <Button type='link' size='small' danger onClick={() => onHandleMenuOnClick(record, ActionKey.DELETE)}>
              删除
            </Button>
          </>
        )
      }
    }
  ]
}
