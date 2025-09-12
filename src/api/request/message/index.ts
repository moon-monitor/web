// message 模块API函数
import {
  CancelMessageReply,
  CancelMessageRequest,
  ConfirmMessageReply,
  ConfirmMessageRequest,
  DeleteMessagesReply,
  DeleteMessagesRequest,
  ListMessageReply,
  ListMessageRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * CancelMessage Message
 * @param { CancelMessageRequest } params
 * @returns {Promise<CancelMessageReply>}
 */
export function cancelMessage(params: CancelMessageRequest): Promise<CancelMessageReply> {
  return request.POST<CancelMessageReply>('/api/user/messages/cancel', params)
}

/**
 * ConfirmMessage Message
 * @param { ConfirmMessageRequest } params
 * @returns {Promise<ConfirmMessageReply>}
 */
export function confirmMessage(params: ConfirmMessageRequest): Promise<ConfirmMessageReply> {
  return request.POST<ConfirmMessageReply>('/api/user/messages/confirm', params)
}

/**
 * DeleteMessages Message
 * @param { DeleteMessagesRequest } params
 * @returns {Promise<DeleteMessagesReply>}
 */
export function deleteMessages(params: DeleteMessagesRequest): Promise<DeleteMessagesReply> {
  return request.POST<DeleteMessagesReply>('/api/user/messages/read', params)
}

/**
 * ListMessage Message
 * @param { ListMessageRequest } params
 * @returns {Promise<ListMessageReply>}
 */
export function listMessage(params: ListMessageRequest): Promise<ListMessageReply> {
  return request.POST<ListMessageReply>('/api/user/messages', params)
}
