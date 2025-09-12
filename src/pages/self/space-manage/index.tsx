import { TeamItem } from '@/api/common.types'
import { TeamStatus } from '@/api/enum'
import { selfTeamList } from '@/api/request/user'
import { useCreateTeamModal } from '@/hooks/create-team'
import { GlobalContext } from '@/utils/context'
import { EditOutlined, PlusOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  type DescriptionsProps,
  Dropdown,
  Empty,
  type MenuProps,
  Row,
  Space,
  Spin,
  Switch,
  Typography
} from 'antd'
import React, { useContext, useEffect } from 'react'
import { EditSpaceModal } from './edit-space-modal'

export interface SpaceManageProps {
  children?: React.ReactNode
}

const SpaceManage: React.FC<SpaceManageProps> = () => {
  const { setRefreshMyTeamList, teamInfo } = useContext(GlobalContext)
  const { setOpen } = useCreateTeamModal()
  const [openEditModal, setOpenEditModal] = React.useState(false)
  const [operatorTeam, setOperatorTeam] = React.useState<TeamItem>()
  const [teamList, setTeamList] = React.useState<TeamItem[]>([])

  const { runAsync: initTeamList, loading: initTeamListLoading } = useRequest(selfTeamList, {
    manual: true,
    onSuccess: ({ items }) => {
      setTeamList(items)
    }
  })

  const handleEditTeam = (teamInfo: TeamItem) => {
    setOperatorTeam(teamInfo)
    setOpenEditModal(true)
  }

  const menuItems = (teamInfo: TeamItem): MenuProps['items'] => [
    {
      label: '编辑信息',
      key: '1',
      icon: <EditOutlined />,
      onClick: () => handleEditTeam(teamInfo)
    },
    {
      label: '转移团队',
      key: '2',
      icon: <UserSwitchOutlined />
    }
  ]

  const handleRefresh = () => {
    initTeamList()
  }

  const handleChangeStatus = (teamId: number, checked: boolean) => {

  }

  useEffect(() => {
    initTeamList()
  }, [initTeamList])

  const handleEditModalOnOK = () => {
    setOpenEditModal(false)
    setOperatorTeam(undefined)
    handleRefresh()
    setRefreshMyTeamList?.()
  }

  const handleOnCancel = () => {
    setOpenEditModal(false)
    setOperatorTeam(undefined)
  }

  return (
    <>
      <EditSpaceModal
        open={openEditModal}
        onCancel={handleOnCancel}
        onOk={handleEditModalOnOK}
        spaceId={operatorTeam?.teamId}
      />
      <div className='p-3 h-full flex flex-col gap-3'>
        <Row className='pb-3'>
          <Col span={16} className='flex gap-3'>
            <Button type='primary' onClick={() => setOpen?.(true)}>
              新建团队
              <PlusOutlined />
            </Button>
            <Button color='default' variant='filled' onClick={handleRefresh}>
              刷新
            </Button>
          </Col>
        </Row>
        <div className='flex justify-center items-center'>{!teamList?.length && <Empty />}</div>
        {initTeamListLoading ? (
          <Spin spinning={initTeamListLoading} className='h-[600px]'>
            <div className='h-[600px]' />
          </Spin>
        ) : (
          <Row gutter={[12, 12]} className='flex-1 overflow-auto'>
            {teamList?.map((item, index) => {
              const { name, logo, status, teamId, remark, leader, admins: admins, creator } = item
              const items: DescriptionsProps['items'] = [
                {
                  key: 'leader',
                  label: '负责人',
                  children: (
                    <Space direction='horizontal'>
                      <Avatar src={leader?.avatar} />
                      {`${leader?.username}(${leader?.nickname})`}
                    </Space>
                  ),
                  span: 4
                },
                {
                  key: 'creator',
                  label: '创建者',
                  children: creator ? (
                    <Space direction='horizontal'>
                      <Avatar src={creator?.avatar} />
                      {`${creator?.username}(${creator?.nickname})`}
                    </Space>
                  ) : (
                    '-'
                  ),
                  span: 4
                },
                {
                  key: '2',
                  label: '管理员',
                  children: (
                    <Avatar.Group size='small'>
                      {admins?.length
                        ? admins?.map((item) => (
                          <Avatar key={item?.userId} src={item?.avatar}>
                            {item?.nickname || item?.username}
                          </Avatar>
                        ))
                        : '-'}
                    </Avatar.Group>
                  ),
                  span: 4
                },
                {
                  key: '3',
                  label: '团队描述',
                  children: (
                    <Typography.Paragraph
                      ellipsis={{
                        rows: 2,
                        expandable: 'collapsible'
                      }}
                    >
                      {remark || '-'}
                    </Typography.Paragraph>
                  )
                }
              ]
              return (
                <Col key={index + name} xs={24} sm={12} md={12} lg={12} xl={8} xxl={6}>
                  <Badge.Ribbon
                    style={{ display: teamInfo?.teamId === teamId ? '' : 'none' }}
                    text='current'
                    color='purple'
                  >
                    <Card
                      key={index + name}
                      className='min-h-[306px] border-none'
                      hoverable
                      title={
                        <Space>
                          <Avatar shape='square' src={logo} className='w-11 h-11'>
                            {!logo && name?.at(0)?.toUpperCase()}
                          </Avatar>
                          {name}
                          <Switch
                            checkedChildren='正常'
                            unCheckedChildren='禁用'
                            value={status === TeamStatus.TEAM_STATUS_REJECTED}
                            onChange={(checked) => handleChangeStatus(teamId, checked)}
                          />
                        </Space>
                      }
                    >
                      <Dropdown menu={{ items: menuItems(item) }} trigger={['contextMenu']}>
                        <Descriptions items={items} layout='vertical' />
                      </Dropdown>
                    </Card>
                  </Badge.Ribbon>
                </Col>
              )
            })}
          </Row>
        )}
      </div>
    </>
  )
}

export default SpaceManage
