import { EmptyReply } from '../common.types'
import request from '../request'
import {
  BatchUpdateResourceStatusRequest,
  GetMenuTreeReply,
  GetResourceReply,
  ListResourceReply,
  ListResourceRequest
} from './types'

/**
 * BatchUpdateResourceStatus updates the status of multiple resources
 * @param {BatchUpdateResourceStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function batchUpdateResourceStatus(params: BatchUpdateResourceStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/resource/batch/status', params)
}

/**
 * ListResource lists resources based on specified filters
 * @param {ListResourceRequest} params
 * @returns {Promise<ListResourceReply>}
 */
export function listResource(params: ListResourceRequest): Promise<ListResourceReply> {
  return request.POST<ListResourceReply>('/api/resource/list', params)
}

/**
 * GetResourceMenuTree returns the menu tree
 * @returns {Promise<GetMenuTreeReply>}
 */
export function getResourceMenuTree(): Promise<GetMenuTreeReply> {
  return request.GET<GetMenuTreeReply>('/api/resource/menu/tree')
}

/**
 * GetTeamResourceMenuTree returns the menu tree
 * @returns {Promise<GetMenuTreeReply>}
 */
export function getTeamResourceMenuTree(): Promise<GetMenuTreeReply> {
  return request.GET<GetMenuTreeReply>('/api/resource/team/menu/tree')
}

/**
 * GetResource retrieves a resource by ID
 * @param {number} id
 * @returns {Promise<GetResourceReply>}
 */
export function getResource(id: number): Promise<GetResourceReply> {
  return request.GET<GetResourceReply>(`/api/resource/${id}`)
}
