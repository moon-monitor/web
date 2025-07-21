import { GlobalStatus, MenuCategory, MenuProcessType, MenuType } from '../enum'

/**
 * api.palace.common.MenuTreeItem
 */
export interface MenuTreeItem {
  /**
   * api path
   */
  apiPath?: string
  /**
   * children of the menu tree item
   */
  children?: MenuTreeItem[]
  /**
   * rely on brother
   */
  isRelyOnBrother?: boolean
  /**
   * Category of the menu tree item
   */
  menuCategory?: MenuCategory
  /**
   * Icon of the menu tree item
   */
  menuIcon?: string
  /**
   * Unique identifier for the menu tree item
   */
  menuId?: number
  /**
   * menu path of the menu tree item
   */
  menuPath?: string
  /**
   * Type of the menu tree item
   */
  menuType?: MenuType
  /**
   * Name of the menu tree item
   */
  name?: string
  /**
   * Parent menu id
   */
  parentId?: number
  /**
   * Process type of the menu tree item
   */
  processType?: number
  /**
   * Status of the menu tree item
   */
  status?: GlobalStatus
  /**
   * Sort of the menu tree item
   */
  sort?: number
}

export interface GetMenuRequest {
  menuId?: number
}
export interface GetMenuReply extends MenuTreeItem {}

export interface GetMenuTreeRequest {}

export interface GetMenuTreeReply {
  menus: MenuTreeItem[]
}
export interface GetTeamMenuTreeRequest {}

export interface GetTeamMenuTreeReply {
  menus: MenuTreeItem[]
}
/**
 * api.palace.SaveMenuRequest，SaveMenuRequest represents the request data for creating or
 * updating a system menu
 */
export interface SaveMenuRequest {
  /**
   * Api path of the menu
   */
  apiPath?: string
  /**
   * Whether the menu is rely on brother
   */
  isRelyOnBrother?: boolean
  /**
   * Category of the menu
   */
  menuCategory?: MenuCategory
  /**
   * Icon of the menu
   */
  menuIcon?: string
  /**
   * Id of the menu (0 for create, >0 for update)
   */
  menuId?: number
  /**
   * Path of the menu
   */
  menuPath?: string
  /**
   * Type of the menu
   */
  menuType?: MenuType
  /**
   * Name of the menu
   */
  name?: string
  /**
   * Parent menu Id (0 for root menu)
   */
  parentId?: number
  /**
   * Process type of the menu
   */
  processType?: MenuProcessType
  /**
   * Status of the menu
   */
  status?: GlobalStatus
  /**
   * Sort of the menu
   */
  sort?: number
}
export interface DeleteMenuRequest {
  menuId?: number
}
