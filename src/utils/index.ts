import { MenuTree } from '@/api/menu'
import { ErrorResponse } from '@/api/request'
import { renderIcon } from '@/components/icon'
import { FormInstance } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// 公共错误处理方法（支持泛型）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFormError = <T extends Record<string, any>>(
  form: FormInstance<T>, // 可以使用 FormInstance<T> 替代 any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: ErrorResponse | any
) => {
  if (err.code === 400) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.keys(err?.metadata).forEach((key: any) => {
      form.setFields([{ name: key, errors: [err?.metadata?.[key]] }])
    })
  }
}

// 转换路由树
export const transformRoutersTree = (menuTree: MenuTree[]): RouteObject[] => {
  return menuTree.map((item) => {
    const routersItem: RouteObject = {
      path: routeJoin('/home', item.key),
      ...(!item.children && {
        Component: lazy(() => import(routeJoin('../pages', item.key)))
      }),
      loader: () => ({ title: item.label }),
      children: transformRoutersTree(item.children || [])
    }
    return routersItem
  })
}

// 转换菜单树
export const transformMenuTree = (menuTree: MenuTree[] | undefined): ItemType[] => {
  if (!menuTree) {
    return []
  }
  return menuTree.map((item) => {
    const menuItem: ItemType = {
      key: `/home${item.key}`,
      label: item.label,
      title: item.label,
      icon: item.children ? renderIcon(item.icon) : undefined,
      children: item.children ? transformMenuTree(item.children) : undefined
    }

    return menuItem
  })
}

// 路由拼接
function routeJoin(...paths: string[]) {
  return paths.join('/').replace(/\/+/g, '/')
}
