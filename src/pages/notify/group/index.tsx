import { NoticeGroupItem } from '@/api2/common.types'
import { ActionKey } from '@/api2/enum'
import { deleteTeamNoticeGroup, listTeamNoticeGroup, updateTeamNoticeGroupStatus } from '@/api2/team/team-notice'
import { ListTeamNoticeGroupRequest } from '@/api2/team/team-notice.types'
import SearchBox from '@/components/data/search-box'
import AutoTable from '@/components/table/index'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Modal, Space, message, theme } from 'antd'
import type React from 'react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { GroupEditModal } from './modal-edit'
import { formList, getColumnList } from './options'

const { confirm } = Modal
const { useToken } = theme

const defaultSearchParams: ListTeamNoticeGroupRequest = {
  pagination: {
    page: 1,
    pageSize: 10
  },
  keyword: '',
  status: 'GLOBAL_STATUS_ENABLE'
}

const Group: React.FC = () => {
  const { token } = useToken()
  const { isFullscreen } = useContext(GlobalContext)

  const [datasource, setDatasource] = useState<NoticeGroupItem[]>([])
  const [searchParams, setSearchParams] = useState<ListTeamNoticeGroupRequest>(defaultSearchParams)
  const [total, setTotal] = useState(0)
  const [openGroupEditModal, setOpenGroupEditModal] = useState(false)
  const [editGroupId, setEditGroupId] = useState<number>()
  const [disabledEditGroupModal, setDisabledEditGroupModal] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const ADivRef = useRef<HTMLDivElement>(null)
  const AutoTableHeight = useContainerHeightTop(ADivRef, datasource, isFullscreen)

  const handleCloseGroupEditModal = () => {
    setOpenGroupEditModal(false)
    setEditGroupId(0)
    setDisabledEditGroupModal(false)
  }

  const handleEditModal = (editId?: number) => {
    setEditGroupId(editId)
    setOpenGroupEditModal(true)
  }

  const handleOpenDetailModal = (groupId: number) => {
    setEditGroupId(groupId)
    setOpenGroupEditModal(true)
    setDisabledEditGroupModal(true)
  }

  const { run: fetchData, loading } = useRequest(listTeamNoticeGroup, {
    manual: true,
    onSuccess: (res) => {
      setDatasource(res.items || [])
      setTotal(res.pagination?.total || 0)
    }
  })

  const { run: updateAlarmGroupStatus } = useRequest(updateTeamNoticeGroupStatus, {
    manual: true,
    onSuccess: () => {
      message.success('更改状态成功')
      onRefresh()
    }
  })

  const { run: deleteAlarmGroup } = useRequest(deleteTeamNoticeGroup, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      onRefresh()
    }
  })

  const onRefresh = useCallback(() => {
    fetchData(searchParams)
  }, [fetchData, searchParams])

  useEffect(() => {
    fetchData(searchParams)
  }, [searchParams, fetchData])

  const onSearch = (formData: ListTeamNoticeGroupRequest) => {
    setSearchParams({
      ...searchParams,
      ...formData,
      pagination: {
        page: 1,
        pageSize: searchParams.pagination.pageSize
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

  const onHandleMenuOnClick = (item: NoticeGroupItem, key: ActionKey) => {
    switch (key) {
      case ActionKey.ENABLE:
        updateAlarmGroupStatus({
          groupId: item.noticeGroupId,
          status: 'GLOBAL_STATUS_ENABLE'
        })
        break
      case ActionKey.DISABLE:
        updateAlarmGroupStatus({
          groupId: item.noticeGroupId,
          status: 'GLOBAL_STATUS_DISABLE'
        })
        break
      case ActionKey.OPERATION_LOG:
        break
      case ActionKey.DETAIL:
        handleOpenDetailModal(item.noticeGroupId)
        break
      case ActionKey.EDIT:
        handleEditModal(item.noticeGroupId)
        break
      case ActionKey.DELETE:
        confirm({
          title: '请确认是否删除该告警组?',
          icon: <ExclamationCircleFilled />,
          content: '此操作不可逆',
          onOk() {
            deleteAlarmGroup({ groupId: item.noticeGroupId })
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

  const handleOnOK = () => {
    handleCloseGroupEditModal()
    onRefresh()
  }

  return (
    <div className='flex flex-col gap-3 p-3'>
      <GroupEditModal
        title={editGroupId ? (disabledEditGroupModal ? '告警组详情' : '编辑告警组') : '新建告警组'}
        width='60%'
        style={{ minWidth: 504 }}
        open={openGroupEditModal}
        onCancel={handleCloseGroupEditModal}
        groupId={editGroupId}
        disabled={disabledEditGroupModal}
        onOk={handleOnOK}
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
          <div className='text-lg font-bold'>告警组列表</div>
          <Space size={8}>
            <Button type='primary' onClick={() => handleEditModal()}>
              添加
            </Button>
            <Button color='default' variant='filled' onClick={onRefresh}>
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
              y: `calc(100vh - 174px  - ${AutoTableHeight}px)`,
              x: 1000
            }}
            size='middle'
          />
        </div>
      </div>
    </div>
  )
}

export default Group
