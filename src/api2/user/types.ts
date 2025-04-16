import { PaginationReply, PaginationRequest, TeamItem, TeamStrategyItem, UserItem } from '../common.types'

/**
 * api.palace.SelfInfoReply, SelfInfoReply contains the response data for retrieving the
 * current user's information
 */
export interface SelfInfoReply {
  /**
   * Detailed information about the user
   */
  user?: UserItem
}

/**
 * api.palace.UpdateSelfInfoRequest, UpdateSelfInfoRequest represents the request data for
 * updating the current user's information
 */
export interface UpdateSelfInfoRequest {
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
}

/**
 * api.palace.CreateTeamRequest, CreateTeamRequest represents the request data for creating a
 * new team
 */
export interface CreateTeamRequest {
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
 * api.palace.JoinTeamRequest, JoinTeamRequest represents the request data for joining a team
 */
export interface JoinTeamRequest {
  /**
   * Reason for joining the team
   */
  reason?: string
  /**
   * Team name to join
   */
  teamName?: string
}

/**
 * api.palace.LeaveTeamRequest, LeaveTeamRequest represents the request data for leaving a
 * team
 */
export interface LeaveTeamRequest {
  /**
   * Reason for leaving the team
   */
  reason?: string
  /**
   * Team ID to leave
   */
  teamID?: number
}

/**
 * api.palace.UpdateSelfPasswordRequest, UpdateSelfPasswordRequest represents the request
 * data for updating the current user's password
 */
export interface UpdateSelfPasswordRequest {
  /**
   * New password
   */
  newPassword?: string
  /**
   * Current password
   */
  oldPassword?: string
}

/**
 * api.palace.SelfSubscribeTeamStrategiesRequest, SelfSubscribeTeamStrategiesRequest
 * represents the request data for retrieving subscribed team strategies
 */
export interface SelfSubscribeTeamStrategiesRequest {
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
}

/**
 * api.palace.SelfSubscribeTeamStrategiesReply, SelfSubscribeTeamStrategiesReply contains the
 * response data for retrieving subscribed team strategies
 */
export interface SelfSubscribeTeamStrategiesReply {
  /**
   * List of team strategy items
   */
  items?: TeamStrategyItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.SelfTeamListReply，SelfTeamListReply contains the response data for retrieving
 * the list of teams the current user is a member of
 */
export interface SelfTeamListReply {
  /**
   * List of team items
   */
  items?: TeamItem[]
}
