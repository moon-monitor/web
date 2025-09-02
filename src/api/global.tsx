import { IconFont } from '@/components/icon'
import { CSSProperties } from 'react'
import { PaginationRequest } from './request/types'
import {
  ConditionMetric,
  DatasourceDriverMetric,
  DictType,
  Gender,
  GlobalStatus,
  HookAPP,
  HTTPMethod,
  MemberStatus,
  MenuCategory,
  MenuProcessType,
  MenuType,
  SampleMode,
  StrategyType,
  TeamAuditAction,
  TeamAuditStatus,
  TeamStatus,
  UserPosition,
  UserStatus
} from './request/types/enum'

export const defaultPaginationReq: PaginationRequest = {
  page: 1,
  pageSize: 50
}

export type EnumData = {
  color?: CSSProperties['color']
  label: React.ReactNode | string
  icon?: React.ReactNode
}

export const HookAppData: Record<HookAPP, EnumData> = {
  [HookAPP.HOOK_APP_UNKNOWN]: {
    label: '全部',
    icon: <IconFont type='icon-disable3' />
  },
  [HookAPP.HOOK_APP_DING_TALK]: {
    label: '钉钉',
    icon: <IconFont type='icon-dingding' />
  },
  [HookAPP.HOOK_APP_FEI_SHU]: {
    icon: <IconFont type='icon-feishu' />,
    label: '飞书'
  },
  [HookAPP.HOOK_APP_OTHER]: {
    label: 'WebHook',
    icon: <IconFont type='icon-zidingyi' />
  },
  [HookAPP.HOOK_APP_WECHAT]: {
    icon: <IconFont type='icon-qiyeweixin' />,
    label: '企业微信'
  }
}

export const MemberStatusData: Record<MemberStatus, EnumData> = {
  [MemberStatus.MEMBER_STATUS_UNKNOWN]: {
    color: 'blue',
    label: '未知'
  },
  [MemberStatus.MEMBER_STATUS_NORMAL]: {
    color: 'green',
    label: '正常'
  },
  [MemberStatus.MEMBER_STATUS_FORBIDDEN]: {
    color: 'red',
    label: '禁用'
  },
  [MemberStatus.MEMBER_STATUS_DELETED]: {
    color: 'red',
    label: '已删除'
  },
  [MemberStatus.MEMBER_STATUS_PENDING_CONFIRM]: {
    color: 'yellow',
    label: '待确认'
  },
  [MemberStatus.MEMBER_STATUS_DEPARTED]: {
    color: 'red',
    label: '已离开'
  }
}

export const GlobalStatusData: Record<GlobalStatus, EnumData> = {
  [GlobalStatus.GLOBAL_STATUS_UNKNOWN]: {
    color: 'blue',
    label: '未知'
  },
  [GlobalStatus.GLOBAL_STATUS_ENABLE]: {
    color: 'green',
    label: '启用'
  },
  [GlobalStatus.GLOBAL_STATUS_DISABLE]: {
    color: 'red',
    label: '禁用'
  }
}

export const StrategyTypeData: Record<StrategyType, EnumData> = {
  [StrategyType.STRATEGY_TYPE_UNKNOWN]: {
    color: 'blue',
    label: '未知'
  },
  [StrategyType.STRATEGY_TYPE_METRIC]: {
    color: 'green',
    label: 'Metric'
  },
  [StrategyType.STRATEGY_TYPE_EVENT]: {
    color: 'blue',
    label: '事件'
  },
  [StrategyType.STRATEGY_TYPE_LOGS]: {
    color: 'orange',
    label: '日志'
  },
  [StrategyType.STRATEGY_TYPE_PORT]: {
    color: 'red',
    label: '端口'
  },
  [StrategyType.STRATEGY_TYPE_HTTP]: {
    color: 'purple',
    label: 'HTTP'
  },
  [StrategyType.STRATEGY_TYPE_PING]: {
    color: 'cyan',
    label: 'Ping'
  },
  [StrategyType.STRATEGY_TYPE_CERT]: {
    color: 'magenta',
    label: '证书'
  }
}

export const UserStatusData: Record<UserStatus, EnumData> = {
  [UserStatus.USER_STATUS_UNKNOWN]: {
    color: '#f5222d',
    label: '未知'
  },
  [UserStatus.USER_STATUS_NORMAL]: {
    color: '#1890ff',
    label: '正常'
  },
  [UserStatus.USER_STATUS_FORBIDDEN]: {
    color: '#f5222d',
    label: '禁用'
  },
  [UserStatus.USER_STATUS_DELETED]: {
    color: '#f5222d',
    label: '已删除'
  }
}

export const UserPositionData: Record<UserPosition, EnumData> = {
  [UserPosition.USER_POSITION_UNKNOWN]: {
    color: 'gray',
    label: '未知'
  },
  [UserPosition.USER_POSITION_SUPER_ADMIN]: {
    color: '#1890ff',
    label: '超级管理员'
  },
  [UserPosition.USER_POSITION_ADMIN]: {
    color: 'blue',
    label: '管理员'
  },
  [UserPosition.USER_POSITION_USER]: {
    color: 'gray',
    label: '普通用户'
  },
  [UserPosition.USER_POSITION_GUEST]: {
    color: 'blue',
    label: '访客'
  }
}

export const GenderData: Record<Gender, EnumData> = {
  [Gender.GENDER_UNSPECIFIED]: {
    color: 'blue',
    label: '未知'
  },
  [Gender.GENDER_MALE]: {
    color: 'blue',
    label: '男'
  },
  [Gender.GENDER_FEMALE]: {
    color: 'blue',
    label: '女'
  },
  [Gender.GENDER_OTHER]: {
    color: 'gray',
    label: '其他'
  }
}

export const TeamStatusData: Record<TeamStatus, EnumData> = {
  [TeamStatus.TEAM_STATUS_UNKNOWN]: {
    color: 'blue',
    label: '未知'
  },
  [TeamStatus.TEAM_STATUS_NORMAL]: {
    color: 'green',
    label: '正常'
  },
  [TeamStatus.TEAM_STATUS_DELETED]: {
    color: 'red',
    label: '已删除'
  },
  [TeamStatus.TEAM_STATUS_FORBIDDEN]: {
    color: 'red',
    label: '禁用'
  },
  [TeamStatus.TEAM_STATUS_APPROVAL]: {
    color: 'yellow',
    label: '待确认'
  },
  [TeamStatus.TEAM_STATUS_REJECTED]: {
    color: 'red',
    label: '已拒绝'
  }
}

export const HTTPMethodData: Record<HTTPMethod, EnumData> = {
  [HTTPMethod.HTTP_METHOD_UNKNOWN]: {
    color: 'gray',
    label: 'unknown'
  },
  [HTTPMethod.HTTP_METHOD_GET]: {
    color: 'green',
    label: 'GET'
  },
  [HTTPMethod.HTTP_METHOD_POST]: {
    color: 'orange',
    label: 'POST'
  },
  [HTTPMethod.HTTP_METHOD_PUT]: {
    color: 'cyan',
    label: 'PUT'
  },
  [HTTPMethod.HTTP_METHOD_DELETE]: {
    color: 'red',
    label: 'DELETE'
  },
  [HTTPMethod.HTTP_METHOD_HEAD]: {
    color: 'purple',
    label: 'PATCH'
  },
  [HTTPMethod.HTTP_METHOD_OPTIONS]: {
    color: 'gray',
    label: 'OPTIONS'
  },
  [HTTPMethod.HTTP_METHOD_PATCH]: {
    color: 'gray',
    label: 'PATCH'
  }
}

export const DatasourceDriverMetricData: Record<DatasourceDriverMetric, EnumData> = {
  [DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_UNKNOWN]: {
    color: 'gray',
    label: 'unknown'
  },
  [DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_PROMETHEUS]: {
    color: 'orange',
    label: 'Prometheus'
  },
  [DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_VICTORIAMETRICS]: {
    color: 'cyan',
    label: 'VictoriaMetrics'
  }
}

export const ConditionMetricData: Record<ConditionMetric, EnumData> = {
  [ConditionMetric.CONDITION_METRIC_UNKNOWN]: {
    color: 'gray',
    label: '全部'
  },
  [ConditionMetric.CONDITION_METRIC_EQ]: {
    color: 'green',
    label: '等于'
  },
  [ConditionMetric.CONDITION_METRIC_NE]: {
    color: 'red',
    label: '不等于'
  },
  [ConditionMetric.CONDITION_METRIC_GT]: {
    color: 'red',
    label: '大于'
  },
  [ConditionMetric.CONDITION_METRIC_GTE]: {
    color: 'red',
    label: '大于等于'
  },
  [ConditionMetric.CONDITION_METRIC_LT]: {
    color: 'red',
    label: '小于'
  },
  [ConditionMetric.CONDITION_METRIC_LTE]: {
    color: 'red',
    label: '小于等于'
  },
  [ConditionMetric.CONDITION_METRIC_IN]: {
    color: 'red',
    label: '在范围内'
  },
  [ConditionMetric.CONDITION_METRIC_NOT_IN]: {
    color: 'red',
    label: '不在范围内'
  }
}

export const SampleModeData: Record<SampleMode, EnumData> = {
  [SampleMode.SAMPLE_MODE_UNKNOWN]: {
    color: 'gray',
    label: '全部'
  },
  [SampleMode.SAMPLE_MODE_FOR]: {
    color: 'red',
    label: 'm时间内出现n次'
  },
  [SampleMode.SAMPLE_MODE_MAX]: {
    color: 'red',
    label: 'm时间内最多出现n次'
  },
  [SampleMode.SAMPLE_MODE_MIN]: {
    color: 'red',
    label: 'm时间内最少出现n次'
  }
}

export const DictTypeData: Record<DictType, EnumData> = {
  [DictType.DICT_TYPE_UNKNOWN]: {
    color: 'gray',
    label: '全部'
  },
  [DictType.DICT_TYPE_ALARM_LEVEL]: {
    color: 'red',
    label: '告警级别'
  },
  [DictType.DICT_TYPE_ALARM_PAGE]: {
    color: 'red',
    label: '告警页面'
  }
}

export const MenuTypeData: Record<MenuType, EnumData> = {
  [MenuType.MENU_TYPE_UNKNOWN]: {
    color: 'gray',
    label: '全部'
  },
  [MenuType.MENU_TYPE_SYSTEM]: {
    color: 'blue',
    label: '系统'
  },
  [MenuType.MENU_TYPE_TEAM]: {
    color: 'blue',
    label: '团队'
  },
  [MenuType.MENU_TYPE_USER]: {
    color: 'blue',
    label: '用户'
  },
  [MenuType.MENU_TYPE_NONE]: {
    color: 'gray',
    label: '无'
  }
}

export const MenuCategoryData: Record<MenuCategory, EnumData> = {
  [MenuCategory.MENU_CATEGORY_UNKNOWN]: {
    color: 'gray',
    label: '全部'
  },
  [MenuCategory.MENU_CATEGORY_MENU]: {
    color: 'blue',
    label: '菜单'
  },
  [MenuCategory.MENU_CATEGORY_BUTTON]: {
    color: 'blue',
    label: '按钮'
  }
}

export const MenuProcessTypeData: Record<MenuProcessType, EnumData> = {
  [MenuProcessType.MENU_PROCESS_TYPE_UNKNOWN]: {
    color: 'gray',
    label: '全部'
  },
  [MenuProcessType.MENU_PROCESS_TYPE_LOGIN]: {
    color: 'blue',
    label: '登录'
  },
  [MenuProcessType.MENU_PROCESS_TYPE_TEAM]: {
    color: 'blue',
    label: '团队'
  },
  [MenuProcessType.MENU_PROCESS_TYPE_LOG]: {
    color: 'blue',
    label: '日志'
  },
  [MenuProcessType.MENU_PROCESS_TYPE_DATA_PERMISSION]: {
    color: 'blue',
    label: '数据权限'
  },
  [MenuProcessType.MENU_PROCESS_TYPE_ADMIN]: {
    color: 'blue',
    label: '管理员'
  }
}

export const TeamAuditStatusData: Record<TeamAuditStatus, EnumData> = {
  [TeamAuditStatus.TEAM_AUDIT_STATUS_UNKNOWN]: {
    color: 'gray',
    label: '未知'
  },
  [TeamAuditStatus.TEAM_AUDIT_STATUS_PENDING]: {
    color: 'yellow',
    label: '待审核'
  },
  [TeamAuditStatus.TEAM_AUDIT_STATUS_APPROVED]: {
    color: 'green',
    label: '审核通过'
  },
  [TeamAuditStatus.TEAM_AUDIT_STATUS_REJECTED]: {
    color: 'red',
    label: '审核拒绝'
  }
}

export const TeamAuditActionData: Record<TeamAuditAction, EnumData> = {
  [TeamAuditAction.TEAM_AUDIT_ACTION_UNKNOWN]: {
    color: 'gray',
    label: '未知'
  },
  [TeamAuditAction.TEAM_AUDIT_ACTION_JOIN]: {
    color: 'green',
    label: '加入团队'
  },
  [TeamAuditAction.TEAM_AUDIT_ACTION_LEAVE]: {
    color: 'red',
    label: '离开团队'
  }
}

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
  SYNC = '__sync__',
  /** 关联数据 */
  ASSOCIATED_DATA = '__associated_data__'
}
