// alert 模块API函数
import {
  AlertDetailParams,
  AlertDetailReply,
  AlertItem,
  EmptyReply,
  LatestAlarmEventReply,
  LatestAlarmEventRequest,
  LatestInterventionEventReply,
  LatestInterventionEventRequest,
  ListAlertParams,
  ListAlertReply,
  SummaryAlarmReply,
  SummaryAlarmRequest,
  TopStrategyAlarmReply,
  TopStrategyAlarmRequest
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
 * @param { LatestAlarmEventRequest } params
 * @returns {Promise<LatestAlarmEventReply>}
 */
export function latestAlarmEvent(params: LatestAlarmEventRequest): Promise<LatestAlarmEventReply> {
  return request.GET<LatestAlarmEventReply>('/api/statistics/alarm/latest/event', params)
}

/**
 * LatestInterventionEvent Alert
 * @param { LatestInterventionEventRequest } params
 * @returns {Promise<LatestInterventionEventReply>}
 */
export function latestInterventionEvent(params: LatestInterventionEventRequest): Promise<LatestInterventionEventReply> {
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
 * @param { SummaryAlarmRequest } params
 * @returns {Promise<SummaryAlarmReply>}
 */
export function summaryAlarm(params: SummaryAlarmRequest): Promise<SummaryAlarmReply> {
  return request.GET<SummaryAlarmReply>('/api/statistics/alarm/summary', params)
}

/**
 * TopStrategyAlarm Alert
 * @param { TopStrategyAlarmRequest } params
 * @returns {Promise<TopStrategyAlarmReply>}
 */
export function topStrategyAlarm(params: TopStrategyAlarmRequest): Promise<TopStrategyAlarmReply> {
  return request.GET<TopStrategyAlarmReply>('/api/statistics/alarm/top/strategy', params)
}
