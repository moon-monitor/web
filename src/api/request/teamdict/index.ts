// teamdict 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  ListTeamDictReply,
  ListTeamDictRequest,
  SaveTeamDictRequest,
  SelectTeamDictReply,
  SelectTeamDictRequest,
  TeamDictItem,
  UpdateTeamDictStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * UpdateTeamDictStatus TeamDict
 * @param { UpdateTeamDictStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamDictStatus(params: UpdateTeamDictStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/dict/status', params)
}

/**
 * SaveTeamDict TeamDict
 * @param { SaveTeamDictRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamDict(params: SaveTeamDictRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/dict', params)
}

/**
 * GetTeamDict TeamDict
 * @param { EmptyRequest } params
 * @returns {Promise<TeamDictItem>}
 */
export function getTeamDict(params: EmptyRequest): Promise<TeamDictItem> {
  return request.GET<TeamDictItem>('/api/team/dict', params)
}

/**
 * DeleteTeamDict TeamDict
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamDict(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/dict', params)
}

/**
 * SelectTeamDict TeamDict
 * @param { SelectTeamDictRequest } params
 * @returns {Promise<SelectTeamDictReply>}
 */
export function selectTeamDict(params: SelectTeamDictRequest): Promise<SelectTeamDictReply> {
  return request.POST<SelectTeamDictReply>('/api/team/dict/select', params)
}

/**
 * ListTeamDict TeamDict
 * @param { ListTeamDictRequest } params
 * @returns {Promise<ListTeamDictReply>}
 */
export function listTeamDict(params: ListTeamDictRequest): Promise<ListTeamDictReply> {
  return request.POST<ListTeamDictReply>('/api/team/dict/list', params)
}
