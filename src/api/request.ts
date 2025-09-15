import { message, notification } from 'antd'
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'

const host = window.location.origin

const localhost = 'http://localhost:5173'

export const hostMap: { [key: string]: string } = {
  [localhost]: 'http://localhost:8000'
}

export const baseURL = hostMap[host] || `${host}/api`

const request = axios.create({
  baseURL: baseURL,
  timeout: 50000
})

export type ErrorResponse = {
  code: number
  message: string
  metadata: Record<string, string>
  reason: string
}

let timer: NodeJS.Timeout | null = null

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError<ErrorResponse>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resp: any = error.response
    if (!resp || !resp?.data) {
      resp = {}
      resp.data = {
        code: 500,
        message: '网络错误',
        metadata: {},
        reason: 'NET_ERROR'
      }
    }
    const respData = resp.data
    console.log('errorHandle', respData)
    errorHandle(respData)
    return Promise.reject(respData)
  }
)

request.interceptors.request.use(
  (config) => {
    const token = getToken()
    config.headers['Authorization'] = `Bearer ${token}`
    const teamInfo = JSON.parse(localStorage.getItem('teamInfo') || '{"teamId":0}')
    config.headers['X-Team-Id'] = +teamInfo?.teamId || 0
    // config.headers['X-Team-Member-ID'] = getTeamMemberID()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token)
}

export const removeToken = () => {
  sessionStorage.removeItem('token')
  window.location.href = '/#/login'
}

export const getToken = () => {
  return sessionStorage.getItem('token') || ''
}

export const isLogin = () => {
  return !!getToken()
}

export const isValidLoginToken = () => {
  const token = getToken()
  if (!token) return false

  // 检查当前是否在 OAuth2 注册页面
  const isOAuthRegisterPage = window.location.hash.includes('/oauth/register/email')
  if (isOAuthRegisterPage) {
    return false // 在注册页面时，token 是临时的
  }

  return true
}

export type NullObject = Record<string, never>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GET = async <R>(url: string, params?: any, config?: AxiosRequestConfig) => {
  return request.get<NullObject, R>(url, { params, ...config })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const POST = async <R>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return request.post<NullObject, R>(url, data, config)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PUT = async <R>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return request.put<NullObject, R>(url, data, config)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DELETE = async <R>(url: string, params?: any, config?: AxiosRequestConfig) => {
  return request.delete<NullObject, R>(url, { params, ...config })
}

export default {
  GET,
  POST,
  PUT,
  DELETE
}

export interface HealthReply {
  healthy: boolean
  version: string
}

export const healthApi = (): Promise<HealthReply> => {
  return GET('/health')
}

const errorHandle = (err: ErrorResponse) => {
  if (!err) return

  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    let msg = err.message
    switch (err.code) {
      case 400:
        break
      case 401:
        if (msg === 'JWT token is missing') {
          msg = '登录已过期，请重新登录'
        }
        message.error(msg || '登录失效').then(() => removeToken())
        removeToken()
        break
      case 403:
        message.error(err?.message || '没有权限')
        break
      case 429:
        message.error(err?.message || '请求太频繁')
        break
      case 405:
        // 需要有确定或者取消的弹窗， 不操作则一直存在顶层， 底层内容不允许操作
        message.error(err?.message || '请求方式错误')
        break
      default:
        notification.warning({
          message: err?.message || '请求失败',
          placement: 'bottomRight'
        })
        break
    }
  }, 500)
}

/**
 * 构建请求头
 * @param isSystem 是否是系统请求
 * @returns 请求头
 */
export const buildHeader = (isSystem?: boolean) => {
  return {
    headers: {
      'X-Source-Type': isSystem ? 'System' : 'Team'
    }
  }
}
