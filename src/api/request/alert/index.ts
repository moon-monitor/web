// alert 模块API函数
import {
  AlertDetailParams,
  AlertDetailReply,
  AlertItem,
  EmptyReply,
  ListAlertParams,
  ListAlertReply
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * AlertDetail Alert
 * @param { AlertDetailParams } params
 * @returns {Promise<AlertDetailReply>}
 */
export function alertDetail(params: AlertDetailParams): Promise<AlertDetailReply> {
  return request.POST<AlertDetailReply>('/api/alert/detail', params)
}

/**
 * ListAlerts Alert
 * @param { ListAlertParams } params
 * @returns {Promise<ListAlertReply>}
 */
export function listAlerts(params: ListAlertParams): Promise<ListAlertReply> {
  return request.POST<ListAlertReply>('/api/alert/list', params)
}

/**
 * PushAlert Alert
 * @param { AlertItem } params
 * @returns {Promise<EmptyReply>}
 */
export function pushAlert(params: AlertItem): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/alert/push', params)
}
