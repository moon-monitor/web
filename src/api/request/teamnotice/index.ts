// teamnotice 模块API函数
import {
  DeleteTeamNoticeGroupRequest,
  DeleteTeamNoticeHookRequest,
  EmptyReply,
  GetTeamNoticeGroupRequest,
  GetTeamNoticeHookRequest,
  ListTeamNoticeGroupReply,
  ListTeamNoticeGroupRequest,
  ListTeamNoticeHookReply,
  ListTeamNoticeHookRequest,
  NoticeGroupItem,
  NoticeHookItem,
  SaveTeamNoticeGroupRequest,
  SaveTeamNoticeHookRequest,
  TeamNoticeGroupSelectReply,
  TeamNoticeGroupSelectRequest,
  TeamNoticeHookSelectReply,
  TeamNoticeHookSelectRequest,
  UpdateTeamNoticeGroupStatusRequest,
  UpdateTeamNoticeHookStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * DeleteTeamNoticeGroup TeamNotice
 * @param { DeleteTeamNoticeGroupRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamNoticeGroup(params: DeleteTeamNoticeGroupRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/notice/group', params)
}

/**
 * DeleteTeamNoticeHook TeamNotice
 * @param { DeleteTeamNoticeHookRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamNoticeHook(params: DeleteTeamNoticeHookRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/notice/hook', params)
}

/**
 * GetTeamNoticeGroup TeamNotice
 * @param { GetTeamNoticeGroupRequest } params
 * @returns {Promise<NoticeGroupItem>}
 */
export function getTeamNoticeGroup(params: GetTeamNoticeGroupRequest): Promise<NoticeGroupItem> {
  return request.GET<NoticeGroupItem>('/api/team/notice/group', params)
}

/**
 * GetTeamNoticeHook TeamNotice
 * @param { GetTeamNoticeHookRequest } params
 * @returns {Promise<NoticeHookItem>}
 */
export function getTeamNoticeHook(params: GetTeamNoticeHookRequest): Promise<NoticeHookItem> {
  return request.GET<NoticeHookItem>('/api/team/notice/hook', params)
}

/**
 * ListTeamNoticeGroup TeamNotice
 * @param { ListTeamNoticeGroupRequest } params
 * @returns {Promise<ListTeamNoticeGroupReply>}
 */
export function listTeamNoticeGroup(params: ListTeamNoticeGroupRequest): Promise<ListTeamNoticeGroupReply> {
  return request.POST<ListTeamNoticeGroupReply>('/api/team/notice/group/list', params)
}

/**
 * ListTeamNoticeHook TeamNotice
 * @param { ListTeamNoticeHookRequest } params
 * @returns {Promise<ListTeamNoticeHookReply>}
 */
export function listTeamNoticeHook(params: ListTeamNoticeHookRequest): Promise<ListTeamNoticeHookReply> {
  return request.POST<ListTeamNoticeHookReply>('/api/team/notice/hook/list', params)
}

/**
 * SaveTeamNoticeGroup TeamNotice
 * @param { SaveTeamNoticeGroupRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamNoticeGroup(params: SaveTeamNoticeGroupRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/notice/group', params)
}

/**
 * SaveTeamNoticeHook TeamNotice
 * @param { SaveTeamNoticeHookRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamNoticeHook(params: SaveTeamNoticeHookRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/notice/hook', params)
}

/**
 * TeamNoticeGroupSelect TeamNotice
 * @param { TeamNoticeGroupSelectRequest } params
 * @returns {Promise<TeamNoticeGroupSelectReply>}
 */
export function teamNoticeGroupSelect(params: TeamNoticeGroupSelectRequest): Promise<TeamNoticeGroupSelectReply> {
  return request.POST<TeamNoticeGroupSelectReply>('/api/team/notice/group/select', params)
}

/**
 * TeamNoticeHookSelect TeamNotice
 * @param { TeamNoticeHookSelectRequest } params
 * @returns {Promise<TeamNoticeHookSelectReply>}
 */
export function teamNoticeHookSelect(params: TeamNoticeHookSelectRequest): Promise<TeamNoticeHookSelectReply> {
  return request.POST<TeamNoticeHookSelectReply>('/api/team/notice/hook/select', params)
}

/**
 * UpdateTeamNoticeGroupStatus TeamNotice
 * @param { UpdateTeamNoticeGroupStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamNoticeGroupStatus(params: UpdateTeamNoticeGroupStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/notice/group/status', params)
}

/**
 * UpdateTeamNoticeHookStatus TeamNotice
 * @param { UpdateTeamNoticeHookStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamNoticeHookStatus(params: UpdateTeamNoticeHookStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/notice/hook/status', params)
}
