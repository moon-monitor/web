import { TeamStrategyItem } from '@/api/common.types'
import { ActionKey, GlobalStatus } from '@/api/enum'
import { deleteTeamStrategy, listTeamStrategy, updateTeamStrategiesStatus } from '@/api/team/team-strategy'
import { ListTeamStrategyRequest } from '@/api/team/team-strategy.types'
import SearchBox from '@/components/data/search-box'
import AutoTable from '@/components/table/index'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Modal, Space, message, theme } from 'antd'
import { debounce } from 'lodash'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BasicModal } from './components/basic'
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
  const navigate = useNavigate()
  const { token } = useToken()
  const { isFullscreen } = useContext(GlobalContext)
  const { selectedGroups } = props

  const [datasource, setDatasource] = useState<TeamStrategyItem[]>([])
  const [searchParams, setSearchParams] = useState<ListTeamStrategyRequest>(defaultSearchParams)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [total, setTotal] = useState(0)

  const [openSubscribeModal, setOpenSubscribeModal] = useState(false)
  const [openSubscriberModal, setOpenSubscriberModal] = useState(false)

  const [detail, setDetail] = useState<TeamStrategyItem>()

  const [openBasicModal, setOpenBasicModal] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const ADivRef = useRef<HTMLDivElement>(null)
  const AutoTableHeight = useContainerHeightTop(ADivRef, datasource, isFullscreen)

  const { run: updateStrategyStatus } = useRequest(updateTeamStrategiesStatus, {
    manual: true,
    onSuccess: () => {
      message.success('更改状态成功')
      onRefresh()
    }
  })

  const { run: deleteStrategy } = useRequest(deleteTeamStrategy, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      onRefresh()
    }
  })

  const handleOpenSubscribeModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenSubscribeModal(true)
  }

  const handleOpenSubscriberModal = (item?: TeamStrategyItem) => {
    setDetail(item)
    setOpenSubscriberModal(true)
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
  }

  const onRefresh = () => {
    setRefresh(!refresh)
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

  const onHandleMenuOnClick = (item: TeamStrategyItem, key: ActionKey) => {
    switch (key) {
      case ActionKey.ENABLE:
        updateStrategyStatus({
          strategyIds: [item.strategyId],
          status: GlobalStatus.GLOBAL_STATUS_ENABLE
        })
        break
      case ActionKey.DISABLE:
        updateStrategyStatus({
          strategyIds: [item.strategyId],
          status: GlobalStatus.GLOBAL_STATUS_DISABLE
        })
        break
      case ActionKey.OPERATION_LOG:
        break
      case ActionKey.DETAIL:
        handleDetailModal(item)
        break
      case ActionKey.EDIT:
        handleOpenBasicModal()
        setDetail(item)
        break
      case ActionKey.CHART:
        break
      case ActionKey.IMMEDIATELY_PUSH:
        // pushStrategy(item.groupId)
        //   .then(() => message.success('推送成功'))
        //   .catch(() => message.error('推送失败'))
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
            deleteStrategy({ strategyId: item.strategyId })
          },
          onCancel() {
            message.info('取消操作')
          }
        })
        break
      case ActionKey.ASSOCIATED_DATA:
        navigate(`/home/strategy/list/${item.strategyId}`, {
          state: {
            detail: item
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

  const handleCloseBasicModal = () => {
    setOpenBasicModal(false)
    setDetail(undefined)
  }

  const handleBasicOk = () => {
    setOpenBasicModal(false)
    setDetail(undefined)
    onRefresh()
  }

  const handleOpenBasicModal = () => {
    setOpenBasicModal(true)
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
      <BasicModal
        title={detail?.strategyId ? '编辑策略' : '添加策略'}
        width='60%'
        open={openBasicModal}
        onClose={handleCloseBasicModal}
        onOk={handleBasicOk}
        strategyDetail={detail}
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
            <Button type='primary' onClick={handleOpenBasicModal}>
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
