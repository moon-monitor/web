import { EmptyReply } from '../common.types'
import request from '../request'
import {
  GetSystemRoleReply,
  GetSystemRoleRequest,
  GetTeamAuditListReply,
  GetTeamAuditListRequest,
  GetTeamListReply,
  GetTeamListRequest,
  GetTeamReply,
  GetTeamRequest,
  GetUserListReply,
  GetUserListRequest,
  GetUserReply,
  GetUserRequest,
  OperateLogListReply,
  OperateLogListRequest,
  ResetUserPasswordRequest,
  SaveRoleRequest,
  UpdateRoleStatusRequest,
  UpdateRoleUsersRequest,
  UpdateTeamAuditStatusRequest,
  UpdateUserPositionRequest,
  UpdateUserRequest,
  UpdateUserRolesRequest,
  UpdateUserStatusRequest
} from './types'

/**
 * OperateLogList lists operation logs based on specified filters
 * @param {OperateLogListRequest} params
 * @returns {Promise<OperateLogListReply>}
 */
export function operateLogList(params: OperateLogListRequest): Promise<OperateLogListReply> {
  return request.POST<OperateLogListReply>('/api/system/operate/log/list', params)
}

/**
 * GetSystemRole retrieves a system role by ID
 *@param {GetSystemRoleRequest} params
 *@returns {Promise<GetSystemRoleReply>}
 */
export function getSystemRole(params: GetSystemRoleRequest): Promise<GetSystemRoleReply> {
  return request.GET<GetSystemRoleReply>('/api/system/role', params)
}

/**
 * SaveRole saves a new role or updates an existing one
 * @param {SaveRoleRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveRole(params: SaveRoleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/system/role', params)
}

/**
 * UpdateRoleStatus updates the status of a role
 * @param {UpdateRoleStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateRoleStatus(params: UpdateRoleStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/role/status', params)
}

/**
 * UpdateRoleUsers updates the users assigned to a role
 * @param {UpdateRoleUsersRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateRoleUsers(params: UpdateRoleUsersRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/role/users', params)
}

/**
 * GetTeamAuditList lists team audit records based on specified filters
 * @param {GetTeamAuditListRequest} params
 * @returns {Promise<GetTeamAuditListReply>}
 */
export function getTeamAuditList(params: GetTeamAuditListRequest): Promise<GetTeamAuditListReply> {
  return request.POST<GetTeamAuditListReply>('/api/system/team/audit/list', params)
}

/**
 * UpdateTeamAuditStatus updates the status of a team audit record
 * @param {UpdateTeamAuditStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamAuditStatus(params: UpdateTeamAuditStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/team/audit/status', params)
}

/**
 * GetTeamList lists teams based on specified filters
 * @param {GetTeamListRequest} params
 * @returns {Promise<ListTeamReply>}
 */
export function getTeamList(params: GetTeamListRequest): Promise<GetTeamListReply> {
  return request.POST<GetTeamListReply>('/api/system/team/list', params)
}
/**
 * GetTeam retrieves a team by Id
 * @param {GetTeamRequest} params
 * @returns {Promise<GetTeamReply>}
 */
export function getTeam(params: GetTeamRequest): Promise<GetTeamReply> {
  return request.GET<GetTeamReply>('/api/system/team/detail', params)
}

/**
 * UpdateUser updates user information
 * @param {UpdateUserRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateUser(params: UpdateUserRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user', params)
}

/**
 * GetUserList lists users based on specified filters
 * @param {ListUserRequest} params
 * @returns {Promise<ListUserReply>}
 */
export function getUserList(params: GetUserListRequest): Promise<GetUserListReply> {
  return request.POST<GetUserListReply>('/api/system/user/list', params)
}

/**
 * ResetUserPassword resets the password for multiple users
 * @param {ResetUserPasswordRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function resetUserPassword(params: ResetUserPasswordRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/password', params)
}

/**
 * UpdateUserPosition updates the position of a user
 * @param {UpdateUserPositionRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateUserPosition(params: UpdateUserPositionRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/position', params)
}

/**
 * UpdateUserRoles updates the roles assigned to a user
 * @param {UpdateUserRolesRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateUserRoles(params: UpdateUserRolesRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/roles', params)
}

/**
 * UpdateUserStatus updates the status of multiple users
 * @param {UpdateUserStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateUserStatus(params: UpdateUserStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/status', params)
}

/**
 * GetUser retrieves a user by ID
 * @param GetUserRequest params
 * @returns {Promise<GetUserReply>}
 */
export function getUser(params: GetUserRequest): Promise<GetUserReply> {
  return request.GET<GetUserReply>('/api/system/user/detail', params)
}
