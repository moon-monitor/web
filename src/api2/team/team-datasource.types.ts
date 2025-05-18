import {
  BasicAuth,
  KeyValueItem,
  PaginationReply,
  PaginationRequest,
  TagItemType,
  TeamMetricDatasourceItem,
  TeamMetricDatasourceMetadataItem,
  TLS
} from '../common.types'
import { DatasourceDriverMetric, GlobalStatus, HTTPMethod } from '../enum'

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
export interface GetTeamMetricDatasourceReply extends TeamMetricDatasourceItem {}

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
  status?: GlobalStatus
}

export const defaultSearchTeamMetricDatasourceParams: ListTeamMetricDatasourceRequest = {
  pagination: {
    page: 1,
    pageSize: 100
  }
}

/**
 * api.palace.SaveTeamMetricDatasourceRequest
 */
export interface SaveTeamMetricDatasourceRequest {
  basicAuth?: BasicAuth
  ca?: string
  datasourceId?: number
  endpoint?: string
  extra?: KeyValueItem[]
  headers?: KeyValueItem[]
  driver: DatasourceDriverMetric
  name: string
  queryMethod: HTTPMethod
  remark: string
  scrapeInterval: string
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

/**
 * api.palace.ListMetricDatasourceMetadataRequest
 */
export interface ListMetricDatasourceMetadataRequest {
  datasourceId?: number
  keyword?: string
  pagination?: PaginationRequest
  type?: string
}

export const defaultSearchMetricDatasourceMetadataParams: ListMetricDatasourceMetadataRequest = {
  pagination: {
    page: 1,
    pageSize: 100
  }
}

/**
 * api.palace.ListMetricDatasourceMetadataReply
 */
export interface ListMetricDatasourceMetadataReply {
  items?: TeamMetricDatasourceMetadataItem[]
  pagination?: PaginationReply
}

/**
 * api.palace.GetMetricDatasourceMetadataRequest
 */
export interface GetMetricDatasourceMetadataRequest {
  metadataId: number
  datasourceId: number
}

/**
 * api.palace.SyncMetricDatasourceMetadataRequest
 */
export interface SyncMetricDatasourceMetadataRequest {
  datasourceId?: number
}

export type MetricType = 'counter' | 'gauge' | 'histogram' | 'summary'

export const MetricTypeData: Record<MetricType, TagItemType> = {
  counter: {
    text: 'Counter',
    color: 'green'
  },
  gauge: {
    text: 'Gauge',
    color: 'blue'
  },
  histogram: {
    text: 'Histogram',
    color: 'purple'
  },
  summary: {
    text: 'Summary',
    color: 'orange'
  }
}
