// timeengine 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  ListTimeEngineReply,
  ListTimeEngineRequest,
  ListTimeEngineRuleReply,
  ListTimeEngineRuleRequest,
  SaveTimeEngineRequest,
  SaveTimeEngineRuleRequest,
  SelectTimeEngineReply,
  SelectTimeEngineRequest,
  SelectTimeEngineRuleReply,
  SelectTimeEngineRuleRequest,
  TimeEngineItem,
  TimeEngineItemRule,
  UpdateTimeEngineRuleStatusRequest,
  UpdateTimeEngineStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * GetTimeEngine TimeEngine
 * @param { EmptyRequest } params
 * @returns {Promise<TimeEngineItem>}
 */
export function getTimeEngine(params: EmptyRequest): Promise<TimeEngineItem> {
  return request.GET<TimeEngineItem>('/api/time/engine/detail', params)
}

/**
 * SaveTimeEngine TimeEngine
 * @param { SaveTimeEngineRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTimeEngine(params: SaveTimeEngineRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/time/engine/save', params)
}

/**
 * ListTimeEngine TimeEngine
 * @param { ListTimeEngineRequest } params
 * @returns {Promise<ListTimeEngineReply>}
 */
export function listTimeEngine(params: ListTimeEngineRequest): Promise<ListTimeEngineReply> {
  return request.POST<ListTimeEngineReply>('/api/time/engine/list', params)
}

/**
 * SelectTimeEngineRule TimeEngine
 * @param { SelectTimeEngineRuleRequest } params
 * @returns {Promise<SelectTimeEngineRuleReply>}
 */
export function selectTimeEngineRule(params: SelectTimeEngineRuleRequest): Promise<SelectTimeEngineRuleReply> {
  return request.POST<SelectTimeEngineRuleReply>('/api/time/engine/rule/select', params)
}

/**
 * DeleteTimeEngineRule TimeEngine
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTimeEngineRule(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/time/engine/rule/delete', params)
}

/**
 * SelectTimeEngine TimeEngine
 * @param { SelectTimeEngineRequest } params
 * @returns {Promise<SelectTimeEngineReply>}
 */
export function selectTimeEngine(params: SelectTimeEngineRequest): Promise<SelectTimeEngineReply> {
  return request.POST<SelectTimeEngineReply>('/api/time/engine/select', params)
}

/**
 * ListTimeEngineRule TimeEngine
 * @param { ListTimeEngineRuleRequest } params
 * @returns {Promise<ListTimeEngineRuleReply>}
 */
export function listTimeEngineRule(params: ListTimeEngineRuleRequest): Promise<ListTimeEngineRuleReply> {
  return request.POST<ListTimeEngineRuleReply>('/api/time/engine/rule/list', params)
}

/**
 * DeleteTimeEngine TimeEngine
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTimeEngine(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/time/engine/delete', params)
}

/**
 * UpdateTimeEngineStatus TimeEngine
 * @param { UpdateTimeEngineStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTimeEngineStatus(params: UpdateTimeEngineStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/time/engine/update/status', params)
}

/**
 * UpdateTimeEngineRuleStatus TimeEngine
 * @param { UpdateTimeEngineRuleStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTimeEngineRuleStatus(params: UpdateTimeEngineRuleStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/time/engine/rule/update/status', params)
}

/**
 * GetTimeEngineRule TimeEngine
 * @param { EmptyRequest } params
 * @returns {Promise<TimeEngineItemRule>}
 */
export function getTimeEngineRule(params: EmptyRequest): Promise<TimeEngineItemRule> {
  return request.GET<TimeEngineItemRule>('/api/time/engine/rule/detail', params)
}

/**
 * SaveTimeEngineRule TimeEngine
 * @param { SaveTimeEngineRuleRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTimeEngineRule(params: SaveTimeEngineRuleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/time/engine/rule/save', params)
}
