import { TeamMetricDatasourceItem } from '@/api2/common.types'
import { DatasourceDriverMetric } from '@/api2/enum'
import { Prometheus, VictoriaMetrics } from '@/components/icon'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Alert, Typography } from 'antd'
import React from 'react'

export interface InfoProps {
  datasource?: TeamMetricDatasourceItem
}

const { Text } = Typography

const InfoIcon = (props: { datasource?: TeamMetricDatasourceItem; className?: string }) => {
  const { datasource, className } = props
  switch (datasource?.driver) {
    case DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_PROMETHEUS.toString():
      return <Prometheus className={className} />
    case DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_VICTORIAMETRICS.toString():
      return <VictoriaMetrics className={className} />
    default:
      return <InfoCircleOutlined className={className} />
  }
}

const InfoContent = (props: { datasource?: TeamMetricDatasourceItem }) => {
  const { datasource } = props
  return (
    <div className='flex gap-1 items-center'>
      <b>{datasource?.name}</b>
      <Text ellipsis>{datasource?.remark}</Text>
    </div>
  )
}

export const Info: React.FC<InfoProps> = (props) => {
  const { datasource } = props

  return (
    <>
      <Alert
        banner
        message={<InfoContent datasource={datasource} />}
        type='info'
        showIcon
        icon={<InfoIcon datasource={datasource} className='w-4 h-4' />}
      />
    </>
  )
}
