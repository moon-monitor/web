// server 模块API函数
import { request } from '../index.ts'
import { ServerRegisterReply, ServerRegisterRequest } from '../types/index.ts'
import { ServerItem } from '../types/model-types.ts'

/**
 * Register Server
 * @param { ServerRegisterRequest } params
 * @returns {Promise<ServerRegisterReply>}
 */
export function register(params: ServerRegisterRequest): Promise<ServerRegisterReply> {
  return request.POST<ServerRegisterReply>('/v1/server/register', params)
}


/**
 * 获取houyi服务列表
 * @param params 获取服务数量参数
 * @returns 获取服务数量响应
 */
export function getHouyiServer(params: GetHouyiServerRequest): Promise<GetServerReply> {
  return request.GET<GetServerReply>(`/v1/server/list?type=${params.type}`)
}

/**
 * 获取rabbit服务列表
 * @param params 获取服务数量参数
 * @returns 获取服务数量响应
 */
export function getRabbitServer(params: GetRabbitServerRequest): Promise<GetServerReply> {
  return request.GET<GetServerReply>(`/v1/server/list?type=${params.type}`)
}

// 以下类型定义基于 proto 文件
export interface GetHouyiServerRequest {
  type: 'houyi'
}

export interface GetRabbitServerRequest {
  type: 'rabbit'
}

export interface GetServerReply {
  list: ServerItem[]
}