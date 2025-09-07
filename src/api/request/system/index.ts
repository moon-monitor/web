// system 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  GetSystemRolesReply,
  GetSystemRolesRequest,
  GetTeamAuditListReply,
  GetTeamAuditListRequest,
  GetTeamListReply,
  GetTeamListRequest,
  GetUserListReply,
  GetUserListRequest,
  OperateLogListReply,
  OperateLogListRequest,
  ResetUserPasswordRequest,
  SaveRoleRequest,
  SystemRoleItem,
  TeamItem,
  UpdateRoleStatusRequest,
  UpdateRoleUsersRequest,
  UpdateTeamAuditStatusRequest,
  UpdateUserPositionRequest,
  UpdateUserRolesRequest,
  UpdateUserStatusRequest,
  UserItem
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * UpdateRoleStatus System
 * @param { UpdateRoleStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateRoleStatus(params: UpdateRoleStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/role/status', params)
}

/**
 * UpdateRoleUsers System
 * @param { UpdateRoleUsersRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateRoleUsers(params: UpdateRoleUsersRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/role/users', params)
}

/**
 * UpdateUserPosition System
 * @param { UpdateUserPositionRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateUserPosition(params: UpdateUserPositionRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/position', params)
}

/**
 * GetUser System
 * @param { EmptyRequest } params
 * @returns {Promise<UserItem>}
 */
export function getUser(params: EmptyRequest): Promise<UserItem> {
  return request.GET<UserItem>('/api/system/user/detail', params)
}

/**
 * GetTeamList System
 * @param { GetTeamListRequest } params
 * @returns {Promise<GetTeamListReply>}
 */
export function getTeamList(params: GetTeamListRequest): Promise<GetTeamListReply> {
  return request.POST<GetTeamListReply>('/api/system/team/list', params)
}

/**
 * GetSystemRoles System
 * @param { GetSystemRolesRequest } params
 * @returns {Promise<GetSystemRolesReply>}
 */
export function getSystemRoles(params: GetSystemRolesRequest): Promise<GetSystemRolesReply> {
  return request.POST<GetSystemRolesReply>('/api/system/role/list', params)
}

/**
 * GetTeamAuditList System
 * @param { GetTeamAuditListRequest } params
 * @returns {Promise<GetTeamAuditListReply>}
 */
export function getTeamAuditList(params: GetTeamAuditListRequest): Promise<GetTeamAuditListReply> {
  return request.POST<GetTeamAuditListReply>('/api/system/team/audit/list', params)
}

/**
 * UpdateUserStatus System
 * @param { UpdateUserStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateUserStatus(params: UpdateUserStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/status', params)
}

/**
 * GetTeam System
 * @param { EmptyRequest } params
 * @returns {Promise<TeamItem>}
 */
export function getTeam(params: EmptyRequest): Promise<TeamItem> {
  return request.GET<TeamItem>('/api/system/team/detail', params)
}

/**
 * UpdateTeamAuditStatus System
 * @param { UpdateTeamAuditStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamAuditStatus(params: UpdateTeamAuditStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/team/audit/status', params)
}

/**
 * SaveRole System
 * @param { SaveRoleRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveRole(params: SaveRoleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/system/role', params)
}

/**
 * GetSystemRole System
 * @param { EmptyRequest } params
 * @returns {Promise<SystemRoleItem>}
 */
export function getSystemRole(params: EmptyRequest): Promise<SystemRoleItem> {
  return request.GET<SystemRoleItem>('/api/system/role', params)
}

/**
 * OperateLogList System
 * @param { OperateLogListRequest } params
 * @returns {Promise<OperateLogListReply>}
 */
export function operateLogList(params: OperateLogListRequest): Promise<OperateLogListReply> {
  return request.POST<OperateLogListReply>('/api/system/operate/log/list', params)
}

/**
 * ResetUserPassword System
 * @param { ResetUserPasswordRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function resetUserPassword(params: ResetUserPasswordRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/password', params)
}

/**
 * GetUserList System
 * @param { GetUserListRequest } params
 * @returns {Promise<GetUserListReply>}
 */
export function getUserList(params: GetUserListRequest): Promise<GetUserListReply> {
  return request.POST<GetUserListReply>('/api/system/user/list', params)
}

/**
 * UpdateUserRoles System
 * @param { UpdateUserRolesRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateUserRoles(params: UpdateUserRolesRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/system/user/roles', params)
}
