import { TeamItem } from '@/api/common.types'
import { selfTeamList } from '@/api/request/user'
import { useCreateTeamModal } from '@/hooks/create-team'
import { GlobalContext } from '@/utils/context'
import { DownOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Avatar, Button, Col, Dropdown, notification, Row, Space } from 'antd'
import React, { useContext, useEffect } from 'react'

function getTeamInfo() {
  const teamInfo = localStorage.getItem('teamInfo')
  if (teamInfo) {
    return JSON.parse(teamInfo)
  }
  return {}
}

export const TeamMenu: React.FC = () => {
  const createTeamContext = useCreateTeamModal()
  const { teamInfo, setTeamInfo, removeTeamInfo, refreshMyTeamList } = useContext(GlobalContext)
  const [teamList, setTeamList] = React.useState<TeamItem[]>([])

  const { run: initTeamList } = useRequest(selfTeamList, {
    manual: true,
    onSuccess: ({ items: list }) => {
      setTeamList(list || [])
      if (!list?.length) {
        notification.warning({
          message: '当前没有团队信息, 部分功能无法使用，你需要创建团队或者加入团队',
          placement: 'bottomRight',
          duration: 5
        })
        removeTeamInfo?.()
        return
      }
      const localTeamInfo = getTeamInfo()
      const exist = list.some((item) => {
        if (item.teamId === localTeamInfo?.teamId) {
          setTeamInfo?.({ ...item })
          return true
        }
      })
      if (!exist) {
        setTeamInfo?.(list?.[0])
      }
    }
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!createTeamContext.open) {
      initTeamList()
    }
  }, [createTeamContext.open, initTeamList, refreshMyTeamList])

  if (!teamList?.length) {
    return (
      <Button color='primary' variant='filled' onClick={() => createTeamContext.setOpen?.(true)}>
        创建团队
      </Button>
    )
  }

  return (
    <Dropdown
      menu={{
        items: teamList?.map((item) => {
          return {
            key: item.teamId,
            label: (
              <Row gutter={12} className='text-center flex items-center min-w-[200px]'>
                <Col>
                  <Avatar src={item?.logo} shape='square'>
                    {item?.name?.at(0)?.toUpperCase()}
                  </Avatar>
                </Col>
                <Col>{item?.name}</Col>
              </Row>
            ),
            onClick: () => {
              setTeamInfo?.(item)
              window.location.reload()
            }
          }
        })
      }}
      placement='bottom'
    >
      <Space>
        {!!teamInfo && (
          <Row gutter={12} className='text-center flex items-center'>
            <Col>
              <Avatar src={teamInfo?.logo || null} shape='square'>
                {teamInfo?.name?.at(0)?.toUpperCase()}
              </Avatar>
            </Col>
            <Col>{teamInfo?.name}</Col>
          </Row>
        )}
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}
