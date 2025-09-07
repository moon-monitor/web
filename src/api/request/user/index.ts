// user 模块API函数
import {
  CreateTeamRequest,
  EmptyReply,
  EmptyRequest,
  JoinTeamRequest,
  LeaveTeamRequest,
  SelfSubscribeTeamStrategiesReply,
  SelfSubscribeTeamStrategiesRequest,
  SelfTeamListReply,
  UpdateSelfAvatarRequest,
  UpdateSelfInfoRequest,
  UpdateSelfPasswordRequest,
  UserItem
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * UpdateSelfPassword User
 * @param { UpdateSelfPasswordRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateSelfPassword(params: UpdateSelfPasswordRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/user/self/password', params)
}

/**
 * JoinTeam User
 * @param { JoinTeamRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function joinTeam(params: JoinTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/user/self/join-team', params)
}

/**
 * CreateTeam User
 * @param { CreateTeamRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function createTeam(params: CreateTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/user/self/create-team', params)
}

/**
 * SelfTeamList User
 * @param { EmptyRequest } params
 * @returns {Promise<SelfTeamListReply>}
 */
export function selfTeamList(params: EmptyRequest): Promise<SelfTeamListReply> {
  return request.GET<SelfTeamListReply>('/api/user/self/team-list', params)
}

/**
 * LeaveTeam User
 * @param { LeaveTeamRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function leaveTeam(params: LeaveTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/user/self/leave-team', params)
}

/**
 * SelfSubscribeTeamStrategies User
 * @param { SelfSubscribeTeamStrategiesRequest } params
 * @returns {Promise<SelfSubscribeTeamStrategiesReply>}
 */
export function selfSubscribeTeamStrategies(
  params: SelfSubscribeTeamStrategiesRequest
): Promise<SelfSubscribeTeamStrategiesReply> {
  return request.POST<SelfSubscribeTeamStrategiesReply>('/api/user/self/subscribe/team/strategies', params)
}

/**
 * SelfInfo User
 * @param { EmptyRequest } params
 * @returns {Promise<UserItem>}
 */
export function selfInfo(params: EmptyRequest): Promise<UserItem> {
  return request.GET<UserItem>('/api/user/self', params)
}

/**
 * UpdateSelfInfo User
 * @param { UpdateSelfInfoRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateSelfInfo(params: UpdateSelfInfoRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/user/self', params)
}

/**
 * UpdateSelfAvatar User
 * @param { UpdateSelfAvatarRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateSelfAvatar(params: UpdateSelfAvatarRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/user/self/avatar', params)
}
