import { TeamStrategyItem, TeamStrategyMetricLevelItem } from '@/api2/common.types'
import { ActionKey } from '@/api2/enum'
import { DatasourceDriverMetricData, defaultPaginationReq, StrategyTypeData } from '@/api2/global'
import { baseURL } from '@/api2/request'
import {
  deleteTeamMetricStrategyLevel,
  getTeamMetricStrategy,
  listTeamMetricStrategyLevels
} from '@/api2/team/team-strategy'
import { GetTeamMetricStrategyReply } from '@/api2/team/team-strategy.types'
import PromQLInput, { PromQLInputProps } from '@/components/data/child/prom-ql'
import AutoTable from '@/components/table'
import { getColorByString } from '@/utils/color'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Badge, Button, Card, Descriptions, DescriptionsProps, message, Modal, Tag } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [selectedMetricLevelIds, setSelectedMetricLevelIds] = useState<number[]>([])
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

  const { run: deleteMetricLevel, loading: deleteMetricLevelLoading } = useRequest(deleteTeamMetricStrategyLevel, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      setSelectedMetricLevelIds([])
      getMetricLevelList()
    }
  })

  const getMetricLevelList = useCallback(() => {
    getMetricLevels({
      pagination: defaultPaginationReq,
      strategyMetricId: strategyMetricId
    })
  }, [strategyMetricId])

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
    getMetricLevelList()
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
      getMetricLevelList()
    }
  }, [strategyMetricId])

  const promqlRef = useRef<PromQLInputProps['ref']>(null)
  useEffect(() => {
    console.log('promqlRef.current', promqlRef)
  }, [])

  const baseInfo: DescriptionsProps['items'] = [
    {
      key: 'strategyName',
      label: '策略名称',
      children: detail?.name,
      span: {
        xs: 24,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }
    },
    {
      key: 'username',
      label: '创建人',
      children: detail?.creator?.username,
      span: {
        xs: 24,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }
    },
    {
      key: 'createTime',
      label: '创建时间',
      children: detail?.createdAt,
      span: {
        xs: 24,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }
    },
    {
      key: 'updatedAt',
      label: '更新时间',
      children: detail?.updatedAt,
      span: {
        xs: 24,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }
    },
    {
      key: 'remark',
      label: '备注',
      children: detail?.remark,
      span: 24
    }
  ]
  const metricDescription: DescriptionsProps['items'] = [
    {
      key: 'datasource',
      label: '数据源',
      children: (
        <div className='flex flex-col gap-1 w-full'>
          {metricStrategy?.datasource.map((item) => (
            <div key={item.name} className='flex items-center text-white rounded-md '>
              <div
                className='pl-1 pr-1 font-bold'
                style={{ backgroundColor: getColorByString(DatasourceDriverMetricData[item.driver]) }}
              >
                {DatasourceDriverMetricData[item.driver]}
              </div>
              <div className='pl-1 pr-1 ' style={{ backgroundColor: getColorByString(item.name) }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'expr',
      label: '表达式',
      children: (
        <div className='pointer-events-auto'>
          <PromQLInput
            value={metricStrategy?.expr}
            pathPrefix={`${baseURL}/api/team/datasource/metric/${metricStrategy?.datasource.at(0)?.driver}`}
            formatExpression
            disabled
            subfix
          />
        </div>
      )
    },
    {
      key: 'labels',
      label: '自定义标签',
      children: (
        <div>
          {metricStrategy?.labels.map((item) => (
            <Tag key={item.key} color='blue' bordered={false}>
              {`${item.key}=${item.value}`}
            </Tag>
          ))}
        </div>
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
      switch (key) {
        case ActionKey.EDIT:
          handleMetricLevelModalOpen()
          setStrategyMetricLevel(record)
          break
        case ActionKey.DELETE:
          Modal.confirm({
            title: '确定删除吗？',
            onOk: () => {
              deleteMetricLevel({
                strategyMetricLevelIds: [record.strategyMetricLevelId]
              })
            }
          })
          break
      }
    }
  })
  const handleBatchDeleteMetricLevel = () => {
    if (selectedMetricLevelIds.length === 0) {
      message.error('请选择要删除的告警等级')
      return
    }
    deleteMetricLevel({
      strategyMetricLevelIds: selectedMetricLevelIds
    })
  }
  return (
    <div className='p-2 flex flex-col gap-2 h-full'>
      <MetricStrategyModal
        width='76%'
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
      <div className='bg-white p-4 rounded-lg'>
        <Badge.Ribbon
          text={StrategyTypeData[detail?.strategyType].label}
          color={StrategyTypeData[detail?.strategyType].color}
        >
          <Card
            title={
              <div className='text-lg font-bold flex items-center gap-2'>
                <Button
                  type='link'
                  size='large'
                  className=''
                  onClick={() => navigate(-1)}
                  style={{ padding: 0, fontSize: 20, fontWeight: 'bold' }}
                >
                  <ArrowLeftOutlined />
                </Button>
                基本信息
              </div>
            }
            // bordered={false}s
            size='small'
          >
            <Descriptions layout='vertical' bordered={false} column={24} items={baseInfo} size='small' />
          </Card>
        </Badge.Ribbon>
      </div>
      <div className='flex flex-1 flex-col gap-2 overflow-y-auto h-full'>
        <div className='bg-white p-4 rounded-lg'>
          {!metricStrategy && (
            <Button
              color='default'
              variant='dashed'
              className='w-full'
              onClick={handleMetricStrategyModalOpen}
              icon={<PlusOutlined />}
            >
              关联数据源
            </Button>
          )}
          {metricStrategy && (
            <Descriptions
              title={<div className='text-lg font-bold flex '>关联数据源</div>}
              bordered
              column={1}
              items={metricDescription}
              extra={<Button onClick={handleMetricStrategyModalOpen} type='link' icon={<EditOutlined />}></Button>}
              size='small'
              labelStyle={{
                width: '10rem'
              }}
            />
          )}
        </div>
        {strategyMetricId && (
          <>
            <div className='bg-white p-4 flex gap-2 justify-between rounded-lg'>
              <Button color='default' variant='dashed' onClick={handleMetricLevelModalOpen} icon={<PlusOutlined />}>
                添加告警等级
              </Button>
              <Button
                danger
                style={{
                  display: !selectedMetricLevelIds || selectedMetricLevelIds.length === 0 ? 'none' : 'block'
                }}
                onClick={handleBatchDeleteMetricLevel}
                loading={deleteMetricLevelLoading}
                icon={<DeleteOutlined />}
                disabled={deleteMetricLevelLoading}
              >
                批量删除
              </Button>
            </div>
            <AutoTable
              dataSource={metricLevels}
              columns={getMetricLevelColumns}
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys) => {
                  setSelectedMetricLevelIds(selectedRowKeys as number[])
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
          </>
        )}
      </div>
    </div>
  )
}
