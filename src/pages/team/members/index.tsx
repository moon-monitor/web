import { TeamMemberItem } from '@/api2/common.types'
import { ActionKey, GlobalStatus } from '@/api2/enum'
import { getTeamMembers, removeMember, updateMemberStatus } from '@/api2/team'
import { GetTeamMembersRequest } from '@/api2/team/types'
import SearchBox from '@/components/data/search-box'
import AutoTable from '@/components/table/index'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Modal, Space, message, theme } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { DetailModal } from './modal-detail'
import { Invite } from './modal-invite'
import { formList, getColumnList } from './options'

const { confirm } = Modal
const { useToken } = theme

const defaultSearchParams: GetTeamMembersRequest = {
  pagination: {
    page: 1,
    pageSize: 10
  },
  keyword: '',
  status: []
}

export default function Index() {
  const { token } = useToken()

  const { userInfo, isFullscreen } = useContext(GlobalContext)
  const [datasource, setDatasource] = useState<TeamMemberItem[]>([])
  const [searchParams, setSearchParams] = useState<GetTeamMembersRequest>(defaultSearchParams)
  const [refresh, setRefresh] = useState(false)
  const [total, setTotal] = useState(0)
  const [detail, setDetail] = useState<TeamMemberItem>()
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openInviteModal, setOpenInviteModal] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const ADivRef = useRef<HTMLDivElement>(null)
  const AutoTableHeight = useContainerHeightTop(ADivRef, datasource, isFullscreen)

  const { run: featchMemberList, loading: featchMemberListLoading } = useRequest(getTeamMembers, {
    manual: true,
    onSuccess: (res) => {
      setDatasource(res.items || [])
      setTotal(res.pagination?.total || 0)
    }
  })
  const { run: batchUpdateTeamMembersStatus } = useRequest(updateMemberStatus, {
    manual: true,
    onSuccess: () => {
      message.success('更改状态成功')
      onRefresh()
    }
  })
  const { run: removeTeamMember } = useRequest(removeMember, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      onRefresh()
    }
  })

  const handleOpenDetailModal = (detail: TeamMemberItem) => {
    setDetail(detail)
    setOpenDetailModal(true)
  }

  const onRefresh = () => {
    setRefresh(!refresh)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    featchMemberList(searchParams)
  }, [refresh, searchParams, featchMemberList])

  const onSearch = (formData: GetTeamMembersRequest) => {
    setSearchParams({
      ...searchParams,
      ...formData,
      pagination: {
        page: 1,
        pageSize: formData.pagination?.pageSize || 10
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

  const onHandleMenuOnClick = (item: TeamMemberItem, key: ActionKey) => {
    switch (key) {
      case ActionKey.ENABLE:
        batchUpdateTeamMembersStatus({
          memberIds: [item.teamMemberId],
          status: GlobalStatus.GLOBAL_STATUS_ENABLE
        })
        break
      case ActionKey.DISABLE:
        batchUpdateTeamMembersStatus({
          memberIds: [item.teamMemberId],
          status: GlobalStatus.GLOBAL_STATUS_DISABLE
        })
        break
      case ActionKey.OPERATION_LOG:
        break
      case ActionKey.DETAIL:
        handleOpenDetailModal(item)
        break
      case ActionKey.DELETE:
        confirm({
          title: '请确认是否删除该团队成员?',
          icon: <ExclamationCircleFilled />,
          content: '此操作不可逆',
          onOk() {
            removeTeamMember({ memberId: item.teamMemberId })
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
    pageSize: searchParams.pagination.pageSize,
    userId: userInfo?.userId || 0
  })

  const onCloseDetailModal = () => {
    setOpenDetailModal(false)
  }

  const handleOpenInviteModal = () => {
    setOpenInviteModal(true)
  }

  return (
    <div className='p-3 gap-3 flex flex-col'>
      <DetailModal
        id={detail?.id || 0}
        open={openDetailModal}
        onCancel={onCloseDetailModal}
        onOk={onCloseDetailModal}
      />
      <Invite open={openInviteModal} setOpen={setOpenInviteModal} />
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
          <div className='text-lg font-bold'>团队成员列表</div>
          <Space size={8}>
            <Button type='primary' onClick={handleOpenInviteModal}>
              邀请
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
            loading={featchMemberListLoading}
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
              y: `calc(100vh - 174px - ${AutoTableHeight}px)`,
              x: 1000
            }}
            size='middle'
          />
        </div>
      </div>
    </div>
  )
}
