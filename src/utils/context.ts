import { TeamItem, UserItem } from '@/api/common.types'
import { MenuTreeItem } from '@/api/request/types'
import type { Router } from '@remix-run/router'
import { theme } from 'antd'
import type { SpaceSize } from 'antd/es/space'
import { createContext } from 'react'

export type ThemeType = 'light' | 'dark'
export type LangType = 'zh-CN' | 'en-US'
export type PermissionType = string

export type GlobalContextType = {
  theme?: ThemeType
  setTheme?: (theme: ThemeType) => void
  lang?: LangType
  setLang?: (lang: LangType) => void
  size?: SpaceSize
  setSize?: (size: SpaceSize) => void
  title?: string
  menuItems?: MenuTreeItem[]
  setMenuItems?: (menuItems: MenuTreeItem[]) => void
  collapsed?: boolean
  setCollapsed?: (collapsed: boolean) => void
  userInfo?: UserItem
  setUserInfo?: (userInfo: UserItem) => void
  removeUserInfo?: () => void
  teamInfo?: TeamItem
  setTeamInfo?: (teamInfo: TeamItem) => void
  removeTeamInfo?: () => void
  refreshMyTeamList?: boolean
  setRefreshMyTeamList?: () => void
  isFullscreen?: boolean
  setIsFullscreen?: (isFullscreen: boolean) => void
  showLevelColor?: boolean
  setShowLevelColor?: (showLevelColor: boolean) => void
  contentHeight?: number
  setContentHeight?: (contentHeight: number) => void
  localURL?: string
  setLocalURL?: (localURL: string) => void
  authData?: {
    permissions: PermissionType[]
    isAuthenticated: boolean
  }
  setAuthData?: (authData: { permissions: PermissionType[]; isAuthenticated: boolean }) => void
  routers?: Router
  setRouters?: React.Dispatch<React.SetStateAction<Router>>
  authToken?: string
  setAuthToken?: (authToken: string) => void
  removeAuthToken?: () => void
}

export const GlobalContext = createContext<GlobalContextType>({
  lang: 'zh-CN',
  setLang: () => void 0,
  theme: 'light',
  setTheme: () => void 0,
  size: 'middle',
  setSize: () => void 0,
  title: 'Moon监控'
})

export const getUseTheme = (t?: ThemeType) => {
  return t === 'dark' ? theme.darkAlgorithm : undefined
}
