/* eslint-disable @typescript-eslint/no-explicit-any */
import req from '../request.ts'

// 导出所有类型定义
export * from './types/index.ts'
export { request }

// 定义 request 接口和实例
export interface RequestInstance {
  GET<T>(url: string, params?: any): Promise<T>
  POST<T>(url: string, params?: any): Promise<T>
  PUT<T>(url: string, params?: any): Promise<T>
  DELETE<T>(url: string, params?: any): Promise<T>
}

const request: RequestInstance = req
