// teamstrategy 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  ListTeamStrategyGroupReply,
  ListTeamStrategyGroupRequest,
  ListTeamStrategyReply,
  ListTeamStrategyRequest,
  SaveTeamStrategyGroupRequest,
  SaveTeamStrategyRequest,
  SelectTeamStrategyGroupReply,
  SelectTeamStrategyGroupRequest,
  SubscribeTeamStrategiesReply,
  SubscribeTeamStrategiesRequest,
  SubscribeTeamStrategyRequest,
  TeamStrategyGroupItem,
  UpdateTeamStrategiesStatusRequest,
  UpdateTeamStrategyGroupStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * UpdateTeamStrategyGroupStatus TeamStrategy
 * @param { UpdateTeamStrategyGroupStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamStrategyGroupStatus(params: UpdateTeamStrategyGroupStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/strategy/group/status', params)
}

/**
 * SaveTeamStrategyGroup TeamStrategy
 * @param { SaveTeamStrategyGroupRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamStrategyGroup(params: SaveTeamStrategyGroupRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/group', params)
}

/**
 * GetTeamStrategyGroup TeamStrategy
 * @param { EmptyRequest } params
 * @returns {Promise<TeamStrategyGroupItem>}
 */
export function getTeamStrategyGroup(params: EmptyRequest): Promise<TeamStrategyGroupItem> {
  return request.GET<TeamStrategyGroupItem>('/api/team/strategy/group', params)
}

/**
 * DeleteTeamStrategyGroup TeamStrategy
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamStrategyGroup(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/strategy/group', params)
}

/**
 * SelectTeamStrategyGroup TeamStrategy
 * @param { SelectTeamStrategyGroupRequest } params
 * @returns {Promise<SelectTeamStrategyGroupReply>}
 */
export function selectTeamStrategyGroup(params: SelectTeamStrategyGroupRequest): Promise<SelectTeamStrategyGroupReply> {
  return request.POST<SelectTeamStrategyGroupReply>('/api/team/strategy/group/select', params)
}

/**
 * SubscribeTeamStrategy TeamStrategy
 * @param { SubscribeTeamStrategyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function subscribeTeamStrategy(params: SubscribeTeamStrategyRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy/subscribe', params)
}

/**
 * UpdateTeamStrategiesStatus TeamStrategy
 * @param { UpdateTeamStrategiesStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamStrategiesStatus(params: UpdateTeamStrategiesStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/strategy/status', params)
}

/**
 * ListTeamStrategy TeamStrategy
 * @param { ListTeamStrategyRequest } params
 * @returns {Promise<ListTeamStrategyReply>}
 */
export function listTeamStrategy(params: ListTeamStrategyRequest): Promise<ListTeamStrategyReply> {
  return request.POST<ListTeamStrategyReply>('/api/team/strategy/list', params)
}

/**
 * SubscribeTeamStrategies TeamStrategy
 * @param { SubscribeTeamStrategiesRequest } params
 * @returns {Promise<SubscribeTeamStrategiesReply>}
 */
export function subscribeTeamStrategies(params: SubscribeTeamStrategiesRequest): Promise<SubscribeTeamStrategiesReply> {
  return request.POST<SubscribeTeamStrategiesReply>('/api/team/strategy/subscribe/list', params)
}

/**
 * SaveTeamStrategy TeamStrategy
 * @param { SaveTeamStrategyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamStrategy(params: SaveTeamStrategyRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/strategy', params)
}

/**
 * DeleteTeamStrategy TeamStrategy
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamStrategy(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/strategy', params)
}

/**
 * ListTeamStrategyGroup TeamStrategy
 * @param { ListTeamStrategyGroupRequest } params
 * @returns {Promise<ListTeamStrategyGroupReply>}
 */
export function listTeamStrategyGroup(params: ListTeamStrategyGroupRequest): Promise<ListTeamStrategyGroupReply> {
  return request.POST<ListTeamStrategyGroupReply>('/api/team/strategy/group/list', params)
}
