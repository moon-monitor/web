import { EmptyReply } from '../common.types'
import request from '../request'
import {
  DeleteTeamStrategyRequest,
  GetTeamMetricStrategyReply,
  GetTeamMetricStrategyRequest,
  GetTeamStrategyGroupReply,
  GetTeamStrategyGroupRequest,
  ListTeamStrategyGroupReply,
  ListTeamStrategyGroupRequest,
  ListTeamStrategyReply,
  ListTeamStrategyRequest,
  SaveTeamMetricStrategyLevelsRequest,
  SaveTeamMetricStrategyRequest,
  SaveTeamStrategyGroupRequest,
  SaveTeamStrategyReply,
  SaveTeamStrategyRequest,
  UpdateTeamStrategyGroupStatusRequest
} from './team-strategy.types'

/**
 * ListTeamStrategyGroup lists team strategy groups based on specified filters
 * @param {ListTeamStrategyGroupRequest} params
 * @returns {Promise<ListTeamStrategyGroupReply>}
 * */
export function listTeamStrategyGroup(params: ListTeamStrategyGroupRequest): Promise<ListTeamStrategyGroupReply> {
  return request.POST<ListTeamStrategyGroupReply>('/api/team/strategy/group/list', params)
}

/**
 * GetTeamStrategyGroup retrieves a team strategy group by Id
 * @param {GetTeamStrategyGroupRequest} params
 * @returns {Promise<GetTeamStrategyGroupReply>}
 * */
export function getTeamStrategyGroup(params: GetTeamStrategyGroupRequest): Promise<GetTeamStrategyGroupReply> {
  return request.GET<GetTeamStrategyGroupReply>(`/api/team/strategy/group`, params)
}

/**
 * SaveTeamStrategyGroup saves a new team strategy group or updates an existing one
 * @param {SaveTeamStrategyGroupRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamStrategyGroup(params: SaveTeamStrategyGroupRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/group', params)
}

/**
 * DeleteTeamStrategy deletes a team strategy by Id
 * @param {DeleteTeamStrategyRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamStrategy(params: DeleteTeamStrategyRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/group', params)
}

/**
 * UpdateTeamStrategyGroupStatus updates the status of a team strategy group
 * @param {UpdateTeamStrategyGroupStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamStrategyGroupStatus(params: UpdateTeamStrategyGroupStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/strategy/group/status', params)
}

/**
 * ListTeamStrategy lists team strategies based on specified filters
 * @param {ListTeamStrategyRequest} params
 * @returns {Promise<ListTeamStrategyReply>}
 */
export function listTeamStrategy(params: ListTeamStrategyRequest): Promise<ListTeamStrategyReply> {
  return request.POST<ListTeamStrategyReply>('/api/team/strategy/list', params)
}

/**
 * GetTeamStrategy retrieves a team strategy by Id
 * @param {GetTeamMetricStrategyRequest} params
 * @returns {Promise<GetTeamMetricStrategyReply>}
 */
export function getTeamMetricStrategy(params: GetTeamMetricStrategyRequest): Promise<GetTeamMetricStrategyReply> {
  return request.GET<GetTeamMetricStrategyReply>(`/api/team/strategy`, params)
}

/**
 * SaveTeamStrategy saves a new team strategy or updates an existing one
 * @param {SaveTeamStrategyRequest} params
 * @returns {Promise<SaveTeamStrategyReply>}
 */
export function saveTeamStrategy(params: SaveTeamStrategyRequest): Promise<SaveTeamStrategyReply> {
  return request.POST<SaveTeamStrategyReply>('/api/team/strategy', params)
}

/**
 * DeleteTeamStrategy deletes a team strategy by Id
 * @param {DeleteTeamStrategyRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamStrategyById(params: DeleteTeamStrategyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/strategy', params)
}

/**
 * SaveTeamMetricStrategy saves a new team metric strategy or updates an existing one
 * @param {SaveTeamMetricStrategyRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamMetricStrategy(params: SaveTeamMetricStrategyRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/metric', params)
}

/**
 * SaveTeamMetricStrategyLevels saves a new team metric strategy level or updates an existing one
 * @param {SaveTeamMetricStrategyLevelsRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamMetricStrategyLevels(params: SaveTeamMetricStrategyLevelsRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/metric/levels', params)
}
