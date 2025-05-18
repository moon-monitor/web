import type { TeamMetricDatasourceItem } from '@/api2/common.types'
import { GlobalStatus } from '@/api2/enum'
import { DatasourceDriverMetricData } from '@/api2/global'
import { updateTeamMetricDatasourceStatus } from '@/api2/team/team-datasource'
import { RedoOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Descriptions, type DescriptionsProps, Space, Switch, Tag, Typography, theme as antdTheme } from 'antd'
import type React from 'react'

export interface BasicsProps {
  datasource?: TeamMetricDatasourceItem
  refresh?: () => void
  editDataSource?: () => void
}

const { useToken } = antdTheme

export const Basics: React.FC<BasicsProps> = (props) => {
  const { datasource, refresh, editDataSource } = props
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
      children: (
        <Typography.Text type='secondary' copyable={{ text: datasource?.endpoint }}>
          <Tag color={token.colorPrimary}>{datasource?.endpoint}</Tag>
        </Typography.Text>
      )
    },

    {
      label: '请求头',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: (
        <>
          {datasource?.headers?.length ? (
            <Space direction='vertical'>
              {datasource?.headers?.map((header) => (
                <Tag key={header.key} color={token.colorPrimary}>
                  <b> {header.key}</b>: {header.value}
                </Tag>
              ))}
            </Space>
          ) : (
            <Typography.Text type='secondary'>-</Typography.Text>
          )}
        </>
      )
    },
    {
      label: '基础认证配置',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: datasource?.basicAuth ? (
        <Space direction='vertical'>
          <div>
            <div className='flex flex-row items-center gap-2'>
              用户名：
              <Typography.Text type='secondary'>{datasource?.basicAuth?.username}</Typography.Text>
            </div>
            <div className='flex flex-row items-center gap-2'>
              密码：
              <Typography.Text type='secondary'>{datasource?.basicAuth?.password}</Typography.Text>
            </div>
          </div>
        </Space>
      ) : (
        <Typography.Text type='secondary'>-</Typography.Text>
      )
    },
    {
      label: '自签证书',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: (
        <div className='flex flex-row items-center gap-2'>
          {datasource?.ca ? (
            <Typography.Text type='secondary'>{datasource?.ca}</Typography.Text>
          ) : (
            <Typography.Text type='secondary'>-</Typography.Text>
          )}
        </div>
      )
    },
    {
      label: 'TLS',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: datasource?.tls ? (
        <Space direction='vertical'>
          <div>
            服务器名称：
            <Typography.Text type='secondary'>{datasource?.tls?.serverName}</Typography.Text>
          </div>
          <div>
            客户端证书：
            <Typography.Text type='secondary'>{datasource?.tls?.clientCert}</Typography.Text>
          </div>
          <div>
            客户端密钥：
            <Typography.Text type='secondary'>{datasource?.tls?.clientKey}</Typography.Text>
          </div>
          <div>
            跳过证书验证：
            <Typography.Text type='secondary'>{datasource?.tls?.skipVerify ? '是' : '否'}</Typography.Text>
          </div>
        </Space>
      ) : (
        <Typography.Text type='secondary'>-</Typography.Text>
      )
    },
    {
      label: '说明信息',
      span: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
      children: (
        <>
          {datasource?.remark ? (
            <Typography.Text type='secondary' copyable={{ text: datasource?.remark }}>
              {datasource?.remark}
            </Typography.Text>
          ) : (
            <Typography.Text type='secondary'>-</Typography.Text>
          )}
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
