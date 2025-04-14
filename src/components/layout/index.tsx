import { MenuTree } from '@/api/menu'
import { isLogin, setToken } from '@/api/request'
import { useContainerHeight } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, Space, Spin, theme } from 'antd'
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { ItemType } from 'antd/lib/menu/interface'
import type React from 'react'
import { Suspense, useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom'
import { renderIcon } from '../icon'
import { CreateTeamModalProvider } from './create-team-provider'
import LayoutFooter from './footer'
import { HeaderOp } from './header-op'
import HeaderTitle from './header-title'

const { Header, Content, Footer, Sider } = Layout
const { useToken } = theme

let timer: NodeJS.Timeout | null = null
const MoonLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const search = window.location.search
  const authToken = new URLSearchParams(search).get('token')

  useEffect(() => {
    if (authToken) {
      setToken(authToken)
      // 清除search
      window.location.search = ''
    }
  }, [authToken])

  if (!isLogin() && !authToken) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }, 1000)
  }

  const { token } = useToken()
  const { menuItems, collapsed, setContentHeight, setCollapsed } = useContext(GlobalContext)

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [locationPath, setLocationPath] = useState<string>(location.pathname)

  const contentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const autoContentHeight = useContainerHeight(contentRef, headerRef, footerRef)
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItemType[]>([])
  const meta = useMatches()

  useEffect(() => {
    setContentHeight?.(autoContentHeight)
  }, [autoContentHeight, setContentHeight])

  const handleMenuOpenChange = (keys: string[]) => {
    let openKeyList: string[] = keys
    if (openKeyList.length === 0) {
      openKeyList = locationPath.split('/').slice(1)
      // 去掉最后一级
      openKeyList.pop()
      openKeyList = [`/${openKeyList.join('/')}`]
    }
    setOpenKeys(openKeyList)
    // setSelectedKeys(keys)
  }

  const handleOnSelect = (key: string) => {
    navigate(key)
  }

  useEffect(() => {
    setSelectedKeys([location.pathname])

    const openKey = location.pathname.split('/').slice(1)
    const keys: string[] = []
    let key = ''
    for (const item of openKey) {
      key += `/${item}`
      keys.push(key)
    }
    // 去掉最后一级
    openKey.pop()
    setOpenKeys([...keys, `/${openKey.join('/')}`])
    setLocationPath(location.pathname)
    console.log('openKey', openKey)
  }, [location.pathname])

  // 转换菜单树
  const transformMenuTree = (menuTree: MenuTree[] | undefined): ItemType[] => {
    if (!menuTree) {
      return []
    }
    return menuTree.map((item) => {
      const menuItem: ItemType = {
        key: `/home${item.key}`,
        label: item.label,
        title: item.label,
        icon: renderIcon(item.icon),
        children: item.children ? transformMenuTree(item.children) : undefined
      }

      return menuItem
    })
  }

  useEffect(() => {
    if (!meta) return
    setBreadcrumbItems(() => {
      return meta.map((item) => {
        return item.data
      }) as BreadcrumbItemType[]
    })
  }, [location])

  return (
    <>
      <CreateTeamModalProvider>
        <Layout className='overflow-hidden h-[100vh] w-[100vw]' id='content-body'>
          <Sider collapsed={collapsed} className='relative' style={{ background: token.colorBgContainer }}>
            <div className='flex px-5 justify-center items-center h-[60px]' style={{ color: token.colorText }}>
              <HeaderTitle />
            </div>
            <Menu
              mode='inline'
              items={transformMenuTree(menuItems)}
              style={{ borderInlineEnd: 'none' }}
              className='h-full overflow-auto'
              openKeys={collapsed ? openKeys : []}
              defaultOpenKeys={collapsed ? openKeys : []}
              onSelect={({ key }) => handleOnSelect(key)}
              selectedKeys={selectedKeys}
              defaultSelectedKeys={selectedKeys}
              onOpenChange={handleMenuOpenChange}
            />
          </Sider>
          <Layout className='flex flex-col flex-1'>
            <Header
              ref={headerRef}
              className='bg-none flex justify-between pl-5 pr-5'
              style={{
                background: token.colorBgContainer,
                color: token.colorText
              }}
            >
              {/* <RouteBreadcrumb /> */}
              <Space size={8}>
                <Button
                  type='text'
                  onClick={() => setCollapsed?.(!collapsed)}
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                />
                <Breadcrumb items={breadcrumbItems} />
              </Space>
              <HeaderOp />
            </Header>

            <Content className='flex flex-col flex-1' ref={contentRef}>
              <Suspense fallback={<Spin />}>
                <Outlet />
              </Suspense>
            </Content>
            <Footer
              ref={footerRef}
              className='h-8 flex items-center justify-center gap-1'
              style={{ background: token.colorBgContainer }}
            >
              <LayoutFooter />
            </Footer>
          </Layout>
        </Layout>
      </CreateTeamModalProvider>
    </>
  )
}

export default MoonLayout
