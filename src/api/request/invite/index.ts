// invite 模块API函数
import {
  DeleteInviteReply,
  EmptyRequest,
  GetInviteReply,
  InviteUserReply,
  InviteUserRequest,
  ListUserInviteReply,
  ListUserInviteRequest,
  UpdateInviteStatusReply,
  UpdateInviteStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * DeleteInvite Invite
 * @param { EmptyRequest } params
 * @returns {Promise<DeleteInviteReply>}
 */
export function deleteInvite(params: EmptyRequest): Promise<DeleteInviteReply> {
  return request.DELETE<DeleteInviteReply>('/v1/admin/invite/delete', params)
}

/**
 * GetInvite Invite
 * @param { EmptyRequest } params
 * @returns {Promise<GetInviteReply>}
 */
export function getInvite(params: EmptyRequest): Promise<GetInviteReply> {
  return request.GET<GetInviteReply>('/v1/admin/invite/detail/{id}', params)
}

/**
 * InviteUser Invite
 * @param { InviteUserRequest } params
 * @returns {Promise<InviteUserReply>}
 */
export function inviteUser(params: InviteUserRequest): Promise<InviteUserReply> {
  return request.POST<InviteUserReply>('/v1/admin/invite/user', params)
}

/**
 * UpdateInviteStatus Invite
 * @param { UpdateInviteStatusRequest } params
 * @returns {Promise<UpdateInviteStatusReply>}
 */
export function updateInviteStatus(params: UpdateInviteStatusRequest): Promise<UpdateInviteStatusReply> {
  return request.POST<UpdateInviteStatusReply>('/v1/admin/invite/status', params)
}

/**
 * UserInviteList Invite
 * @param { ListUserInviteRequest } params
 * @returns {Promise<ListUserInviteReply>}
 */
export function userInviteList(params: ListUserInviteRequest): Promise<ListUserInviteReply> {
  return request.POST<ListUserInviteReply>('/v1/admin/invite/list', params)
}
