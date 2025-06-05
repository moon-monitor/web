import { TeamStrategyItem, TeamStrategyMetricLevelItem } from '@/api2/common.types'
import { ActionKey } from '@/api2/enum'
import { defaultPaginationReq, StrategyTypeData } from '@/api2/global'
import { getTeamMetricStrategy, listTeamMetricStrategyLevels } from '@/api2/team/team-strategy'
import { GetTeamMetricStrategyReply } from '@/api2/team/team-strategy.types'
import AutoTable from '@/components/table'
import { EditOutlined, RollbackOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Descriptions, DescriptionsProps, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MetricLevelModal from './components/metric-level-modal'
import MetricStrategyModal from './components/metric-strategy-modal'
import { metricLevelColumns } from './options'

export default function AssociatedData() {
  const navigate = useNavigate()
  const location = useLocation()
  const { detail } = (location.state as { detail: TeamStrategyItem }) || { detail: undefined }
  const [metricStrategyModalOpen, setMetricStrategyModalOpen] = useState(false)
  const [metricStrategy, setMetricStrategy] = useState<GetTeamMetricStrategyReply>()
  const [metricLevelModalOpen, setMetricLevelModalOpen] = useState(false)
  const [strategyMetricId, setStrategyMetricId] = useState<number>()
  const [strategyMetricLevel, setStrategyMetricLevel] = useState<TeamStrategyMetricLevelItem>()
  const [metricLevels, setMetricLevels] = useState<TeamStrategyMetricLevelItem[]>([])

  const { run: getMetricStrategy } = useRequest(getTeamMetricStrategy, {
    manual: true,
    onSuccess: (res) => {
      console.log('res', res)
      setMetricStrategy(res)
      setStrategyMetricId(res.strategyMetricId)
    }
  })
  const { run: getMetricLevels } = useRequest(listTeamMetricStrategyLevels, {
    manual: true,
    onSuccess: (res) => {
      console.log('res', res)

      setMetricLevels(
        res.items.map((item) => ({
          ...item,
          key: item.strategyMetricLevelId
        }))
      )
    }
  })
  const handleMetricStrategyModalCancel = () => {
    setMetricStrategyModalOpen(false)
  }

  const handleMetricStrategyModalOpen = () => {
    setMetricStrategyModalOpen(true)
  }
  const handleMetricStrategyModalOk = () => {
    setMetricStrategyModalOpen(false)
    getMetricStrategy({
      strategyId: detail?.strategyId
    })
  }
  const handleMetricLevelModalCancel = () => {
    setMetricLevelModalOpen(false)
  }
  const handleMetricLevelModalOpen = () => {
    setMetricLevelModalOpen(true)
  }
  const handleMetricLevelModalOk = () => {
    setMetricLevelModalOpen(false)
    getMetricLevels({
      pagination: defaultPaginationReq,
      strategyMetricId: strategyMetricId
    })
  }
  useEffect(() => {
    if (detail) {
      getMetricStrategy({
        strategyId: detail.strategyId
      })
    }
  }, [detail])
  useEffect(() => {
    if (strategyMetricId) {
      getMetricLevels({
        pagination: defaultPaginationReq,
        strategyMetricId: strategyMetricId
      })
    }
  }, [strategyMetricId])

  const baseInfo: DescriptionsProps['items'] = [
    {
      key: 'strategyName',
      label: '策略名称',
      children: detail?.name
    },
    {
      key: 'username',
      label: '创建人',
      children: detail?.creator?.username
    },
    {
      key: 'createTime',
      label: '创建时间',
      children: detail?.createdAt
    },
    {
      key: 'strategyType',
      label: '策略类型',
      children: (
        <Tag color={StrategyTypeData[detail?.strategyType].color}>{StrategyTypeData[detail?.strategyType].label}</Tag>
      )
    },
    {
      key: 'remark',
      label: '备注',
      children: detail?.remark
    }
  ]
  const metricDescription: DescriptionsProps['items'] = [
    {
      key: 'datasource',
      label: '数据源',
      children: metricStrategy?.datasource.map((item) => item.name).join(',')
    },
    {
      key: 'expr',
      label: '表达式',
      children: metricStrategy?.expr
    },
    {
      key: 'labels',
      label: '自定义标签',
      children: (
        <Tag color='blue' bordered={false}>
          {metricStrategy?.labels.map((item) => `${item.key}=${item.value}`).join(' ; ')}
        </Tag>
      )
    },
    {
      key: 'summary',
      label: '摘要',
      children: metricStrategy?.annotations.summary
    },
    {
      key: 'description',
      label: '描述',
      children: metricStrategy?.annotations.description
    }
  ]
  const metricLevelDescription = (record: TeamStrategyMetricLevelItem): DescriptionsProps['items'] => [
    {
      key: 'receiverRoutes',
      label: '通知对象',
      children: record.receiverRoutes?.map((item) => item.name).join(',')
    },
    {
      key: 'labelReceiverRoutes',
      label: '自定义通知对象',
      children: (
        <div>
          {record.labelReceiverRoutes?.map((item) => (
            <Tag key={item.labelKey} color='blue' bordered={false}>
              {item.labelKey} = {item.labelValue}:{item.notices?.map((notice) => notice.name).join(',')}
            </Tag>
          ))}
        </div>
      )
    }
  ]

  const getMetricLevelColumns = metricLevelColumns({
    onHandleMenuOnClick: (record, key) => {
      if (key === ActionKey.EDIT) {
        handleMetricLevelModalOpen()
        setStrategyMetricLevel(record)
      }
    }
  })
  return (
    <div className='p-2 flex flex-col gap-2 h-full'>
      <MetricStrategyModal
        open={metricStrategyModalOpen}
        onCancel={handleMetricStrategyModalCancel}
        onOk={handleMetricStrategyModalOk}
        strategyDetail={metricStrategy}
      />
      <MetricLevelModal
        width='60%'
        open={metricLevelModalOpen}
        onCancel={handleMetricLevelModalCancel}
        onOk={handleMetricLevelModalOk}
        strategyMetricId={strategyMetricId}
        strategyMetricLevel={strategyMetricLevel}
      />
      <div className=' bg-white p-4 rounded-lg'>
        <Descriptions
          title='基本信息'
          items={baseInfo}
          size='small'
          extra={<Button type='link' size='small' icon={<RollbackOutlined />} onClick={() => navigate(-1)}></Button>}
        />
      </div>

      <div className='flex flex-1 flex-col gap-2 overflow-y-auto h-full'>
        <div className='bg-white p-4 rounded-lg'>
          {!metricStrategy && (
            <Button color='default' variant='dashed' className='w-full' onClick={handleMetricStrategyModalOpen}>
              关联数据源
            </Button>
          )}
          {metricStrategy && (
            <Descriptions
              title='关联数据源'
              bordered
              column={1}
              items={metricDescription}
              extra={
                <Button
                  onClick={handleMetricStrategyModalOpen}
                  type='link'
                  size='small'
                  icon={<EditOutlined />}
                ></Button>
              }
              size='small'
              labelStyle={{
                width: '10rem'
              }}
            />
          )}
        </div>
        {strategyMetricId && (
          <div className='bg-white p-4 flex gap-2 justify-between rounded-lg'>
            <Button color='default' onClick={handleMetricLevelModalOpen}>
              添加告警等级
            </Button>
            <Button color='default' danger>
              批量删除
            </Button>
          </div>
        )}
        <AutoTable
          dataSource={metricLevels}
          columns={getMetricLevelColumns}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            }
          }}
          expandable={{
            expandedRowRender: (record) => (
              <Descriptions
                column={1}
                bordered
                labelStyle={{ width: '10rem' }}
                size='small'
                items={metricLevelDescription(record)}
              />
            )
            //   rowExpandable: (record: TeamStrategyMetricLevelItem) =>
            //     !!(
            //       (record.receiverRoutes && record.receiverRoutes.length > 0) ||
            //       (record.labelReceiverRoutes && record.labelReceiverRoutes.length > 0)
            //     )
          }}
        />
      </div>
    </div>
  )
}
