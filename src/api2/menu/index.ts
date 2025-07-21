import { EmptyReply } from '../common.types'
import request from '../request'
import {
  DeleteMenuRequest,
  GetMenuReply,
  GetMenuRequest,
  GetMenuTreeReply,
  GetMenuTreeRequest,
  GetTeamMenuTreeReply,
  GetTeamMenuTreeRequest,
  SaveMenuRequest
} from './types'

/**
 * GetMenu retrieves a menu by Id
 * @param {GetMenuRequest} params
 * @returns {Promise<GetMenuReply>}
 */
export function getMenu(params: GetMenuRequest): Promise<GetMenuReply> {
  return request.GET<GetMenuReply>('/api/menu/detail', params)
}

/**
 * GetMenuTree returns the menu tree
 * @param {GetMenuTreeRequest} params
 * @returns {Promise<GetMenuTreeReply>}
 */
export function getMenuTree(params: GetMenuTreeRequest): Promise<GetMenuTreeReply> {
  return request.GET<GetMenuTreeReply>('/api/menu/tree', params)
}

/**
 * GetTeamMenuTree returns the team menu tree
 * @param {GetTeamMenuTreeRequest} params
 * @returns {Promise<GetTeamMenuTreeReply>}
 */
export function getTeamMenuTree(params: GetTeamMenuTreeRequest): Promise<GetTeamMenuTreeReply> {
  return request.GET<GetTeamMenuTreeReply>('/api/team/menu/tree', params)
}

/**
 * SaveMenu creates or updates a system menu
 * @param {SaveMenuRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function saveMenu(params: SaveMenuRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/menu/save', params)
}

/**
 * DeleteMenu deletes a menu by Id
 * @param {DeleteMenuRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function deleteMenu(params: DeleteMenuRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/menu/delete', params)
}
