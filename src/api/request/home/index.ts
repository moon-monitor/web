// home 模块API函数
import { EmptyRequest, FeaturesReply, FooterReply, PartnersReply } from '../types/index.ts'
import { request } from '../index.ts'

/**
 * Footer Home
 * @param { EmptyRequest } params
 * @returns {Promise<FooterReply>}
 */
export function footer(params: EmptyRequest): Promise<FooterReply> {
  return request.GET<FooterReply>('/api/portal/home/footer', params)
}

/**
 * Features Home
 * @param { EmptyRequest } params
 * @returns {Promise<FeaturesReply>}
 */
export function features(params: EmptyRequest): Promise<FeaturesReply> {
  return request.GET<FeaturesReply>('/api/portal/home/features', params)
}

/**
 * Partners Home
 * @param { EmptyRequest } params
 * @returns {Promise<PartnersReply>}
 */
export function partners(params: EmptyRequest): Promise<PartnersReply> {
  return request.GET<PartnersReply>('/api/portal/home/partners', params)
}
