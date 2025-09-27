// menu 模块API函数
import {
  DeleteMenuRequest,
  EmptyReply,
  GetMenuRequest,
  GetMenuTreeReply,
  GetMenuTreeRequest,
  GetTeamMenuTreeRequest,
  MenuTreeItem,
  SaveMenuRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * DeleteMenu Menu
 * @param { DeleteMenuRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteMenu(params: DeleteMenuRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/menu/delete', params)
}

/**
 * GetMenu Menu
 * @param { GetMenuRequest } params
 * @returns {Promise<MenuTreeItem>}
 */
export function getMenu(params: GetMenuRequest): Promise<MenuTreeItem> {
  return request.GET<MenuTreeItem>('/api/menu/detail', params)
}

/**
 * GetMenuTree Menu
 * @param { GetMenuTreeRequest } params
 * @returns {Promise<GetMenuTreeReply>}
 */
export function getMenuTree(params: GetMenuTreeRequest): Promise<GetMenuTreeReply> {
  return request.GET<GetMenuTreeReply>('/api/menu/tree', params)
}

/**
 * GetTeamMenuTree Menu
 * @param { GetTeamMenuTreeRequest } params
 * @returns {Promise<GetMenuTreeReply>}
 */
export function getTeamMenuTree(params: GetTeamMenuTreeRequest): Promise<GetMenuTreeReply> {
  return request.GET<GetMenuTreeReply>('/api/team/menu/tree', params)
}

/**
 * SaveMenu Menu
 * @param { SaveMenuRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveMenu(params: SaveMenuRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/menu/save', params)
}
