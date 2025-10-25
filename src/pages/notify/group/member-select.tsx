import { NotifyType, Status } from '@/api/enum'
import { getTeamMembers } from '@/api/request/team'
import type { TeamMemberItem, UserItem } from '@/api/request/types'
import { SaveTeamNoticeGroupRequest_Member } from '@/api/request/types'
import { useRequest } from 'ahooks'
import { Avatar, Checkbox, Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type React from 'react'
import { useEffect, useState } from 'react'

// 定义本地使用的 NoticeItem 类型
export interface NoticeItem {
  member: TeamMemberItem
  notifyType: number
}

export interface MemberSelectProps {
  value?: SaveTeamNoticeGroupRequest_Member[]
  onChange?: (value: SaveTeamNoticeGroupRequest_Member[]) => void
}

export interface UserAvatarProps extends UserItem { }

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { userId, username, nickname, avatar } = props

  return (
    <Space direction='horizontal' key={userId}>
      <Avatar src={avatar} size='small' />
      {`${username}(${nickname})`}
    </Space>
  )
}

export const MemberSelect: React.FC<MemberSelectProps> = (props) => {
  const { value, onChange } = props

  const [memberList, setMemberList] = useState<TeamMemberItem[]>([])
  const [selectedMembers, setSelectedMembers] = useState<NoticeItem[]>([])

  const { run: initMemberList, loading: initMemberListLoading } = useRequest(getTeamMembers, {
    manual: true,
    onSuccess: (data) => {
      setMemberList(data.items || [])
    }
  })

  useEffect(() => {
    initMemberList({
      pagination: { page: 1, pageSize: 999 },
      status: [Status.StatusEnable]
    })
  }, [initMemberList])

  // 将外部传入的 SaveTeamNoticeGroupRequestMember[] 转换为内部使用的 NoticeItem[]
  useEffect(() => {
    if (value && memberList.length > 0) {
      const noticeItems: NoticeItem[] = value.map(item => {
        const member = memberList.find(m => m.teamMemberId === item.memberId)
        return {
          member: member!,
          notifyType: item.noticeType || NotifyType.NOTIFY_UNKNOWN
        }
      }).filter(item => item.member)
      setSelectedMembers(noticeItems)
    } else {
      setSelectedMembers([])
    }
  }, [value, memberList])

  const noticeMemberColumns: ColumnsType<NoticeItem> = [
    {
      dataIndex: 'user',
      title: '成员名称',
      width: '40%',
      render(_, record) {
        const { member } = record
        if (!member) return '-'
        const { user } = member
        return <UserAvatar {...user} />
      }
    },
    {
      dataIndex: 'notifyType',
      title: '通知方式',
      width: '60%',
      render(_, record) {
        const { notifyType } = record
        const checkedList: NotifyType[] = []
        if (notifyType & NotifyType.NOTIFY_PHONE) {
          checkedList.push(NotifyType.NOTIFY_PHONE)
        }
        if (notifyType & NotifyType.NOTIFY_EMAIL) {
          checkedList.push(NotifyType.NOTIFY_EMAIL)
        }
        if (notifyType & NotifyType.NOTIFY_SMS) {
          checkedList.push(NotifyType.NOTIFY_SMS)
        }
        return (
          <Checkbox.Group
            options={[
              { label: '手机', value: NotifyType.NOTIFY_PHONE, disabled: true },
              { label: '邮件', value: NotifyType.NOTIFY_EMAIL },
              { label: '短信', value: NotifyType.NOTIFY_SMS, disabled: true }
            ]}
            value={checkedList}
            onChange={(checkedList) => {
              const newNotifyType = checkedList.reduce((prev, curr) => prev | curr, 0)
              const updatedMembers = selectedMembers.map(item =>
                item.member.teamMemberId === record.member.teamMemberId
                  ? { ...item, notifyType: newNotifyType }
                  : item
              )
              setSelectedMembers(updatedMembers)

              // 转换为 SaveTeamNoticeGroupRequestMember[] 格式
              const saveFormat = updatedMembers.map(item => ({
                memberId: item.member.teamMemberId,
                noticeType: item.notifyType
              }))
              onChange?.(saveFormat)
            }}
          />
        )
      }
    }
  ]

  return (
    <div>
      <Select
        loading={initMemberListLoading}
        placeholder='请选择成员'
        mode='multiple'
        options={memberList.map((item) => ({
          label: <UserAvatar {...item?.user} />,
          value: item.teamMemberId
        }))}
        value={selectedMembers.map((item) => item.member.teamMemberId)}
        onChange={(memberIds) => {
          const items = memberList.filter((item) => memberIds.includes(item.teamMemberId))
          if (items.length === 0) {
            setSelectedMembers([])
            onChange?.([])
            return
          }

          // 创建新的 NoticeItem 数组
          const newSelectedMembers: NoticeItem[] = items.map(item => ({
            member: item,
            notifyType: NotifyType.NOTIFY_UNKNOWN
          }))
          setSelectedMembers(newSelectedMembers)

          // 转换为 SaveTeamNoticeGroupRequestMember[] 格式
          const saveFormat = newSelectedMembers.map(item => ({
            memberId: item.member.teamMemberId,
            noticeType: item.notifyType
          }))
          onChange?.(saveFormat)
        }}
        allowClear
      />
      <Table
        rowKey={(row) => row.member?.teamMemberId || 0}
        pagination={false}
        columns={noticeMemberColumns}
        dataSource={selectedMembers}
      />
    </div>
  )
}
