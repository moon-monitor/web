import {
  GlobalStatusKey,
  NoticeGroupItem,
  NoticeHookItem,
  PaginationReply,
  PaginationRequest,
  ResourceItem,
  TeamDashboardChartItem,
  TeamDashboardItem,
  TeamItem,
  TeamMemberItem,
  TeamRoleItem,
  TeamStrategyItem
} from '../common.types'

/**
 * api.palace.GetTeamReply，GetTeamReply contains the response data for retrieving a team
 */
export interface GetTeamReply {
  /**
   * Detailed information about the team
   */
  detail: TeamItem
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
   * List of role Ids to assign to the new member
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
   * New leader's user Id
   */
  newLeaderId?: number
}

/**
 * api.palace.UpdateMemberPositionRequest, UpdateMemberPositionRequest represents the request
 * data for updating a member's position
 */
export interface UpdateMemberPositionRequest {
  /**
   * Member Id
   */
  memberId?: number
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
   * List of member Ids to update
   */
  memberIds?: number[]
  /**
   * List of role Ids to assign to the members
   */
  roleIds?: number[]
}

/**
 * api.palace.UpdateMemberStatusRequest, UpdateMemberStatusRequest represents the request
 * data for updating the status of multiple members
 */
export interface UpdateMemberStatusRequest {
  /**
   * List of member Ids to update
   */
  memberIds?: number[]
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
   * List of resource Ids associated with the role
   */
  menuIds?: number[]
  /**
   * Role Id, optional for new roles
   */
  roleId?: number
}

export interface GetTeamRolesRequest {
  pagination: PaginationRequest
  keyword?: string
  status?: GlobalStatusKey
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
  pagination?: PaginationReply
}

export interface DeleteTeamRoleRequest {
  /**
   * Role Id to delete
   */
  roleId?: number
}

/**
 * api.palace.ListTeamDashboardChartRequest
 */
export interface ListTeamDashboardChartRequest {
  dashboardId?: number
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
  dashboardId?: number
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
  dashboardId?: number
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
  dashboardId?: number
  remark?: string
  status?: number
  title?: string
}

export interface DeleteTeamDashboardRequest {
  dashboardId?: number
}

export interface GetTeamDashboardChartRequest {
  chartId?: number
  dashboardId?: number
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
  chartId?: number
  dashboardId?: number
  height?: string
  remark?: string
  status?: number
  title?: string
  url?: string
  width?: string
}

export interface DeleteTeamDashboardChartRequest {
  chartId?: number
  dashboardId?: number
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
   * List of strategy Ids to update
   */
  strategyIds?: number[]
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
   * Strategy Id
   */
  strategyId?: number
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

export interface DeleteTeamStrategyGroupRequest {
  /**
   * Strategy group Id
   */
  groupId?: number
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
  status?: number
}

export interface GetTeamNoticeHookRequest {
  hookId?: number
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
  hookId?: number
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
  hookId?: number
  status?: number
}

export interface UpdateTeamRoleStatusRequest {
  roleId?: number
  status?: GlobalStatusKey
}
