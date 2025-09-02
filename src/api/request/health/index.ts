// health 模块API函数
import { CheckReply, EmptyRequest } from '../types/index.ts'
import { request } from '../index.ts'

/**
 * Check Health
 * @param { EmptyRequest } params
 * @returns {Promise<CheckReply>}
 */
export function check(params: EmptyRequest): Promise<CheckReply> {
  return request.GET<CheckReply>('/health', params)
}
