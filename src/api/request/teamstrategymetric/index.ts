// teamstrategymetric 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  SaveTeamMetricStrategyLevelRequest,
  SaveTeamMetricStrategyRequest,
  TeamMetricStrategyLevelListReply,
  TeamMetricStrategyLevelListRequest,
  TeamStrategyMetricItem,
  TeamStrategyMetricLevelItem,
  UpdateTeamMetricStrategyLevelStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * SaveTeamMetricStrategyLevel TeamStrategyMetric
 * @param { SaveTeamMetricStrategyLevelRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamMetricStrategyLevel(params: SaveTeamMetricStrategyLevelRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/metric/level', params)
}

/**
 * TeamMetricStrategyLevelDetail TeamStrategyMetric
 * @param { EmptyRequest } params
 * @returns {Promise<TeamStrategyMetricLevelItem>}
 */
export function teamMetricStrategyLevelDetail(params: EmptyRequest): Promise<TeamStrategyMetricLevelItem> {
  return request.GET<TeamStrategyMetricLevelItem>('/api/team/strategy/metric/level', params)
}

/**
 * DeleteTeamMetricStrategyLevel TeamStrategyMetric
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamMetricStrategyLevel(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/strategy/metric/level', params)
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
 * SaveTeamMetricStrategy TeamStrategyMetric
 * @param { SaveTeamMetricStrategyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamMetricStrategy(params: SaveTeamMetricStrategyRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/metric', params)
}

/**
 * TeamMetricStrategyDetail TeamStrategyMetric
 * @param { EmptyRequest } params
 * @returns {Promise<TeamStrategyMetricItem>}
 */
export function teamMetricStrategyDetail(params: EmptyRequest): Promise<TeamStrategyMetricItem> {
  return request.GET<TeamStrategyMetricItem>('/api/team/strategy/metric', params)
}

/**
 * DeleteTeamMetricStrategy TeamStrategyMetric
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamMetricStrategy(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/strategy/metric', params)
}
