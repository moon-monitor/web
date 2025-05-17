import {
  PaginationReply,
  PaginationRequest,
  TeamMetricDatasourceItem,
  TeamStrategyGroupItem,
  TeamStrategyItem,
  TeamStrategyMetricItemRuleItem,
  UserBaseItem
} from '../common.types'
import { GlobalStatus, StrategyType } from '../enum'

export interface DeleteTeamStrategyRequest {
  /**
   * Strategy Id
   */
  strategyId?: number /**
   * strategy type
   */
  strategyType?: number
}

/**
 * api.palace.GetTeamStrategyReply, GetTeamStrategyReply contains the response data for
 * retrieving a team strategy
 */
export interface GetTeamMetricStrategyReply {
  annotations?: { [key: string]: string }
  base?: TeamStrategyItem
  creator?: UserBaseItem
  datasource?: TeamMetricDatasourceItem[]
  expr?: string
  labels?: { [key: string]: string }
  StrategyMetricId?: number
  strategyMetricRules?: TeamStrategyMetricItemRuleItem[]
}

export interface GetTeamMetricStrategyRequest {
  /**
   * Strategy Id
   */
  strategyId?: number
  strategyType?: StrategyType
}

/**
 * api.palace.GetTeamStrategyGroupReply，GetTeamStrategyGroupReply contains the response data
 * for retrieving a team strategy group
 */
export interface GetTeamStrategyGroupReply extends TeamStrategyGroupItem {}

export interface GetTeamStrategyGroupRequest {
  /**
   * Strategy group Id
   */
  groupId?: number
}

/**
 * api.palace.ListTeamStrategyGroupReply，ListTeamStrategyGroupReply contains the response
 * data for listing team strategy groups
 */
export interface ListTeamStrategyGroupReply {
  /**
   * List of strategy group items
   */
  items?: TeamStrategyGroupItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamStrategyGroupRequest，ListTeamStrategyGroupRequest represents the
 * request data for listing team strategy groups
 */
export interface ListTeamStrategyGroupRequest {
  /**
   * Keyword to search strategy groups by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination: PaginationRequest
  /**
   * List of statuses to filter strategy groups by
   */
  status?: number[]
}

/**
 * api.palace.ListTeamStrategyReply，ListTeamStrategyReply contains the response data for
 * listing team strategies
 */
export interface ListTeamStrategyReply {
  /**
   * List of strategy items
   */
  items?: TeamStrategyItem[] /**
   * Pagination response details
   */
  pagination: PaginationReply
}

/**
 * api.palace.ListTeamStrategyRequest，ListTeamStrategyRequest represents the request data
 * for listing team strategies
 */
export interface ListTeamStrategyRequest {
  /**
   * Strategy group Id to filter strategies by
   */
  groupIds?: number[]
  /**
   * Pagination request details
   */
  pagination: PaginationRequest
  /**
   * List of statuses to filter strategies by
   */
  status?: GlobalStatus[]
}

/**
 * api.palace.SaveTeamMetricStrategyLevelsRequest
 */
export interface SaveTeamMetricStrategyLevelsRequest {
  /**
   * Levels
   */
  levels?: SaveTeamMetricStrategyLevelRequest[]
  /**
   * Strategy metric id
   */
  strategyMetricId?: number
}

/**
 * api.palace.SaveTeamMetricStrategyLevelRequest
 */
export interface SaveTeamMetricStrategyLevelRequest {
  /**
   * Condition
   */
  condition?: number
  /**
   * Duration
   */
  duration?: string
  /**
   * Id
   */
  id?: number
  /**
   * Label notices
   */
  labelNotices?: LabelNotices[]
  /**
   * Level Id
   */
  levelId?: number
  /**
   * Level name
   */
  levelName?: string
  /**
   * Receiver routes
   */
  receiverRoutes?: number[]
  /**
   * Sample mode
   */
  sampleMode?: number
  /**
   * Status
   */
  status?: number
  /**
   * Total
   */
  total?: string
  /**
   * Values
   */
  values?: number[]
}

/**
 * api.palace.LabelNotices
 */
export interface LabelNotices {
  key?: string
  receiverRoutes?: number[]
  value?: string
}

/**
 * api.palace.SaveTeamMetricStrategyRequest，SaveTeamMetricStrategyRequest represents the
 * request data for saving or updating a team metric strategy
 */
export interface SaveTeamMetricStrategyRequest {
  /**
   * Annotations
   */
  annotations?: { [key: string]: string }
  /**
   * Datasource
   */
  datasource?: number[]
  /**
   * Expression
   */
  expr?: string
  /**
   * Labels
   */
  labels?: { [key: string]: string }
  /**
   * Metric strategy id
   */
  metricStrategyId?: number
  /**
   * Strategy id
   */
  strategyId?: number
}

/**
 * api.palace.SaveTeamStrategyGroupRequest，SaveTeamStrategyGroupRequest represents the
 * request data for saving or updating a team strategy group
 */
export interface SaveTeamStrategyGroupRequest {
  /**
   * Strategy group Id, optional for new groups
   */
  groupId?: number
  /**
   * Strategy group name
   */
  name?: string
  /**
   * Strategy group remark or description
   */
  remark?: string
}

/**
 * api.palace.SaveTeamStrategyRequest
 */
export interface SaveTeamStrategyRequest {
  /**
   * Group id
   */
  groupId?: number
  /**
   * Strategy item name
   */
  name?: string
  /**
   * Receiver routes
   */
  receiverRoutes?: number[]
  /**
   * Strategy item remark or description
   */
  remark?: string
  /**
   * Strategy item Id, optional for new items
   */
  strategyId?: number
  /**
   * Strategy item type
   */
  strategyType?: number
}

/**
 * api.palace.UpdateTeamStrategyGroupStatusRequest，UpdateTeamStrategyGroupStatusRequest
 * represents the request data for updating the status of a team strategy group
 */
export interface UpdateTeamStrategyGroupStatusRequest {
  /**
   * Strategy group Id
   */
  groupId?: number
  /**
   * New status for the strategy group
   */
  status?: GlobalStatus
}
