import { PaginationReply, PaginationRequest, TeamDictItem } from '../common.types'
import { DictType, GlobalStatus } from '../enum'

export interface DeleteTeamDictRequest {
  dictId?: number
}

/**
 * api.palace.GetTeamDictReply
 */
export interface GetTeamDictReply extends TeamDictItem {}

export interface GetTeamDictRequest {
  dictId?: number
}

/**
 * api.palace.ListTeamDictReply
 */
export interface ListTeamDictReply {
  items?: TeamDictItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamDictRequest
 */
export interface ListTeamDictRequest {
  dictTypes?: number[]
  keyword?: string
  langs?: string[]
  pagination: PaginationRequest
  status?: GlobalStatus
}

/**
 * api.palace.SaveTeamDictRequest
 */
export interface SaveTeamDictRequest {
  color?: string
  dictId?: number
  dictType?: DictType
  key?: string
  lang?: string
  value?: string
  status?: GlobalStatus
}

/**
 * api.palace.UpdateTeamDictStatusRequest
 */
export interface UpdateTeamDictStatusRequest {
  dictIds?: number[]
  status?: GlobalStatus
}
