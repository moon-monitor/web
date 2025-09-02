// pricing 模块API函数
import { EmptyRequest, ListPackageReply } from '../types/index.ts'
import { request } from '../index.ts'

/**
 * ListPackage Pricing
 * @param { EmptyRequest } params
 * @returns {Promise<ListPackageReply>}
 */
export function listPackage(params: EmptyRequest): Promise<ListPackageReply> {
  return request.GET<ListPackageReply>('/api/portal/pricing/package', params)
}
