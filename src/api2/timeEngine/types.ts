import { PaginationReply, PaginationRequest } from '../common.types'
import { GlobalStatus } from '../enum'

export interface DeleteTimeEngineRequest {
  timeEngineId: number
}

export interface GetTimeEngineRequest {
  timeEngineId: number
}
/**
 * api.palace.common.TimeEngineItemRule
 */
export interface TimeEngineItemRule {
  createdAt?: string
  engines?: Response[]
  name?: string
  remark?: string
  ruleId: number
  rules?: string[]
  status: GlobalStatus
  type?: number
  updatedAt?: string
}

/**
 * api.palace.common.TimeEngineItem
 */
export interface TimeEngineItem {
  createdAt?: string
  name?: string
  remark?: string
  rules: TimeEngineItemRule[]
  status: GlobalStatus
  timeEngineId: number
  updatedAt?: string
}

export interface GetTimeEngineReply extends TimeEngineItem {}

export interface ListTimeEngineRequest {
  pagination: PaginationRequest
  status?: GlobalStatus
}

export interface ListTimeEngineReply {
  items?: TimeEngineItem[]
  pagination?: PaginationReply
}
export interface SaveTimeEngineRequest {
  name?: string
  remark?: string
  ruleIds?: number[]
  timeEngineId?: number
}

export interface DeleteTimeEngineRuleRequest {
  timeEngineRuleId?: number
}
export interface GetTimeEngineRuleRequest {
  timeEngineRuleId?: number
}

export interface GetTimeEngineRuleReply {
  rule?: TimeEngineItemRule
}

export interface ListTimeEngineRuleRequest {
  pagination?: PaginationRequest
  status?: GlobalStatus
  keyword?: string
  types?: number[]
}
export interface ListTimeEngineRuleReply {
  items: TimeEngineItemRule[]
  pagination: PaginationReply
}

export interface SaveTimeEngineRuleRequest {
  name?: string
  remark?: string
  ruleIds?: number[]
  timeEngineRuleId?: number
  type?: number
}
