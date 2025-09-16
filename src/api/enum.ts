/** 枚举类型 */
export enum Status {
  /** 全部 */
  StatusAll = 0,

  /** 启用 */
  StatusEnable = 1,

  /** 禁用 */
  StatusDisable = 2
}

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

/** 性别 */
export enum Gender {
  /** 全部 */
  GenderAll = 0,

  /** 男 */
  GenderMale = 1,

  /** 女 */
  GenderFemale = 2
}

/** 系统全局默认角色，区别于空间下自定义角色类型 */
export enum Role {
  /** 全部 / 未知 */
  RoleAll = 0,

  /** 管理员 */
  RoleSupperAdmin = 1,

  /** 普通管理员 */
  RoleAdmin = 2,

  /** 普通用户 */
  RoleUser = 3
}

/** 数据来源 */
export enum DataSource {
  /** 全部 */
  DataSourceAll = 0,

  /** 本地 */
  DataSourceLocal = 1,

  /** 远程 */
  DataSourceRemote = 2
}

/** 验证码类型 */
export enum CaptchaType {
  /** 图片验证码 */
  CaptchaTypeImage = 0,

  /** 音频验证码 */
  CaptchaTypeAudio = 1
}

/** 领域类型枚举 */
export enum DomainType {
  /** 未知领域类型 */
  DomainTypeUnknown = 0,

  /** 系统领域 */
  DomainTypeSystem = 1,

  /** 监控领域 */
  DomainTypeMonitor = 2
}

/** 模块类型枚举 */
export enum ModuleType {
  /** 未知模块类型 */
  ModuleTypeUnknown = 0,

  /** 接口模块 */
  ModelTypeApi = 1,

  /** 菜单模块 */
  ModelTypeMenu = 2,

  /** 角色模块 */
  ModelTypeRole = 3,

  /** 用户模块 */
  ModelTypeUser = 4,

  /** 字典模块 */
  ModelTypeDict = 5,

  /** 配置模块 */
  ModelTypeConfig = 6,

  /** 日志模块 */
  ModelTypeLog = 7,

  /** 任务模块 */
  ModelTypeJob = 8,

  /** 通知模块 */
  ModelTypeNotify = 9,

  /** 系统模块 */
  ModelTypeSystem = 10,

  /** 监控模块 */
  ModelTypeMonitor = 11
}

/** 数据源类型 */
export enum DatasourceType {
  /** 未知数据源类型 */
  DatasourceTypeUnknown = 0,

  /** Metric */
  DatasourceTypeMetric = 1,

  /** Trace */
  DatasourceTypeTrace = 2,

  /** Log */
  DatasourceTypeLog = 3,

  /** Event */
  DatasourceTypeEvent = 4
}

/** 存储器类型 prometheus、victoriametrics等 */
export enum StorageType {
  /** 未知存储器类型 */
  StorageTypeUnknown = 0,

  /** Prometheus */
  StorageTypePrometheus = 1,

  /** VictoriaMetrics */
  StorageTypeVictoriaMetrics = 2,

  /** StorageTypeElasticsearch */
  StorageTypeElasticsearch = 3,

  /** StorageTypeLoki */
  StorageTypeLoki = 4,

  /** StorageAliYunSLS */
  StorageAliYunSLS = 5,

  /** Kafka */
  StorageTypeKafka = 10,

  /** Rocketmq */
  StorageTypeRocketmq = 11,

  /** Rabbitmq */
  StorageTypeRabbitmq = 12,

  /** Mqtt */
  StorageTypeMQTT = 13
}

/** 指标类型 */
export enum MetricType {
  /** 未知指标类型 */
  MetricTypeUnknown = 0,

  /** Counter */
  MetricTypeCounter = 1,

  /** Gauge */
  MetricTypeGauge = 2,

  /** Histogram */
  MetricTypeHistogram = 3,

  /** Summary */
  MetricTypeSummary = 4
}

/** 持续类型 */
export enum SustainType {
  /** 未知持续类型 */
  SustainTypeUnknown = 0,

  /** m时间内出现n次 */
  SustainTypeFor = 1,

  /** m时间内最多出现n次 */
  SustainTypeMax = 2,

  /** m时间内最少出现n次 */
  SustainTypeMin = 3
}

/** 多数据源持续类型 */
export enum MultiDatasourceSustainType {
  /** 未知持续类型 */
  MultiDatasourceSustainTypeUnknown = 0,

  /** 同时满足 所有数据告警集合一致 */
  MultiDatasourceSustainTypeAnd = 1,

  /** 其中一个满足 数据告警集合其中一个完全满足 */
  MultiDatasourceSustainTypeOr = 2,

  /** 共同满足 所有数据告警集合合并起来后满足 */
  MultiDatasourceSustainTypeAndOr = 3
}

/** 分类, 区分字典中的各个模块数据 */
export enum DictType {
  /** 未知, 用于默认值 */
  DictTypeUnknown = 0,

  /** DictTypeStrategyCategory 策略类目 */
  DictTypeStrategyCategory = 1,

  /** DictTypeStrategyGroupCategory 策略组类目 */
  DictTypeStrategyGroupCategory = 2,

  /** DictTypeAlarmLevel 告警级别 */
  DictTypeAlarmLevel = 3,

  /** DictTypeAlarmPage 告警页面 */
  DictTypeAlarmPage = 4
}

/** 菜单类型 */
export enum MenuType {
  /** 未知 */
  MenuTypeUnknown = 0,

  /** 菜单 */
  MenuTypeMenu = 1,

  /** 按钮 */
  MenuTypeButton = 2,

  /** 文件夹 */
  MenuTypeDir = 3
}

/** 判断条件 */
export enum Condition {
  /** 未知 */
  ConditionUnknown = 0,

  /** 等于 */
  ConditionEQ = 1,

  /** 不等于 */
  ConditionNE = 2,

  /** 大于 */
  ConditionGT = 3,

  /** 大于等于 */
  ConditionGTE = 4,

  /** 小于 */
  ConditionLT = 5,

  /** 小于等于 */
  ConditionLTE = 6
}

/** 模板来源类型 */
export enum TemplateSourceType {
  /** 未知 */
  TemplateSourceTypeUnknown = 0,

  /** 系统 */
  TemplateSourceTypeSystem = 1,

  /** 团队 */
  TemplateSourceTypeTeam = 2
}

/** 告警状态 */
export enum AlertStatus {
  /** UNKNOWN 未知 */
  ALERT_STATUS_UNKNOWN = 0,

  /** 告警中 */
  ALERT_STATUS_FIRING = 1,

  /** 告警已恢复 */
  ALERT_STATUS_RESOLVED = 2,

  /** 告警已静音 */
  ALERT_STATUS_Silenced = 3
}

/** 通知类型 */
export enum NotifyType {
  /** UNKNOWN 未知 */
  NOTIFY_UNKNOWN = 0,

  /** 手机 */
  NOTIFY_PHONE = 1,

  /** 短信 */
  NOTIFY_SMS = 2,

  /** 邮箱 */
  NOTIFY_EMAIL = 4
}

/** 应用挂钩类型 */
export enum HookApp {
  /** UNKNOWN 未知 */
  HOOK_APP_UNKNOWN = 0,

  /** 自定义 */
  HOOK_APP_WEB_HOOK = 1,

  /** 钉钉 */
  HOOK_APP_DING_TALK = 2,

  /** 企业微信 */
  HOOK_APP_WE_CHAT = 3,

  /** 飞书 */
  HOOK_APP_FEI_SHU = 4
}

/** 告警通知模板类型 */
export enum AlarmSendType {
  /** 未知 */
  StrategyTypeUnknown = 0,

  /** 邮件 */
  AlarmSendTypeEmail = 1,

  /** 短信 */
  AlarmSendTypeSMS = 2,

  /** 钉钉 */
  AlarmSendTypeDingTalk = 3,

  /** 飞书 */
  AlarmSendTypeFeiShu = 4,

  /** 企业微信 */
  AlarmSendTypeWeChat = 5,

  /** 自定义 */
  AlarmSendTypeCustom = 6
}

/** 策略类型 */
export enum StrategyType {
  /** 未知 */
  StrategyTypeUnknown = 0,

  /** Metric */
  StrategyTypeMetric = 1,

  /** DomainCertificate */
  StrategyTypeDomainCertificate = 2,

  /** DomainPort */
  StrategyTypeDomainPort = 3,

  /** Ping */
  StrategyTypePing = 4,

  /** HTTP */
  StrategyTypeHTTP = 5,

  /** Event */
  StrategyTypeEvent = 6,

  /** Log */
  StrategyTypeLog = 7
}

// MQ判断条件
export enum MQCondition {
  /** 未知 */
  MQConditionUnknown = 0,

  /** 等于 */
  MQConditionEQ = 1,

  /** 不等于 */
  MQConditionNE = 2,

  /** 大于等于 */
  MQConditionGTE = 4,

  /** 小于 */
  MQConditionLT = 5,

  /** 小于等于 */
  MQConditionLTE = 6,

  /** 包含 */
  MQConditionContain = 7,

  /** 前缀 */
  MQConditionPrefix = 8,

  /** 后缀 */
  MQConditionSuffix = 9,

  /** 正则 */
  MQConditionRegular = 10
}

/** MQ数据类型 */
export enum EventDataType {
  /** 未知 */
  EventDataTypeUnknown = 0,

  /** string */
  EventDataTypeString = 1,

  /** number */
  EventDataTypeNumber = 2,

  /** object */
  EventDataTypeObject = 3
}

/** HTTP请求方式 */
export enum HTTPMethod {
  /** 未知 */
  HTTPMethodUnknown = '',

  /** GET */
  HTTPMethodGET = 'GET',

  /** POST */
  HTTPMethodPOST = 'POST',

  /** PUT */
  HTTPMethodPUT = 'PUT',

  /** DELETE */
  HTTPMethodDELETE = 'DELETE',

  /** PATCH */
  HTTPMethodPATCH = 'PATCH',

  /** HEAD */
  HTTPMethodHEAD = 'HEAD',

  /** OPTIONS */
  HTTPMethodOPTIONS = 'OPTIONS'
}

/** 状态码判断条件 */
export enum StatusCodeCondition {
  /** 未知 */
  StatusCodeConditionUnknown = 0,

  /** 等于 */
  StatusCodeConditionEQ = 1,

  /** 不等于 */
  StatusCodeConditionNE = 2
}

/** 时间引擎规则类型 */
export enum TimeEngineRuleType {
  /** 未知 */
  TimeEngineRuleTypeUnknown = 0,

  /** 小时范围 */
  TimeEngineRuleTypeHourRange = 1,

  /** 星期 */
  TimeEngineRuleTypeDaysOfWeek = 2,

  /** 日期 */
  TimeEngineRuleTypeDaysOfMonth = 3,

  /** 月份 */
  TimeEngineRuleTypeMonths = 4
}

/** 告警介入动作 */
export enum AlarmInterventionAction {
  /** 介入 */
  Mark = 1,

  /** 删除 */
  Delete = 2,

  /** 抑制 */
  Silence = 3,

  /** 升级 */
  Upgrade = 4
}

export enum LogModuleType {
  /* 字典 */
  DICT = 0
}
export enum LogActionType {
  /* 新增 */
  ADD = 0,
  /* 修改 */
  MODIFY = 1,
  /* 删除 */
  DELETE = 2,
  /* 修改状态 */
  MODIFY_STATUS = 3
}


/**
 * ConditionMetric
 */
export enum ConditionMetric {
  CONDITION_METRIC_EQ,
  CONDITION_METRIC_GT,
  CONDITION_METRIC_GTE,
  CONDITION_METRIC_IN,
  CONDITION_METRIC_LT,
  CONDITION_METRIC_LTE,
  CONDITION_METRIC_NE,
  CONDITION_METRIC_NOT_IN,
  CONDITION_METRIC_UNKNOWN
}


/**
 * DatasourceDriverMetric
 */
export enum DatasourceDriverMetric {
  DATASOURCE_DRIVER_METRIC_PROMETHEUS,
  DATASOURCE_DRIVER_METRIC_UNKNOWN,
  DATASOURCE_DRIVER_METRIC_VICTORIAMETRICS
}


/**
 * HookAPP
 */
export enum HookAPP {
  HOOK_APP_DING_TALK,
  HOOK_APP_FEI_SHU,
  HOOK_APP_OTHER,
  HOOK_APP_UNKNOWN,
  HOOK_APP_WECHAT
}

/**
 * MenuCategory
 */
export enum MenuCategory {
  MENU_CATEGORY_BUTTON,
  MENU_CATEGORY_MENU,
  MENU_CATEGORY_UNKNOWN
}

/**
 * MenuProcessType
 */
export enum MenuProcessType {
  MENU_PROCESS_TYPE_ADMIN,
  MENU_PROCESS_TYPE_DATA_PERMISSION,
  MENU_PROCESS_TYPE_LOG,
  MENU_PROCESS_TYPE_LOGIN,
  MENU_PROCESS_TYPE_TEAM,
  MENU_PROCESS_TYPE_UNKNOWN
}

/**
 * MenuType
 */
export enum MenuType {
  MENU_TYPE_NONE,
  MENU_TYPE_SYSTEM,
  MENU_TYPE_TEAM,
  MENU_TYPE_UNKNOWN,
  MENU_TYPE_USER
}

/**
 * MessageType
 */
export enum MessageType {
  MESSAGE_TYPE_EMAIL,
  MESSAGE_TYPE_HOOK_DING_TALK,
  MESSAGE_TYPE_HOOK_FEI_SHU,
  MESSAGE_TYPE_HOOK_WEBHOOK,
  MESSAGE_TYPE_HOOK_WECHAT,
  MESSAGE_TYPE_SMS,
  MESSAGE_TYPE_UNKNOWN,
  MESSAGE_TYPE_VOICE
}

/**
 * MethodOptions_IdempotencyLevel
 */
export enum MethodOptions_IdempotencyLevel {
  IDEMPOTENCY_UNKNOWN,
  IDEMPOTENT,
  NO_SIDE_EFFECTS
}

/**
 * Network
 */
export enum Network {
  GRPC,
  HTTP,
  HTTPS
}

/**
 * NoticeType
 */
export enum NoticeType {
  NOTICE_TYPE_EMAIL,
  NOTICE_TYPE_SMS,
  NOTICE_TYPE_UNKNOWN,
  NOTICE_TYPE_VOICE
}

/**
 * OperateType
 */
export enum OperateType {
  OPERATE_TYPE_ADD,
  OPERATE_TYPE_DELETE,
  OPERATE_TYPE_EXPORT,
  OPERATE_TYPE_IMPORT,
  OPERATE_TYPE_LOGIN,
  OPERATE_TYPE_LOGOUT,
  OPERATE_TYPE_QUERY,
  OPERATE_TYPE_UNKNOWN,
  OPERATE_TYPE_UPDATE
}

/**
 * SampleMode
 */
export enum SampleMode {
  SAMPLE_MODE_FOR,
  SAMPLE_MODE_MAX,
  SAMPLE_MODE_MIN,
  SAMPLE_MODE_UNKNOWN
}


/**
 * TeamAuditAction
 */
export enum TeamAuditAction {
  TEAM_AUDIT_ACTION_JOIN,
  TEAM_AUDIT_ACTION_LEAVE,
  TEAM_AUDIT_ACTION_UNKNOWN
}

/**
 * TeamAuditStatus
 */
export enum TeamAuditStatus {
  TEAM_AUDIT_STATUS_APPROVED,
  TEAM_AUDIT_STATUS_PENDING,
  TEAM_AUDIT_STATUS_REJECTED,
  TEAM_AUDIT_STATUS_UNKNOWN
}

/**
 * TeamStatus
 */
export enum TeamStatus {
  TEAM_STATUS_APPROVAL,
  TEAM_STATUS_DELETED,
  TEAM_STATUS_FORBIDDEN,
  TEAM_STATUS_NORMAL,
  TEAM_STATUS_REJECTED,
  TEAM_STATUS_UNKNOWN
}

/**
 * UserPosition
 */
export enum UserPosition {
  USER_POSITION_UNKNOWN,
  USER_POSITION_SUPER_ADMIN,
  USER_POSITION_ADMIN,
  USER_POSITION_USER,
  USER_POSITION_GUEST,
}

/**
 * UserStatus
 */
export enum UserStatus {
  USER_STATUS_UNKNOWN,
  USER_STATUS_NORMAL,
  USER_STATUS_FORBIDDEN,
  USER_STATUS_DELETED,
}


