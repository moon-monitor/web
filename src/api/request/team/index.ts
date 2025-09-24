// team 模块API函数
import { request } from '../index.ts'
import {
  EmailConfigItem,
  EmptyReply,
  EmptyRequest,
  GetEmailConfigsReply,
  GetEmailConfigsRequest,
  GetSMSConfigsReply,
  GetSMSConfigsRequest,
  GetTeamMembersReply,
  GetTeamMembersRequest,
  GetTeamRolesReply,
  GetTeamRolesRequest,
  InviteMemberRequest,
  OperateLogListReply,
  OperateLogListRequest,
  RemoveMemberRequest,
  SMSConfigItem,
  SaveEmailConfigRequest,
  SaveSMSConfigRequest,
  SaveTeamRequest,
  SaveTeamRoleRequest,
  SelectTeamMembersReply,
  SelectTeamMembersRequest,
  TeamItem,
  TeamRoleItem,
  TransferTeamRequest,
  UpdateMemberPositionRequest,
  UpdateMemberRolesRequest,
  UpdateMemberStatusRequest,
  UpdateTeamRoleStatusRequest,
  UpdateTeamStatusRequest
} from '../types/index.ts'

/**
 * DeleteTeamRole Team
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamRole(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/roles', params)
}

/**
 * GetEmailConfig Team
 * @param { EmptyRequest } params
 * @returns {Promise<EmailConfigItem>}
 */
export function getEmailConfig(params: EmptyRequest): Promise<EmailConfigItem> {
  return request.GET<EmailConfigItem>('/api/team/email/config', params)
}

/**
 * GetEmailConfigs Team
 * @param { GetEmailConfigsRequest } params
 * @returns {Promise<GetEmailConfigsReply>}
 */
export function getEmailConfigs(params: GetEmailConfigsRequest): Promise<GetEmailConfigsReply> {
  return request.POST<GetEmailConfigsReply>('/api/team/email/configs', params)
}

/**
 * GetSMSConfig Team
 * @param { EmptyRequest } params
 * @returns {Promise<SMSConfigItem>}
 */
export function getSMSConfig(params: EmptyRequest): Promise<SMSConfigItem> {
  return request.GET<SMSConfigItem>('/api/team/sms/config', params)
}

/**
 * GetSMSConfigs Team
 * @param { GetSMSConfigsRequest } params
 * @returns {Promise<GetSMSConfigsReply>}
 */
export function getSMSConfigs(params: GetSMSConfigsRequest): Promise<GetSMSConfigsReply> {
  return request.POST<GetSMSConfigsReply>('/api/team/sms/configs', params)
}

/**
 * GetTeam Team
 * @param { EmptyRequest } params
 * @returns {Promise<TeamItem>}
 */
export function getTeam(params: EmptyRequest): Promise<TeamItem> {
  return request.GET<TeamItem>('/api/team/detail', params)
}

/**
 * GetTeamMembers Team
 * @param { GetTeamMembersRequest } params
 * @returns {Promise<GetTeamMembersReply>}
 */
export function getTeamMembers(params: GetTeamMembersRequest): Promise<GetTeamMembersReply> {
  return request.POST<GetTeamMembersReply>('/api/team/members', params)
}

/**
 * GetTeamRole Team
 * @param { EmptyRequest } params
 * @returns {Promise<TeamRoleItem>}
 */
export function getTeamRole(params: EmptyRequest): Promise<TeamRoleItem> {
  return request.GET<TeamRoleItem>('/api/team/role', params)
}

/**
 * GetTeamRoles Team
 * @param { GetTeamRolesRequest } params
 * @returns {Promise<GetTeamRolesReply>}
 */
export function getTeamRoles(params: GetTeamRolesRequest): Promise<GetTeamRolesReply> {
  return request.POST<GetTeamRolesReply>('/api/team/roles', params)
}

/**
 * InviteMember Team
 * @param { InviteMemberRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function inviteMember(params: InviteMemberRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/invite/member', params)
}

/**
 * OperateLogList Team
 * @param { OperateLogListRequest } params
 * @returns {Promise<OperateLogListReply>}
 */
export function operateLogList(params: OperateLogListRequest): Promise<OperateLogListReply> {
  return request.POST<OperateLogListReply>('/api/team/operate/log/list', params)
}

/**
 * RemoveMember Team
 * @param { RemoveMemberRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function removeMember(params: RemoveMemberRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/remove/member', params)
}

/**
 * SaveEmailConfig Team
 * @param { SaveEmailConfigRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveEmailConfig(params: SaveEmailConfigRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/email/config', params)
}

/**
 * SaveSMSConfig Team
 * @param { SaveSMSConfigRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveSMSConfig(params: SaveSMSConfigRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/sms/config', params)
}

/**
 * SaveTeam Team
 * @param { SaveTeamRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeam(params: SaveTeamRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/save', params)
}

/**
 * SaveTeamRole Team
 * @param { SaveTeamRoleRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamRole(params: SaveTeamRoleRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/roles', params)
}

/**
 * SelectTeamMembers Team
 * @param { SelectTeamMembersRequest } params
 * @returns {Promise<SelectTeamMembersReply>}
 */
export function selectTeamMembers(params: SelectTeamMembersRequest): Promise<SelectTeamMembersReply> {
  return request.POST<SelectTeamMembersReply>('/api/team/members/select', params)
}

/**
 * TransferTeam Team
 * @param { TransferTeamRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function transferTeam(params: TransferTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/transfer', params)
}

/**
 * UpdateMemberPosition Team
 * @param { UpdateMemberPositionRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateMemberPosition(params: UpdateMemberPositionRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/update/member/position', params)
}

/**
 * UpdateMemberRoles Team
 * @param { UpdateMemberRolesRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateMemberRoles(params: UpdateMemberRolesRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/update/member/roles', params)
}

/**
 * UpdateMemberStatus Team
 * @param { UpdateMemberStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateMemberStatus(params: UpdateMemberStatusRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/update/member/status', params)
}

/**
 * UpdateTeam Team
 * @param { SaveTeamRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeam(params: SaveTeamRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/update', params)
}
/**
 * UpdateTeamRoleStatus Team
 * @param { UpdateTeamRoleStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamRoleStatus(params: UpdateTeamRoleStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/role/status', params)
}

/**
 * UpdateTeamStatus Team
 * @param { UpdateTeamStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamStatus(params: UpdateTeamStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/status', params)
}
