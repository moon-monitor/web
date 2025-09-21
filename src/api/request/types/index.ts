// types 模块接口定义

/**
 * api.common.AlertItem
 */
export interface AlertItem {
  /**
   * annotations of the alert
   */
  annotations?: { [key: string]: string }
  /**
   * endsAt of the alert
   */
  endsAt?: string
  /**
   * fingerprint of the alert
   */
  fingerprint?: string
  /**
   * generatorURL of the alert
   */
  generatorURL?: string
  /**
   * labels of the alert
   */
  labels?: { [key: string]: string }
  /**
   * startsAt of the alert
   */
  startsAt?: string
  /**
   * status of the alert
   */
  status?: number
  /**
   * value of the alert
   */
  value?: string
}

/**
 * api.common.CheckReply
 */
export interface CheckReply {
  healthy?: boolean
  time?: string
  version?: string
}

/**
 * api.common.GetServerListReply
 */
export interface GetServerListReply {
  list?: MicroServer[]
}

/**
 * api.common.MetricDatasourceQueryReply
 */
export interface MetricDatasourceQueryReply {
  results?: MetricQueryResult[]
}

/**
 * api.common.MetricItem
 */
export interface MetricItem {
  help?: string
  labels?: MetricItem_Label[]
  name?: string
  type?: string
  unit?: string
  value?: number
}

/**
 * api.common.MetricItem_Label
 */
export interface MetricItem_Label {
  key?: string
  values?: string[]
}

/**
 * api.common.MetricQueryResult
 */
export interface MetricQueryResult {
  metric?: { [key: string]: string }
  value?: MetricQueryResultValue
  values?: MetricQueryResultValue[]
}

/**
 * api.common.MetricQueryResultValue
 */
export interface MetricQueryResultValue {
  timestamp?: string
  value?: number
}

/**
 * api.common.ServerRegisterReply
 */
export interface ServerRegisterReply { }

/**
 * api.common.ServerRegisterRequest
 */
export interface ServerRegisterRequest {
  discovery?: Discovery
  isOnline?: boolean
  server?: MicroServer
  serverType?: number
  teamIds?: number[]
  uuid?: string
}

/**
 * api.palace.AlertDetailParams
 */
export interface AlertDetailParams {
  alertId?: number
  createdAt?: string
  fingerprint?: string
}

/**
 * api.palace.AlertDetailReply
 */
export interface AlertDetailReply {
  alert?: RealtimeAlertItem
  strategyGroupId?: number
  strategyId?: number
  strategyLevelId?: number
  strategyType?: number
}

/**
 * api.palace.CancelMessageReply
 */
export interface CancelMessageReply { }

/**
 * api.palace.CancelMessageRequest
 */
export interface CancelMessageRequest {
  /**
   * 消息ID
   */
  id?: number
}

/**
 * api.palace.CaptchaValidateRequest
 */
export interface CaptchaValidateRequest {
  /**
   * User's captcha answer
   */
  answer?: string
  /**
   * Captcha Id, used to identify the captcha image
   */
  captchaId?: string
}

/**
 * api.palace.ConfirmMessageReply
 */
export interface ConfirmMessageReply { }

/**
 * api.palace.ConfirmMessageRequest
 */
export interface ConfirmMessageRequest {
  /**
   * 消息ID
   */
  id?: number
}

/**
 * api.palace.CreateTeamRequest
 */
export interface CreateTeamRequest {
  /**
   * Team logo URL
   */
  logo?: string
  /**
   * Team name
   */
  name?: string
  /**
   * Team remark or description
   */
  remark?: string
}

/**
 * api.palace.DatasourceSelectReply
 */
export interface DatasourceSelectReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.DatasourceSelectRequest
 */
export interface DatasourceSelectRequest {
  datasourceId?: number
  keyword?: string
  pagination?: PaginationRequest
  status?: number
  type?: number
}

/**
 * api.palace.DeleteInviteReply
 */
export interface DeleteInviteReply { }

/**
 * api.palace.DeleteMessagesReply
 */
export interface DeleteMessagesReply { }

/**
 * api.palace.DeleteMessagesRequest
 */
export interface DeleteMessagesRequest {
  all?: boolean
  ids?: number[]
}

/**
 * api.palace.GetCaptchaReply
 */
export interface GetCaptchaReply {
  /**
   * Unique identifier for the captcha
   */
  captchaId?: string
  /**
   * Base64 encoded captcha image data
   */
  captchaImg?: string
  /**
   * Captcha expiration time in seconds
   */
  expiredSeconds?: number
}

/**
 * api.palace.GetEmailConfigsReply
 */
export interface GetEmailConfigsReply {
  /**
   * List of email configuration items
   */
  items?: EmailConfigItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetEmailConfigsRequest
 */
export interface GetEmailConfigsRequest {
  /**
   * Keyword to search email configurations by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * Status to filter email configurations by
   */
  status?: number
}

/**
 * api.palace.GetFilingInformationReply
 */
export interface GetFilingInformationReply {
  /**
   * Filing information
   */
  filingInformation?: string
  /**
   * URL of the filing information
   */
  url?: string
}

/**
 * api.palace.GetInviteReply
 */
export interface GetInviteReply {
  item?: InviteItem
}

/**
 * api.palace.GetMenuTreeReply
 */
export interface GetMenuTreeReply {
  /**
   * List of menu items
   */
  menus?: MenuTreeItem[]
}

/**
 * api.palace.GetSMSConfigsReply
 */
export interface GetSMSConfigsReply {
  /**
   * List of SMS configuration items
   */
  items?: SMSConfigItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetSMSConfigsRequest
 */
export interface GetSMSConfigsRequest {
  /**
   * Keyword to search SMS configurations by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * Provider to filter SMS configurations by
   */
  provider?: number
  /**
   * Status to filter SMS configurations by
   */
  status?: number
}

/**
 * api.palace.GetSelfMenuTreeReply
 */
export interface GetSelfMenuTreeReply {
  /**
   * Menu tree data
   */
  items?: MenuTreeItem[]
}

/**
 * api.palace.GetSendMessageLogsReply
 */
export interface GetSendMessageLogsReply {
  items?: SendMessageLogItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetSendMessageLogsRequest
 */
export interface GetSendMessageLogsRequest {
  keyword?: string
  messageType?: number
  pagination?: PaginationRequest
  requestId?: string
  status?: number
  timeRange?: string[]
}

/**
 * api.palace.GetSystemRolesReply
 */
export interface GetSystemRolesReply {
  /**
   * List of system role items
   */
  items?: SystemRoleItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.GetSystemRolesRequest
 */
export interface GetSystemRolesRequest {
  /**
   * Keyword to search roles by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * Status to filter roles by
   */
  status?: number
}

/**
 * api.palace.GetTeamAuditListReply
 */
export interface GetTeamAuditListReply {
  /**
   * List of team audit items
   */
  items?: TeamAuditItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.GetTeamAuditListRequest
 */
export interface GetTeamAuditListRequest {
  actions?: number[]
  /**
   * Keyword to search team audit records by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of statuses to filter team audit records by
   */
  status?: number[]
  /**
   * User Id, optional for filtering audits by user
   */
  userId?: number
}

/**
 * api.palace.GetTeamListReply
 */
export interface GetTeamListReply {
  /**
   * List of team items
   */
  items?: TeamItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.GetTeamListRequest
 */
export interface GetTeamListRequest {
  creatorId?: number
  /**
   * Keyword to search teams by
   */
  keyword?: string
  leaderId?: number
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of statuses to filter teams by
   */
  status?: number[]
}

/**
 * api.palace.GetTeamMembersReply
 */
export interface GetTeamMembersReply {
  /**
   * List of team member items
   */
  items?: TeamMemberItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetTeamMembersRequest
 */
export interface GetTeamMembersRequest {
  keyword?: string
  pagination?: PaginationRequest
  positions?: number[]
  status?: number[]
}

/**
 * api.palace.GetTeamRolesReply
 */
export interface GetTeamRolesReply {
  /**
   * List of team role items
   */
  items?: TeamRoleItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.GetTeamRolesRequest
 */
export interface GetTeamRolesRequest {
  /**
   * Keyword to search roles by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * Status to filter roles by
   */
  status?: number
}

/**
 * api.palace.GetTeamSendMessageLogsReply
 */
export interface GetTeamSendMessageLogsReply {
  items?: SendMessageLogItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetTeamSendMessageLogsRequest
 */
export interface GetTeamSendMessageLogsRequest {
  keyword?: string
  messageType?: number
  pagination?: PaginationRequest
  requestId?: string
  status?: number
  timeRange?: string[]
}

/**
 * api.palace.GetUserListReply
 */
export interface GetUserListReply {
  /**
   * List of user items
   */
  items?: UserItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.GetUserListRequest
 */
export interface GetUserListRequest {
  /**
   * Keyword to search users by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of positions to filter users by
   */
  position?: number[]
  /**
   * List of statuses to filter users by
   */
  status?: number[]
}

/**
 * api.palace.InviteItem
 */
export interface InviteItem {
  id?: number
  inviteType?: number
}

/**
 * api.palace.InviteMemberRequest
 */
export interface InviteMemberRequest {
  /**
   * Position of the new member
   */
  position?: number
  /**
   * List of role Ids to assign to the new member
   */
  roleIds?: number[]
  /**
   * Email of the user to invite
   */
  userEmail?: string
}

/**
 * api.palace.InviteUserReply
 */
export interface InviteUserReply { }

/**
 * api.palace.InviteUserRequest
 */
export interface InviteUserRequest {
  /**
   * 邮箱或手机号
   */
  inviteCode?: string
  roleIds?: number[]
}

/**
 * api.palace.JoinTeamRequest
 */
export interface JoinTeamRequest {
  /**
   * Reason for joining the team
   */
  reason?: string
  /**
   * Team name to join
   */
  teamName?: string
}

/**
 * api.palace.LatestAlarmEventReply
 */
export interface LatestAlarmEventReply {
  /**
   * 最新告警事件
   */
  events?: LatestAlarmEventReply_LatestAlarmEvent[]
}

/**
 * api.palace.LatestAlarmEventReply_LatestAlarmEvent
 */
export interface LatestAlarmEventReply_LatestAlarmEvent {
  /**
   * 告警时间
   */
  eventTime?: string
  /**
   * 告警指纹
   */
  fingerprint?: string
  /**
   * 告警等级
   */
  level?: string
  /**
   * 告警状态
   */
  status?: number
  /**
   * 告警摘要
   */
  summary?: string
}

/**
 * api.palace.LatestInterventionEventReply
 */
export interface LatestInterventionEventReply {
  /**
   * 最新介入事件
   */
  events?: LatestInterventionEventReply_LatestInterventionEvent[]
}

/**
 * api.palace.LatestInterventionEventReply_LatestInterventionEvent
 */
export interface LatestInterventionEventReply_LatestInterventionEvent {
  /**
   * 告警时间
   */
  eventTime?: string
  /**
   * 告警指纹
   */
  fingerprint?: string
  /**
   * 告警处理时间
   */
  handledAt?: string
  /**
   * 告警处理人
   */
  handler?: UserItem
  /**
   * 告警等级
   */
  level?: string
  /**
   * 告警状态
   */
  status?: number
  /**
   * 告警摘要
   */
  summary?: string
}

/**
 * api.palace.LeaveTeamRequest
 */
export interface LeaveTeamRequest {
  /**
   * Reason for leaving the team
   */
  reason?: string
  /**
   * Team Id to leave
   */
  teamId?: number
}

/**
 * api.palace.ListAlertParams
 */
export interface ListAlertParams {
  fingerprint?: string
  keyword?: string
  pagination?: PaginationRequest
  status?: number
  timeRange?: string[]
}

/**
 * api.palace.ListAlertReply
 */
export interface ListAlertReply {
  items?: RealtimeAlertItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListMessageReply
 */
export interface ListMessageReply {
  list?: NoticeUserMessage[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListMessageRequest
 */
export interface ListMessageRequest {
  keyword?: string
  pagination?: PaginationRequest
}

/**
 * api.palace.ListMetricDatasourceMetadataReply
 */
export interface ListMetricDatasourceMetadataReply {
  items?: TeamMetricDatasourceMetadataItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListMetricDatasourceMetadataRequest
 */
export interface ListMetricDatasourceMetadataRequest {
  datasourceId?: number
  keyword?: string
  pagination?: PaginationRequest
  type?: string
}

/**
 * api.palace.ListTeamDashboardChartReply
 */
export interface ListTeamDashboardChartReply {
  items?: TeamDashboardChartItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamDashboardChartRequest
 */
export interface ListTeamDashboardChartRequest {
  dashboardId?: number
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTeamDashboardReply
 */
export interface ListTeamDashboardReply {
  items?: TeamDashboardItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamDashboardRequest
 */
export interface ListTeamDashboardRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTeamDictReply
 */
export interface ListTeamDictReply {
  items?: TeamDictItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamDictRequest
 */
export interface ListTeamDictRequest {
  dictTypes?: number[]
  keyword?: string
  langs?: string[]
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTeamMetricDatasourceReply
 */
export interface ListTeamMetricDatasourceReply {
  items?: TeamMetricDatasourceItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamMetricDatasourceRequest
 */
export interface ListTeamMetricDatasourceRequest {
  driver?: number
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTeamNoticeGroupReply
 */
export interface ListTeamNoticeGroupReply {
  items?: NoticeGroupItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamNoticeGroupRequest
 */
export interface ListTeamNoticeGroupRequest {
  hookIds?: number[]
  keyword?: string
  memberIds?: number[]
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTeamNoticeHookReply
 */
export interface ListTeamNoticeHookReply {
  items?: NoticeHookItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamNoticeHookRequest
 */
export interface ListTeamNoticeHookRequest {
  apps?: number[]
  keyword?: string
  pagination?: PaginationRequest
  status?: number
  url?: string
}

/**
 * api.palace.ListTeamStrategyGroupReply
 */
export interface ListTeamStrategyGroupReply {
  /**
   * List of strategy group items
   */
  items?: TeamStrategyGroupItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamStrategyGroupRequest
 */
export interface ListTeamStrategyGroupRequest {
  /**
   * Keyword to search strategy groups by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of statuses to filter strategy groups by
   */
  status?: number
}

/**
 * api.palace.ListTeamStrategyReply
 */
export interface ListTeamStrategyReply {
  /**
   * List of strategy items
   */
  items?: TeamStrategyItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamStrategyRequest
 */
export interface ListTeamStrategyRequest {
  /**
   * Group id
   */
  groupIds?: number[]
  /**
   * Keyword to search strategies by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of statuses to filter strategies by
   */
  status?: number
  /**
   * Strategy type
   */
  strategyTypes?: number[]
}

/**
 * api.palace.ListTimeEngineReply
 */
export interface ListTimeEngineReply {
  items?: TimeEngineItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTimeEngineRequest
 */
export interface ListTimeEngineRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.ListTimeEngineRuleReply
 */
export interface ListTimeEngineRuleReply {
  items?: TimeEngineItemRule[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTimeEngineRuleRequest
 */
export interface ListTimeEngineRuleRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number
  types?: number[]
}

/**
 * api.palace.ListUserInviteReply
 */
export interface ListUserInviteReply {
  list?: InviteItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListUserInviteRequest
 */
export interface ListUserInviteRequest {
  pagination?: PaginationRequest
  type?: number
}

/**
 * api.palace.LoginByEmailRequest
 */
export interface LoginByEmailRequest {
  /**
   * Email verification code
   */
  code?: string
  /**
   * User email
   */
  email?: string
  /**
   * User gender, optional
   */
  gender?: number
  /**
   * User nickname, optional
   */
  nickname?: string
  /**
   * Remark, for additional information
   */
  remark?: string
  /**
   * Username, not email
   */
  username?: string
}

/**
 * api.palace.LoginByPasswordRequest
 */
export interface LoginByPasswordRequest {
  /**
   * Captcha validation information
   */
  captcha?: CaptchaValidateRequest
  /**
   * User email
   */
  email?: string
  /**
   * User password
   */
  password?: string
}

/**
 * api.palace.LoginReply
 */
export interface LoginReply {
  /**
   * Token expiration time in seconds
   */
  expiredSeconds?: number
  /**
   * Login token
   */
  token?: string
  /**
   * User basic information
   */
  user?: UserBaseItem
}

/**
 * api.palace.LogoutReply
 */
export interface LogoutReply {
  /**
   * Redirect URL after logout, if any
   */
  redirect?: string
}

/**
 * api.palace.LogoutRequest
 */
export interface LogoutRequest {
  /**
   * Redirect URL after logout, optional
   */
  redirect?: string
}

/**
 * api.palace.MetricDatasourceProxyRequest
 */
export interface MetricDatasourceProxyRequest {
  datasourceId?: number
  target?: string
}

/**
 * api.palace.MetricDatasourceQueryRequest
 */
export interface MetricDatasourceQueryRequest {
  datasourceId?: number
  endTime?: string
  expr?: string
  startTime?: string
  step?: number
  time?: string
}

/**
 * api.palace.NoticeUserMessage
 */
export interface NoticeUserMessage {
  /**
   * 业务类型 'invitation' | 'notice'
   */
  biz?: string
  bizID?: number
  /**
   * 消息类型 'info' | 'success' | 'warning' | 'error'
   */
  category?: string
  content?: string
  id?: number
  timestamp?: string
}

/**
 * api.palace.OAuth2ListReply
 */
export interface OAuth2ListReply {
  /**
   * List of OAuth2.0 providers
   */
  items?: OAuth2ListReply_OAuthItem[]
}

/**
 * api.palace.OAuth2ListReply_OAuthItem
 */
export interface OAuth2ListReply_OAuthItem {
  /**
   * Provider icon URL
   */
  icon?: string
  /**
   * Provider label or name
   */
  label?: string
  /**
   * Provider redirect URL
   */
  redirect?: string
}

/**
 * api.palace.OAuthLoginByEmailRequest
 */
export interface OAuthLoginByEmailRequest {
  /**
   * Application Id, to identify the application
   */
  app?: number
  /**
   * OAuth2.0 authorization code
   */
  code?: string
  /**
   * User email
   */
  email?: string
  /**
   * OAuth2.0 provider Id
   */
  openId?: string
  /**
   * OAuth2.0 token
   */
  token?: string
}

/**
 * api.palace.OperateOneSendMessageRequest
 */
export interface OperateOneSendMessageRequest {
  requestId?: string
  sendTime?: string
}

/**
 * api.palace.OperateOneTeamSendMessageRequest
 */
export interface OperateOneTeamSendMessageRequest {
  requestId?: string
  sendTime?: string
}

/**
 * api.palace.RealtimeAlertItem
 */
export interface RealtimeAlertItem {
  alertId?: number
  description?: string
  endsAt?: string
  fingerprint?: string
  generatorURL?: string
  labels?: { [key: string]: string }
  startsAt?: string
  status?: number
  summary?: string
  value?: string
}

/**
 * api.palace.RemoveMemberRequest
 */
export interface RemoveMemberRequest {
  memberId?: number
}

/**
 * api.palace.ReplaceMemberRoleRequest
 */
export interface ReplaceMemberRoleRequest {
  memberId?: number
  roleIds?: number[]
}

/**
 * api.palace.ReplaceUserRoleRequest
 */
export interface ReplaceUserRoleRequest {
  roleIds?: number[]
  userId?: number
}

/**
 * api.palace.ResetUserPasswordRequest
 */
export interface ResetUserPasswordRequest {
  userId?: number
}

/**
 * api.palace.SaveEmailConfigRequest
 */
export interface SaveEmailConfigRequest {
  /**
   * emailConfigId of the email configuration
   */
  emailConfigId?: number
  /**
   * Email server host
   */
  host?: string
  /**
   * Name of the email configuration
   */
  name?: string
  /**
   * Email password
   */
  pass?: string
  /**
   * Email server port
   */
  port?: number
  /**
   * Remark of the email configuration
   */
  remark?: string
  /**
   * Enable email configuration
   */
  status?: number
  /**
   * Email user
   */
  user?: string
}

/**
 * api.palace.SaveMenuRequest
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
  menuCategory?: number
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
  menuType?: number
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
  processType?: number
  /**
   * Sort of the menu
   */
  sort?: number
  /**
   * Status of the menu
   */
  status?: number
}

/**
 * api.palace.SaveRoleRequest
 */
export interface SaveRoleRequest {
  /**
   * List of resource Ids associated with the role
   */
  menuIds?: number[]
  /**
   * Role name
   */
  name?: string
  /**
   * Role remark or description
   */
  remark?: string
  /**
   * Role Id, optional for new roles
   */
  roleId?: number
}

/**
 * api.palace.SaveSMSConfigRequest
 */
export interface SaveSMSConfigRequest {
  /**
   * Access Key Id for the SMS provider
   */
  accessKeyId?: string
  /**
   * Access Key Secret for the SMS provider
   */
  accessKeySecret?: string
  /**
   * Endpoint for the SMS provider
   */
  endpoint?: string
  /**
   * Name of the SMS configuration
   */
  name?: string
  /**
   * SMS provider type
   */
  provider?: number
  /**
   * Remark of the SMS configuration
   */
  remark?: string
  /**
   * Sign name for the SMS provider
   */
  signName?: string
  /**
   * smsConfigId of the SMS configuration
   */
  smsConfigId?: number
  /**
   * Enable SMS configuration
   */
  status?: number
}

/**
 * api.palace.SaveTeamDashboardChartRequest
 */
export interface SaveTeamDashboardChartRequest {
  chartId?: number
  dashboardId?: number
  height?: string
  remark?: string
  title?: string
  url?: string
  width?: number
}

/**
 * api.palace.SaveTeamDashboardRequest
 */
export interface SaveTeamDashboardRequest {
  colorHex?: string
  dashboardId?: number
  remark?: string
  title?: string
}

/**
 * api.palace.SaveTeamDictRequest
 */
export interface SaveTeamDictRequest {
  color?: string
  dictId?: number
  dictType?: number
  key?: string
  lang?: string
  value?: string
}

/**
 * api.palace.SaveTeamMetricDatasourceRequest
 */
export interface SaveTeamMetricDatasourceRequest {
  basicAuth?: BasicAuth
  ca?: string
  datasourceId?: number
  driver?: number
  endpoint?: string
  extra?: KeyValueItem[]
  headers?: KeyValueItem[]
  name?: string
  queryMethod?: number
  remark?: string
  scrapeInterval?: string
  tls?: TLS
}

/**
 * api.palace.SaveTeamMetricStrategyLevelRequest
 */
export interface SaveTeamMetricStrategyLevelRequest {
  /**
   * alarm pages of dict item
   */
  alarmPages?: number[]
  /**
   * Condition
   */
  condition?: number
  /**
   * Duration in seconds
   */
  duration?: string
  /**
   * Label notices
   */
  labelReceiverRoutes?: LabelNotices[]
  /**
   * Level Id of dict item
   */
  levelId?: number
  /**
   * Receiver routes
   */
  receiverRoutes?: number[]
  /**
   * Sample mode
   */
  sampleMode?: number
  /**
   * strategy metric id
   */
  strategyMetricId?: number
  /**
   * Id
   */
  strategyMetricLevelId?: number
  /**
   * Total
   */
  total?: string
  /**
   * Values
   */
  values?: number[]
}

/**
 * api.palace.SaveTeamMetricStrategyRequest
 */
export interface SaveTeamMetricStrategyRequest {
  /**
   * Annotations
   */
  annotations?: AnnotationsItem
  /**
   * Datasource
   */
  datasource?: number[]
  /**
   * Expression
   */
  expr?: string
  /**
   * Labels
   */
  labels?: KeyValueItem[]
  /**
   * Strategy id
   */
  strategyId?: number
}

/**
 * api.palace.SaveTeamNoticeGroupRequest
 */
export interface SaveTeamNoticeGroupRequest {
  emailConfigId?: number
  groupId?: number
  hookIds?: number[]
  members?: SaveTeamNoticeGroupRequest_Member[]
  name?: string
  remark?: string
  smsConfigId?: number
}

/**
 * api.palace.SaveTeamNoticeGroupRequest_Member
 */
export interface SaveTeamNoticeGroupRequest_Member {
  dutyCycleIds?: number[]
  memberId?: number
  noticeType?: number
}

/**
 * api.palace.SaveTeamNoticeHookRequest
 */
export interface SaveTeamNoticeHookRequest {
  app?: number
  headers?: KeyValueItem[]
  hookId?: number
  method?: number
  name?: string
  remark?: string
  secret?: string
  url?: string
}

/**
 * api.palace.SaveTeamRequest
 */
export interface SaveTeamRequest {
  /**
   * Team logo URL
   */
  logo?: string
  /**
   * Team name
   */
  name?: string
  /**
   * Team remark or description
   */
  remark?: string
  teamId?: number
}

/**
 * api.palace.SaveTeamRoleRequest
 */
export interface SaveTeamRoleRequest {
  /**
   * List of resource Ids associated with the role
   */
  menuIds?: number[]
  /**
   * Role name
   */
  name?: string
  /**
   * Role remark or description
   */
  remark?: string
  /**
   * Role Id, optional for new roles
   */
  roleId?: number
}

/**
 * api.palace.SaveTeamStrategyGroupRequest
 */
export interface SaveTeamStrategyGroupRequest {
  /**
   * Strategy group Id, optional for new groups
   */
  groupId?: number
  /**
   * Strategy group name
   */
  name?: string
  /**
   * Strategy group remark or description
   */
  remark?: string
}

/**
 * api.palace.SaveTeamStrategyRequest
 */
export interface SaveTeamStrategyRequest {
  groupId?: number
  /**
   * Strategy item name
   */
  name?: string
  /**
   * Receiver routes
   */
  receiverRoutes?: number[]
  /**
   * Strategy item remark or description
   */
  remark?: string
  /**
   * Strategy item Id, optional for new items
   */
  strategyId?: number
  /**
   * Strategy item type
   */
  strategyType?: number
}

/**
 * api.palace.SaveTimeEngineRequest
 */
export interface SaveTimeEngineRequest {
  name?: string
  remark?: string
  ruleIds?: number[]
  timeEngineId?: number
}

/**
 * api.palace.SaveTimeEngineRuleRequest
 */
export interface SaveTimeEngineRuleRequest {
  name?: string
  remark?: string
  ruleIds?: number[]
  timeEngineRuleId?: number
  type?: number
}

/**
 * api.palace.SelectTeamDashboardChartReply
 */
export interface SelectTeamDashboardChartReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.SelectTeamDashboardChartRequest
 */
export interface SelectTeamDashboardChartRequest {
  dashboardId?: number
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.SelectTeamDashboardReply
 */
export interface SelectTeamDashboardReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.SelectTeamDashboardRequest
 */
export interface SelectTeamDashboardRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.SelectTeamDictReply
 */
export interface SelectTeamDictReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.SelectTeamDictRequest
 */
export interface SelectTeamDictRequest {
  dictTypes?: number[]
  keyword?: string
  langs?: string[]
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.SelectTeamMembersReply
 */
export interface SelectTeamMembersReply {
  /**
   * List of team member items
   */
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.SelectTeamMembersRequest
 */
export interface SelectTeamMembersRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number[]
}

/**
 * api.palace.SelectTeamStrategyGroupReply
 */
export interface SelectTeamStrategyGroupReply {
  /**
   * List of strategy group items
   */
  items?: SelectItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.SelectTeamStrategyGroupRequest
 */
export interface SelectTeamStrategyGroupRequest {
  /**
   * Keyword to search strategy groups by
   */
  keyword?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * List of statuses to filter strategy groups by
   */
  status?: number[]
}

/**
 * api.palace.SelectTimeEngineReply
 */
export interface SelectTimeEngineReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.SelectTimeEngineRequest
 */
export interface SelectTimeEngineRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.SelectTimeEngineRuleReply
 */
export interface SelectTimeEngineRuleReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.SelectTimeEngineRuleRequest
 */
export interface SelectTimeEngineRuleRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number
  types?: number[]
}

/**
 * api.palace.SelfSubscribeTeamStrategiesReply
 */
export interface SelfSubscribeTeamStrategiesReply {
  /**
   * List of team strategy items
   */
  items?: TeamStrategyItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.SelfSubscribeTeamStrategiesRequest
 */
export interface SelfSubscribeTeamStrategiesRequest {
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
}

/**
 * api.palace.SelfTeamListReply
 */
export interface SelfTeamListReply {
  /**
   * List of team items
   */
  items?: TeamItem[]
}

/**
 * api.palace.SendMsgCallbackReply
 */
export interface SendMsgCallbackReply {
  /**
   * Code of the reply 0 is success, other is failed
   */
  code?: number
  /**
   * Message of the reply, only when code is not 0, it is not empty
   */
  msg?: string
}

/**
 * api.palace.SendMsgCallbackRequest
 */
export interface SendMsgCallbackRequest {
  /**
   * Code of the callback 0 is success, other is failed
   */
  code?: number
  /**
   * Message of the callback, only when code is not 0, it is not empty
   */
  msg?: string
  requestId?: string
  teamId?: number
}

/**
 * api.palace.SubscribeTeamStrategiesReply
 */
export interface SubscribeTeamStrategiesReply {
  /**
   * subscribers
   */
  items?: SubscriberItem[]
  /**
   * pagination
   */
  pagination?: PaginationReply
}

/**
 * api.palace.SubscribeTeamStrategiesRequest
 */
export interface SubscribeTeamStrategiesRequest {
  pagination?: PaginationRequest
  /**
   * subscribe type
   */
  subscribeType?: number
  /**
   * subscribers
   */
  subscribers?: number[]
}

/**
 * api.palace.SubscribeTeamStrategyRequest
 */
export interface SubscribeTeamStrategyRequest {
  /**
   * Strategy id
   */
  strategyId?: number
  /**
   * subscribe type
   */
  subscribeType?: number
}

/**
 * api.palace.SummaryAlarmReply
 */
export interface SummaryAlarmReply {
  /**
   * 图表数据
   */
  chartData?: number[]
  /**
   * 最高优先级的告警
   */
  highestPriority?: string
  /**
   * 最高优先级告警环比
   */
  highestPriorityComparison?: string
  /**
   * 正在告警
   */
  ongoing?: string
  /**
   * 正在告警环比
   */
  ongoingComparison?: string
  /**
   * 已恢复
   */
  recovered?: string
  /**
   * 已恢复环比
   */
  recoveredComparison?: string
  /**
   * 告警总数
   */
  total?: string
  /**
   * 总数环比
   */
  totalComparison?: string
}

/**
 * api.palace.SyncMetadataReply
 */
export interface SyncMetadataReply {
  /**
   * Code of the reply 0 is success, other is failed
   */
  code?: number
  /**
   * Message of the reply, only when code is not 0, it is not empty
   */
  msg?: string
}

/**
 * api.palace.SyncMetadataRequest
 */
export interface SyncMetadataRequest {
  datasourceId?: number
  isDone?: boolean
  items?: MetricItem[]
  operatorId?: number
  teamId?: number
}

/**
 * api.palace.SyncMetricMetadataRequest
 */
export interface SyncMetricMetadataRequest {
  datasourceId?: number
}

/**
 * api.palace.TeamMetricStrategyLevelListReply
 */
export interface TeamMetricStrategyLevelListReply {
  items?: TeamStrategyMetricLevelItem[]
  /**
   * Pagination
   */
  pagination?: PaginationReply
}

/**
 * api.palace.TeamMetricStrategyLevelListRequest
 */
export interface TeamMetricStrategyLevelListRequest {
  /**
   * Keyword
   */
  keyword?: string
  /**
   * Level id
   */
  levelId?: number
  /**
   * Pagination
   */
  pagination?: PaginationRequest
  /**
   * Status
   */
  status?: number
  /**
   * Strategy metric id
   */
  strategyMetricId?: number
}

/**
 * api.palace.TeamNoticeGroupSelectReply
 */
export interface TeamNoticeGroupSelectReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.TeamNoticeGroupSelectRequest
 */
export interface TeamNoticeGroupSelectRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: number
}

/**
 * api.palace.TeamNoticeHookSelectReply
 */
export interface TeamNoticeHookSelectReply {
  items?: SelectItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.TeamNoticeHookSelectRequest
 */
export interface TeamNoticeHookSelectRequest {
  apps?: number[]
  keyword?: string
  pagination?: PaginationRequest
  status?: number
  url?: string
}

/**
 * api.palace.TopStrategyAlarmReply
 */
export interface TopStrategyAlarmReply {
  /**
   * 策略告警数量TopN
   */
  topN?: TopStrategyAlarmReply_StrategyAlarmTopN[]
}

/**
 * api.palace.TopStrategyAlarmReply_StrategyAlarmTopN
 */
export interface TopStrategyAlarmReply_StrategyAlarmTopN {
  /**
   * 策略ID
   */
  strategyId?: string
  /**
   * 策略名称
   */
  strategyName?: string
  /**
   * 告警数量
   */
  total?: string
}

/**
 * api.palace.TransferTeamRequest
 */
export interface TransferTeamRequest {
  /**
   * New leader's user Id
   */
  newLeaderId?: number
}

/**
 * api.palace.UpdateInviteStatusReply
 */
export interface UpdateInviteStatusReply { }

/**
 * api.palace.UpdateInviteStatusRequest
 */
export interface UpdateInviteStatusRequest {
  id?: number
  type?: number
}

/**
 * api.palace.UpdateMemberPositionRequest
 */
export interface UpdateMemberPositionRequest {
  /**
   * Member Id
   */
  memberId?: number
  /**
   * New position for the member
   */
  position?: number
}

/**
 * api.palace.UpdateMemberRolesRequest
 */
export interface UpdateMemberRolesRequest {
  /**
   * List of member Ids to update
   */
  memberId?: number
  /**
   * List of role Ids to assign to the members
   */
  roleIds?: number[]
}

/**
 * api.palace.UpdateMemberStatusRequest
 */
export interface UpdateMemberStatusRequest {
  /**
   * List of member Ids to update
   */
  memberIds?: number[]
  /**
   * New status for the members
   */
  status?: number
}

/**
 * api.palace.UpdateMetricDatasourceMetadataRequest
 */
export interface UpdateMetricDatasourceMetadataRequest {
  datasourceId?: number
  help?: string
  metadataId?: number
  type?: string
  unit?: string
}

/**
 * api.palace.UpdateRoleStatusRequest
 */
export interface UpdateRoleStatusRequest {
  /**
   * Role Id
   */
  roleId?: number
  /**
   * New status for the role
   */
  status?: number
}

/**
 * api.palace.UpdateRoleUsersRequest
 */
export interface UpdateRoleUsersRequest {
  /**
   * Role Id
   */
  roleId?: number
  /**
   * List of user Ids to assign to the role
   */
  userIds?: number[]
}

/**
 * api.palace.UpdateSelfAvatarRequest
 */
export interface UpdateSelfAvatarRequest {
  /**
   * User avatar URL
   */
  avatar?: string
}

/**
 * api.palace.UpdateSelfInfoRequest
 */
export interface UpdateSelfInfoRequest {
  /**
   * User gender
   */
  gender?: number
  /**
   * User nickname
   */
  nickname?: string
  /**
   * User remark or description
   */
  remark?: string
  /**
   * User phone number
   */
  phone?: string
  /**
   * User email address
   */
  email?: string
}

/**
 * api.palace.UpdateSelfPasswordRequest
 */
export interface UpdateSelfPasswordRequest {
  /**
   * New password
   */
  newPassword?: string
  /**
   * Current password
   */
  oldPassword?: string
}

/**
 * api.palace.UpdateSelfEmailRequest
 */
export interface UpdateSelfEmailRequest {
  /**
   * User email address
   */
  email: string
}

/**
 * api.palace.UpdateSelfPhoneRequest
 */
export interface UpdateSelfPhoneRequest {
  /**
   * User phone number
   */
  phone: string
}

/**
 * api.palace.UpdateTeamStatusRequest
 */
export interface UpdateTeamStatusRequest {
  /**
   * Team ID
   */
  teamId: number
  /**
   * Team status
   */
  status: number
}

/**
 * api.palace.UpdateTeamAuditStatusRequest
 */
export interface UpdateTeamAuditStatusRequest {
  /**
   * Audit Id
   */
  auditId?: number
  /**
   * Reason for the status update
   */
  reason?: string
  /**
   * New status for the team audit record
   */
  status?: number
}

/**
 * api.palace.UpdateTeamDashboardChartStatusRequest
 */
export interface UpdateTeamDashboardChartStatusRequest {
  chartIds?: number[]
  dashboardId?: number
  status?: number
}

/**
 * api.palace.UpdateTeamDashboardStatusRequest
 */
export interface UpdateTeamDashboardStatusRequest {
  dashboardIds?: number[]
  status?: number
}

/**
 * api.palace.UpdateTeamDictStatusRequest
 */
export interface UpdateTeamDictStatusRequest {
  dictIds?: number[]
  status?: number
}

/**
 * api.palace.UpdateTeamMetricDatasourceStatusRequest
 */
export interface UpdateTeamMetricDatasourceStatusRequest {
  datasourceId?: number
  status?: number
}

/**
 * api.palace.UpdateTeamMetricStrategyLevelStatusRequest
 */
export interface UpdateTeamMetricStrategyLevelStatusRequest {
  /**
   * Status
   */
  status?: number
  /**
   * Strategy metric level id
   */
  strategyMetricLevelIds?: number[]
}

/**
 * api.palace.UpdateTeamNoticeGroupStatusRequest
 */
export interface UpdateTeamNoticeGroupStatusRequest {
  groupId?: number
  status?: number
}

/**
 * api.palace.UpdateTeamNoticeHookStatusRequest
 */
export interface UpdateTeamNoticeHookStatusRequest {
  hookId?: number
  status?: number
}

/**
 * api.palace.UpdateTeamRoleStatusRequest
 */
export interface UpdateTeamRoleStatusRequest {
  /**
   * Role Id
   */
  roleId?: number
  /**
   * New status for the role
   */
  status?: number
}

/**
 * api.palace.UpdateTeamStrategiesStatusRequest
 */
export interface UpdateTeamStrategiesStatusRequest {
  /**
   * Status
   */
  status?: number
  /**
   * Strategy ids
   */
  strategyIds?: number[]
}

/**
 * api.palace.UpdateTeamStrategyGroupStatusRequest
 */
export interface UpdateTeamStrategyGroupStatusRequest {
  /**
   * Strategy group Id
   */
  groupId?: number
  /**
   * New status for the strategy group
   */
  status?: number
}

/**
 * api.palace.UpdateTimeEngineRuleStatusRequest
 */
export interface UpdateTimeEngineRuleStatusRequest {
  status?: number
  timeEngineRuleIds?: number[]
}

/**
 * api.palace.UpdateTimeEngineStatusRequest
 */
export interface UpdateTimeEngineStatusRequest {
  status?: number
  timeEngineIds?: number[]
}

/**
 * api.palace.UpdateUserPositionRequest
 */
export interface UpdateUserPositionRequest {
  /**
   * New position for the user
   */
  position?: number
  /**
   * User Id
   */
  userId?: number
}

/**
 * api.palace.UpdateUserRolesRequest
 */
export interface UpdateUserRolesRequest {
  /**
   * List of role Ids to assign to the user
   */
  roleIds?: number[]
  /**
   * User Id
   */
  userId?: number
}

/**
 * api.palace.UpdateUserStatusRequest
 */
export interface UpdateUserStatusRequest {
  /**
   * New status for the users
   */
  status?: number
  /**
   * List of user Ids to update
   */
  userIds?: number[]
}

/**
 * api.palace.VerifyEmailReply
 */
export interface VerifyEmailReply {
  /**
   * Email verification code expiration time in seconds
   */
  expiredSeconds?: number
}

/**
 * api.palace.VerifyEmailRequest
 */
export interface VerifyEmailRequest {
  /**
   * Captcha validation information
   */
  captcha?: CaptchaValidateRequest
  /**
   * Email to verify
   */
  email?: string
}

/**
 * api.palace.common.AnnotationsItem
 */
export interface AnnotationsItem {
  description?: string
  summary?: string
}

/**
 * api.palace.common.BasicAuth
 */
export interface BasicAuth {
  password?: string
  username?: string
}

/**
 * api.palace.common.EmailConfigItem
 */
export interface EmailConfigItem {
  /**
   * creator of the email configuration
   */
  creator?: UserBaseItem
  /**
   * emailConfigId of the email configuration
   */
  emailConfigId?: number
  /**
   * Email server host
   */
  host?: string
  /**
   * Name of the email configuration
   */
  name?: string
  /**
   * Email password
   */
  pass?: string
  /**
   * Email server port
   */
  port?: number
  /**
   * Remark of the email configuration
   */
  remark?: string
  /**
   * Enable email configuration
   */
  status?: number
  /**
   * Email user
   */
  user?: string
}

/**
 * api.palace.common.EmptyReply
 */
export interface EmptyReply { }

/**
 * api.palace.common.EmptyRequest
 */
export interface EmptyRequest { }

/**
 * api.palace.common.KeyValueItem
 */
export interface KeyValueItem {
  key?: string
  value?: string
}

/**
 * api.palace.common.LabelNotices
 */
export interface LabelNotices {
  key?: string
  receiverRoutes?: number[]
  value?: string
}

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
   * Sort of the menu tree item
   */
  sort?: number
  /**
   * Status of the menu tree item
   */
  status?: number
}

/**
 * api.palace.common.NoticeGroupItem
 */
export interface NoticeGroupItem {
  createdAt?: string
  creator?: UserBaseItem
  hooks?: NoticeHookItem[]
  name?: string
  noticeGroupId?: number
  noticeMembers?: NoticeMemberItem[]
  remark?: string
  status?: number
  updatedAt?: string
}

/**
 * api.palace.common.NoticeHookItem
 */
export interface NoticeHookItem {
  app?: number
  createdAt?: string
  creator?: UserBaseItem
  headers?: KeyValueItem[]
  method?: number
  name?: string
  noticeGroups?: NoticeGroupItem[]
  noticeHookId?: number
  remark?: string
  secret?: string
  status?: number
  updatedAt?: string
  url?: string
}

/**
 * api.palace.common.NoticeMemberItem
 */
export interface NoticeMemberItem {
  dutyCycles?: TimeEngineItem[]
  member?: TeamMemberBaseItem
  noticeGroup?: NoticeGroupItem
  noticeGroupId?: number
  noticeType?: number
  userId?: number
}

/**
 * api.palace.common.OperateLogItem
 */
export interface OperateLogItem {
  clientIP?: string
  createdAt?: string
  duration?: string
  error?: string
  menuId?: number
  menuName?: string
  operation?: string
  originRequest?: string
  replyTime?: string
  request?: string
  requestTime?: string
  updatedAt?: string
  userAgent?: string
  userBaseInfo?: string
}

/**
 * api.palace.common.OperateLogListReply
 */
export interface OperateLogListReply {
  /**
   * List of operation log items
   */
  items?: OperateLogItem[]
  /**
   * Pagination response details
   */
  pagination?: PaginationReply
}

/**
 * api.palace.common.OperateLogListRequest
 */
export interface OperateLogListRequest {
  /**
   * Keyword to search operation logs by
   */
  keyword?: string
  /**
   * List of types to filter operation logs by
   */
  operateTypes?: number[]
  /**
   * Operation
   */
  operation?: string
  /**
   * Pagination request details
   */
  pagination?: PaginationRequest
  /**
   * Time range to filter operation logs by
   */
  timeRange?: string[]
  /**
   * User Id, optional for filtering logs by user
   */
  userId?: number
}

/**
 * api.palace.common.PaginationReply
 */
export interface PaginationReply {
  page?: number
  pageSize?: number
  total?: number
}

/**
 * api.palace.common.PaginationRequest
 */
export interface PaginationRequest {
  page?: number
  pageSize?: number
}

/**
 * api.palace.common.SMSConfigItem
 */
export interface SMSConfigItem {
  /**
   * Access Key Id for the SMS provider
   */
  accessKeyId?: string
  /**
   * Access Key Secret for the SMS provider
   */
  accessKeySecret?: string
  /**
   * creator of the SMS configuration
   */
  creator?: UserBaseItem
  /**
   * Endpoint for the SMS provider
   */
  endpoint?: string
  /**
   * Name of the SMS configuration
   */
  name?: string
  /**
   * SMS provider type
   */
  providerType?: number
  /**
   * Remark of the SMS configuration
   */
  remark?: string
  /**
   * Sign name for the SMS provider
   */
  signName?: string
  /**
   * smsConfigId of the SMS configuration
   */
  smsConfigId?: number
  /**
   * Enable SMS configuration
   */
  status?: number
}

/**
 * api.palace.common.SelectItem
 */
export interface SelectItem {
  disabled?: boolean
  extra?: SelectItem_Extra
  label?: string
  value?: number
}

/**
 * api.palace.common.SelectItem_Extra
 */
export interface SelectItem_Extra {
  color?: string
  icon?: string
  remark?: string
}

/**
 * api.palace.common.SendMessageLogItem
 */
export interface SendMessageLogItem {
  createdAt?: string
  error?: string
  message?: string
  messageType?: number
  requestId?: string
  retryCount?: number
  status?: number
  updatedAt?: string
}

/**
 * api.palace.common.StrategyMetricLevelLabelNotice
 */
export interface StrategyMetricLevelLabelNotice {
  createdAt?: string
  labelKey?: string
  labelNoticeId?: number
  labelValue?: string
  notices?: NoticeGroupItem[]
  strategyMetricRuleId?: number
  updatedAt?: string
}

/**
 * api.palace.common.SubscriberItem
 */
export interface SubscriberItem {
  /**
   * strategy
   */
  strategy?: TeamStrategyItem
  /**
   * subscribe time
   */
  subscribeTime?: string
  /**
   * subscribe type
   */
  subscribeType?: number
  user?: UserBaseItem
}

/**
 * api.palace.common.SystemRoleItem
 */
export interface SystemRoleItem {
  /**
   * Creation time of the system role
   */
  createdAt?: string
  creator?: UserBaseItem
  /**
   * Name of the system role
   */
  name?: string
  /**
   * Remarks about the system role
   */
  remark?: string
  /**
   * List of resources associated with the system role
   */
  resources?: MenuTreeItem[]
  /**
   * Unique identifier for the system role
   */
  roleId?: number
  /**
   * Status of the system role
   */
  status?: number
  /**
   * Last update time of the system role
   */
  updatedAt?: string
  /**
   * List of users assigned to the system role
   */
  users?: UserBaseItem[]
}

/**
 * api.palace.common.TLS
 */
export interface TLS {
  clientCert?: string
  clientKey?: string
  serverName?: string
  skipVerify?: boolean
}

/**
 * api.palace.common.TeamAuditItem
 */
export interface TeamAuditItem {
  action?: number
  /**
   * Creation time of the audit record
   */
  createdAt?: string
  /**
   * Reason for the audit result
   */
  reason?: string
  /**
   * Status of the team audit
   */
  status?: number
  /**
   * Team information being audited
   */
  team?: TeamBaseItem
  /**
   * Unique identifier for the team audit record
   */
  teamAuditId?: number
  /**
   * User information of the audit requester
   */
  user?: UserBaseItem
}

/**
 * api.palace.common.TeamBaseItem
 */
export interface TeamBaseItem {
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
  /**
   * Unique identifier for the team
   */
  teamId?: number
}

/**
 * api.palace.common.TeamDashboardChartItem
 */
export interface TeamDashboardChartItem {
  createdAt?: string
  dashboardId?: number
  height?: string
  remark?: string
  status?: number
  teamDashboardChartId?: number
  title?: string
  updatedAt?: string
  url?: string
  width?: number
}

/**
 * api.palace.common.TeamDashboardItem
 */
export interface TeamDashboardItem {
  colorHex?: string
  createdAt?: string
  name?: string
  remark?: string
  status?: number
  teamDashboardId?: number
  updatedAt?: string
}

/**
 * api.palace.common.TeamDictItem
 */
export interface TeamDictItem {
  color?: string
  createdAt?: string
  creator?: UserBaseItem
  dictId?: number
  dictType?: number
  key?: string
  lang?: string
  status?: number
  teamId?: number
  updatedAt?: string
  value?: string
}

/**
 * api.palace.common.TeamItem
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
  name?: string
  /**
   * Remarks or additional information about the team.
   */
  remark?: string
  /**
   * Status of the team.
   */
  status?: number
  /**
   * Total number of strategies associated with the team.
   */
  strategyCount?: string
  /**
   * Unique identifier for the team.
   */
  teamId?: number
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
 * api.palace.common.TeamMemberBaseItem
 */
export interface TeamMemberBaseItem {
  createdAt?: string
  memberName?: string
  position?: number
  remark?: string
  status?: number
  teamMemberId?: number
  updatedAt?: string
  user?: UserBaseItem
}

/**
 * api.palace.common.TeamMemberItem
 */
export interface TeamMemberItem {
  /**
   * Timestamp indicating when the member was added to the team.
   */
  createdAt?: string
  /**
   * Information about the user who invited the member.
   */
  inviter?: UserBaseItem
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
  status?: number
  /**
   * Unique identifier for the member.
   */
  teamMemberId?: number
  /**
   * Timestamp indicating when the member's information was last updated.
   */
  updatedAt?: string
  /**
   * Information about the user who is a member.
   */
  user?: UserBaseItem
}

/**
 * api.palace.common.TeamMetricDatasourceItem
 */
export interface TeamMetricDatasourceItem {
  basicAuth?: BasicAuth
  ca?: string
  createdAt?: string
  creator?: UserBaseItem
  datasourceId?: number
  driver?: number
  endpoint?: string
  extra?: KeyValueItem[]
  headers?: KeyValueItem[]
  name?: string
  queryMethod?: number
  remark?: string
  scrapeInterval?: string
  status?: number
  teamId?: number
  tls?: TLS
  updatedAt?: string
}

/**
 * api.palace.common.TeamMetricDatasourceMetadataItem
 */
export interface TeamMetricDatasourceMetadataItem {
  createdAt?: string
  datasourceId?: number
  help?: string
  labels?: TeamMetricDatasourceMetadataItem_Label[]
  metadataId?: number
  name?: string
  type?: string
  unit?: string
  updatedAt?: string
}

/**
 * api.palace.common.TeamMetricDatasourceMetadataItem_Label
 */
export interface TeamMetricDatasourceMetadataItem_Label {
  key?: string
  values?: string[]
}

/**
 * api.palace.common.TeamRoleItem
 */
export interface TeamRoleItem {
  /**
   * Timestamp indicating when the role was created.
   */
  createdAt?: string
  creator?: UserBaseItem
  /**
   * List of members assigned to the role.
   */
  members?: TeamMemberItem[]
  /**
   * List of menus associated with the role.
   */
  menus?: MenuTreeItem[]
  /**
   * Name of the role.
   */
  name?: string
  /**
   * Remarks or additional information about the role.
   */
  remark?: string
  /**
   * Status of the role.
   */
  status?: number
  /**
   * Unique identifier for the role.
   */
  teamRoleId?: number
  /**
   * Timestamp indicating when the role was last updated.
   */
  updatedAt?: string
}

/**
 * api.palace.common.TeamStrategyGroupItem
 */
export interface TeamStrategyGroupItem {
  /**
   * Timestamp indicating when the group was created.
   */
  createdAt?: string
  /**
   * Information about the creator of the group.
   */
  creator?: UserBaseItem
  /**
   * Number of enabled strategies in the group.
   */
  enableStrategyCount?: string
  /**
   * Unique identifier for the strategy group.
   */
  groupId?: number
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
  status?: number
  /**
   * Total number of strategies in the group.
   */
  strategyCount?: string
  /**
   * Timestamp indicating when the group was last updated.
   */
  updatedAt?: string
}

/**
 * api.palace.common.TeamStrategyItem
 */
export interface TeamStrategyItem {
  /**
   * Timestamp indicating when the strategy was created.
   */
  createdAt?: string
  /**
   * Information about the creator of the strategy.
   */
  creator?: UserBaseItem
  group?: TeamStrategyGroupItem
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
  status?: number
  /**
   * Unique identifier for the strategy.
   */
  strategyId?: number
  strategyType?: number
  /**
   * Information about the team associated with the strategy.
   */
  team?: TeamBaseItem
  /**
   * Timestamp indicating when the strategy was last updated.
   */
  updatedAt?: string
}

/**
 * api.palace.common.TeamStrategyMetricItem
 */
export interface TeamStrategyMetricItem {
  annotations?: AnnotationsItem
  base?: TeamStrategyItem
  creator?: UserBaseItem
  datasource?: TeamMetricDatasourceItem[]
  expr?: string
  labels?: KeyValueItem[]
  strategyMetricId?: number
  strategyMetricLevels?: TeamStrategyMetricLevelItem[]
}

/**
 * api.palace.common.TeamStrategyMetricLevelItem
 */
export interface TeamStrategyMetricLevelItem {
  alarmPages?: TeamDictItem[]
  condition?: number
  duration?: string
  labelReceiverRoutes?: StrategyMetricLevelLabelNotice[]
  level?: TeamDictItem
  receiverRoutes?: NoticeGroupItem[]
  sampleMode?: number
  status?: number
  strategyMetricId?: number
  strategyMetricLevelId?: number
  total?: string
  values?: number[]
}

/**
 * api.palace.common.TimeEngineItem
 */
export interface TimeEngineItem {
  createdAt?: string
  creator?: UserBaseItem
  name?: string
  remark?: string
  rules?: TimeEngineItemRule[]
  status?: number
  timeEngineId?: number
  updatedAt?: string
}

/**
 * api.palace.common.TimeEngineItemRule
 */
export interface TimeEngineItemRule {
  createdAt?: string
  creator?: UserBaseItem
  engines?: TimeEngineItem[]
  name?: string
  remark?: string
  rules?: string[]
  status?: number
  timeEngineRuleId?: number
  type?: number
  updatedAt?: string
}

/**
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
  gender?: number
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
  position?: number
  /**
   * Remarks about the user
   */
  remark?: string
  /**
   * User's status
   */
  status?: number
  /**
   * User's last update time
   */
  updatedAt?: string
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
 * api.palace.portal.CaptchaValidateRequest
 */
export interface CaptchaValidateRequest {
  /**
   * User's captcha answer
   */
  answer?: string
  /**
   * Captcha Id, used to identify the captcha image
   */
  captchaId?: string
}

/**
 * api.palace.portal.CookieItem
 */
export interface CookieItem {
  name?: string
  remark?: string
  url?: string
}

/**
 * api.palace.portal.CopyrightItem
 */
export interface CopyrightItem {
  name?: string
  url?: string
}

/**
 * api.palace.portal.FeatureItem
 */
export interface FeatureItem {
  icon?: string
  link?: string
  remark?: string
  title?: string
}

/**
 * api.palace.portal.FeaturesReply
 */
export interface FeaturesReply {
  items?: FeatureItem[]
}

/**
 * api.palace.portal.FooterItem
 */
export interface FooterItem {
  name?: string
  remark?: string
  url?: string
}

/**
 * api.palace.portal.FooterReply
 */
export interface FooterReply {
  /**
   * 公司
   */
  companies?: FooterItem[]
  /**
   * Cookie 政策
   */
  cookie?: CookieItem
  /**
   * 版权
   */
  copyright?: CopyrightItem
  /**
   * 备案
   */
  icp?: ICPItem
  /**
   * 隐私政策
   */
  privacy?: PolicyItem
  /**
   * 产品
   */
  products?: FooterItem[]
  remark?: string
  /**
   * 资源
   */
  resources?: FooterItem[]
  /**
   * 服务条款
   */
  terms?: TermsItem
}

/**
 * api.palace.portal.GetCaptchaReply
 */
export interface GetCaptchaReply {
  /**
   * Unique identifier for the captcha
   */
  captchaId?: string
  /**
   * Base64 encoded captcha image data
   */
  captchaImg?: string
  /**
   * Captcha expiration time in seconds
   */
  expiredSeconds?: number
}

/**
 * api.palace.portal.ICPItem
 */
export interface ICPItem {
  name?: string
  remark?: string
  url?: string
}

/**
 * api.palace.portal.ListPackageReply
 */
export interface ListPackageReply {
  items?: PackageItem[]
}

/**
 * api.palace.portal.LoginInfo
 */
export interface LoginInfo {
  expiresAt?: string
  token?: string
  user?: UserBaseItem
}

/**
 * api.palace.portal.LoginRequest
 */
export interface LoginRequest {
  code?: string
  email?: string
  password?: string
}

/**
 * api.palace.portal.PackageFeature
 */
export interface PackageFeature {
  name?: string
  remark?: string
}

/**
 * api.palace.portal.PackageItem
 */
export interface PackageItem {
  currency?: string
  features?: PackageFeature[]
  id?: string
  name?: string
  period?: string
  price?: number
  remark?: string
}

/**
 * api.palace.portal.PartnerItem
 */
export interface PartnerItem {
  logo?: string
  name?: string
  remark?: string
  url?: string
}

/**
 * api.palace.portal.PartnersReply
 */
export interface PartnersReply {
  items?: PartnerItem[]
}

/**
 * api.palace.portal.PolicyItem
 */
export interface PolicyItem {
  name?: string
  remark?: string
  url?: string
}

/**
 * api.palace.portal.RegisterRequest
 */
export interface RegisterRequest {
  code?: string
  email?: string
  password?: string
  username?: string
}

/**
 * api.palace.portal.TermsItem
 */
export interface TermsItem {
  name?: string
  remark?: string
  url?: string
}

/**
 * api.palace.portal.VerifyEmailRequest
 */
export interface VerifyEmailRequest {
  /**
   * Captcha validation information
   */
  captcha?: CaptchaValidateRequest
  email?: string
}

/**
 * config.Consul
 */
export interface Consul {
  address?: string
  path?: string
}

/**
 * config.Discovery
 */
export interface Discovery {
  consul?: Consul
  driver?: number
  enable?: boolean
  etcd?: Etcd
}

/**
 * config.Etcd
 */
export interface Etcd {
  autoSyncInterval?: string
  backoffJitterFraction?: number
  backoffWaitBetween?: string
  dialKeepAliveTime?: string
  dialKeepAliveTimeout?: string
  endpoints?: string[]
  maxCallRecvMsgSize?: string
  maxCallSendMsgSize?: string
  maxUnaryRetries?: string
  password?: string
  permitWithoutStream?: boolean
  rejectOldCluster?: boolean
  timeout?: string
  username?: string
}

/**
 * config.MicroServer
 */
export interface MicroServer {
  /**
   * enable micro service
   */
  enable?: boolean
  /**
   * endpoint
   */
  endpoint?: string
  /**
   * name service name
   */
  name?: string
  /**
   * network type, http, https, grpc
   */
  network?: number
  /**
   * secret
   */
  secret?: string
  /**
   * timeout
   */
  timeout?: string
  /**
   * node version
   */
  version?: string
}
