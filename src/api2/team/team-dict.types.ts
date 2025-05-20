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

/**
 * api.palace.SelectTeamDictRequest
 */
export interface SelectTeamDictRequest {
  dictTypes?: number[]
  keyword?: string
  langs?: string[]
  pagination?: PaginationRequest
  status?: number
}
/**
 * api.palace.SelectTeamDictReply
 */
export interface SelectTeamDictReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.common.SelectItem，SelectItem represents an option in a selection, including
 * its value, display label, and whether it is disabled.
 * value: The actual value of the option.
 * label: The label displayed for the option.
 * disabled: Indicates whether the option is disabled, true for disabled, false for enabled.
 */
export interface SelectItem {
  disabled?: boolean
  extra?: SelectItemExtra
  label?: string
  value?: number
}

/**
 * api.palace.common.SelectItem_Extra
 */
export interface SelectItemExtra {
  color?: string
  icon?: string
  remark?: string
}
