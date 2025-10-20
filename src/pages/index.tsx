import { getToken, isLogin, isValidLoginToken, removeToken, setToken } from '@/api/request'
import { getSelfMenuTree, refreshToken } from '@/api/request/auth'
import { MenuTreeItem, TeamItem, UserItem } from '@/api/request/types'
import '@/assets/styles/index.scss'
import { defaultRouters, unAuthRouters } from '@/config/router'
import useStorage from '@/hooks/storage'
import { routeJoin, transformRoutersTree } from '@/utils'
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
import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'

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
  const [menuItems, setMenuItems] = useStorage<MenuTreeItem[]>(
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
      setAuthToken(res.token || '')
      setToken(res.token || '')
    }
  })

  const storageMenus = useCallback(() => {
    // 只有在有效登录 token 时才调用菜单 API
    if (!isValidLoginToken()) {
      return
    }

    getSelfMenuTree({})
      .then((res) => {
        setMenuItems?.(res.items || [])
      })
      .finally(() => {
        if (isLogin() && !window.location.href.includes('home')) {
          window.location.href = '/#/home'
        }
      })
  }, [setMenuItems])

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token')
    const storedToken = getToken()

    // 检查是否是 OAuth2 注册页面的临时 token
    const isOAuthRegisterPage = window.location.hash.includes('/oauth/register/email')

    if (urlToken && isOAuthRegisterPage) {
      // 如果是 OAuth2 注册页面，只设置临时 token 但不调用需要认证的 API
      setAuthToken(urlToken)
      setToken(urlToken)
      // 不调用 storageMenus()，因为这是临时 token
      return
    }

    // 对于正常的登录 token 或存储的 token
    const token = urlToken || storedToken
    if (token) {
      setAuthToken(token)
      setToken(token)
      // 每10分钟刷新一次token
      setInterval(
        () => {
          refreshAuthToken({})
        },
        1000 * 60 * 10
      )
      // 只有真正的登录 token 才调用菜单 API
      storageMenus()
    }
  }, [])

  // 监听URL变化，处理OAuth2登录后的token
  useEffect(() => {
    const handleUrlChange = () => {
      const urlToken = new URLSearchParams(window.location.search).get('token')
      if (urlToken && !getToken()) {
        setAuthToken(urlToken)
        setToken(urlToken)
        storageMenus()
      }
    }

    // 监听popstate事件（浏览器前进后退）
    window.addEventListener('popstate', handleUrlChange)

    // 检查当前URL是否有token
    handleUrlChange()

    return () => {
      window.removeEventListener('popstate', handleUrlChange)
    }
  }, [])

  const handleRouter = () => {
    // 如果有token但菜单还没加载完成，给一个短暂的等待时间
    if (isLogin() && !menuItems?.length) {
      // 如果正在加载菜单，显示默认路由但允许访问
      return createHashRouter(defaultRouters)
    }

    if (!(menuItems?.length && isLogin())) {
      return createHashRouter(unAuthRouters)
    }

    const routersTree = defaultRouters.map((item) => {
      // 如果该路由有子路由，则确保不设置 index 或移除 index 字段
      const hasChildren = item.children || (menuItems.length > 0 && item.path === '/home')
      if (hasChildren) {
        return {
          ...item,
          children: [
            ...transformRoutersTree(menuItems),
            ...(item.children || []),
            {
              path: '/home',
              element: (
                <Navigate
                  to={routeJoin(
                    '/home',
                    (() => {
                      const first = menuItems[0]
                      const target = first?.children?.length ? first.children[0]?.menuPath : first?.menuPath
                      const raw = typeof target === 'string' ? target : '/'
                      return raw.startsWith('/') ? raw : `/${raw}`
                    })()
                  )}
                  replace={true}
                />
              )
            }
          ]
        }
      }
      return item
    })

    return createHashRouter(routersTree as RouteObject[])
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
      // 登录成功后立即调用菜单 API
      if (auth && !window.location.hash.includes('/oauth/register/email')) {
        storageMenus()
      }
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
