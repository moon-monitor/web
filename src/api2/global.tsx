import { IconFont } from '@/components/icon'
import { PaginationRequest } from './common.types'
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
  ResourceModule,
  SampleMode,
  StrategyType,
  TeamAuditAction,
  TeamAuditStatus,
  TeamStatus,
  UserPosition,
  UserStatus
} from './enum'

export const defaultPaginationReq: PaginationRequest = {
  page: 1,
  pageSize: 999
}

export const HookAppData: Record<HookAPP, { icon: React.ReactNode; text: React.ReactNode | string }> = {
  [HookAPP.HOOK_APP_UNKNOWN]: {
    text: '全部',
    icon: <IconFont type='icon-disable3' />
  },
  [HookAPP.HOOK_APP_DING_TALK]: {
    text: '钉钉',
    icon: <IconFont type='icon-dingding' />
  },
  [HookAPP.HOOK_APP_FEI_SHU]: {
    icon: <IconFont type='icon-feishu' />,
    text: '飞书'
  },
  [HookAPP.HOOK_APP_OTHER]: {
    text: 'WebHook',
    icon: <IconFont type='icon-zidingyi' />
  },
  [HookAPP.HOOK_APP_WECHAT]: {
    icon: <IconFont type='icon-qiyeweixin' />,
    text: '企业微信'
  }
}

export const ResourceModuleData: Record<ResourceModule, { icon: React.ReactNode; label: React.ReactNode }> = {
  [ResourceModule.RESOURCE_MODULE_UNKNOWN]: {
    label: '全部',
    icon: <IconFont type='icon-disable3' />
  },
  [ResourceModule.RESOURCE_MODULE_SYSTEM]: {
    label: '系统',
    icon: <IconFont type='icon-disable3' />
  },
  [ResourceModule.RESOURCE_MODULE_USER]: {
    label: '用户',
    icon: <IconFont type='icon-disable3' />
  },
  [ResourceModule.RESOURCE_MODULE_TEAM]: {
    label: '团队',
    icon: <IconFont type='icon-disable3' />
  }
}

export const MemberStatusData: Record<MemberStatus, { color: string; text: string }> = {
  [MemberStatus.MEMBER_STATUS_UNKNOWN]: {
    color: 'blue',
    text: '未知'
  },
  [MemberStatus.MEMBER_STATUS_NORMAL]: {
    color: 'green',
    text: '正常'
  },
  [MemberStatus.MEMBER_STATUS_FORBIDDEN]: {
    color: 'red',
    text: '禁用'
  },
  [MemberStatus.MEMBER_STATUS_DELETED]: {
    color: 'red',
    text: '已删除'
  },
  [MemberStatus.MEMBER_STATUS_PENDING_CONFIRM]: {
    color: 'yellow',
    text: '待确认'
  },
  [MemberStatus.MEMBER_STATUS_DEPARTED]: {
    color: 'red',
    text: '已离开'
  }
}

export const GlobalStatusData: Record<GlobalStatus, { color: string; text: string }> = {
  [GlobalStatus.GLOBAL_STATUS_UNKNOWN]: {
    color: 'blue',
    text: '未知'
  },
  [GlobalStatus.GLOBAL_STATUS_ENABLE]: {
    color: 'green',
    text: '启用'
  },
  [GlobalStatus.GLOBAL_STATUS_DISABLE]: {
    color: 'red',
    text: '禁用'
  }
}

export const StrategyTypeData: Record<StrategyType, { color: string; label: string }> = {
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

export const UserStatusData: Record<UserStatus, { color: string; label: string }> = {
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

export const UserPositionData: Record<UserPosition, { color: string; label: string }> = {
  [UserPosition.USER_POSITION_UNKNOWN]: {
    color: '',
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

export const GenderData: Record<Gender, { color: string; label: string }> = {
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
  }
}

export const TeamStatusData: Record<TeamStatus, { color: string; label: string }> = {
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

export const HTTPMethodData: Record<HTTPMethod, { color: string; text: string }> = {
  [HTTPMethod.HTTP_METHOD_UNKNOWN]: {
    color: 'gray',
    text: '未知'
  },
  [HTTPMethod.HTTP_METHOD_GET]: {
    color: 'green',
    text: 'GET'
  },
  [HTTPMethod.HTTP_METHOD_POST]: {
    color: 'orange',
    text: 'POST'
  },
  [HTTPMethod.HTTP_METHOD_PUT]: {
    color: 'cyan',
    text: 'PUT'
  },
  [HTTPMethod.HTTP_METHOD_DELETE]: {
    color: 'red',
    text: 'DELETE'
  },
  [HTTPMethod.HTTP_METHOD_HEAD]: {
    color: 'purple',
    text: 'PATCH'
  },
  [HTTPMethod.HTTP_METHOD_OPTIONS]: {
    color: 'gray',
    text: 'OPTIONS'
  },
  [HTTPMethod.HTTP_METHOD_PATCH]: {
    color: 'gray',
    text: 'PATCH'
  }
}

export const DatasourceDriverMetricData: Record<DatasourceDriverMetric, string> = {
  [DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_UNKNOWN]: '未知',
  [DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_PROMETHEUS]: 'PROM',
  [DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_VICTORIAMETRICS]: 'VM'
}

export const ConditionMetricData: Record<ConditionMetric, string> = {
  [ConditionMetric.CONDITION_METRIC_UNKNOWN]: '全部',
  [ConditionMetric.CONDITION_METRIC_EQ]: '等于',
  [ConditionMetric.CONDITION_METRIC_NE]: '不等于',
  [ConditionMetric.CONDITION_METRIC_GT]: '大于',
  [ConditionMetric.CONDITION_METRIC_GTE]: '大于等于',
  [ConditionMetric.CONDITION_METRIC_LT]: '小于',
  [ConditionMetric.CONDITION_METRIC_LTE]: '小于等于',
  [ConditionMetric.CONDITION_METRIC_IN]: '在范围内',
  [ConditionMetric.CONDITION_METRIC_NOT_IN]: '不在范围内'
}

export const SampleModeData: Record<SampleMode, string> = {
  [SampleMode.SAMPLE_MODE_UNKNOWN]: '全部',
  [SampleMode.SAMPLE_MODE_AVERAGE]: 'm时间内出现n次',
  [SampleMode.SAMPLE_MODE_MAX]: 'm时间内最多出现n次',
  [SampleMode.SAMPLE_MODE_MIN]: 'm时间内最少出现n次'
}

export const DictTypeData: Record<DictType, string> = {
  [DictType.DICT_TYPE_UNKNOWN]: '全部',
  [DictType.DICT_TYPE_ALARM_LEVEL]: '告警级别',
  [DictType.DICT_TYPE_ALARM_PAGE]: '告警页面'
}

export const MenuTypeData: Record<MenuType, string> = {
  [MenuType.MENU_TYPE_UNKNOWN]: '全部',
  [MenuType.MENU_TYPE_SYSTEM]: '系统',
  [MenuType.MENU_TYPE_TEAM]: '团队',
  [MenuType.MENU_TYPE_USER]: '用户',
  [MenuType.MENU_TYPE_NONE]: '无'
}

export const MenuCategoryData: Record<MenuCategory, string> = {
  [MenuCategory.MENU_CATEGORY_UNKNOWN]: '全部',
  [MenuCategory.MENU_CATEGORY_MENU]: '菜单',
  [MenuCategory.MENU_CATEGORY_BUTTON]: '按钮'
}

export const MenuProcessTypeData: Record<MenuProcessType, string> = {
  [MenuProcessType.MENU_PROCESS_TYPE_UNKNOWN]: '全部',
  [MenuProcessType.MENU_PROCESS_TYPE_LOGIN]: '登录',
  [MenuProcessType.MENU_PROCESS_TYPE_TEAM]: '团队',
  [MenuProcessType.MENU_PROCESS_TYPE_LOG]: '日志',
  [MenuProcessType.MENU_PROCESS_TYPE_DATA_PERMISSION]: '数据权限'
}

export const TeamAuditStatusData: Record<TeamAuditStatus, string> = {
  [TeamAuditStatus.TEAM_AUDIT_STATUS_UNKNOWN]: '未知',
  [TeamAuditStatus.TEAM_AUDIT_STATUS_PENDING]: '待审核',
  [TeamAuditStatus.TEAM_AUDIT_STATUS_APPROVED]: '审核通过',
  [TeamAuditStatus.TEAM_AUDIT_STATUS_REJECTED]: '审核拒绝'
}

export const TeamAuditActionData: Record<TeamAuditAction, string> = {
  [TeamAuditAction.TEAM_AUDIT_ACTION_UNKNOWN]: '未知',
  [TeamAuditAction.TEAM_AUDIT_ACTION_JOIN]: '加入团队',
  [TeamAuditAction.TEAM_AUDIT_ACTION_LEAVE]: '离开团队'
}
