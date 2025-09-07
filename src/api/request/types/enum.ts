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
