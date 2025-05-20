import { defaultPaginationReq } from '@/api2/global'
import { listTeamNoticeGroup } from '@/api2/team/team-notice'
import { listTeamStrategyGroup } from '@/api2/team/team-strategy'
import { DataFromItem } from '@/components/data/form'

export const basicFormItems: (DataFromItem | DataFromItem[])[] = [
  [
    {
      name: 'name',
      label: '名称',
      type: 'input',
      props: {
        placeholder: '请输入名称'
      },
      formProps: {
        rules: [
          { required: true, message: '请输入名称' },
          { max: 20, message: '名称长度不能超过20个字符' }
        ]
      }
    },
    {
      name: 'groupId',
      label: '策略组',
      type: 'select',
      props: {
        placeholder: '请选择策略组',
        async options() {
          const res = await listTeamStrategyGroup({ pagination: defaultPaginationReq })
          return (
            res.items?.map((g) => ({
              label: g.name,
              value: g.groupId
            })) || []
          )
        }
      },
      formProps: {
        rules: [{ required: true, message: '请选择策略组' }]
      }
    }
  ],
  [
    {
      name: 'receiverRoutes',
      label: '通知对象',
      type: 'select',
      props: {
        placeholder: '请选择通知对象',
        mode: 'multiple',
        allowClear: true,
        async options() {
          const res = await listTeamNoticeGroup({ pagination: defaultPaginationReq })
          return (
            res.items?.map((g) => ({
              label: g.name,
              value: g.noticeGroupId
            })) || []
          )
        }
      }
    }
  ],
  {
    name: 'remark',
    label: '备注',
    type: 'textarea',
    props: {
      placeholder: '请输入备注',
      maxLength: 200,
      showCount: true
    },
    formProps: {
      rules: [{ max: 200, message: '备注长度不能超过200个字符' }]
    }
  }
]

export const metricDatasourceFormItems: (DataFromItem | DataFromItem[])[] = [
  [
    {
      name: 'datasource',
      label: '数据源',
      type: 'select',
      props: {
        placeholder: '请选择数据源'
      }
    }
  ],
  [
    {
      name: 'expr',
      label: '查询语句',
      type: 'input'
    }
  ],
  {
    name: 'labels',
    label: '标签kv集合',
    type: 'input'
  },
  {
    name: 'annotations',
    label: '注解kv集合',
    type: 'input'
  }
]

export const metricLevelsFormItems: (DataFromItem | DataFromItem[])[] = [
  [
    {
      name: 'levels',
      label: '告警等级',
      type: 'input'
    }
  ]
]
