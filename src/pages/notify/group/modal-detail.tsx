import { getTeamNoticeGroup } from '@/api/request/teamnotice'
import { NoticeGroupItem } from '@/api/request/types'
import { useRequest } from 'ahooks'
import { Descriptions, DescriptionsProps, Modal, type ModalProps } from 'antd'
import type React from 'react'
import { useEffect, useState } from 'react'
import { HookAvatar } from './options'

export interface GroupDetailModalProps extends ModalProps {
    groupId?: number
}

export const GroupDetailModal: React.FC<GroupDetailModalProps> = (props) => {
    const { groupId, onCancel, open, ...restProps } = props
    const [detail, setDetail] = useState<NoticeGroupItem>()

    const { run: getDetail, loading } = useRequest((id: number) => getTeamNoticeGroup({ groupId: id }), {
        manual: true,
        onSuccess: (data) => {
            setDetail(data)
        }
    })

    useEffect(() => {
        if (groupId && open) {
            getDetail(groupId)
        }
    }, [groupId, open, getDetail])

    const items: DescriptionsProps['items'] = [
        {
            label: '名称',
            children: detail?.name,
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '描述',
            children: detail?.remark || '-',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: 'Hook列表',
            children: detail?.hooks?.map((item, index) => (
                <HookAvatar key={index} {...item} />
            )),
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '创建时间',
            children: detail?.createdAt,
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        },
        {
            label: '更新时间',
            children: detail?.updatedAt,
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
        }
    ]

    return (
        <Modal
            {...restProps}
            open={open}
            onCancel={onCancel}
            title='告警组详情'
            footer={null}
            width='60%'
            loading={loading}
        >
            <Descriptions bordered items={items} />
        </Modal>
    )
}

