import {
  OperateLogItem,
  PaginationReply,
  PaginationRequest,
  SystemRoleItem,
  TeamAuditItem,
  TeamItem,
  UserItem
} from '../common.types'
import { UserStatus } from '../enum'

/**
 * api.palace.OperateLogListRequest，OperateLogListRequest represents the request data for
 * listing operation logs
 */
export interface OperateLogListRequest {
  /**
   * Keyword to search operation logs by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of types to filter operation logs by
   */
  type?: number[]
  /**
   * User Id, optional for filtering logs by user
   */
  userId?: number
}

/**
 * api.palace.OperateLogListReply，OperateLogListReply contains the response data for listing
 * operation logs
 */
export interface OperateLogListReply {
  /**
   * List of operation log items
   */
  items?: OperateLogItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}
export interface GetSystemRoleRequest {
  /**
   * Role Id
   */
  roleId?: number
}

/**
 * api.palace.GetSystemRoleReply，GetSystemRoleReply contains the response data for
 * retrieving a system role
 */
export interface GetSystemRoleReply {
  /**
   * Detailed information about the system role
   */
  role?: SystemRoleItem
}

/**
 * api.palace.SaveRoleRequest，SaveRoleRequest represents the request data for saving or
 * updating a role
 */
export interface SaveRoleRequest {
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
  resourceIds?: number[]
  /**
   * Role Id, optional for new roles
   */
  roleId?: number
}

/**
 * api.palace.UpdateRoleStatusRequest，UpdateRoleStatusRequest represents the request data
 * for updating role status
 */
export interface UpdateRoleStatusRequest {
  /**
   * Role Id
   */
  roleId?: number
  /**
   * New status for the role
   */
  status?: number
}

/**
 * api.palace.UpdateRoleUsersRequest，UpdateRoleUsersRequest represents the request data for
 * updating role users
 */
export interface UpdateRoleUsersRequest {
  /**
   * Role Id
   */
  roleId?: number
  /**
   * List of user Ids to assign to the role
   */
  userIds?: number[]
}

/**
 * api.palace.GetTeamAuditListRequest，GetTeamAuditListRequest represents the request data
 * for listing team audit records
 */
export interface GetTeamAuditListRequest {
  /**
   * Keyword to search team audit records by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of statuses to filter team audit records by
   */
  status?: number[]
  /**
   * User Id, optional for filtering audits by user
   */
  userId?: number
}

/**
 * api.palace.GetTeamAuditListReply，GetTeamAuditListReply contains the response data for
 * listing team audit records
 */
export interface GetTeamAuditListReply {
  /**
   * List of team audit items
   */
  items?: TeamAuditItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.UpdateTeamAuditStatusRequest，UpdateTeamAuditStatusRequest represents the
 * request data for updating team audit status
 */
export interface UpdateTeamAuditStatusRequest {
  /**
   * Audit Id
   */
  auditId?: number
  /**
   * Reason for the status update
   */
  reason?: string
  /**
   * New status for the team audit record
   */
  status?: number
}

/**
 * api.palace.GetTeamListRequest，GetTeamListRequest represents the request data for listing
 * teams
 */
export interface GetTeamListRequest {
  /**
   * Keyword to search teams by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination: PaginationRequest
  /**
   * List of statuses to filter teams by
   */
  status?: UserStatus[]

  leaderId?: number
  creatorId?: number
}
/**
 * api.palace.GetTeamListReply，GetTeamListReply contains the response data for listing teams
 */
export interface GetTeamListReply {
  /**
   * List of team items
   */
  items: TeamItem[]
  /**
   * Pagination response details
   */
  pagination: PaginationReply
}

/**
 * api.palace.UpdateUserRequest，UpdateUserRequest represents the request data for updating
 * user information
 */
export interface UpdateUserRequest {
  /**
   * User avatar URL
   */
  avatar?: string
  /**
   * User gender
   */
  gender?: number
  /**
   * User nickname
   */
  nickname?: string
  /**
   * User Id
   */
  userId?: number
}

/**
 * api.palace.GetUserListRequest，GetUserListRequest represents the request data for listing
 * users
 */
export interface GetUserListRequest {
  /**
   * Pagination request details
   */
  pagination: PaginationRequest
  /**
   * List of positions to filter users by
   */
  position?: number[]
  /**
   * List of statuses to filter users by
   */
  status?: number[]
  /**
   * Keyword to search users by
   */
  keyword?: string
}

/**
 * api.palace.GetUserListReply，GetUserListReply contains the response data for listing users
 */
export interface GetUserListReply {
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
  /**
   * List of user items
   */
  items?: UserItem[]
}

/**
 * api.palace.ResetUserPasswordRequest，ResetUserPasswordRequest represents the request data
 * for resetting user passwords
 */
export interface ResetUserPasswordRequest {
  /**
   * List of user Ids to reset passwords for
   */
  userId?: number
}

/**
 * api.palace.UpdateUserPositionRequest，UpdateUserPositionRequest represents the request
 * data for updating user position
 */
export interface UpdateUserPositionRequest {
  /**
   * New position for the user
   */
  position: number
  /**
   * User Id
   */
  userId: number
}

/**
 * api.palace.UpdateUserRolesRequest，UpdateUserRolesRequest represents the request data for
 * updating user roles
 */
export interface UpdateUserRolesRequest {
  /**
   * List of role Ids to assign to the user
   */
  roleIds: number[]
  /**
   * User Id
   */
  userId: number
}

/**
 * api.palace.UpdateUserStatusRequest，UpdateUserStatusRequest represents the request data
 * for updating user status
 */
export interface UpdateUserStatusRequest {
  /**
   * New status for the users
   */
  status?: UserStatus
  /**
   * List of user Ids to update
   */
  userIds?: number[]
}
/**
 * api.palace.GetUserReply，GetUserReply contains the response data for retrieving a user
 */
export interface GetUserReply extends UserItem {}

export interface GetUserRequest {
  /**
   * User Id
   */
  userId?: number
}

export interface GetTeamRequest {
  /**
   * Team Id
   */
  teamId?: number
}
export interface GetTeamReply extends TeamItem {}
