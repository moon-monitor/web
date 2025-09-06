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
export enum ServerRegisterRequest_ServerType {
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