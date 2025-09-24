// server 模块API函数
import { EmptyRequest, GetServerListReply, ServerRegisterReply, ServerRegisterRequest } from '../types/index.ts'
import { request } from '../index.ts'

/**
 * GetServerList Server
 * @param { EmptyRequest } params
 * @returns {Promise<GetServerListReply>}
 */
export function getServerList(params: EmptyRequest): Promise<GetServerListReply> {
  return request.GET<GetServerListReply>('/v1/server/list', params)
}

/**
 * Register Server
 * @param { ServerRegisterRequest } params
 * @returns {Promise<ServerRegisterReply>}
 */
export function register(params: ServerRegisterRequest): Promise<ServerRegisterReply> {
  return request.POST<ServerRegisterReply>('/v1/server/register', params)
}
