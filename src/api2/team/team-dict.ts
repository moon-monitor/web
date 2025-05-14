import { EmptyReply } from '../common.types'
import request from '../request'
import {
  DeleteTeamDictRequest,
  GetTeamDictReply,
  GetTeamDictRequest,
  ListTeamDictReply,
  ListTeamDictRequest,
  SaveTeamDictRequest,
  UpdateTeamDictStatusRequest
} from './types'

/**
 * GetTeamDict gets a team dict
 * @param {GetTeamDictRequest} params
 * @returns {Promise<GetTeamDictReply>}
 */
export const getTeamDict = (params: GetTeamDictRequest): Promise<GetTeamDictReply> => {
  return request.GET<GetTeamDictReply>('/api/team/dict', params)
}

/**
 * SaveTeamDict saves a team dict
 * @param {SaveTeamDictRequest} params
 * @returns {Promise<EmptyReply>}
 */
export const saveTeamDict = (params: SaveTeamDictRequest): Promise<EmptyReply> => {
  return request.POST<EmptyReply>('/api/team/dict', params)
}

/**
 * DeleteTeamDict deletes a team dict
 * @param {DeleteTeamDictRequest} params
 * @returns {Promise<EmptyReply>}
 */
export const deleteTeamDict = (params: DeleteTeamDictRequest): Promise<EmptyReply> => {
  return request.DELETE<EmptyReply>('/api/team/dict', params)
}

/**
 * ListTeamDict lists team dicts
 * @param {ListTeamDictRequest} params
 * @returns {Promise<ListTeamDictReply>}
 */
export const listTeamDict = (params: ListTeamDictRequest): Promise<ListTeamDictReply> => {
  return request.POST<ListTeamDictReply>('/api/team/dict/list', params)
}

/**
 * UpdateTeamDictStatus updates the status of a team dict
 * @param {UpdateTeamDictStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export const updateTeamDictStatus = (params: UpdateTeamDictStatusRequest): Promise<EmptyReply> => {
  return request.PUT<EmptyReply>('/api/team/dict/status', params)
}
