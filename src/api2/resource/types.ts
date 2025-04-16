import { Detail, MenuTreeItem, PaginationReply, PaginationRequest, ResourceItem } from '../common.types'

/**
 * api.palace.BatchUpdateResourceStatusRequest，BatchUpdateResourceStatusRequest represents
 * the request data for updating the status of multiple resources
 */
export interface BatchUpdateResourceStatusRequest {
  /**
   * List of resource IDs to update
   */
  ids?: number[]
  /**
   * New status for the resources
   */
  status?: number
}

/**
 * api.palace.ListResourceRequest，ListResourceRequest represents the request data for
 * listing resources
 */
export interface ListResourceRequest {
  /**
   * Keyword to search resources by
   */
  keyword?: string
  pagination?: PaginationRequest
  /**
   * List of statuses to filter resources by
   */
  status?: number[]
}

/**
 * api.palace.ListResourceReply，ListResourceReply contains the response data for listing
 * resources
 */
export interface ListResourceReply {
  /**
   * List of resource items
   */
  items?: ResourceItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetResourceMenuTreeReply，GetMenuTreeReply contains the response data for
 * retrieving the menu tree
 */
export interface GetMenuTreeReply {
  /**
   * List of menu items
   */
  items?: MenuTreeItem[]
}

/**
 * api.palace.GetResourceReply，GetResourceReply contains the response data for retrieving a
 * resource
 */
export interface GetResourceReply {
  /**
   * Detailed information about the resource
   */
  detail?: Detail
}
