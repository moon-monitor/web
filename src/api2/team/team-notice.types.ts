import { NoticeGroupItem, PaginationReply, PaginationRequest } from '../common.types'

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
  pagination?: PaginationRequest
  status?: number
}
