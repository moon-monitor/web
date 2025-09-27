// server 模块API函数
import { GetServerListReply, GetServerListRequest, ServerRegisterReply, ServerRegisterRequest } from '../types/index.ts'
import { request } from '../index.ts'

/**
 * GetServerList Server
 * @param { GetServerListRequest } params
 * @returns {Promise<GetServerListReply>}
 */
export function getServerList(params: GetServerListRequest): Promise<GetServerListReply> {
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
