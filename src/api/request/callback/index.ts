// callback 模块API函数
import { SendMsgCallbackReply, SendMsgCallbackRequest, SyncMetadataReply, SyncMetadataRequest } from '../types/index.ts'
import { request } from '../index.ts'

/**
 * SendMsgCallback Callback
 * @param { SendMsgCallbackRequest } params
 * @returns {Promise<SendMsgCallbackReply>}
 */
export function sendMsgCallback(params: SendMsgCallbackRequest): Promise<SendMsgCallbackReply> {
  return request.POST<SendMsgCallbackReply>('/v1/server/send/msg/callback', params)
}

/**
 * SyncMetadata Callback
 * @param { SyncMetadataRequest } params
 * @returns {Promise<SyncMetadataReply>}
 */
export function syncMetadata(params: SyncMetadataRequest): Promise<SyncMetadataReply> {
  return request.POST<SyncMetadataReply>('/v1/server/sync/metadata', params)
}
