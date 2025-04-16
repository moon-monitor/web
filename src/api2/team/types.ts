import {
  BasicAuth,
  NoticeGroupItem,
  NoticeHookItem,
  PaginationReply,
  PaginationRequest,
  ResourceItem,
  TeamDashboardChartItem,
  TeamDashboardItem,
  TeamDictItem,
  TeamItem,
  TeamMemberItem,
  TeamMetricDatasourceItem,
  TeamRoleItem,
  TeamStrategyGroupItem,
  TeamStrategyItem,
  TeamStrategyMetricItem,
  TLS
} from '../common.types'

/**
 * api.palace.SelfTeamListReply, SelfTeamListReply contains the response data for retrieving
 * the list of teams the current user is a member of
 */
export interface SelfTeamListReply {
  /**
   * List of team items
   */
  items?: TeamItem[]
}

/**
 * api.palace.SaveEmailConfigRequest, SaveEmailConfigRequest represents the request data for
 * saving or updating the email configuration
 */
export interface SaveEmailConfigRequest {
  /**
   * Email server host
   */
  host?: string
  /**
   * id of the email configuration
   */
  id?: number
  /**
   * Name of the email configuration
   */
  name?: string
  /**
   * Email password
   */
  pass?: string
  /**
   * Email server port
   */
  port?: number
  /**
   * Remark of the email configuration
   */
  remark?: string
  /**
   * Enable email configuration
   */
  status?: number
  /**
   * Email user
   */
  user?: string
}

/**
 * api.palace.GetEmailConfigReply, GetEmailConfigReply contains the response data for
 * retrieving the email configuration
 */
export interface GetEmailConfigReply {
  /**
   * List of email configuration items
   */
  items?: EmailConfigItem[]
}

/**
 * api.palace.EmailConfigItem, EmailConfigItem represents the structure of an email
 * configuration
 */
export interface EmailConfigItem {
  /**
   * Enable email configuration
   */
  enable?: boolean
  /**
   * Email server host
   */
  host?: string
  /**
   * id of the email configuration
   */
  id?: number
  /**
   * Name of the email configuration
   */
  name?: string
  /**
   * Email password
   */
  pass?: string
  /**
   * Email server port
   */
  port?: number
  /**
   * Remark of the email configuration
   */
  remark?: string
  /**
   * Email user
   */
  user?: string
}
/**
 * api.palace.InviteMemberRequest, InviteMemberRequest represents the request data for
 * inviting a new member to the team
 */
export interface InviteMemberRequest {
  /**
   * Position of the new member
   */
  position?: number
  /**
   * List of role IDs to assign to the new member
   */
  roleIds?: number[]
  /**
   * Email of the user to invite
   */
  userEmail?: string
}

/**
 * api.palace.GetTeamMembersReply, GetTeamMembersReply contains the response data for
 * retrieving team members
 */
export interface GetTeamMembersReply {
  /**
   * List of team member items
   */
  items?: TeamMemberItem[]
}

/**
 * api.palace.RemoveMemberRequest, RemoveMemberRequest represents the request data for
 * removing a member from the team
 */
export interface RemoveMemberRequest {
  /**
   * Email of the user to remove
   */
  userEmail?: string
}

/**
 * api.palace.GetTeamResourcesReply, GetTeamResourcesReply contains the response data for
 * retrieving team resources
 */
export interface GetTeamResourcesReply {
  /**
   * List of resource items associated with the team
   */
  items?: ResourceItem[]
}

/**
 * api.palace.SaveTeamRequest, SaveTeamRequest represents the request data for saving or
 * updating a team
 */
export interface SaveTeamRequest {
  /**
   * Team logo URL
   */
  logo?: string
  /**
   * Team name
   */
  name?: string
  /**
   * Team remark or description
   */
  remark?: string
}

/**
 * api.palace.TransferTeamRequest, TransferTeamRequest represents the request data for
 * transferring team leadership
 */
export interface TransferTeamRequest {
  /**
   * New leader's user ID
   */
  newLeaderID?: number
}

/**
 * api.palace.UpdateMemberPositionRequest, UpdateMemberPositionRequest represents the request
 * data for updating a member's position
 */
export interface UpdateMemberPositionRequest {
  /**
   * Member ID
   */
  memberID?: number
  /**
   * New position for the member
   */
  position?: number
}

/**
 * api.palace.UpdateMemberRolesRequest, UpdateMemberRolesRequest represents the request data
 * for updating the roles of multiple members
 */
export interface UpdateMemberRolesRequest {
  /**
   * List of member IDs to update
   */
  memberIDs?: number[]
  /**
   * List of role IDs to assign to the members
   */
  roleIDs?: number[]
}

/**
 * api.palace.UpdateMemberStatusRequest, UpdateMemberStatusRequest represents the request
 * data for updating the status of multiple members
 */
export interface UpdateMemberStatusRequest {
  /**
   * List of member IDs to update
   */
  memberIDs?: number[]
  /**
   * New status for the members
   */
  status?: number
}

/**
 * api.palace.SaveTeamRoleRequest, SaveTeamRoleRequest represents the request data for saving
 * or updating a team role
 */
export interface SaveTeamRoleRequest {
  /**
   * Role name
   */
  name?: string
  /**
   * Role remark or description
   */
  remark?: string
  /**
   * List of resource IDs associated with the role
   */
  resourceIDs?: number[]
  /**
   * Role ID, optional for new roles
   */
  roleID?: number
}

/**
 * api.palace.GetTeamRolesReply, GetTeamRolesReply contains the response data for retrieving
 * team roles
 */
export interface GetTeamRolesReply {
  /**
   * List of team role items
   */
  items?: TeamRoleItem[]
}

export interface DeleteTeamRoleRequest {
  /**
   * Role ID to delete
   */
  roleID?: number
}

/**
 * api.palace.ListTeamDashboardChartRequest
 */
export interface ListTeamDashboardChartRequest {
  dashboardID?: number
  pagination?: PaginationRequest
}

/**
 * api.palace.ListTeamDashboardChartReply
 */
export interface ListTeamDashboardChartReply {
  items?: TeamDashboardChartItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.UpdateTeamDashboardChartStatusRequest
 */
export interface UpdateTeamDashboardChartStatusRequest {
  chartIds?: number[]
  dashboardID?: number
  status?: number
}

/**
 * api.palace.ListTeamDashboardRequest
 */
export interface ListTeamDashboardRequest {
  pagination?: PaginationRequest
}

/**
 * api.palace.ListTeamDashboardReply
 */
export interface Response {
  items?: TeamDashboardItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.UpdateTeamDashboardStatusRequest
 */
export interface UpdateTeamDashboardStatusRequest {
  dashboardIds?: number[]
  status?: number
}

export interface GetTeamDashboardRequest {
  dashboardID?: number
}

/**
 * api.palace.GetTeamDashboardReply
 */
export interface GetTeamDashboardReply {
  dashboard?: TeamDashboardItem
}

/**
 * api.palace.SaveTeamDashboardRequest
 */
export interface SaveTeamDashboardRequest {
  colorHex?: string
  dashboardID?: number
  remark?: string
  status?: number
  title?: string
}

export interface DeleteTeamDashboardRequest {
  dashboardID?: number
}

export interface GetTeamDashboardChartRequest {
  chartID?: number
  dashboardID?: number
}

/**
 * api.palace.GetTeamDashboardChartReply
 */
export interface GetTeamDashboardChartReply {
  chart?: TeamDashboardChartItem
}

/**
 * api.palace.SaveTeamDashboardChartRequest
 */
export interface SaveTeamDashboardChartRequest {
  chartID?: number
  dashboardID?: number
  height?: string
  remark?: string
  status?: number
  title?: string
  url?: string
  width?: string
}

export interface DeleteTeamDashboardChartRequest {
  chartID?: number
  dashboardID?: number
}

export interface GetTeamStrategyRequest {
  /**
   * Strategy ID
   */
  strategyID?: number
}

/**
 * api.palace.GetTeamStrategyReply, GetTeamStrategyReply contains the response data for
 * retrieving a team strategy
 */
export interface GetTeamStrategyReply {
  /**
   * Detailed information about the strategy
   */
  detail?: TeamStrategyMetricItem
}

export interface DeleteTeamStrategyRequest {
  /**
   * Strategy ID
   */
  strategyID?: number
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
  pagination?: PaginationRequest
  /**
   * List of statuses to filter strategy groups by
   */
  status?: number[]
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
 * api.palace.UpdateTeamStrategyGroupStatusRequest，UpdateTeamStrategyGroupStatusRequest
 * represents the request data for updating the status of a team strategy group
 */
export interface UpdateTeamStrategyGroupStatusRequest {
  /**
   * Strategy group ID
   */
  groupID?: number
  /**
   * New status for the strategy group
   */
  status?: number
}
/**
 * api.palace.ListTeamStrategyRequest，ListTeamStrategyRequest represents the request data
 * for listing team strategies
 */
export interface ListTeamStrategyRequest {
  /**
   * Strategy group ID to filter strategies by
   */
  groupID?: number
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of statuses to filter strategies by
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
  pagination?: PaginationReply
}

/**
 * api.palace.UpdateTeamStrategiesStatusRequest，UpdateTeamStrategiesStatusRequest represents
 * the request data for updating the status of multiple team strategies
 */
export interface UpdateTeamStrategiesStatusRequest {
  /**
   * New status for the strategies
   */
  status?: number
  /**
   * List of strategy IDs to update
   */
  strategyIDs?: number[]
}

/**
 * api.palace.SubscribeTeamStrategyRequest，SubscribeTeamStrategyRequest represents the
 * request data for subscribing or unsubscribing from a team strategy
 */
export interface SubscribeTeamStrategyRequest {
  /**
   * Subscription status (true to subscribe, false to unsubscribe)
   */
  isSubscribe?: boolean
  /**
   * Strategy ID
   */
  strategyID?: number
}

/**
 * api.palace.SubscribeTeamStrategiesRequest，SubscribeTeamStrategiesRequest represents the
 * request data for subscribing or unsubscribing from multiple team strategies
 */
export interface SubscribeTeamStrategiesRequest {
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
}

/**
 * api.palace.SubscribeTeamStrategiesReply
 */
export interface SubscribeTeamStrategiesReply {
  items?: TeamStrategyItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetTeamStrategyGroupReply，GetTeamStrategyGroupReply contains the response data
 * for retrieving a team strategy group
 */
export interface GetTeamStrategyGroupReply {
  /**
   * Detailed information about the strategy group
   */
  detail?: TeamStrategyGroupItem
}

/**
 * api.palace.SaveTeamStrategyGroupRequest，SaveTeamStrategyGroupRequest represents the
 * request data for saving or updating a team strategy group
 */
export interface SaveTeamStrategyGroupRequest {
  /**
   * Strategy group ID, optional for new groups
   */
  groupID?: number
  /**
   * Strategy group name
   */
  name?: string
  /**
   * Strategy group remark or description
   */
  remark?: string
}

export interface DeleteTeamStrategyGroupRequest {
  /**
   * Strategy group ID
   */
  groupID?: number
}

/**
 * api.palace.ListTeamDictRequest
 */
export interface ListTeamDictRequest {
  dictTypes?: number[]
  keyword?: string
  langs?: string[]
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTeamDictReply
 */
export interface ListTeamDictReply {
  items?: TeamDictItem[]
  pagination?: PaginationReply
}
/**
 * api.palace.UpdateTeamDictStatusRequest
 */
export interface UpdateTeamDictStatusRequest {
  dictIds?: number[]
  status?: number
}

export interface GetTeamDictRequest {
  dictID?: number
}
/**
 * api.palace.GetTeamDictReply
 */
export interface GetTeamDictReply {
  detail?: TeamDictItem
}

/**
 * api.palace.SaveTeamDictRequest
 */
export interface SaveTeamDictRequest {
  color?: string
  dictID?: number
  dictType?: number
  key?: string
  lang?: string
  value?: string
}

export interface DeleteTeamDictRequest {
  dictID?: number
}

/**
 * api.palace.ListTeamMetricDatasourceRequest
 */
export interface ListTeamMetricDatasourceRequest {
  keyword?: string
  pagination?: PaginationRequest
}

/**
 * api.palace.ListTeamMetricDatasourceReply
 */
export interface ListTeamMetricDatasourceReply {
  items?: TeamMetricDatasourceItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.UpdateTeamMetricDatasourceStatusRequest
 */
export interface UpdateTeamMetricDatasourceStatusRequest {
  datasourceID?: number
  metricDatasourceDriver?: number
  status?: number
}

export interface GetTeamMetricDatasourceRequest {
  datasourceID?: number
  metricDatasourceDriver?: number
}
/**
 * api.palace.GetTeamMetricDatasourceReply
 */
export interface GetTeamMetricDatasourceReply {
  detail?: TeamMetricDatasourceItem
}

/**
 * api.palace.SaveTeamMetricDatasourceRequest
 */
export interface SaveTeamMetricDatasourceRequest {
  basicAuth?: BasicAuth
  ca?: string
  datasourceID?: number
  endpoint?: string
  extra?: { [key: string]: string }
  headers?: { [key: string]: string }
  metricDatasourceDriver?: number
  name?: string
  queryMethod?: number
  remark?: string
  scrapeInterval?: string
  tls?: TLS
}

export interface DeleteTeamMetricDatasourceRequest {
  datasourceID?: number
  metricDatasourceDriver?: number
}

export interface GetTeamNoticeGroupRequest {
  groupID?: number
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
  groupID?: number
}

/**
 * api.palace.ListTeamNoticeGroupRequest
 */
export interface ListTeamNoticeGroupRequest {
  hookIDs?: number[]
  keyword?: string
  memberIDs?: number[]
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTeamNoticeGroupReply
 */
export interface ListTeamNoticeGroupReply {
  items?: NoticeGroupItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.UpdateTeamNoticeGroupStatusRequest
 */
export interface UpdateTeamNoticeGroupStatusRequest {
  groupID?: number
  status?: number
}

export interface GetTeamNoticeHookRequest {
  hookID?: number
}

/**
 * api.palace.GetTeamNoticeHookReply
 */
export interface GetTeamNoticeHookReply {
  detail?: NoticeHookItem
}

/**
 * api.palace.DeleteTeamNoticeHookRequest
 */
export interface DeleteTeamNoticeHookRequest {
  hookID?: number
}

/**
 * api.palace.ListTeamNoticeHookRequest
 */
export interface ListTeamNoticeHookRequest {
  apps?: number[]
  keyword?: string
  pagination?: PaginationRequest
  status?: number
  url?: string
}

/**
 * api.palace.ListTeamNoticeHookReply
 */
export interface ListTeamNoticeHookReply {
  items?: NoticeHookItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.UpdateTeamNoticeHookStatusRequest
 */
export interface UpdateTeamNoticeHookStatusRequest {
  hookID?: number
  status?: number
}
