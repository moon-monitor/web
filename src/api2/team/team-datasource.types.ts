import {
  BasicAuth,
  GlobalStatusKey,
  PaginationReply,
  PaginationRequest,
  TeamMetricDatasourceItem,
  TLS
} from '../common.types'

export interface DeleteTeamMetricDatasourceRequest {
  datasourceId?: number
  metricDatasourceDriver?: number
}

export interface GetTeamMetricDatasourceRequest {
  datasourceId?: number
  metricDatasourceDriver?: number
}
/**
 * api.palace.GetTeamMetricDatasourceReply
 */
export interface GetTeamMetricDatasourceReply {
  detail?: TeamMetricDatasourceItem
}

/**
 * api.palace.ListTeamMetricDatasourceReply
 */
export interface ListTeamMetricDatasourceReply {
  items?: TeamMetricDatasourceItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.ListTeamMetricDatasourceRequest
 */
export interface ListTeamMetricDatasourceRequest {
  keyword?: string
  pagination?: PaginationRequest
  status?: GlobalStatusKey
}

/**
 * api.palace.SaveTeamMetricDatasourceRequest
 */
export interface SaveTeamMetricDatasourceRequest {
  basicAuth?: BasicAuth
  ca?: string
  datasourceId?: number
  endpoint?: string
  extra?: { [key: string]: string }
  headers?: { [key: string]: string }
  metricDatasourceDriver?: number
  name?: string
  queryMethod?: number
  remark?: string
  scrapeInterval?: string
  tls?: TLS
}

/**
 * api.palace.UpdateTeamMetricDatasourceStatusRequest
 */
export interface UpdateTeamMetricDatasourceStatusRequest {
  datasourceId?: number
  metricDatasourceDriver?: number
  status?: number
}
