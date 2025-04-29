import { Gender, GlobalStatus, StrategyType, TeamStatus, UserPosition, UserStatus } from './enum'

/**
 * User basic information
 * api.palace.common.UserBaseItem
 */
export interface UserBaseItem {
  /**
   * User's avatar URL
   */
  avatar?: string
  /**
   * User's gender
   */
  gender?: number
  /**
   * User's nickname
   */
  nickname?: string
  /**
   * User's unique identifier
   */
  userId?: number
  /**
   * User's login name
   */
  username?: string
}

/**
 * api.palace.common.UserItem
 */
export interface UserItem {
  /**
   * User's avatar URL
   */
  avatar?: string
  /**
   * User's creation time
   */
  createdAt?: string
  /**
   * User's email address (encrypted)
   */
  email?: string
  /**
   * User's gender
   */
  gender?: keyof typeof Gender
  /**
   * User's nickname
   */
  nickname?: string
  /**
   * User's phone number (encrypted)
   */
  phone?: string
  /**
   * User's position/role in the system
   */
  position: keyof typeof UserPosition
  /**
   * Remarks about the user
   */
  remark?: string
  /**
   * User's status
   */
  status: keyof typeof UserStatus
  /**
   * User's last update time
   */
  updatedAt?: string
  /**
   * User's unique identifier
   */
  userId: number
  /**
   * User's login name
   */
  username?: string
}

/**
 * api.palace.common.EmptyReply, EmptyReply represents an empty response, typically used for
 * operations that only need to return a status message.
 * message?: A string message, usually used to indicate the execution status.
 */
export interface EmptyReply {
  message?: string
}

/**
 * api.palace.common.MenuTreeItem
 */
export interface MenuTreeItem {
  /**
   * children of the menu tree item
   */
  children?: MenuTreeItem[]
  /**
   * Icon of the menu tree item
   */
  icon?: string
  /**
   * Unique identifier for the menu tree item
   */
  id?: number
  /**
   * Name of the menu tree item
   */
  name?: string
  /**
   * Path of the menu tree item
   */
  path?: string
  /**
   * Status of the menu tree item
   */
  status: number
}

/**
 * api.palace.common.ResourceItem, system-api
 */
export interface ResourceItem {
  /**
   * Creation time of the API resource
   */
  createdAt?: string
  /**
   * Unique identifier for the API resource
   */
  id?: number
  /**
   * Name of the API resource
   */
  name?: string
  /**
   * Path of the API resource
   */
  path?: string
  /**
   * Remarks about the API resource
   */
  remark?: string
  /**
   * Status of the API resource
   */
  status: number
  /**
   * Last update time of the API resource
   */
  updatedAt?: string
}

/**
 * api.palace.common.PaginationRequest, PaginationRequest is used for pagination queries,
 * specifying the page number and the number of items per page.
 * page?: The current page number, must be greater than 0.
 * pageSize?: The number of items per page, must be greater than 0 and less than or equal to
 * 10000.
 */
export interface PaginationRequest {
  pageSize: number
  page: number
}

/**
 * api.palace.common.PaginationReply, PaginationReply is the response for pagination queries,
 * containing the total number of items, the current page number, and the number of items
 * per page.
 * total?: The total number of items.
 * page?: The current page number.
 * pageSize?: The number of items per page.
 */
export interface PaginationReply {
  pageSize: number
  page: number
  total: number
}

/**
 * api.palace.common.MenuTreeItem
 */
export interface MenuTreeItem {
  /**
   * children of the menu tree item
   */
  children?: MenuTreeItem[]
  /**
   * Icon of the menu tree item
   */
  icon?: string
  /**
   * Unique identifier for the menu tree item
   */
  id?: number
  /**
   * Name of the menu tree item
   */
  name?: string
  /**
   * Path of the menu tree item
   */
  path?: string
  /**
   * Status of the menu tree item
   */
  status: number
}

/**
 * Detailed information about the resource
 *
 * api.palace.common.ResourceItem, system-api
 */
export interface Detail {
  /**
   * Creation time of the API resource
   */
  createdAt?: string
  /**
   * Unique identifier for the API resource
   */
  id?: number
  /**
   * Name of the API resource
   */
  name?: string
  /**
   * Path of the API resource
   */
  path?: string
  /**
   * Remarks about the API resource
   */
  remark?: string
  /**
   * Status of the API resource
   */
  status: number
  /**
   * Last update time of the API resource
   */
  updatedAt?: string
}

/**
 * api.palace.common.OperateLogItem, OperateLogItem represents the structure of an operation
 * log item.
 */
export interface OperateLogItem {
  /**
   * After of the operation
   */
  after?: string
  /**
   * Before of the operation
   */
  before?: string
  /**
   * DataId of the operation
   */
  dataId?: number
  /**
   * DataName of the operation
   */
  dataName?: string
  /**
   * Unique identifier for the operation log.
   */
  id?: number
  /**
   * IP of the operation
   */
  ip?: string
  /**
   * ResourceModule of the operation
   */
  module?: number
  /**
   * OperateTime of the operation
   */
  operateTime?: string
  /**
   * Operator information of the operation requester
   */
  operator?: UserBaseItem
  /**
   * Title of the operation
   */
  title?: string
  /**
   * Type of the operation
   */
  type?: number
}

/**
 * Detailed information about the system role
 *
 * api.palace.common.SystemRoleItem
 */
export interface SystemRoleItem {
  /**
   * Unique identifier for the system role
   */
  id?: number
  /**
   * Name of the system role
   */
  name?: string
  /**
   * Remarks about the system role
   */
  remark?: string
  /**
   * Status of the system role
   */
  status: number
}

/**
 * api.palace.common.TeamAuditItem
 */
export interface TeamAuditItem {
  /**
   * Creation time of the audit record
   */
  createdAt?: string
  /**
   * Unique identifier for the team audit record
   */
  id?: number
  /**
   * Reason for the audit result
   */
  reason?: string
  /**
   * Status of the team audit
   */
  status: number
  /**
   * Team information being audited
   */
  team?: TeamBaseItem
  /**
   * User information of the audit requester
   */
  user?: UserBaseItem
}

/**
 * Team information being audited
 *
 * api.palace.common.TeamBaseItem
 */
export interface TeamBaseItem {
  /**
   * Unique identifier for the team
   */
  id?: number
  /**
   * Logo URL of the team
   */
  logo?: string
  /**
   * Name of the team
   */
  name?: string
  /**
   * Remarks about the team
   */
  remark?: string
}

/**
 * api.palace.common.TeamItem, TeamItem represents the structure of a team.
 */
export interface TeamItem {
  /**
   * List of administrators in the team.
   */
  admins?: UserBaseItem[]
  /**
   * Timestamp indicating when the team was created.
   */
  createdAt?: string
  /**
   * Information about the creator of the team.
   */
  creator?: UserBaseItem
  /**
   * Total number of data sources associated with the team.
   */
  datasourceCount?: string
  /**
   * Unique identifier for the team.
   */
  id: number
  /**
   * Information about the leader of the team.
   */
  leader?: UserBaseItem
  /**
   * URL or path to the team's logo.
   */
  logo?: string
  /**
   * Total number of members in the team.
   */
  memberCount?: string
  /**
   * Name of the team.
   */
  name: string
  /**
   * Remarks or additional information about the team.
   */
  remark?: string
  /**
   * Status of the team.
   */
  status: keyof typeof TeamStatus
  /**
   * Total number of strategies associated with the team.
   */
  strategyCount?: string
  /**
   * Timestamp indicating when the team was last updated.
   */
  updatedAt?: string
  /**
   * Universally unique identifier for the team.
   */
  uuid?: string
}

/**
 * api.palace.common.SelectItem, SelectItem represents an option in a selection, including
 * its value, display label, and whether it is disabled.
 * value?: The actual value of the option.
 * label?: The label displayed for the option.
 * disabled?: Indicates whether the option is disabled, true for disabled, false for enabled.
 */
export interface SelectItem {
  disabled?: boolean
  label?: string
  value?: number
}

/**
 * api.palace.common.TeamStrategyItem, TeamStrategyItem represents the structure of a team
 * strategy item.
 */
export interface TeamStrategyItem {
  /**
   * Timestamp indicating when the strategy was created.
   */
  createdAt?: string
  /**
   * Information about the UserItem of the strategy.
   */
  UserItem?: UserItem
  /**
   * Id of the group to which the strategy belongs.
   */
  groupId?: number
  /**
   * Name of the strategy.
   */
  name?: string
  notices?: NoticeGroupItem[]
  /**
   * Remarks or additional information about the strategy.
   */
  remark?: string
  /**
   * Status of the strategy.
   */
  status: number
  /**
   * Unique identifier for the strategy.
   */
  strategyId?: number
  /**
   * Information about the team associated with the strategy.
   */
  team?: TeamItem
  /**
   * Timestamp indicating when the strategy was last updated.
   */
  updatedAt?: string
  strategyType?: keyof typeof StrategyType
  group: string
}

/**
 * api.palace.common.NoticeGroupItem
 */
export interface NoticeGroupItem {
  createdAt?: string
  hooks?: NoticeHookItem[]
  members?: TeamMemberItem[]
  name?: string
  noticeGroupId?: number
  remark?: string
  status: number
  updatedAt?: string
}

/**
 * api.palace.common.NoticeHookItem
 */
export interface NoticeHookItem {
  createdAt?: string
  headers?: { [key: string]: string }
  method?: number
  name?: string
  noticeHookId?: number
  remark?: string
  secret?: string
  status: number
  updatedAt?: string
  url?: string
}

/**
 * api.palace.common.TeamRoleItem, TeamRoleItem represents the structure of a team role.
 */
export interface TeamRoleItem {
  /**
   * Timestamp indicating when the role was created.
   */
  createdAt?: string
  /**
   * Unique identifier for the role.
   */
  id?: number
  /**
   * List of members assigned to the role.
   */
  members?: TeamMemberItem[]
  /**
   * Name of the role.
   */
  name?: string
  /**
   * Remarks or additional information about the role.
   */
  remark?: string
  /**
   * List of resources associated with the role.
   */
  resources?: ResourceItem[]
  /**
   * Status of the role.
   */
  status: number
  /**
   * Timestamp indicating when the role was last updated.
   */
  updatedAt?: string
}

/**
 * api.palace.common.TeamMemberItem, TeamMemberItem represents the structure of a team member.
 */
export interface TeamMemberItem {
  /**
   * Timestamp indicating when the member was added to the team.
   */
  createdAt?: string
  /**
   * Unique identifier for the member.
   */
  id?: number
  /**
   * Information about the user who invited the member.
   */
  inviter?: UserItem
  /**
   * Position of the member within the team.
   */
  position?: number
  /**
   * List of roles assigned to the member.
   */
  roles?: TeamRoleItem[]
  /**
   * Status of the member.
   */
  status: number
  /**
   * Timestamp indicating when the member's information was last updated.
   */
  updatedAt?: string
  /**
   * Information about the user who is a member.
   */
  user?: UserItem
}

/**
 * api.palace.common.TeamMemberItem, TeamMemberItem represents the structure of a team member.
 */
export interface TeamMemberItem {
  /**
   * Timestamp indicating when the member was added to the team.
   */
  createdAt?: string
  /**
   * Unique identifier for the member.
   */
  id?: number
  /**
   * Information about the user who invited the member.
   */
  UserItem?: UserItem
  /**
   * Position of the member within the team.
   */
  position?: number
  /**
   * List of roles assigned to the member.
   */
  roles?: TeamRoleItem[]
  /**
   * Status of the member.
   */
  status: number
  /**
   * Timestamp indicating when the member's information was last updated.
   */
  updatedAt?: string
  /**
   * Information about the user who is a member.
   */
  user?: UserItem
}

/**
 * api.palace.common.TeamDashboardChartItem
 */
export interface TeamDashboardChartItem {
  createdAt?: string
  dashboardId?: number
  height?: string
  id?: number
  remark?: string
  status: number
  title?: string
  updatedAt?: string
  url?: string
  width?: string
}

/**
 * api.palace.common.TeamDashboardItem
 */
export interface TeamDashboardItem {
  colorHex?: string
  createdAt?: string
  id?: number
  name?: string
  remark?: string
  status: number
  updatedAt?: string
}

/**
 * api.palace.common.TeamMetricDatasourceItem
 */
export interface TeamMetricDatasourceItem {
  basicAuth?: BasicAuth
  ca?: string
  createdAt?: string
  datasourceId?: number
  driver?: number
  endpoint?: string
  extra?: { [key: string]: string }
  headers?: { [key: string]: string }
  name?: string
  queryMethod?: number
  remark?: string
  scrapeInterval?: string
  teamId?: number
  tls?: TLS
  updatedAt?: string
}

/**
 * api.palace.common.BasicAuth
 */
export interface BasicAuth {
  password?: string
  username?: string
}

/**
 * api.palace.common.TLS
 */
export interface TLS {
  clientCert?: string
  clientKey?: string
  serverName?: string
}

/**
 * api.palace.common.TeamStrategyMetricItem_RuleItem
 */
export interface TeamStrategyMetricItemRuleItem {
  alarmPages?: TeamDictItem[]
  condition?: number
  count?: string
  duration?: string
  labelNotices?: StrategyMetricRuleLabelNotice[]
  level?: TeamDictItem
  notices?: NoticeGroupItem[]
  ruleId?: number
  sampleMode?: number
  status: number
  strategyMetricId?: number
  values?: number[]
}

/**
 * api.palace.common.TeamDictItem
 */
export interface TeamDictItem {
  color?: string
  createdAt?: string
  dictId?: number
  dictType?: number
  key?: string
  lang?: string
  teamId?: number
  updatedAt?: string
  value?: string
}

/**
 * api.palace.common.StrategyMetricRuleLabelNotice
 */
export interface StrategyMetricRuleLabelNotice {
  createdAt?: string
  labelKey?: string
  labelNoticeId?: number
  labelValue?: string
  notices?: NoticeGroupItem[]
  strategyMetricRuleId?: number
  updatedAt?: string
}

/**
 * Detailed information about the strategy
 *
 * api.palace.common.TeamStrategyMetricItem
 */
export interface TeamStrategyMetricItem {
  annotations?: { [key: string]: string }
  base?: TeamStrategyItem
  datasource?: TeamMetricDatasourceItem[]
  expr?: string
  labels?: { [key: string]: string }
  StrategyMetricId?: number
  strategyMetricRules?: TeamStrategyMetricItemRuleItem[]
}

/**
 * api.palace.common.TeamStrategyGroupItem，TeamStrategyGroupItem represents the structure of
 * a team strategy group item.
 */
export interface TeamStrategyGroupItem {
  /**
   * Timestamp indicating when the group was created.
   */
  createdAt?: string
  /**
   * Information about the creator of the group.
   */
  creator?: UserItem
  /**
   * Number of enabled strategies in the group.
   */
  enableStrategyCount?: string
  /**
   * Unique identifier for the strategy group.
   */
  groupId: number
  /**
   * Name of the strategy group.
   */
  name?: string
  /**
   * Remarks or additional information about the group.
   */
  remark?: string
  /**
   * Status of the strategy group.
   */
  status: keyof typeof GlobalStatus
  /**
   * Total number of strategies in the group.
   */
  strategyCount?: string
  /**
   * Timestamp indicating when the group was last updated.
   */
  updatedAt?: string
  strategyType?: keyof typeof StrategyType
}
