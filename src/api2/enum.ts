export enum ResourceModule {
  // RESOURCE_MODULE_UNKNOWN is the default module for a resource.
  RESOURCE_MODULE_UNKNOWN = '未知',
  // The module to which the resource belongs is unspecified.
  RESOURCE_MODULE_UNSPECIFIED = '未指定',
  // The resource belongs to the system module.
  RESOURCE_MODULE_SYSTEM = '系统',
  // The resource belongs to the user module.
  RESOURCE_MODULE_USER = '用户',
  // The resource belongs to the team module.
  RESOURCE_MODULE_TEAM = '团队'
}

export enum Gender {
  // Gender is unspecified.
  GENDER_UNSPECIFIED = '未指定',
  // Gender is male.
  GENDER_MALE = '男',
  // Gender is female.
  GENDER_FEMALE = '女'
}

export enum UserStatus {
  // The user status is unknown.
  USER_STATUS_UNKNOWN = '未知',
  // The user status is normal.
  USER_STATUS_NORMAL = '正常',
  // The user status is forbidden.
  USER_STATUS_FORBIDDEN = '禁用',
  // The user status is deleted.
  USER_STATUS_DELETED = '已删除'
}
export const UserStatusMap: Record<keyof typeof UserStatus, { color: string }> = {
  USER_STATUS_UNKNOWN: {
    color: '#f5222d'
  },
  USER_STATUS_NORMAL: {
    color: '#1890ff'
  },
  USER_STATUS_FORBIDDEN: {
    color: '#f5222d'
  },
  USER_STATUS_DELETED: {
    color: '#f5222d'
  }
}

export enum UserPosition {
  // The user position is unknown.
  USER_POSITION_UNKNOWN = '未知',
  // The user position is super admin.
  USER_POSITION_SUPER_ADMIN = '超级管理员',
  // The user position is admin.
  USER_POSITION_ADMIN = '管理员',
  // The user position is a regular user.
  USER_POSITION_USER = '普通用户',
  // The user position is guest.
  USER_POSITION_GUEST = '访客'
}

export enum TeamAuditStatus {
  // The team audit status is unknown.
  TEAM_AUDIT_STATUS_UNKNOWN = '未知',
  // The team audit status is pending.
  TEAM_AUDIT_STATUS_PENDING = '待审核',
  // The team audit status is approved.
  TEAM_AUDIT_STATUS_APPROVED = '已通过',
  // The team audit status is rejected.
  TEAM_AUDIT_STATUS_REJECTED = '已拒绝'
}

export enum TeamAuditAction {
  // The team audit action is unknown.
  TEAM_AUDIT_ACTION_UNKNOWN = '未知',
  // The team audit action is join.
  TEAM_AUDIT_ACTION_JOIN = '加入',
  // The team audit action is leave.
  TEAM_AUDIT_ACTION_LEAVE = '离开'
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
