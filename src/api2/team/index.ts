import { EmptyReply } from '../common.types'
import request from '../request'
import {
  DeleteTeamRoleRequest,
  GetEmailConfigReply,
  GetTeamMembersReply,
  GetTeamReply,
  GetTeamResourcesReply,
  GetTeamRoleReply,
  GetTeamRoleRequest,
  GetTeamRolesReply,
  GetTeamRolesRequest,
  InviteMemberRequest,
  RemoveMemberRequest,
  SaveEmailConfigRequest,
  SaveTeamRequest,
  SaveTeamRoleRequest,
  TransferTeamRequest,
  UpdateMemberPositionRequest,
  UpdateMemberRolesRequest,
  UpdateMemberStatusRequest,
  UpdateTeamRoleStatusRequest
} from './types'

/**
import { getTeam } from '../../api/team/index';
 * GetTeam retrieves the details of the current team
 * @returns {Promise<GetTeamReply>}
 */
export function getTeam(): Promise<GetTeamReply> {
  return request.GET<GetTeamReply>('/api/team/detail')
}

/**
 * SaveEmailConfig saves or updates the email configuration for the team
 * @param {SaveEmailConfigRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveEmailConfig(params: SaveEmailConfigRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/email/config', params)
}

/**
 * GetEmailConfig retrieves the email configuration for the team
 * @returns {Promise<GetEmailConfigReply>}
 */
export function getEmailConfig(): Promise<GetEmailConfigReply> {
  return request.GET<GetEmailConfigReply>('/api/team/email/configs')
}

/**
 * InviteMember invites a new member to the team
 * @param {InviteMemberRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function inviteMember(params: InviteMemberRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/invite/member', params)
}

/**
 * GetTeamMembers retrieves the list of members in the team
 * @returns {Promise<GetTeamMembersReply>}
 */
export function getTeamMembers(): Promise<GetTeamMembersReply> {
  return request.POST<GetTeamMembersReply>('/api/team/members', {})
}

/**
 * RemoveMember removes a member from the team
 * @param {RemoveMemberRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function removeMember(params: RemoveMemberRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/remove/member', params)
}

/**
 * GetTeamResources retrieves the resources associated with the current team
 * @returns {Promise<GetTeamResourcesReply>}
 */
export function getTeamResources(): Promise<GetTeamResourcesReply> {
  return request.GET<GetTeamResourcesReply>('/api/team/resources')
}

/**
 * SaveTeam saves a new team or updates an existing one
 * @param {SaveTeamRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeam(params: SaveTeamRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/save', params)
}

/**
 * TransferTeam transfers the leadership of the team to a new leader
 * @param {TransferTeamRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function transferTeam(params: TransferTeamRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/transfer', params)
}

/**
 * UpdateMemberPosition updates the position of a team member
 * @param {UpdateMemberPositionRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateMemberPosition(params: UpdateMemberPositionRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/update/member/position', params)
}

/**
 * UpdateMemberRoles updates the roles assigned to multiple team members
 * @param {UpdateMemberRolesRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateMemberRoles(params: UpdateMemberRolesRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/update/member/roles', params)
}

/**
 * UpdateMemberStatus updates the status of multiple team members
 * @param {UpdateMemberStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateMemberStatus(params: UpdateMemberStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/update/member/status', params)
}

/**
 * SaveTeamRole saves a new team role or updates an existing one
 * @param {SaveTeamRoleRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamRole(params: SaveTeamRoleRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/roles', params)
}

/**
 * GetTeamRoles retrieves the roles available in the team
 * @param {GetTeamRolesRequest} params
 * @returns {Promise<GetTeamRolesReply>}
 */
export function getTeamRoles(params: GetTeamRolesRequest): Promise<GetTeamRolesReply> {
  return request.POST<GetTeamRolesReply>('/api/team/roles', params)
}

/**
 * DeleteTeamRole deletes a team role by ID
 * @param {DeleteTeamRoleRequest} prrams
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamRole(prrams: DeleteTeamRoleRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/roles', prrams)
}
/**
 * GetTeamRole retrieves a team role by Id
 * @param {GetTeamRoleRequest} params
 * @returns {Promise<GetTeamRoleReply>}
 */
export function getTeamRole(params: GetTeamRoleRequest): Promise<GetTeamRoleReply> {
  return request.GET<GetTeamRoleReply>('/api/team/roles', params)
}

/**
 * UpdateTeamRoleStatus updates the status of a team role
 * @param {UpdateTeamRoleStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamRoleStatus(params: UpdateTeamRoleStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/roles/status', params)
}
