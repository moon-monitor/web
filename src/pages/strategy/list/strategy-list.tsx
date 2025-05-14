/* eslint-disable prettier/prettier */
import { Status } from '@/api/enum'
import { ActionKey } from '@/api/global'
import { deleteStrategy, pushStrategy, updateStrategyStatus } from '@/api/strategy'
import { StrategyTypeKey, TeamStrategyItem } from '@/api2/common.types'
import { StrategyType } from '@/api2/enum'
import { listTeamStrategy } from '@/api2/team/team-strategy'
import { ListTeamStrategyRequest } from '@/api2/team/types'
import SearchBox from '@/components/data/search-box'
import AutoTable from '@/components/table/index'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal, Space, message, theme } from 'antd'
import { debounce } from 'lodash'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import MetricEditModal from './components/edit-modal-metric'
import StrategyTypeModal from './components/edit-modal-strategy-type'
import { ModalSubscribe } from './modal-subscribe'
import ModalSubscriber from './modal-subscriber'
import { formList, getColumnList } from './options'

const { confirm } = Modal
const { useToken } = theme

const defaultSearchParams: ListTeamStrategyRequest = {
  pagination: {
    page: 1,
    pageSize: 50
  }
}
interface StrategyListProps {
  selectedGroups: number[]
}

const StrategyList = (props: StrategyListProps) => {
  const { token } = useToken()
  const { isFullscreen } = useContext(GlobalContext)
  const { selectedGroups } = props

  const [datasource, setDatasource] = useState<TeamStrategyItem[]>([])
  const [searchParams, setSearchParams] = useState<ListTeamStrategyRequest>(defaultSearchParams)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [total, setTotal] = useState(0)
  const [openMetricEditModal, setOpenMetricEditModal] = useState(false)
  const [openEventEditModal, setOpenEventEditModal] = useState(false)
  const [openDomainEditModal, setOpenDomainEditModal] = useState(false)
  const [openPortEditModal, setOpenPortEditModal] = useState(false)
  const [openHttpEditModal, setOpenHttpEditModal] = useState(false)
  const [openLogEditModal, setOpenLogEditModal] = useState(false)

  const [openMetricDetailModal, setOpenMetricDetailModal] = useState(false)
  const [openEventDetailModal, setOpenEventDetailModal] = useState(false)
  const [openDomainDetailModal, setOpenDomainDetailModal] = useState(false)
  const [openPortDetailModal, setOpenPortDetailModal] = useState(false)
  const [openHttpDetailModal, setOpenHttpDetailModal] = useState(false)
  const [openLogDetailModal, setOpenLogDetailModal] = useState(false)

  const [openSubscribeModal, setOpenSubscribeModal] = useState(false)
  const [openSubscriberModal, setOpenSubscriberModal] = useState(false)

  const [detail, setDetail] = useState<TeamStrategyItem>()

  const [openChartModal, setOpenChartModal] = useState(false)
  const [openStrategyTypeModal, setOpenStrategyTypeModal] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const ADivRef = useRef<HTMLDivElement>(null)
  const AutoTableHeight = useContainerHeightTop(ADivRef, datasource, isFullscreen)

  const handleOpenMetricEditModal = (item?: TeamStrategyItem) => {
    console.log('handleOpenMetricEditModal', item)
    setDetail(item)
    setOpenMetricEditModal(true)
  }

  const handleOpenEventEditModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenEventEditModal(true)
  }

  const handleOpenDomainEditModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenDomainEditModal(true)
  }

  const handleOpenPortEditModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenPortEditModal(true)
  }

  const handleOpenHttpEditModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenHttpEditModal(true)
  }

  const handleOpenLogEditModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenLogEditModal(true)
  }

  const handleOpenSubscribeModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenSubscribeModal(true)
  }

  const handleOpenSubscriberModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenSubscriberModal(true)
  }

  const handleMetricEditOk = () => {
    setOpenMetricEditModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handleDomainEditOk = () => {
    setOpenDomainEditModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handlePortEditOk = () => {
    setOpenPortEditModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handleEventEditOk = () => {
    setOpenEventEditModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handleHttpEditOk = () => {
    setOpenHttpEditModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handleLogEditOk = () => {
    setOpenLogEditModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handleSubscribeOk = () => {
    setOpenSubscribeModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handleCloseSubscribeModal = () => {
    setOpenSubscribeModal(false)
    setDetail(undefined)
  }

  const handleCloseSubscriberModal = () => {
    setOpenSubscriberModal(false)
    setDetail(undefined)
  }

  const handleDetailModal = (item: TeamStrategyItem) => {
    setDetail(item)
    switch (item.strategyType) {
      case 'STRATEGY_TYPE_METRIC':
        setOpenMetricDetailModal(true)
        break
      case 'STRATEGY_TYPE_EVENT':
        setOpenEventDetailModal(true)
        break
      case 'STRATEGY_TYPE_CERT':
        setOpenDomainDetailModal(true)
        break
      case 'STRATEGY_TYPE_PORT':
        setOpenPortDetailModal(true)
        break
      case 'STRATEGY_TYPE_HTTP':
        setOpenHttpDetailModal(true)
        break
      case 'STRATEGY_TYPE_LOGS':
        setOpenLogDetailModal(true)
        break
      default:
        setOpenMetricDetailModal(true)
        break
    }
  }

  const handleCloseDetailModal = () => {
    setDetail(undefined)
    setOpenMetricDetailModal(false)
    setOpenEventDetailModal(false)
    setOpenDomainDetailModal(false)
    setOpenPortDetailModal(false)
    setOpenHttpDetailModal(false)
    setOpenLogDetailModal(false)
  }

  const handleCloseMetricEditModal = () => {
    setOpenMetricEditModal(false)
    setDetail(undefined)
  }

  const handleCloseEventEditModal = () => {
    setOpenEventEditModal(false)
    setDetail(undefined)
  }

  const handleCloseDomainEditModal = () => {
    setOpenDomainEditModal(false)
    setDetail(undefined)
  }

  const handleClosePortEditModal = () => {
    setOpenPortEditModal(false)
    setDetail(undefined)
  }

  const handleCloseHttpEditModal = () => {
    setOpenHttpEditModal(false)
    setDetail(undefined)
  }

  const handleCloseLogEditModal = () => {
    setOpenLogEditModal(false)
    setDetail(undefined)
  }

  const onRefresh = () => {
    setRefresh(!refresh)
  }

  const handleOpenChartModal = (item: TeamStrategyItem) => {
    setOpenChartModal(true)
    setDetail(item)
  }

  const handleCloseChartModal = () => {
    setOpenChartModal(false)
    setDetail(undefined)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(
    debounce(async (params) => {
      setLoading(true)
      try {
        const { items, pagination } = await listTeamStrategy(params)
        setDatasource(items || [])
        setTotal(pagination?.total || 0)
      } finally {
        setLoading(false)
      }
    }, 500),
    []
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData(searchParams)
  }, [refresh, searchParams, fetchData])

  const onSearch = (formData: ListTeamStrategyRequest) => {
    setSearchParams({
      ...searchParams,
      ...formData,
      pagination: {
        page: 1,
        pageSize: searchParams?.pagination?.pageSize
      }
    })
  }

  // 切换分页
  const handleTurnPage = (page: number, pageSize: number) => {
    setSearchParams({
      ...searchParams,
      pagination: {
        page: page,
        pageSize: pageSize
      }
    })
  }

  // 重置
  const onReset = () => {
    setSearchParams(defaultSearchParams)
  }

  const handleOpenEditModal = (item: TeamStrategyItem) => {
    switch (item.strategyType) {
      case 'STRATEGY_TYPE_METRIC':
        handleOpenMetricEditModal(item)
        break
      case 'STRATEGY_TYPE_EVENT':
        handleOpenEventEditModal(item)
        break
      case 'STRATEGY_TYPE_CERT':
        handleOpenDomainEditModal(item)
        break
      case 'STRATEGY_TYPE_PORT':
        handleOpenPortEditModal(item)
        break
      case 'STRATEGY_TYPE_HTTP':
        handleOpenHttpEditModal(item)
        break
      case 'STRATEGY_TYPE_LOGS':
        handleOpenLogEditModal(item)
        break
      default:
        message.warning(`${StrategyType[item.strategyType]}未开通`)
        break
    }
  }

  const onHandleMenuOnClick = (item: TeamStrategyItem, key: ActionKey) => {
    switch (key) {
      case ActionKey.ENABLE:
        updateStrategyStatus({
          ids: [item.groupId],
          status: Status.StatusEnable
        }).then(() => {
          message.success('更改状态成功')
          onRefresh()
        })
        break
      case ActionKey.DISABLE:
        updateStrategyStatus({
          ids: [item.groupId],
          status: Status.StatusDisable
        }).then(() => {
          message.success('更改状态成功')
          onRefresh()
        })
        break
      case ActionKey.OPERATION_LOG:
        break
      case ActionKey.DETAIL:
        handleDetailModal(item)
        break
      case ActionKey.EDIT:
        handleOpenEditModal(item)
        break
      case ActionKey.CHART:
        handleOpenChartModal(item)
        break
      case ActionKey.IMMEDIATELY_PUSH:
        pushStrategy(item.groupId)
          .then(() => message.success('推送成功'))
          .catch(() => message.error('推送失败'))
        break
      case ActionKey.SUBSCRIBE:
        handleOpenSubscribeModal(item)
        break
      case ActionKey.SUBSCRIBER:
        handleOpenSubscriberModal(item)
        break
      case ActionKey.DELETE:
        confirm({
          title: '请确认是否删除该策略?',
          icon: <ExclamationCircleFilled />,
          content: '此操作不可逆',
          onOk() {
            deleteStrategy({ id: item.groupId }).then(() => {
              message.success('删除成功')
              onRefresh()
            })
          },
          onCancel() {
            message.info('取消操作')
          }
        })
        break
    }
  }

  const columns = getColumnList({
    onHandleMenuOnClick,
    current: searchParams.pagination.page,
    pageSize: searchParams.pagination.pageSize
  })

  const handleOpenStrategyTypeModal = () => {
    setOpenStrategyTypeModal(true)
  }

  const handleStrategyTypeSubmit = (type: StrategyTypeKey) => {
    setOpenStrategyTypeModal(false)
    switch (type) {
      case 'STRATEGY_TYPE_METRIC':
        handleOpenMetricEditModal()
        break
      case 'STRATEGY_TYPE_EVENT':
        handleOpenEventEditModal()
        break
      // case StrategyType.StrategyTypeDomainCertificate:
      //   handleOpenDomainEditModal()
      //   break
      case 'STRATEGY_TYPE_PORT':
        handleOpenPortEditModal()
        break
      case 'STRATEGY_TYPE_HTTP':
        handleOpenHttpEditModal()
        break
      case 'STRATEGY_TYPE_LOGS':
        handleOpenLogEditModal()
        break
      default:
        message.warning(`${StrategyType[type]}未开通`)
        break
    }
  }

  const handleStrategyTypeCancel = () => {
    setOpenStrategyTypeModal(false)
  }

  useEffect(() => {
    setSearchParams((s) => ({ ...s, groupIds: selectedGroups }))
  }, [selectedGroups])

  return (
    <div className='h-full flex flex-col p-3'>
      <ModalSubscriber
        title={`【${detail?.name}】策略订阅者`}
        width='60%'
        open={openSubscriberModal}
        onClose={handleCloseSubscriberModal}
        strategyId={detail?.groupId}
      />
      <ModalSubscribe
        title={`订阅【${detail?.name}】策略`}
        // width='60%'
        open={openSubscribeModal}
        item={detail}
        onOk={handleSubscribeOk}
        onCancel={handleCloseSubscribeModal}
      />
      <StrategyTypeModal
        width='780px'
        title='选择策略类型'
        open={openStrategyTypeModal}
        onSubmit={handleStrategyTypeSubmit}
        onCancel={handleStrategyTypeCancel}
      />
      <MetricEditModal
        title='指标策略编辑'
        width='60%'
        strategyDetail={detail}
        open={openMetricEditModal}
        onCancel={handleCloseMetricEditModal}
        onOk={handleMetricEditOk}
      />
      <div
        style={{
          background: token.colorBgContainer,
          borderRadius: token.borderRadius
        }}
      >
        <SearchBox ref={searchRef} formList={formList} onSearch={onSearch} onReset={onReset} />
      </div>
      <div
        className='p-3'
        style={{
          background: token.colorBgContainer,
          borderRadius: token.borderRadius
        }}
      >
        <div className='flex justify-between items-center'>
          <div className='font-bold text-lg'>策略列表</div>
          <Space size={8}>
            <Button type='primary' onClick={handleOpenStrategyTypeModal}>
              添加
            </Button>
            <Button color='default' variant='filled' onClick={onRefresh}>
              刷新
            </Button>
          </Space>
        </div>
        <div className='mt-3' ref={ADivRef}>
          <AutoTable
            rowKey={(record) => record.groupId}
            dataSource={datasource}
            total={total}
            loading={loading}
            columns={columns}
            handleTurnPage={handleTurnPage}
            pageSize={searchParams.pagination.pageSize}
            pageNum={searchParams.pagination.page}
            showSizeChanger={true}
            style={{
              background: token.colorBgContainer,
              borderRadius: token.borderRadius
            }}
            scroll={{
              y: `calc(100vh - 170px - ${AutoTableHeight}px)`,
              x: 1000
            }}
            size='middle'
          />
        </div>
      </div>
    </div>
  )
}

export default StrategyList
