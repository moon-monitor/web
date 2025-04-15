import { Error403 } from '@/components/error'
import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

export const unAuthRouters: RouteObject[] = [
  {
    path: '/login',
    Component: lazy(() => import('@/pages/login'))
  },
  {
    path: '/oauth/register/email',
    Component: lazy(() => import('@/pages/login/oauth/email'))
  },
  {
    path: '/register',
    Component: lazy(() => import('@/pages/login/register/register'))
  },
  {
    path: '*',
    element: <Navigate to='/login' replace={true} />
  }
]

export const defaultRouters: RouteObject[] = [
  {
    path: '/login',
    Component: lazy(() => import('@/pages/login'))
  },
  {
    path: '/oauth/register/email',
    Component: lazy(() => import('@/pages/login/oauth/email'))
  },
  {
    path: '/register',
    Component: lazy(() => import('@/pages/login/register/register'))
  },
  {
    path: '/home',
    Component: lazy(() => import('@/components/layout')),
    loader: () => ({ title: '首页', path: '/home' }),
    children: [
      {
        path: '/home',
        element: <Navigate to='/home/realtime/alarm' replace={true} />
      },
      {
        // 403
        path: '/home/*',
        element: <Error403 />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/home' replace={true} />
  }
]
