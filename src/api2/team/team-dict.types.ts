import { DictTypeKey, GlobalStatusKey, PaginationReply, PaginationRequest, TeamDictItem } from '../common.types'

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
  status?: GlobalStatusKey
}

/**
 * api.palace.SaveTeamDictRequest
 */
export interface SaveTeamDictRequest {
  color?: string
  dictId?: number
  dictType?: DictTypeKey
  key?: string
  lang?: string
  value?: string
  status?: GlobalStatusKey
}

/**
 * api.palace.UpdateTeamDictStatusRequest
 */
export interface UpdateTeamDictStatusRequest {
  dictIds?: number[]
  status?: GlobalStatusKey
}
