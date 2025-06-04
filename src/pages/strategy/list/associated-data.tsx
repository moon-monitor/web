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
      setMetricLevels(res.items)
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
      children: metricStrategy?.labels.map((item) => `${item.key}:${item.value}`).join(',')
    },
    {
      key: 'annotations',
      label: '注解',
      children: (
        <div>
          <div>summary:{metricStrategy?.annotations.summary}</div>
          <div>description:{metricStrategy?.annotations.description}</div>
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
    <div className='p-2 flex flex-col gap-2'>
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
        {/* <Space className='text-2xl font-bold'>
          {detail?.name}
          <Tag color={StrategyTypeData[detail?.strategyType].color}>{StrategyTypeData[detail?.strategyType].label}</Tag>
        </Space>
        <Button type='primary' onClick={() => navigate(-1)}>
          返回
        </Button> */}
        <Descriptions
          title='基本信息'
          items={baseInfo}
          size='small'
          extra={<Button type='link' size='small' icon={<RollbackOutlined />} onClick={() => navigate(-1)}></Button>}
        />
      </div>
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
            items={metricDescription}
            extra={
              <Button onClick={handleMetricStrategyModalOpen} type='link' size='small' icon={<EditOutlined />}></Button>
            }
            size='small'
          />
        )}
      </div>
      {strategyMetricId && (
        <div className='bg-white p-4 rounded-lg'>
          <Button color='default' variant='dashed' className='w-full' onClick={handleMetricLevelModalOpen}>
            添加告警等级
          </Button>
        </div>
      )}
      <AutoTable
        dataSource={metricLevels}
        columns={getMetricLevelColumns}
        pagination={false}
        total={metricLevels.length}
        pageSize={10}
        pageNum={1}
      />
    </div>
  )
}
