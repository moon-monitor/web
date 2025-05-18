import type { TeamMetricDatasourceItem } from '@/api2/common.types'
import { GlobalStatus } from '@/api2/enum'
import { DatasourceDriverMetricData } from '@/api2/global'
import { updateTeamMetricDatasourceStatus } from '@/api2/team/team-datasource'
import { GlobalContext } from '@/utils/context'
import { RedoOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Descriptions, type DescriptionsProps, Switch, Tag, Typography, theme as antdTheme } from 'antd'
import type React from 'react'
import { useContext } from 'react'
import ReactJson from 'react-json-view'

export interface BasicsProps {
  datasource?: TeamMetricDatasourceItem
  refresh?: () => void
  editDataSource?: () => void
}

const { useToken } = antdTheme

export const Basics: React.FC<BasicsProps> = (props) => {
  const { datasource, refresh, editDataSource } = props
  const { theme } = useContext(GlobalContext)
  const { token } = useToken()

  const { run: updateStatus, loading: updateStatusLoading } = useRequest(updateTeamMetricDatasourceStatus, {
    manual: true,
    onSuccess: () => {
      refresh?.()
    }
  })

  if (!datasource) return null

  const items: DescriptionsProps['items'] = [
    {
      label: '数据源名称',
      children: datasource?.name
    },
    {
      label: '状态',
      children: (
        <Switch
          loading={updateStatusLoading}
          checked={datasource?.status === GlobalStatus.GLOBAL_STATUS_ENABLE}
          checkedChildren='启用'
          unCheckedChildren='禁用'
          onChange={(checked) => {
            updateStatus({
              datasourceId: datasource.datasourceId,
              status: checked ? GlobalStatus.GLOBAL_STATUS_ENABLE : GlobalStatus.GLOBAL_STATUS_DISABLE
            })
          }}
        />
      )
    },
    {
      key: 'driver',
      label: '数据源类型',
      children: (
        <div className='flex flex-row items-center gap-2'>
          <Tag color='blue'>{DatasourceDriverMetricData[datasource.driver].text}</Tag>
        </div>
      )
    },
    {
      label: '创建者',
      children: `${datasource?.creator?.username || '-'}(${datasource?.creator?.nickname || '-'})`
    },
    {
      label: '创建时间',
      children: datasource?.createdAt
    },
    {
      label: '更新时间',
      children: datasource?.updatedAt
    },
    {
      label: '地址',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: <Tag color={token.colorPrimary}>{datasource?.endpoint}</Tag>
    },

    {
      label: '配置明细',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: (
        <>
          <ReactJson
            src={datasource?.extra || {}}
            name={false}
            displayDataTypes={false}
            theme={theme === 'dark' ? 'bright' : 'bright:inverted'}
            iconStyle='square'
          />
        </>
      )
    },
    {
      label: '说明信息',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: (
        <>
          <Typography.Text type='secondary'>{datasource?.remark}</Typography.Text>
        </>
      )
    }
  ]

  return (
    <Descriptions
      title={
        <div className='flex items-center gap-2'>
          <Button type='primary' onClick={refresh} icon={<RedoOutlined />} size='small' />
          <span>名称：{datasource?.name}</span>
        </div>
      }
      extra={
        <Button type='dashed' onClick={editDataSource}>
          编辑
        </Button>
      }
      bordered
      column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
      items={items}
    />
  )
}
