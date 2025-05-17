import { NoticeGroupItem, NoticeHookItem, PaginationReply, PaginationRequest } from '../common.types'
import { GlobalStatus } from '../enum'

/**
 * api.palace.ListTeamNoticeGroupReply
 */
export interface ListTeamNoticeGroupReply {
  items?: NoticeGroupItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamNoticeGroupRequest
 */
export interface ListTeamNoticeGroupRequest {
  hookIds?: number[]
  keyword?: string
  memberIds?: number[]
  pagination: PaginationRequest
  status?: GlobalStatus
}

export interface GetTeamNoticeGroupRequest {
  groupId?: number
}

/**
 * api.palace.GetTeamNoticeGroupReply
 */
export interface GetTeamNoticeGroupReply {
  detail?: NoticeGroupItem
}

/**
 * api.palace.DeleteTeamNoticeGroupRequest
 */
export interface DeleteTeamNoticeGroupRequest {
  groupId?: number
}

/**
 * api.palace.UpdateTeamNoticeGroupStatusRequest
 */
export interface UpdateTeamNoticeGroupStatusRequest {
  groupId?: number
  status?: GlobalStatus
}

export interface GetTeamNoticeHookRequest {
  hookId?: number
}

/**
 * api.palace.GetTeamNoticeHookReply
 */
export interface GetTeamNoticeHookReply extends NoticeHookItem {}

/**
 * api.palace.DeleteTeamNoticeHookRequest
 */
export interface DeleteTeamNoticeHookRequest {
  hookId?: number
}

/**
 * api.palace.ListTeamNoticeHookRequest
 */
export interface ListTeamNoticeHookRequest {
  apps?: number[]
  keyword?: string
  pagination?: PaginationRequest
  status?: GlobalStatus
  url?: string
}

/**
 * api.palace.ListTeamNoticeHookReply
 */
export interface ListTeamNoticeHookReply {
  items: NoticeHookItem[]
  pagination: PaginationReply
}

/**
 * api.palace.UpdateTeamNoticeHookStatusRequest
 */
export interface UpdateTeamNoticeHookStatusRequest {
  hookId?: number
  status?: GlobalStatus
}

/**
 * api.palace.SaveTeamNoticeGroupRequest
 */
export interface SaveTeamNoticeGroupRequest {
  emailConfigId?: number
  groupId?: number
  hookIds?: number[]
  members?: SaveTeamNoticeGroupRequestMember[]
  name?: string
  remark?: string
  smsConfigId?: number
}

/**
 * api.palace.SaveTeamNoticeGroupRequest_Member
 */
export interface SaveTeamNoticeGroupRequestMember {
  memberId?: number
  noticeType?: number
}
/**
 * api.palace.SaveTeamNoticeHookRequest
 */
export interface SaveTeamNoticeHookRequest {
  app?: number
  headers?: { key: string; value: string }[]
  hookId?: number
  method?: number
  name?: string
  remark?: string
  secret?: string
  status?: GlobalStatus
  url?: string
}
