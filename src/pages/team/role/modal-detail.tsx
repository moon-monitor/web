import { GlobalStatusData } from '@/api/global'
import { getTeamRole } from '@/api/request/team'
import type { TeamRoleItem } from '@/api/request/types'
import { useRequest } from 'ahooks'
import { Avatar, Badge, Descriptions, DescriptionsProps, Modal, ModalProps, Tag } from 'antd'
import { useEffect, useState } from 'react'

export interface RoleDetailModalProps extends ModalProps {
    roleId?: number
    onCancel?: () => void
    onOk?: () => void
}

export function RoleDetailModal(props: RoleDetailModalProps) {
    const { roleId, open, onCancel, onOk } = props

    const [detail, setDetail] = useState<TeamRoleItem | null>(null)

    const { run: initRoleDetail, loading: initRoleDetailLoading } = useRequest(getTeamRole, {
        manual: true,
        onSuccess: (res) => {
            setDetail(res)
        }
    })

    const renderRoleStatus = (status?: number) => {
        const data = status != null ? GlobalStatusData[status as keyof typeof GlobalStatusData] : undefined
        return data ? <Badge color={data.color} text={data.label} /> : '--'
    }

    const renderMembers = (members?: TeamRoleItem['members']) => {
        if (!members || members.length === 0) {
            return '--'
        }
        return (
            <Avatar.Group size='small'>
                {members.slice(0, 5).map((member) => (
                    <Avatar src={member?.user?.avatar} key={member.teamMemberId}>
                        {member?.user?.nickname || member?.user?.username}
                    </Avatar>
                ))}
                {members.length > 5 && <Avatar>+{members.length - 5}</Avatar>}
            </Avatar.Group>
        )
    }

    const renderMenus = (menus?: TeamRoleItem['menus']) => {
        if (!menus || menus.length === 0) {
            return '--'
        }
        return (
            <div>
                {menus.slice(0, 3).map((menu) => (
                    <Tag key={menu.menuId} color='blue'>
                        {menu.name}
                    </Tag>
                ))}
                {menus.length > 3 && <Tag color='default'>+{menus.length - 3}</Tag>}
            </div>
        )
    }

    const items: DescriptionsProps['items'] = [
        {
            label: '角色名称',
            children: detail?.name || '--',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '角色状态',
            children: renderRoleStatus(detail?.status),
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '角色描述',
            children: detail?.remark || '--',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '关联成员',
            children: renderMembers(detail?.members),
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '权限菜单',
            children: renderMenus(detail?.menus),
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '创建时间',
            children: detail?.createdAt || '--',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '更新时间',
            children: detail?.updatedAt || '--',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '创建者',
            children: detail?.creator ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar src={detail.creator.avatar} size='small'>
                        {detail.creator.nickname || detail.creator.username}
                    </Avatar>
                    {detail.creator.nickname || detail.creator.username}
                </div>
            ) : '--',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        }
    ]

    useEffect(() => {
        if (roleId && open) {
            initRoleDetail({ roleId })
        }
    }, [open, roleId, initRoleDetail])

    return (
        <Modal
            {...props}
            title='角色详情'
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            footer={null}
            width={800}
            loading={initRoleDetailLoading}
        >
            <Descriptions bordered items={items} column={2} />
        </Modal>
    )
}
