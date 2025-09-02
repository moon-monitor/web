// teamdatasource 模块API函数
import { request } from '../index.ts'
import {
  DatasourceSelectReply,
  DatasourceSelectRequest,
  EmptyReply,
  EmptyRequest,
  ListMetricDatasourceMetadataReply,
  ListMetricDatasourceMetadataRequest,
  ListTeamMetricDatasourceReply,
  ListTeamMetricDatasourceRequest,
  MetricDatasourceQueryReply,
  MetricDatasourceQueryRequest,
  SaveTeamMetricDatasourceRequest,
  SyncMetricMetadataRequest,
  TeamMetricDatasourceItem,
  TeamMetricDatasourceMetadataItem,
  UpdateMetricDatasourceMetadataRequest,
  UpdateTeamMetricDatasourceStatusRequest
} from '../types/index.ts'

/**
 * ListMetricDatasourceMetadata TeamDatasource
 * @param { ListMetricDatasourceMetadataRequest } params
 * @returns {Promise<ListMetricDatasourceMetadataReply>}
 */
export function listMetricDatasourceMetadata(
  params: ListMetricDatasourceMetadataRequest
): Promise<ListMetricDatasourceMetadataReply> {
  return request.POST<ListMetricDatasourceMetadataReply>('/api/team/metric/datasource/metadata/list', params)
}

/**
 * UpdateTeamMetricDatasourceStatus TeamDatasource
 * @param { UpdateTeamMetricDatasourceStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamMetricDatasourceStatus(params: UpdateTeamMetricDatasourceStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/metric/datasource/status', params)
}

/**
 * SyncMetricMetadata TeamDatasource
 * @param { SyncMetricMetadataRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function syncMetricMetadata(params: SyncMetricMetadataRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/metric/datasource/sync/metadata', params)
}

/**
 * MetricDatasourceQuery TeamDatasource
 * @param { MetricDatasourceQueryRequest } params
 * @returns {Promise<MetricDatasourceQueryReply>}
 */
export function metricDatasourceQuery(params: MetricDatasourceQueryRequest): Promise<MetricDatasourceQueryReply> {
  return request.POST<MetricDatasourceQueryReply>('/api/team/metric/datasource/query', params)
}

/**
 * SaveTeamMetricDatasource TeamDatasource
 * @param { SaveTeamMetricDatasourceRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamMetricDatasource(params: SaveTeamMetricDatasourceRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/metric/datasource', params)
}

/**
 * GetTeamMetricDatasource TeamDatasource
 * @param { EmptyRequest } params
 * @returns {Promise<TeamMetricDatasourceItem>}
 */
export function getTeamMetricDatasource(params: EmptyRequest): Promise<TeamMetricDatasourceItem> {
  return request.GET<TeamMetricDatasourceItem>('/api/team/metric/datasource', params)
}

/**
 * DeleteTeamMetricDatasource TeamDatasource
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamMetricDatasource(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/metric/datasource', params)
}

/**
 * DatasourceSelect TeamDatasource
 * @param { DatasourceSelectRequest } params
 * @returns {Promise<DatasourceSelectReply>}
 */
export function datasourceSelect(params: DatasourceSelectRequest): Promise<DatasourceSelectReply> {
  return request.POST<DatasourceSelectReply>('/api/team/metric/datasource/select', params)
}

/**
 * ListTeamMetricDatasource TeamDatasource
 * @param { ListTeamMetricDatasourceRequest } params
 * @returns {Promise<ListTeamMetricDatasourceReply>}
 */
export function listTeamMetricDatasource(
  params: ListTeamMetricDatasourceRequest
): Promise<ListTeamMetricDatasourceReply> {
  return request.POST<ListTeamMetricDatasourceReply>('/api/team/metric/datasource/list', params)
}

/**
 * GetMetricDatasourceMetadata TeamDatasource
 * @param { EmptyRequest } params
 * @returns {Promise<TeamMetricDatasourceMetadataItem>}
 */
export function getMetricDatasourceMetadata(params: EmptyRequest): Promise<TeamMetricDatasourceMetadataItem> {
  return request.GET<TeamMetricDatasourceMetadataItem>('/api/team/metric/datasource/metadata', params)
}

/**
 * UpdateMetricDatasourceMetadata TeamDatasource
 * @param { UpdateMetricDatasourceMetadataRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateMetricDatasourceMetadata(params: UpdateMetricDatasourceMetadataRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/metric/datasource/metadata', params)
}
