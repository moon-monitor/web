// alert 模块API函数
import {
  AlertDetailParams,
  AlertDetailReply,
  AlertItem,
  EmptyReply,
  EmptyRequest,
  LatestAlarmEventReply,
  LatestInterventionEventReply,
  ListAlertParams,
  ListAlertReply,
  SummaryAlarmReply,
  TopStrategyAlarmReply
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
 * LatestAlarmEvent Alert
 * @param { EmptyRequest } params
 * @returns {Promise<LatestAlarmEventReply>}
 */
export function latestAlarmEvent(params: EmptyRequest): Promise<LatestAlarmEventReply> {
  return request.GET<LatestAlarmEventReply>('/api/statistics/alarm/latest/event', params)
}

/**
 * LatestInterventionEvent Alert
 * @param { EmptyRequest } params
 * @returns {Promise<LatestInterventionEventReply>}
 */
export function latestInterventionEvent(params: EmptyRequest): Promise<LatestInterventionEventReply> {
  return request.GET<LatestInterventionEventReply>('/api/statistics/alarm/latest/intervention', params)
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

/**
 * SummaryAlarm Alert
 * @param { EmptyRequest } params
 * @returns {Promise<SummaryAlarmReply>}
 */
export function summaryAlarm(params: EmptyRequest): Promise<SummaryAlarmReply> {
  return request.GET<SummaryAlarmReply>('/api/statistics/alarm/summary', params)
}

/**
 * TopStrategyAlarm Alert
 * @param { EmptyRequest } params
 * @returns {Promise<TopStrategyAlarmReply>}
 */
export function topStrategyAlarm(params: EmptyRequest): Promise<TopStrategyAlarmReply> {
  return request.GET<TopStrategyAlarmReply>('/api/statistics/alarm/top/strategy', params)
}
