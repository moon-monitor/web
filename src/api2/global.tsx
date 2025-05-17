import { IconFont } from '@/components/icon'
import { PaginationRequest } from './common.types'
import {
  Gender,
  GlobalStatus,
  HookAPP,
  HTTPMethod,
  MemberStatus,
  ResourceModule,
  Role,
  StrategyType,
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

export const MemberStatusData: Record<MemberStatus, { color: string; label: string }> = {
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
    color: 'blue',
    label: '未知'
  },
  [UserPosition.USER_POSITION_SUPER_ADMIN]: {
    color: 'blue',
    label: '超级管理员'
  },
  [UserPosition.USER_POSITION_ADMIN]: {
    color: 'blue',
    label: '管理员'
  },
  [UserPosition.USER_POSITION_USER]: {
    color: 'blue',
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

export const RoleData: Record<Role, string> = {
  [Role.ROLE_UNKNOWN]: '全部',
  [Role.ROLE_SUPER_ADMIN]: '超级管理员',
  [Role.ROLE_ADMIN]: '管理员',
  [Role.ROLE_USER]: '普通用户'
}

export const MethodData: Record<HTTPMethod, { color: string; text: string }> = {
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
