import { ErrorResponse } from '@/api/request'
import { MenuTreeItem } from '@/api/request/types'
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
export const transformRoutersTree = (menuTree: MenuTreeItem[]): RouteObject[] => {
  return menuTree.map((item) => {
    const routersItem: RouteObject = {
      path: routeJoin('/home', item.menuPath || '/403'),
      ...(!item.children?.length && {
        Component: lazy(() => import(/* @vite-ignore */ routeJoin('../pages', item.menuPath || '403')))
      }),
      loader: () => ({ title: item.name }),
      children: item.children?.length ? transformRoutersTree(item.children) : undefined
    }
    console.log('routersItem', routersItem)
    return routersItem
  })
}

// 转换菜单树
export const transformMenuTree = (menuTree: MenuTreeItem[] | undefined): ItemType[] => {
  if (!menuTree) {
    return []
  }
  return menuTree.map((item) => {
    const menuItem: ItemType = {
      key: `/home${item.menuPath}`,
      label: item.name,
      title: item.name,
      icon: item.children?.length ? renderIcon(item.menuIcon) : undefined,
      children: item.children?.length ? transformMenuTree(item.children) : undefined
    }

    return menuItem
  })
}

// 路由拼接
export function routeJoin(...paths: string[]) {
  return paths.join('/').replace(/\/+/g, '/')
}

/**
 * 将数字转换为二进制 并返回数组
 * @param num 数字 9 1001 转换为 [1, 8]
 * @returns 数组
 */
export const numberToBinary = (num: number) => {
  const binary = num.toString(2)
  return binary.split('').reduce((acc, bit, index) => {
    if (bit === '1') {
      acc.unshift(Math.pow(2, binary.length - 1 - index))
    }
    return acc
  }, [] as number[])
}
