import { TeamDictItem } from '@/api/common.types'
import { ActionKey, GlobalStatus } from '@/api/enum'
import { deleteTeamDict, listTeamDict, updateTeamDictStatus } from '@/api/request/teamdict'
import { ListTeamDictRequest } from '@/api/request/types'
import SearchBox from '@/components/data/search-box'
import AutoTable from '@/components/table/index'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Modal, Space, message, theme } from 'antd'
import type React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { GroupEditModal } from './edit-modal'
import { formList, getColumnList } from './options'

const { confirm } = Modal
const { useToken } = theme

const defaultSearchParams: ListTeamDictRequest = {
  pagination: {
    page: 1,
    pageSize: 10
  },
  keyword: '',
  status: GlobalStatus.GLOBAL_STATUS_UNKNOWN
  // teamId: ''
}

const Group: React.FC = () => {
  const { token } = useToken()
  const { isFullscreen } = useContext(GlobalContext)

  const [datasource, setDatasource] = useState<TeamDictItem[]>([])
  const [searchParams, setSearchParams] = useState<ListTeamDictRequest>(defaultSearchParams)
  const [refresh, setRefresh] = useState(false)
  const [total, setTotal] = useState(0)
  const [openGroupEditModal, setOpenGroupEditModal] = useState(false)
  const [editGroupId, setEditGroupId] = useState<number>()
  const [disabledEditGroupModal, setDisabledEditGroupModal] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const ADivRef = useRef<HTMLDivElement>(null)
  const AutoTableHeight = useContainerHeightTop(ADivRef, datasource, isFullscreen)

  const { run: initDictList, loading: initDictListLoading } = useRequest(listTeamDict, {
    manual: true,
    onSuccess: (data) => {
      setDatasource(data.items || [])
      setTotal(data.pagination?.total || 0)
    }
  })

  const { run: batchUpdateDictStatus } = useRequest(updateTeamDictStatus, {
    manual: true,
    onSuccess: () => {
      message.success('更改状态成功')
      onRefresh()
    }
  })

  const { run: deleteDict } = useRequest(deleteTeamDict, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      onRefresh()
    }
  })

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

  const onRefresh = () => {
    setRefresh(!refresh)
  }

  const handleGroupEditModalSubmit = () => {
    handleCloseGroupEditModal()
    onRefresh()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    initDictList(searchParams)
  }, [refresh, searchParams, initDictList])

  const onSearch = (formData: ListTeamDictRequest) => {
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
        page,
        pageSize
      }
    })
  }

  // 重置
  const onReset = () => {
    setSearchParams(defaultSearchParams)
  }

  const onHandleMenuOnClick = (item: TeamDictItem, key: ActionKey) => {
    switch (key) {
      case ActionKey.ENABLE:
        batchUpdateDictStatus({
          dictIds: [item.dictId],
          status: GlobalStatus.GLOBAL_STATUS_ENABLE
        })
        break
      case ActionKey.DISABLE:
        batchUpdateDictStatus({
          dictIds: [item.dictId],
          status: GlobalStatus.GLOBAL_STATUS_DISABLE
        })
        break
      case ActionKey.OPERATION_LOG:
        break
      case ActionKey.DETAIL:
        handleOpenDetailModal(item.dictId)
        break
      case ActionKey.EDIT:
        handleEditModal(item.dictId)
        break
      case ActionKey.DELETE:
        confirm({
          title: '请确认是否删除该字典?',
          icon: <ExclamationCircleFilled />,
          content: '此操作不可逆',
          onOk() {
            deleteDict({ dictId: item.dictId })
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

  return (
    <div className='p-3 gap-3 flex flex-col'>
      <GroupEditModal
        title={editGroupId ? (disabledEditGroupModal ? '字典详情' : '编辑字典') : '新建字典'}
        width='60%'
        style={{ minWidth: 504 }}
        open={openGroupEditModal}
        onCancel={handleCloseGroupEditModal}
        groupId={editGroupId}
        disabled={disabledEditGroupModal}
        onOk={handleGroupEditModalSubmit}
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
        <div className='flex justify-between'>
          <div className='text-lg font-bold'>字典列表</div>
          <Space size={8}>
            <Button type='primary' onClick={() => handleEditModal()}>
              添加
            </Button>
            <Button onClick={() => handleEditModal()}>批量导入</Button>
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
            loading={initDictListLoading}
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
