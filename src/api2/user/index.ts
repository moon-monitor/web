import { EmptyReply } from '../common.types'
import request from '../request'
import {
  CreateTeamRequest,
  JoinTeamRequest,
  LeaveTeamRequest,
  SelfInfoReply,
  SelfSubscribeTeamStrategiesReply,
  SelfSubscribeTeamStrategiesRequest,
  SelfTeamListReply,
  UpdateSelfInfoRequest,
  UpdateSelfPasswordRequest
} from './types'

/**
 * SelfInfo retrieves the current user's information
 * @returns {Promise<SelfInfoReply>}
 */
export function selfInfo(): Promise<SelfInfoReply> {
  return request.GET<SelfInfoReply>('/api/user/self')
}

/**
 * UpdateSelfInfo updates the current user's information
 * @param {UpdateSelfInfoRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateSelfInfo(params: UpdateSelfInfoRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/user/self', params)
}

/**
 * CreateTeam allows the current user to create a new team
 * @param {CreateTeamRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function createTeam(params: CreateTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/user/self/create-team', params)
}

/**
 * JoinTeam allows the current user to join a team
 * @param {JoinTeamRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function joinTeam(params: JoinTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/user/self/join-team', params)
}

/**
 * LeaveTeam allows the current user to leave a team
 * @param {LeaveTeamRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function leaveTeam(params: LeaveTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/user/self/leave-team', params)
}

/**
 * UpdateSelfPassword updates the current user's password
 * @param {UpdateSelfPasswordRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateSelfPassword(params: UpdateSelfPasswordRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/user/self/password', params)
}

/**
 * SelfSubscribeTeamStrategies retrieves the list of team strategies the current user is subscribed to
 * @param {SelfSubscribeTeamStrategiesRequest} params
 * @returns {Promise<SelfSubscribeTeamStrategiesReply>}
 */
export function selfSubscribeTeamStrategies(
  params: SelfSubscribeTeamStrategiesRequest
): Promise<SelfSubscribeTeamStrategiesReply> {
  return request.GET<SelfSubscribeTeamStrategiesReply>('/api/user/self/subscribe/team/strategies', params)
}

/**
 * SelfTeamList retrieves the list of teams the current user is a member of
 * @returns {Promise<SelfTeamListReply>}
 */
export function selfTeamList(): Promise<SelfTeamListReply> {
  return request.GET<SelfTeamListReply>('/api/user/self/team-list')
}
