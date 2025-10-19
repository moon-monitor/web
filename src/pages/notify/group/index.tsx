import { ActionKey, GlobalStatus } from '@/api/global'
import { deleteTeamNoticeGroup, listTeamNoticeGroup, updateTeamNoticeGroupStatus } from '@/api/request/teamnotice'
import { ListTeamNoticeGroupRequest, NoticeGroupItem } from '@/api/request/types'
import SearchBox from '@/components/data/search-box'
import AutoTable from '@/components/table'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Modal, Space, message, theme } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { GroupEditModal } from './modal-edit'
import { formList, getColumnList } from './options'

export interface NotifyGroupPageProps { }

const { useToken } = theme
const { confirm } = Modal

export default function NotifyGroupPage() {
    const { token } = useToken()
    const { isFullscreen } = useContext(GlobalContext)

    const [dataSource, setDataSource] = useState<NoticeGroupItem[]>([])
    const [total, setTotal] = useState(0)
    const [searchParams, setSearchParams] = useState<ListTeamNoticeGroupRequest>({
        keyword: '',
        status: undefined,
        pagination: {
            page: 1,
            pageSize: 10
        }
    })
    const [refresh, setRefresh] = useState<boolean>(true)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [editingGroup, setEditingGroup] = useState<NoticeGroupItem | undefined>(undefined)

    const searchRef = useRef<HTMLDivElement>(null)
    const tableWrapRef = useRef<HTMLDivElement>(null)
    const autoTableHeight = useContainerHeightTop(tableWrapRef, dataSource, isFullscreen)

    const onSearch = (values: ListTeamNoticeGroupRequest) => {
        setSearchParams({
            ...searchParams,
            ...values
        })
    }

    const onReset = () => { }

    const onRefresh = () => setRefresh(!refresh)

    const handleTurnPage = (page: number, pageSize: number) => {
        setSearchParams({
            ...searchParams,
            pagination: {
                page,
                pageSize
            }
        })
    }

    const { run: getGroupList, loading } = useRequest(
        (params: ListTeamNoticeGroupRequest) => listTeamNoticeGroup(params),
        {
            manual: true,
            onSuccess: (res) => {
                setDataSource(res?.items || [])
                setTotal(res?.pagination?.total || 0)
            }
        }
    )

    const { run: removeGroup } = useRequest(deleteTeamNoticeGroup, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功')
            onRefresh()
        }
    })

    const { run: changeGroupStatus } = useRequest(updateTeamNoticeGroupStatus, {
        manual: true,
        onSuccess: () => {
            message.success('操作成功')
            onRefresh()
        }
    })

    const openEditModal = (group?: NoticeGroupItem) => {
        setEditingGroup(group)
        setShowEditModal(true)
    }

    const closeEditModal = () => {
        setShowEditModal(false)
    }

    const onEditOk = () => {
        setShowEditModal(false)
        onRefresh()
    }

    const onDelete = (groupId: number) => {
        removeGroup({ groupId })
    }

    const onChangeStatus = (groupId: number, status: GlobalStatus) => {
        changeGroupStatus({ groupId, status })
    }

    const onHandleMenuOnClick = (item: NoticeGroupItem, key: ActionKey) => {
        switch (key) {
            case ActionKey.EDIT:
                openEditModal(item)
                break
            case ActionKey.DELETE:
                confirm({
                    title: '请确认是否删除该告警组?',
                    icon: <ExclamationCircleFilled />,
                    content: '此操作不可逆',
                    onOk: () => onDelete(item.noticeGroupId || 0)
                })
                break
            case ActionKey.DISABLE:
                onChangeStatus(item.noticeGroupId || 0, GlobalStatus.GLOBAL_STATUS_DISABLE)
                break
            case ActionKey.ENABLE:
                onChangeStatus(item.noticeGroupId || 0, GlobalStatus.GLOBAL_STATUS_ENABLE)
                break
            default:
                break
        }
    }

    const columns = getColumnList({
        onHandleMenuOnClick,
        current: searchParams.pagination?.page || 1,
        pageSize: searchParams.pagination?.pageSize || 10
    })

    useEffect(() => {
        getGroupList(searchParams)
    }, [searchParams, refresh, getGroupList])

    return (
        <>
            <GroupEditModal
                open={showEditModal}
                groupId={editingGroup?.noticeGroupId}
                onCancel={closeEditModal}
                onOk={onEditOk}
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
                        <div className='text-lg font-bold'>告警组</div>
                        <Space size={8}>
                            <Button type='primary' onClick={() => openEditModal()}>添加</Button>
                            <Button color='default' variant='filled' onClick={onRefresh} loading={loading}>刷新</Button>
                        </Space>
                    </div>
                    <div className='mt-4' ref={tableWrapRef}>
                        <AutoTable
                            rowKey={(record) => `${record.noticeGroupId}`}
                            dataSource={dataSource}
                            total={total}
                            loading={loading}
                            columns={columns}
                            handleTurnPage={handleTurnPage}
                            pageSize={searchParams.pagination?.pageSize}
                            pageNum={searchParams.pagination?.page}
                            showSizeChanger={true}
                            style={{
                                background: token.colorBgContainer,
                                borderRadius: token.borderRadius
                            }}
                            scroll={{
                                y: `calc(100vh - 170px  - ${autoTableHeight}px)`,
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

