import { EmptyReply } from '../common.types'
import request from '../request'
import {
  DeleteTimeEngineRequest,
  DeleteTimeEngineRuleRequest,
  GetTimeEngineReply,
  GetTimeEngineRequest,
  GetTimeEngineRuleReply,
  GetTimeEngineRuleRequest,
  ListTimeEngineReply,
  ListTimeEngineRequest,
  ListTimeEngineRuleReply,
  ListTimeEngineRuleRequest,
  SaveTimeEngineRequest,
  SaveTimeEngineRuleRequest
} from './types'

export const deleteTimeEngine = (params: DeleteTimeEngineRequest): Promise<EmptyReply> => {
  return request.DELETE<EmptyReply>('/api/time/engine/delete', params)
}

export const getTimeEngine = (params: GetTimeEngineRequest): Promise<GetTimeEngineReply> => {
  return request.GET<GetTimeEngineReply>('/api/time/engine/detail', params)
}

export const saveTimeEngine = (params: SaveTimeEngineRequest): Promise<EmptyReply> => {
  return request.POST<EmptyReply>('/api/time/engine/save', params)
}

export const listTimeEngine = (params: ListTimeEngineRequest): Promise<ListTimeEngineReply> => {
  return request.POST<ListTimeEngineReply>('/api/time/engine/list', params)
}
export const deleteTimeEngineRule = (params: DeleteTimeEngineRuleRequest): Promise<EmptyReply> => {
  return request.POST<EmptyReply>('/api/time/engine/rule/delete', params)
}

export const getTimeEngineRule = (params: GetTimeEngineRuleRequest): Promise<GetTimeEngineRuleReply> => {
  return request.GET<GetTimeEngineRuleReply>('/api/time/engine/rule/detail', params)
}
export const saveTimeEngineRule = (params: SaveTimeEngineRuleRequest): Promise<EmptyReply> => {
  return request.POST<EmptyReply>('/api/time/engine/rule/save', params)
}

export const listTimeEngineRule = (params: ListTimeEngineRuleRequest): Promise<ListTimeEngineRuleReply> => {
  return request.POST<ListTimeEngineRuleReply>('/api/time/engine/rule/list', params)
}
