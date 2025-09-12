import { NoticeHookItem } from '@/api/common.types'
import { ActionKey, GlobalStatus } from '@/api/enum'
import { deleteTeamNoticeHook, listTeamNoticeHook, updateTeamNoticeHookStatus } from '@/api/request/teamnotice'
import { ListTeamNoticeHookRequest } from '@/api/request/types'
import SearchBox from '@/components/data/search-box'
import AutoTable from '@/components/table'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, message, Modal, Space, theme } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { HookDetailModal } from './modal-detail'
import { EditHookModal } from './modal-edit'
import { formList, getColumnList } from './options'

export interface HookProps { }

const { useToken } = theme
const { confirm } = Modal

const Hook: React.FC<HookProps> = () => {
  const { token } = useToken()
  const { isFullscreen } = useContext(GlobalContext)

  const [datasource, setDatasource] = useState<NoticeHookItem[]>([])
  const [total, setTotal] = useState(0)
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    pagination: {
      page: 1,
      pageSize: 10
    }
  })
  const [refresh, setRefresh] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [hookDetail, setHookDetail] = useState<NoticeHookItem>()
  const [openDetailModal, setOpenDetailModal] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const ADivRef = useRef<HTMLDivElement>(null)
  const AutoTableHeight = useContainerHeightTop(ADivRef, datasource, isFullscreen)

  const onOpenDetailModal = (item: NoticeHookItem) => {
    setHookDetail(item)
    setOpenDetailModal(true)
  }

  const onCloseDetailModal = () => {
    setOpenDetailModal(false)
    setHookDetail(undefined)
  }

  const onSearch = (values: ListTeamNoticeHookRequest) => {
    setSearchParams({
      ...searchParams,
      ...values
    })
  }

  const { run: handleGetHookList, loading } = useRequest(
    (params: ListTeamNoticeHookRequest) => listTeamNoticeHook(params),
    {
      manual: true,
      onSuccess: (res) => {
        setDatasource(res?.items || [])
        setTotal(res?.pagination?.total || 0)
      }
    }
  )

  const { run: deleteHook } = useRequest(deleteTeamNoticeHook, {
    manual: true,
    onSuccess: (res) => {
      message.success(res?.message)
      onRefresh()
    }
  })
  const { run: updateHookStatus } = useRequest(updateTeamNoticeHookStatus, {
    manual: true,
    onSuccess: () => {
      message.success('操作成功')
      onRefresh()
    }
  })

  const onReset = () => { }

  const handleEditModal = (detail?: NoticeHookItem) => {
    setShowModal(true)
    setHookDetail(detail)
  }

  const onRefresh = () => {
    setRefresh(!refresh)
  }

  const handleDelete = (id: number) => {
    deleteHook({ hookId: id })
  }

  const onChangeStatus = (hookId: number, status: GlobalStatus) => {
    updateHookStatus({ hookId, status })
  }

  const onHandleMenuOnClick = (item: NoticeHookItem, key: ActionKey) => {
    switch (key) {
      case ActionKey.EDIT:
        handleEditModal(item)
        break
      case ActionKey.DELETE:
        confirm({
          title: '请确认是否删除该告警Hook?',
          icon: <ExclamationCircleFilled />,
          content: '此操作不可逆',
          onOk() {
            handleDelete(item.noticeHookId)
          },
          onCancel() {
            message.info('取消操作')
          }
        })
        break
      case ActionKey.DETAIL:
        onOpenDetailModal(item)
        break
      case ActionKey.DISABLE:
        onChangeStatus(item.noticeHookId, GlobalStatus.GLOBAL_STATUS_DISABLE)
        break
      case ActionKey.ENABLE:
        onChangeStatus(item.noticeHookId, GlobalStatus.GLOBAL_STATUS_ENABLE)
        break
      default:
        break
    }
  }

  const handleTurnPage = (page: number, pageSize: number) => {
    setSearchParams({
      ...searchParams,
      pagination: {
        page,
        pageSize
      }
    })
  }

  const closeEditHookModal = () => {
    setShowModal(false)
  }

  const handleEditHookModalOnOk = () => {
    setShowModal(false)
    onRefresh()
  }

  const columns = getColumnList({
    onHandleMenuOnClick,
    current: searchParams.pagination.page,
    pageSize: searchParams.pagination.pageSize
  })

  useEffect(() => {
    handleGetHookList(searchParams)
  }, [searchParams, refresh, handleGetHookList])

  return (
    <>
      <EditHookModal
        open={showModal}
        hookId={hookDetail?.noticeHookId}
        onCancel={closeEditHookModal}
        onOk={handleEditHookModalOnOk}
      />
      <HookDetailModal
        hookId={hookDetail?.noticeHookId || 0}
        open={openDetailModal}
        onCancel={onCloseDetailModal}
        onOk={onCloseDetailModal}
      />
      <div className='flex flex-col gap-3 p-3'>
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
            <div className='text-lg font-bold'>告警Hook</div>
            <Space size={8}>
              <Button type='primary' onClick={() => handleEditModal()}>
                添加
              </Button>
              <Button disabled>批量导入</Button>
              <Button color='default' variant='filled' onClick={onRefresh} loading={loading}>
                刷新
              </Button>
            </Space>
          </div>
          <div className='mt-4' ref={ADivRef}>
            <AutoTable
              rowKey={(record) => record.id}
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
                y: `calc(100vh - 170px  - ${AutoTableHeight}px)`,
                x: 1000
              }}
              size='middle'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hook
