// teamlog 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  GetTeamSendMessageLogsReply,
  GetTeamSendMessageLogsRequest,
  OperateOneTeamSendMessageRequest,
  SendMessageLogItem
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * GetSendMessageLog TeamLog
 * @param { EmptyRequest } params
 * @returns {Promise<SendMessageLogItem>}
 */
export function getSendMessageLog(params: EmptyRequest): Promise<SendMessageLogItem> {
  return request.GET<SendMessageLogItem>('/api/team/log/send/message', params)
}

/**
 * GetSendMessageLogs TeamLog
 * @param { GetTeamSendMessageLogsRequest } params
 * @returns {Promise<GetTeamSendMessageLogsReply>}
 */
export function getSendMessageLogs(params: GetTeamSendMessageLogsRequest): Promise<GetTeamSendMessageLogsReply> {
  return request.POST<GetTeamSendMessageLogsReply>('/api/team/log/send/message', params)
}

/**
 * RetrySendMessage TeamLog
 * @param { OperateOneTeamSendMessageRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function retrySendMessage(params: OperateOneTeamSendMessageRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/log/send/message/retry', params)
}
