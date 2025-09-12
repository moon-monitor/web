import { IconFont } from '@/components/icon'
import { CSSProperties } from 'react'
import {
  AlarmSendType,
  AlertStatus,
  ConditionMetric,
  DatasourceDriverMetric,
  DatasourceType,
  DictType,
  DomainType,
  Gender,
  HookAPP,
  HTTPMethod,
  MenuCategory,
  MenuProcessType,
  MenuType,
  MetricType,
  ModuleType,
  Role,
  SampleMode,
  StorageType,
  StrategyType,
  TeamAuditAction,
  TeamAuditStatus,
  TeamStatus,
  UserPosition,
  UserStatus
} from './enum'
import { PaginationRequest } from './request/types'

export const defaultPaginationReq: PaginationRequest = {
  page: 1,
  pageSize: 50
}

export type EnumData = {
  color?: CSSProperties['color']
  label: React.ReactNode | string
  text?: string
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
  [StrategyType.StrategyTypeUnknown]: {
    color: 'blue',
    label: '未知',
    text: '未知'
  },
  [StrategyType.StrategyTypeMetric]: {
    color: 'green',
    label: 'Metric',
    text: 'Metric'
  },
  [StrategyType.StrategyTypeEvent]: {
    color: 'blue',
    label: '事件',
    text: '事件'
  },
  [StrategyType.StrategyTypeLog]: {
    color: 'orange',
    label: '日志',
    text: '日志'
  },
  [StrategyType.StrategyTypeDomainPort]: {
    color: 'red',
    label: '端口',
    text: '端口'
  },
  [StrategyType.StrategyTypeHTTP]: {
    color: 'purple',
    label: 'HTTP',
    text: 'HTTP'
  },
  [StrategyType.StrategyTypePing]: {
    color: 'cyan',
    label: 'Ping',
    text: 'Ping'
  },
  [StrategyType.StrategyTypeDomainCertificate]: {
    color: 'magenta',
    label: '证书',
    text: '证书'
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
  [Gender.GenderAll]: {
    color: 'default',
    label: '全部',
    text: '全部'
  },
  [Gender.GenderMale]: {
    color: 'blue',
    label: '男',
    text: '男'
  },
  [Gender.GenderFemale]: {
    color: 'pink',
    label: '女',
    text: '女'
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
  [HTTPMethod.HTTPMethodUnknown]: {
    color: 'gray',
    label: 'unknown',
    text: 'unknown'
  },
  [HTTPMethod.HTTPMethodGET]: {
    color: 'green',
    label: 'GET',
    text: 'GET'
  },
  [HTTPMethod.HTTPMethodPOST]: {
    color: 'orange',
    label: 'POST',
    text: 'POST'
  },
  [HTTPMethod.HTTPMethodPUT]: {
    color: 'cyan',
    label: 'PUT',
    text: 'PUT'
  },
  [HTTPMethod.HTTPMethodDELETE]: {
    color: 'red',
    label: 'DELETE',
    text: 'DELETE'
  },
  [HTTPMethod.HTTPMethodHEAD]: {
    color: 'purple',
    label: 'HEAD',
    text: 'HEAD'
  },
  [HTTPMethod.HTTPMethodOPTIONS]: {
    color: 'blue',
    label: 'OPTIONS',
    text: 'OPTIONS'
  },
  [HTTPMethod.HTTPMethodPATCH]: {
    color: 'magenta',
    label: 'PATCH',
    text: 'PATCH'
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
  [DictType.DictTypeUnknown]: {
    color: 'gray',
    label: '全部',
    text: '全部'
  },
  [DictType.DictTypeStrategyCategory]: {
    color: 'blue',
    label: '策略类目',
    text: '策略类目'
  },
  [DictType.DictTypeStrategyGroupCategory]: {
    color: 'green',
    label: '策略组类目',
    text: '策略组类目'
  },
  [DictType.DictTypeAlarmLevel]: {
    color: 'red',
    label: '告警级别',
    text: '告警级别'
  },
  [DictType.DictTypeAlarmPage]: {
    color: 'orange',
    label: '告警页面',
    text: '告警页面'
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

// 状态数据
export const StatusData: Record<GlobalStatus, EnumData> = {
  [GlobalStatus.GLOBAL_STATUS_UNKNOWN]: {
    color: 'blue',
    label: '未知',
    text: '未知'
  },
  [GlobalStatus.GLOBAL_STATUS_ENABLE]: {
    color: 'green',
    label: '启用',
    text: '启用'
  },
  [GlobalStatus.GLOBAL_STATUS_DISABLE]: {
    color: 'red',
    label: '禁用',
    text: '禁用'
  }
}

// 角色数据
export const RoleData: Record<Role, EnumData> = {
  [Role.RoleAll]: {
    color: 'gray',
    label: '全部'
  },
  [Role.RoleSupperAdmin]: {
    color: 'red',
    label: '超级管理员'
  },
  [Role.RoleAdmin]: {
    color: 'blue',
    label: '管理员'
  },
  [Role.RoleUser]: {
    color: 'green',
    label: '普通用户'
  }
}

// 领域类型数据
export const DomainTypeData: Record<DomainType, EnumData> = {
  [DomainType.DomainTypeUnknown]: {
    color: 'gray',
    label: '未知'
  },
  [DomainType.DomainTypeSystem]: {
    color: 'blue',
    label: '系统'
  },
  [DomainType.DomainTypeMonitor]: {
    color: 'green',
    label: '监控'
  }
}

// 模块类型数据
export const ModuleTypeData: Record<ModuleType, EnumData> = {
  [ModuleType.ModelTypeUnknown]: {
    color: 'gray',
    label: '未知'
  },
  [ModuleType.ModelTypeApi]: {
    color: 'blue',
    label: '接口'
  },
  [ModuleType.ModelTypeMenu]: {
    color: 'green',
    label: '菜单'
  },
  [ModuleType.ModelTypeRole]: {
    color: 'orange',
    label: '角色'
  },
  [ModuleType.ModelTypeUser]: {
    color: 'purple',
    label: '用户'
  },
  [ModuleType.ModelTypeDict]: {
    color: 'cyan',
    label: '字典'
  },
  [ModuleType.ModelTypeConfig]: {
    color: 'magenta',
    label: '配置'
  },
  [ModuleType.ModelTypeLog]: {
    color: 'red',
    label: '日志'
  },
  [ModuleType.ModelTypeJob]: {
    color: 'yellow',
    label: '任务'
  }
}

// 日志模块类型数据
export const LogModuleTypeData: Record<ModuleType, EnumData> = ModuleTypeData

// 全局状态枚举
export enum GlobalStatus {
  GLOBAL_STATUS_UNKNOWN = 0,
  GLOBAL_STATUS_ENABLE = 1,
  GLOBAL_STATUS_DISABLE = 2
}

// 成员状态枚举
export enum MemberStatus {
  MEMBER_STATUS_UNKNOWN = 0,
  MEMBER_STATUS_NORMAL = 1,
  MEMBER_STATUS_FORBIDDEN = 2,
  MEMBER_STATUS_DELETED = 3,
  MEMBER_STATUS_PENDING_CONFIRM = 4,
  MEMBER_STATUS_DEPARTED = 5
}

// 操作键枚举
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

export type TagItemType = {
  text: string
  color: string
}

export const MetricTypeData: Record<MetricType, TagItemType> = {
  [MetricType.MetricTypeUnknown]: {
    text: '全部',
    color: ''
  },
  [MetricType.MetricTypeCounter]: {
    text: 'Counter',
    color: 'green'
  },
  [MetricType.MetricTypeGauge]: {
    text: 'Gauge',
    color: 'blue'
  },
  [MetricType.MetricTypeHistogram]: {
    text: 'Histogram',
    color: 'purple'
  },
  [MetricType.MetricTypeSummary]: {
    text: 'Summary',
    color: 'orange'
  }
}



export const DataSourceTypeData: Record<DatasourceType, string> = {
  [DatasourceType.DatasourceTypeUnknown]: '全部',
  [DatasourceType.DatasourceTypeMetric]: 'Metric',
  [DatasourceType.DatasourceTypeLog]: 'Log',
  [DatasourceType.DatasourceTypeTrace]: 'Trace',
  [DatasourceType.DatasourceTypeEvent]: 'Event'
}



export const StorageTypeData: Record<StorageType, string> = {
  [StorageType.StorageTypeUnknown]: '全部',
  [StorageType.StorageTypePrometheus]: 'Prometheus',
  [StorageType.StorageTypeVictoriaMetrics]: 'VictoriaMetrics',
  [StorageType.StorageTypeKafka]: 'Kafka',
  [StorageType.StorageTypeRocketmq]: 'Rocketmq',
  [StorageType.StorageTypeRabbitmq]: 'Rabbitmq',
  [StorageType.StorageTypeMQTT]: 'MQTT',
  [StorageType.StorageTypeElasticsearch]: 'Elasticsearch',
  [StorageType.StorageTypeLoki]: 'Loki',
  [StorageType.StorageAliYunSLS]: 'AliYunSLS'
}

export const AlarmSendTypeData: Record<AlarmSendType, EnumData> = {
  [AlarmSendType.StrategyTypeUnknown]: {
    color: 'default',
    label: '未知',
    text: '未知',
    icon: <IconFont type='icon-unknown' />
  },
  [AlarmSendType.AlarmSendTypeEmail]: {
    color: 'blue',
    label: '邮件',
    text: '邮件',
    icon: <IconFont type='icon-email' />
  },
  [AlarmSendType.AlarmSendTypeSMS]: {
    color: 'green',
    label: '短信',
    text: '短信',
    icon: <IconFont type='icon-sms' />
  },
  [AlarmSendType.AlarmSendTypeDingTalk]: {
    color: 'orange',
    label: '钉钉',
    text: '钉钉',
    icon: <IconFont type='icon-dingtalk' />
  },
  [AlarmSendType.AlarmSendTypeFeiShu]: {
    color: 'purple',
    label: '飞书',
    text: '飞书',
    icon: <IconFont type='icon-feishu' />
  },
  [AlarmSendType.AlarmSendTypeWeChat]: {
    color: 'cyan',
    label: '企业微信',
    text: '企业微信',
    icon: <IconFont type='icon-wechat' />
  },
  [AlarmSendType.AlarmSendTypeCustom]: {
    color: 'magenta',
    label: '自定义',
    text: '自定义',
    icon: <IconFont type='icon-custom' />
  }
}

// 告警状态数据
export const AlertStatusData: Record<AlertStatus, EnumData> = {
  [AlertStatus.ALERT_STATUS_UNKNOWN]: {
    color: 'gray',
    label: '未知'
  },
  [AlertStatus.ALERT_STATUS_FIRING]: {
    color: 'red',
    label: '告警中'
  },
  [AlertStatus.ALERT_STATUS_RESOLVED]: {
    color: 'green',
    label: '已恢复'
  },
  [AlertStatus.ALERT_STATUS_Silenced]: {
    color: 'orange',
    label: '已静音'
  }
}

