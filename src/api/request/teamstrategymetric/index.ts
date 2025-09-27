// teamstrategymetric 模块API函数
import {
  DeleteTeamMetricStrategyLevelRequest,
  DeleteTeamMetricStrategyRequest,
  EmptyReply,
  SaveTeamMetricStrategyLevelRequest,
  SaveTeamMetricStrategyRequest,
  TeamMetricStrategyDetailRequest,
  TeamMetricStrategyLevelDetailRequest,
  TeamMetricStrategyLevelListReply,
  TeamMetricStrategyLevelListRequest,
  TeamStrategyMetricItem,
  TeamStrategyMetricLevelItem,
  UpdateTeamMetricStrategyLevelStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * DeleteTeamMetricStrategy TeamStrategyMetric
 * @param { DeleteTeamMetricStrategyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamMetricStrategy(params: DeleteTeamMetricStrategyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/strategy/metric', params)
}

/**
 * DeleteTeamMetricStrategyLevel TeamStrategyMetric
 * @param { DeleteTeamMetricStrategyLevelRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamMetricStrategyLevel(params: DeleteTeamMetricStrategyLevelRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/strategy/metric/level', params)
}

/**
 * SaveTeamMetricStrategy TeamStrategyMetric
 * @param { SaveTeamMetricStrategyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamMetricStrategy(params: SaveTeamMetricStrategyRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/metric', params)
}

/**
 * SaveTeamMetricStrategyLevel TeamStrategyMetric
 * @param { SaveTeamMetricStrategyLevelRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamMetricStrategyLevel(params: SaveTeamMetricStrategyLevelRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/metric/level', params)
}

/**
 * TeamMetricStrategyDetail TeamStrategyMetric
 * @param { TeamMetricStrategyDetailRequest } params
 * @returns {Promise<TeamStrategyMetricItem>}
 */
export function teamMetricStrategyDetail(params: TeamMetricStrategyDetailRequest): Promise<TeamStrategyMetricItem> {
  return request.GET<TeamStrategyMetricItem>('/api/team/strategy/metric', params)
}

/**
 * TeamMetricStrategyLevelDetail TeamStrategyMetric
 * @param { TeamMetricStrategyLevelDetailRequest } params
 * @returns {Promise<TeamStrategyMetricLevelItem>}
 */
export function teamMetricStrategyLevelDetail(
  params: TeamMetricStrategyLevelDetailRequest
): Promise<TeamStrategyMetricLevelItem> {
  return request.GET<TeamStrategyMetricLevelItem>('/api/team/strategy/metric/level', params)
}

/**
 * TeamMetricStrategyLevelList TeamStrategyMetric
 * @param { TeamMetricStrategyLevelListRequest } params
 * @returns {Promise<TeamMetricStrategyLevelListReply>}
 */
export function teamMetricStrategyLevelList(
  params: TeamMetricStrategyLevelListRequest
): Promise<TeamMetricStrategyLevelListReply> {
  return request.POST<TeamMetricStrategyLevelListReply>('/api/team/strategy/metric/level/list', params)
}

/**
 * UpdateTeamMetricStrategyLevelStatus TeamStrategyMetric
 * @param { UpdateTeamMetricStrategyLevelStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamMetricStrategyLevelStatus(
  params: UpdateTeamMetricStrategyLevelStatusRequest
): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/metric/level/status', params)
}
