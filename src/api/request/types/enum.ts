// 枚举类型定义
/**
 * AlertStatus
 */
export enum AlertStatus {
  ALERT_STATUS_UNKNOWN,
  firing,
  pending,
  resolved
}

/**
 * Cache_Driver
 */
export enum Cache_Driver {
  MEMORY,
  REDIS
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
 * Crypto_AesConfig_MODE
 */
export enum Crypto_AesConfig_MODE {
  CBC,
  ECB,
  GCM
}

/**
 * Database_Driver
 */
export enum Database_Driver {
  MYSQL
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
 * DatasourceType
 */
export enum DatasourceType {
  DATASOURCE_TYPE_EVENT,
  DATASOURCE_TYPE_LOG,
  DATASOURCE_TYPE_METRIC,
  DATASOURCE_TYPE_TRACE,
  DATASOURCE_TYPE_UNSPECIFIED
}

/**
 * DictType
 */
export enum DictType {
  DICT_TYPE_ALARM_LEVEL,
  DICT_TYPE_ALARM_PAGE,
  DICT_TYPE_UNKNOWN
}

/**
 * Environment
 */
export enum Environment {
  DEV,
  PROD,
  TEST,
  UNKNOWN
}

/**
 * Event_Driver
 */
export enum Event_Driver {
  KAFKA,
  MQTT,
  ROCKETMQ,
  UNKNOWN
}

/**
 * FieldDescriptorProto_Label
 */
export enum FieldDescriptorProto_Label {
  LABEL_OPTIONAL,
  LABEL_REPEATED,
  LABEL_REQUIRED
}

/**
 * FieldDescriptorProto_Type
 */
export enum FieldDescriptorProto_Type {
  TYPE_BOOL,
  TYPE_BYTES,
  TYPE_DOUBLE,
  TYPE_ENUM,
  TYPE_FIXED32,
  TYPE_FIXED64,
  TYPE_FLOAT,
  TYPE_GROUP,
  TYPE_INT32,
  TYPE_INT64,
  TYPE_MESSAGE,
  TYPE_SFIXED32,
  TYPE_SFIXED64,
  TYPE_SINT32,
  TYPE_SINT64,
  TYPE_STRING,
  TYPE_UINT32,
  TYPE_UINT64
}

/**
 * FieldOptions_CType
 */
export enum FieldOptions_CType {
  CORD,
  STRING,
  STRING_PIECE
}

/**
 * FieldOptions_JSType
 */
export enum FieldOptions_JSType {
  JS_NORMAL,
  JS_NUMBER,
  JS_STRING
}

/**
 * FileOptions_OptimizeMode
 */
export enum FileOptions_OptimizeMode {
  CODE_SIZE,
  LITE_RUNTIME,
  SPEED
}

/**
 * Gender
 */
export enum Gender {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
  GENDER_UNSPECIFIED
}

/**
 * GlobalStatus
 */
export enum GlobalStatus {
  GLOBAL_STATUS_DISABLE,
  GLOBAL_STATUS_ENABLE,
  GLOBAL_STATUS_UNKNOWN
}

/**
 * HTTPMethod
 */
export enum HTTPMethod {
  HTTP_METHOD_DELETE,
  HTTP_METHOD_GET,
  HTTP_METHOD_HEAD,
  HTTP_METHOD_OPTIONS,
  HTTP_METHOD_PATCH,
  HTTP_METHOD_POST,
  HTTP_METHOD_PUT,
  HTTP_METHOD_UNKNOWN
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
 * I18nFormat
 */
export enum I18nFormat {
  JSON,
  TOML
}

/**
 * KnownRegex
 */
export enum KnownRegex {
  KNOWN_REGEX_HTTP_HEADER_NAME,
  KNOWN_REGEX_HTTP_HEADER_VALUE,
  KNOWN_REGEX_UNSPECIFIED
}

/**
 * Log_Driver
 */
export enum Log_Driver {
  DEFAULT,
  SUGARED
}

/**
 * Log_Level
 */
export enum Log_Level {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN
}

/**
 * MemberPosition
 */
export enum MemberPosition {
  MEMBER_POSITION_ADMIN,
  MEMBER_POSITION_GUEST,
  MEMBER_POSITION_MEMBER,
  MEMBER_POSITION_SUPER_ADMIN,
  MEMBER_POSITION_UNKNOWN
}

/**
 * MemberStatus
 */
export enum MemberStatus {
  MEMBER_STATUS_DELETED,
  MEMBER_STATUS_DEPARTED,
  MEMBER_STATUS_FORBIDDEN,
  MEMBER_STATUS_NORMAL,
  MEMBER_STATUS_PENDING_CONFIRM,
  MEMBER_STATUS_UNKNOWN
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
 * Oss_Driver
 */
export enum Oss_Driver {
  ALI,
  LOCAL,
  MINIO,
  TENCENT,
  UNKNOWN
}

/**
 * RegistryDriver
 */
export enum RegistryDriver {
  CONSUL,
  ETCD,
  REGISTRY_DRIVER_UNKNOWN
}

/**
 * SMSProviderType
 */
export enum SMSProviderType {
  SMS_PROVIDER_TYPE_ALIYUN,
  SMS_PROVIDER_TYPE_TENCENT,
  SMS_PROVIDER_TYPE_TWILIO,
  SMS_PROVIDER_TYPE_UNKNOWN
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
 * SendMessageStatus
 */
export enum SendMessageStatus {
  SEND_MESSAGE_STATUS_FAILED,
  SEND_MESSAGE_STATUS_PENDING,
  SEND_MESSAGE_STATUS_RETRY,
  SEND_MESSAGE_STATUS_SENDING,
  SEND_MESSAGE_STATUS_SUCCESS,
  SEND_MESSAGE_STATUS_UNKNOWN
}

/**
 * ServerRegisterRequest_ServerType
 */
export enum ServerType {
  HOUYI,
  LAUREL,
  PALACE,
  RABBIT,
  UNKNOWN
}

/**
 * StrategyType
 */
export enum StrategyType {
  STRATEGY_TYPE_CERT,
  STRATEGY_TYPE_EVENT,
  STRATEGY_TYPE_HTTP,
  STRATEGY_TYPE_LOGS,
  STRATEGY_TYPE_METRIC,
  STRATEGY_TYPE_PING,
  STRATEGY_TYPE_PORT,
  STRATEGY_TYPE_UNKNOWN
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
 * TimeEngineRuleType
 */
export enum TimeEngineRuleType {
  TIME_ENGINE_RULE_TYPE_DAYS_OF_WEEK,
  TIME_ENGINE_RULE_TYPE_DAY_OF_MONTH,
  TIME_ENGINE_RULE_TYPE_HOUR,
  TIME_ENGINE_RULE_TYPE_HOUR_MINUTE_RANGE,
  TIME_ENGINE_RULE_TYPE_HOUR_RANGE,
  TIME_ENGINE_RULE_TYPE_MONTH,
  TIME_ENGINE_RULE_TYPE_UNKNOWN
}

/**
 * Tracer_Driver
 */
export enum Tracer_Driver {
  JAEGER,
  UNKNOWN
}

/**
 * UserPosition
 */
export enum UserPosition {
  USER_POSITION_ADMIN,
  USER_POSITION_GUEST,
  USER_POSITION_SUPER_ADMIN,
  USER_POSITION_UNKNOWN,
  USER_POSITION_USER
}

/**
 * UserStatus
 */
export enum UserStatus {
  USER_STATUS_DELETED,
  USER_STATUS_FORBIDDEN,
  USER_STATUS_NORMAL,
  USER_STATUS_UNKNOWN
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

/** 枚举类型 */
export enum Status {
  /** 全部 */
  StatusAll = 0,

  /** 启用 */
  StatusEnable = 1,

  /** 禁用 */
  StatusDisable = 2
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

/** 状态码判断条件 */
export enum StatusCodeCondition {
  /** 未知 */
  StatusCodeConditionUnknown = 0,

  /** 等于 */
  StatusCodeConditionEQ = 1,

  /** 不等于 */
  StatusCodeConditionNE = 2
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