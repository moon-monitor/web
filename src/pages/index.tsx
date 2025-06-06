import type { MenuTree } from '@/api/model-types'
import { getToken, isLogin, removeToken, setToken } from '@/api/request'
import { refreshToken } from '@/api2/auth'
import { TeamItem, UserItem } from '@/api2/common.types'
import '@/assets/styles/index.scss'
import { defaultRouters, unAuthRouters } from '@/config/router'
import useStorage from '@/hooks/storage'
import { getTreeMenu } from '@/mocks'
import { transformRoutersTree } from '@/utils'
import {
  GlobalContext,
  type GlobalContextType,
  type LangType,
  PermissionType,
  type ThemeType,
  getUseTheme
} from '@/utils/context'
import type { Router } from '@remix-run/router'
import { useRequest } from 'ahooks'
import { ConfigProvider, theme } from 'antd'
import type { SpaceSize } from 'antd/es/space'
import zhCN from 'antd/locale/zh_CN'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'

const { useToken } = theme

function App() {
  const { token } = useToken()

  const [theme, setTheme] = useStorage<ThemeType>('theme', 'light')
  const [lang, setLang] = useStorage<LangType>('lang', 'zh-CN')
  const [size, setSize] = useStorage<SpaceSize>('size', 'middle')
  const [collapsed, setCollapsed] = useStorage<boolean>('collapsed', false)
  const [userInfo, setUserInfo, removeUserInfo] = useStorage<UserItem>('userInfo', {} as UserItem)
  const [teamInfo, setTeamInfo, removeTeamInfo] = useStorage<TeamItem>('teamInfo', {} as TeamItem)
  const [refreshMyTeamList, setRefreshMyTeamList] = useState<boolean>(false)
  const [localURL, setLocalURL] = useStorage<string>('localURL', localStorage.getItem('localURL') || '/')
  const [showLevelColor, setShowLevelColor] = useStorage<boolean>('showLevelColor', false)
  const [contentHeight, setContentHeight] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [menuItems, setMenuItems] = useStorage<MenuTree[]>(
    'menuItems',
    JSON.parse(localStorage.getItem('menuItems') || '[]')
  )
  const [authToken, setAuthToken] = useState<string>(getToken())
  const [authData, setAuthData] = useState<{ permissions: PermissionType[]; isAuthenticated: boolean }>({
    permissions: ['add'],
    isAuthenticated: false
  })
  const [routers, setRouters] = useState<Router>(createHashRouter(defaultRouters))

  const { run: refreshAuthToken } = useRequest(refreshToken, {
    manual: true,
    onSuccess: (res) => {
      setAuthToken(res.token)
      setToken(res.token)
    }
  })

  const storageMenus = useCallback(() => {
    getTreeMenu({})
      .then((res) => {
        setMenuItems?.(res.menuTree)
      })
      .finally(() => {
        if (isLogin() && !window.location.href.includes('home')) {
          window.location.href = '/#/home'
        }
      })
  }, [setMenuItems])

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (token) {
      setAuthToken(token)
      setToken(token)
      // 每10分钟刷新一次token
      setInterval(
        () => {
          refreshAuthToken()
        },
        1000 * 60 * 10
      )
    }
    storageMenus()
  }, [authToken, storageMenus, refreshAuthToken])

  const handleRouter = () => {
    if (!(menuItems?.length && isLogin())) {
      return createHashRouter(unAuthRouters)
    }
    const routersTree = defaultRouters.map((item) => {
      if (item.path === '/home') {
        item.children = [...transformRoutersTree(menuItems), ...(item.children || [])]
      }
      return item
    })

    return createHashRouter(routersTree)
  }

  const contextValue: GlobalContextType = {
    theme: theme,
    setTheme: setTheme,
    lang: lang,
    setLang: setLang,
    size: size,
    setSize: setSize,
    title: 'Moon 监控',
    menuItems: menuItems,
    setMenuItems: setMenuItems,
    collapsed: collapsed,
    setCollapsed: setCollapsed,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    removeUserInfo: removeUserInfo,
    teamInfo: teamInfo,
    setTeamInfo: setTeamInfo,
    removeTeamInfo: removeTeamInfo,
    refreshMyTeamList: refreshMyTeamList,
    setRefreshMyTeamList: () => setRefreshMyTeamList(!refreshMyTeamList),
    isFullscreen: isFullscreen,
    setIsFullscreen: setIsFullscreen,
    showLevelColor: showLevelColor,
    setShowLevelColor: setShowLevelColor,
    contentHeight: contentHeight,
    setContentHeight: setContentHeight,
    localURL: localURL,
    setLocalURL: setLocalURL,
    authData: authData,
    setAuthData: setAuthData,
    routers: routers,
    setRouters: setRouters,
    authToken: authToken,
    setAuthToken: (auth: string) => {
      setAuthToken(auth)
      setToken(auth)
    },
    removeAuthToken: removeToken
  }

  return (
    <>
      <ConfigProvider
        locale={zhCN}
        theme={{
          components: {
            Layout: { colorTextBase: token.colorTextBase, headerColor: '#FFF' },
            Badge: { colorBorderBg: 'none' }
          },
          algorithm: getUseTheme(theme),
          cssVar: true,
          token: { colorPrimary: '#6c34e6' }
        }}
        getPopupContainer={() => document.getElementById('content-body') || document.body}
      >
        <GlobalContext.Provider value={contextValue}>
          <Suspense fallback={null}>
            <RouterProvider router={handleRouter()} />
          </Suspense>
        </GlobalContext.Provider>
      </ConfigProvider>
    </>
  )
}

export default App
