// menu 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  GetMenuTreeReply,
  MenuTreeItem,
  SaveMenuRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * DeleteMenu Menu
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteMenu(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/menu/delete', params)
}

/**
 * GetMenu Menu
 * @param { EmptyRequest } params
 * @returns {Promise<MenuTreeItem>}
 */
export function getMenu(params: EmptyRequest): Promise<MenuTreeItem> {
  return request.GET<MenuTreeItem>('/api/menu/detail', params)
}

/**
 * GetMenuTree Menu
 * @param { EmptyRequest } params
 * @returns {Promise<GetMenuTreeReply>}
 */
export function getMenuTree(params: EmptyRequest): Promise<GetMenuTreeReply> {
  return request.GET<GetMenuTreeReply>('/api/menu/tree', params)
}

/**
 * GetTeamMenuTree Menu
 * @param { EmptyRequest } params
 * @returns {Promise<GetMenuTreeReply>}
 */
export function getTeamMenuTree(params: EmptyRequest): Promise<GetMenuTreeReply> {
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
