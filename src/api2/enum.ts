export enum ResourceModule {
  // RESOURCE_MODULE_UNKNOWN is the default module for a resource.
  RESOURCE_MODULE_UNKNOWN,
  // The resource belongs to the system module.
  RESOURCE_MODULE_SYSTEM,
  // The resource belongs to the user module.
  RESOURCE_MODULE_USER,
  // The resource belongs to the team module.
  RESOURCE_MODULE_TEAM
}

export enum Gender {
  // Gender is unspecified.
  GENDER_UNSPECIFIED,
  // Gender is male.
  GENDER_MALE,
  // Gender is female.
  GENDER_FEMALE
}

export enum UserStatus {
  // The user status is unknown.
  USER_STATUS_UNKNOWN,
  // The user status is normal.
  USER_STATUS_NORMAL,
  // The user status is forbidden.
  USER_STATUS_FORBIDDEN,
  // The user status is deleted.
  USER_STATUS_DELETED
}

export enum UserPosition {
  // The user position is unknown.
  USER_POSITION_UNKNOWN,
  // The user position is super admin.
  USER_POSITION_SUPER_ADMIN,
  // The user position is admin.
  USER_POSITION_ADMIN,
  // The user position is a regular user.
  USER_POSITION_USER,
  // The user position is guest.
  USER_POSITION_GUEST
}

export enum Role {
  // The role is unknown.
  ROLE_UNKNOWN,
  // The role is super admin.
  ROLE_SUPER_ADMIN,
  // The role is admin.
  ROLE_ADMIN,
  // The role is user.
  ROLE_USER
}

export enum TeamAuditStatus {
  // The team audit status is unknown.
  TEAM_AUDIT_STATUS_UNKNOWN,
  // The team audit status is pending.
  TEAM_AUDIT_STATUS_PENDING,
  // The team audit status is approved.
  TEAM_AUDIT_STATUS_APPROVED,
  // The team audit status is rejected.
  TEAM_AUDIT_STATUS_REJECTED
}

export enum TeamAuditAction {
  // The team audit action is unknown.
  TEAM_AUDIT_ACTION_UNKNOWN,
  // The team audit action is join.
  TEAM_AUDIT_ACTION_JOIN,
  // The team audit action is leave.
  TEAM_AUDIT_ACTION_LEAVE
}

// TeamStatus represents the status of a team.
export enum TeamStatus {
  // TEAM_STATUS_UNKNOWN is the default status for a team.
  TEAM_STATUS_UNKNOWN,
  // TEAM_STATUS_NORMAL indicates the team is operating normally.
  TEAM_STATUS_NORMAL,
  // TEAM_STATUS_FORBIDDEN indicates the team has been forbidden.
  TEAM_STATUS_FORBIDDEN,
  // TEAM_STATUS_DELETED indicates the team has been deleted.
  TEAM_STATUS_DELETED,
  // TEAM_STATUS_APPROVAL indicates the team is waiting for approval.
  TEAM_STATUS_APPROVAL,
  // TEAM_STATUS_REJECTED indicates the team has been rejected.
  TEAM_STATUS_REJECTED
}

// MemberPosition represents the position of a member in a team.
export enum MemberPosition {
  // MEMBER_POSITION_UNKNOWN is the default position for a member.
  MEMBER_POSITION_UNKNOWN,
  // MEMBER_POSITION_SUPER_ADMIN indicates the member is the super administrator of the team.
  MEMBER_POSITION_SUPER_ADMIN,
  // MEMBER_POSITION_ADMIN indicates the member is an administrator of the team.
  MEMBER_POSITION_ADMIN,
  // MEMBER_POSITION_MEMBER indicates the member is a regular member of the team.
  MEMBER_POSITION_MEMBER,
  // MEMBER_POSITION_GUEST indicates the member is a guest of the team.
  MEMBER_POSITION_GUEST
}

// MemberStatus represents the status of a member in a team.
export enum MemberStatus {
  // MEMBER_STATUS_UNKNOWN is the default status for a member.
  MEMBER_STATUS_UNKNOWN,
  // MEMBER_STATUS_NORMAL indicates the member is active and normal.
  MEMBER_STATUS_NORMAL,
  // MEMBER_STATUS_FORBIDDEN indicates the member has been forbidden.
  MEMBER_STATUS_FORBIDDEN,
  // MEMBER_STATUS_DELETED indicates the member has been deleted.
  MEMBER_STATUS_DELETED,
  // MEMBER_STATUS_PENDING_CONFIRM indicates the member is waiting for confirmation to join the team.
  MEMBER_STATUS_PENDING_CONFIRM,
  // MEMBER_STATUS_DEPARTED indicates the member has left the team.
  MEMBER_STATUS_DEPARTED
}

// GlobalStatus represents the status of a global resource.
export enum GlobalStatus {
  // GLOBAL_STATUS_UNKNOWN is the default status for a global resource.
  GLOBAL_STATUS_UNKNOWN,
  // GLOBAL_STATUS_ENABLE indicates the resource is enabled.
  GLOBAL_STATUS_ENABLE,
  // GLOBAL_STATUS_DISABLE indicates the resource is disabled.
  GLOBAL_STATUS_DISABLE
}

export enum StrategyType {
  // STRATEGY_TYPE_UNKNOWN is the default type for a strategy.
  STRATEGY_TYPE_UNKNOWN,
  // STRATEGY_TYPE_METRIC indicates the strategy is based on metrics.
  STRATEGY_TYPE_METRIC,
  // STRATEGY_TYPE_EVENT indicates the strategy is based on events.
  STRATEGY_TYPE_EVENT,
  // STRATEGY_TYPE_LOGS indicates the strategy is based on logs.
  STRATEGY_TYPE_LOGS,
  // STRATEGY_TYPE_PORT indicates the strategy is based on port monitoring.
  STRATEGY_TYPE_PORT,
  // STRATEGY_TYPE_HTTP indicates the strategy is based on HTTP monitoring.
  STRATEGY_TYPE_HTTP,
  // STRATEGY_TYPE_PING indicates the strategy is based on ping monitoring.
  STRATEGY_TYPE_PING,
  // STRATEGY_TYPE_CERT indicates the strategy is based on certificate monitoring.
  STRATEGY_TYPE_CERT
}

export enum DatasourceDriverMetric {
  DATASOURCE_DRIVER_METRIC_UNKNOWN,
  DATASOURCE_DRIVER_METRIC_PROMETHEUS,
  DATASOURCE_DRIVER_METRIC_VICTORIAMETRICS
}

export enum DictType {
  DICT_TYPE_UNKNOWN,
  DICT_TYPE_ALARM_LEVEL,
  DICT_TYPE_ALARM_PAGE
}
export enum HookAPP {
  HOOK_APP_UNKNOWN,
  HOOK_APP_OTHER,
  HOOK_APP_DING_TALK,
  HOOK_APP_WECHAT,
  HOOK_APP_FEI_SHU
}

export enum TimeEngineRuleType {
  TIME_ENGINE_RULE_TYPE_UNKNOWN,
  TIME_ENGINE_RULE_TYPE_HOUR_RANGE,
  TIME_ENGINE_RULE_TYPE_HOUR,
  TIME_ENGINE_RULE_TYPE_HOUR_MINUTE_RANGE,
  TIME_ENGINE_RULE_TYPE_DAYS_OF_WEEK,
  TIME_ENGINE_RULE_TYPE_DAY_OF_MONTH,
  TIME_ENGINE_RULE_TYPE_MONTH
}

export enum HTTPMethod {
  HTTP_METHOD_UNKNOWN,
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  HTTP_METHOD_PUT,
  HTTP_METHOD_DELETE,
  HTTP_METHOD_HEAD,
  HTTP_METHOD_OPTIONS,
  HTTP_METHOD_PATCH
}

// 操作
export enum ActionKey {
  /** 新增 */
  ADD = '__add__',
  /** 详情 */
  DETAIL = '__detail__',
  /** 编辑 */
  EDIT = '__edit__',
  /** 删除 */
  DELETE = '__delete__',
  /** 取消订阅 */
  CANCEL_SUBSCRIBE = '__cancel_subscribe__',
  /** 订阅 */
  SUBSCRIBE = '__subscribe__',
  /** 订阅者 */
  SUBSCRIBER = '__subscriber__',
  /** 启用 */
  ENABLE = '__enable__',
  /** 禁用 */
  DISABLE = '__disable__',
  /** 设置角色 */
  UPDATE_ROLE = '__update_role__',
  /** 重置密码 */
  RESET_PASSWORD = '__reset_password__',
  /** 操作日志 */
  OPERATION_LOG = '__operation_log__',
  /** 立即推送 */
  IMMEDIATELY_PUSH = '__immediately_push__',
  /** 图表 */
  CHART = '__chart__',
  /** 医药包 */
  MEDICAL_PACKAGE = '__medical_package__',
  /** 告警介入 */
  ALARM_INTERVENTION = '__alarm_intervention__',
  /** 告警抑制 */
  ALARM_SILENCE = '__alarm_silence__',
  /** 告警升级 */
  ALARM_UPGRADE = '__alarm_upgrade__',
  /** 图表管理 */
  CHART_MANAGE = '__chart_manage__',
  /** 图表排序-上移 */
  CHART_SORT_UP = '__chart_sort_up__',
  /** 图表排序-下移 */
  CHART_SORT_DOWN = '__chart_sort_down__',
  /** 图表排序-置顶 */
  CHART_SORT_TOP = '__chart_sort_top__',
  /** 图表排序-置底 */
  CHART_SORT_BOTTOM = '__chart_sort_bottom__',
  /** 同步 */
  SYNC = '__sync__'
}
