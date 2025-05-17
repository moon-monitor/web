import { EmptyReply } from '../common.types'
import request from '../request'
import {
  DeleteTeamNoticeGroupRequest,
  DeleteTeamNoticeHookRequest,
  GetTeamNoticeGroupReply,
  GetTeamNoticeGroupRequest,
  GetTeamNoticeHookReply,
  GetTeamNoticeHookRequest,
  ListTeamNoticeGroupReply,
  ListTeamNoticeGroupRequest,
  ListTeamNoticeHookReply,
  ListTeamNoticeHookRequest,
  SaveTeamNoticeGroupRequest,
  SaveTeamNoticeHookRequest,
  UpdateTeamNoticeGroupStatusRequest,
  UpdateTeamNoticeHookStatusRequest
} from './team-notice.types'

/**
 * ListTeamNoticeGroup
 * @param {ListTeamNoticeGroupRequest} params
 * @returns {Promise<GetTeamStrategyReply>}
 */
export const listTeamNoticeGroup = async (parama: ListTeamNoticeGroupRequest) => {
  return await request.POST<ListTeamNoticeGroupReply>('/api/team/notice/group/list', parama)
}

export const getTeamNoticeGroup = async (params: GetTeamNoticeGroupRequest): Promise<GetTeamNoticeGroupReply> => {
  return await request.GET<GetTeamNoticeGroupReply>('/api/team/notice/group', params)
}

export const saveTeamNoticeGroup = async (params: SaveTeamNoticeGroupRequest): Promise<EmptyReply> => {
  return await request.POST<EmptyReply>('/api/team/notice/group', params)
}

export const deleteTeamNoticeGroup = async (params: DeleteTeamNoticeGroupRequest): Promise<EmptyReply> => {
  return await request.DELETE<EmptyReply>('/api/team/notice/group', params)
}

export const updateTeamNoticeGroupStatus = async (params: UpdateTeamNoticeGroupStatusRequest): Promise<EmptyReply> => {
  return await request.PUT<EmptyReply>('/api/team/notice/group/status', params)
}

export const getTeamNoticeHook = async (params: GetTeamNoticeHookRequest): Promise<GetTeamNoticeHookReply> => {
  return await request.GET<GetTeamNoticeHookReply>('/api/team/notice/hook', params)
}

export const saveTeamNoticeHook = async (params: SaveTeamNoticeHookRequest): Promise<EmptyReply> => {
  return await request.POST<EmptyReply>('/api/team/notice/hook', params)
}

export const deleteTeamNoticeHook = async (params: DeleteTeamNoticeHookRequest): Promise<EmptyReply> => {
  return await request.DELETE<EmptyReply>('/api/team/notice/hook', params)
}

export const listTeamNoticeHook = async (params: ListTeamNoticeHookRequest): Promise<ListTeamNoticeHookReply> => {
  return await request.POST<ListTeamNoticeHookReply>('/api/team/notice/hook/list', params)
}

export const updateTeamNoticeHookStatus = async (params: UpdateTeamNoticeHookStatusRequest): Promise<EmptyReply> => {
  return await request.PUT<EmptyReply>('/api/team/notice/hook/status', params)
}
