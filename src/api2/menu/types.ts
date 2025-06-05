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
  menuCategory?: number
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
  menuType?: number
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
  status?: number
}

export interface GetMenuRequest {
  menuId?: number
}
export interface GetMenuReply extends MenuTreeItem {}

export interface GetMenuTreeRequest {}

export interface GetMenuTreeReply {
  menus: MenuTreeItem[]
  total: number
}
