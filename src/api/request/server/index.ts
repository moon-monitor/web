// server 模块API函数
import { ServerRegisterReply, ServerRegisterRequest } from '../types/index.ts'
import { request } from '../index.ts'

/**
 * Register Server
 * @param { ServerRegisterRequest } params
 * @returns {Promise<ServerRegisterReply>}
 */
export function register(params: ServerRegisterRequest): Promise<ServerRegisterReply> {
  return request.POST<ServerRegisterReply>('/v1/server/register', params)
}
