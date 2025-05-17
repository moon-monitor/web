import { EmptyReply, TeamMetricDatasourceMetadataItem } from '../common.types'
import request from '../request'
import {
  DeleteTeamMetricDatasourceRequest,
  GetMetricDatasourceMetadataRequest,
  GetTeamMetricDatasourceReply,
  GetTeamMetricDatasourceRequest,
  ListMetricDatasourceMetadataReply,
  ListMetricDatasourceMetadataRequest,
  ListTeamMetricDatasourceReply,
  ListTeamMetricDatasourceRequest,
  SaveTeamMetricDatasourceRequest,
  SyncMetricDatasourceMetadataRequest,
  UpdateTeamMetricDatasourceStatusRequest
} from './team-datasource.types'

/**
 * GetTeamMetricDatasource retrieves a team metric datasource by Id
 * @param {GetTeamMetricDatasourceRequest} params
 * @returns {Promise<GetTeamMetricDatasourceReply>}
 */
export const getTeamMetricDatasource = (
  params: GetTeamMetricDatasourceRequest
): Promise<GetTeamMetricDatasourceReply> => {
  return request.GET<GetTeamMetricDatasourceReply>(`/api/team/metric/datasource`, params)
}

/**
 * SaveTeamMetricDatasource saves a new team metric datasource or updates an existing one
 * @param {SaveTeamMetricDatasourceRequest} params
 * @returns {Promise<EmptyReply>}
 */
export const saveTeamMetricDatasource = (params: SaveTeamMetricDatasourceRequest): Promise<EmptyReply> => {
  return request.POST<EmptyReply>('/api/team/metric/datasource', params)
}

/**
 * DeleteTeamMetricDatasource deletes a team metric datasource by Id
 * @param {DeleteTeamMetricDatasourceRequest} params
 * @returns {Promise<EmptyReply>}
 */
export const deleteTeamMetricDatasource = (params: DeleteTeamMetricDatasourceRequest): Promise<EmptyReply> => {
  return request.DELETE<EmptyReply>('/api/team/metric/datasource', params)
}

/**
 * ListTeamMetricDatasource lists team metric datasources
 * @param {ListTeamMetricDatasourceRequest} params
 * @returns {Promise<ListTeamMetricDatasourceReply>}
 */
export const listTeamMetricDatasource = (
  params: ListTeamMetricDatasourceRequest
): Promise<ListTeamMetricDatasourceReply> => {
  return request.POST<ListTeamMetricDatasourceReply>('/api/team/metric/datasource/list', params)
}

/**
 * UpdateTeamMetricDatasourceStatus updates the status of a team metric datasource
 * @param {UpdateTeamMetricDatasourceStatusRequest} params
 * @returns {Promise<EmptyReply>}
 */
export const updateTeamMetricDatasourceStatus = (
  params: UpdateTeamMetricDatasourceStatusRequest
): Promise<EmptyReply> => {
  return request.PUT<EmptyReply>('/api/team/metric/datasource/status', params)
}

/**
 * ListMetricDatasourceMetadata lists metric datasource metadata
 * @param {ListMetricDatasourceMetadataRequest} params
 * @returns {Promise<ListMetricDatasourceMetadataReply>}
 */
export const listMetricDatasourceMetadata = (
  params: ListMetricDatasourceMetadataRequest
): Promise<ListMetricDatasourceMetadataReply> => {
  return request.POST<ListMetricDatasourceMetadataReply>('/api/team/metric/datasource/metadata/list', params)
}

/**
 * GetMetricDatasourceMetadata retrieves a metric datasource metadata by Id
 * @param {GetMetricDatasourceMetadataRequest} params
 * @returns {Promise<GetMetricDatasourceMetadataReply>}
 */
export const getMetricDatasourceMetadata = (
  params: GetMetricDatasourceMetadataRequest
): Promise<TeamMetricDatasourceMetadataItem> => {
  return request.GET<TeamMetricDatasourceMetadataItem>('/api/team/metric/datasource/metadata', params)
}

/**
 * SyncMetricDatasourceMetadata syncs metric datasource metadata
 * @param {SyncMetricDatasourceMetadataRequest} params
 * @returns {Promise<EmptyReply>}
 */
export const syncMetricDatasourceMetadata = (params: SyncMetricDatasourceMetadataRequest): Promise<EmptyReply> => {
  return request.POST<EmptyReply>('/api/team/metric/datasource/sync/metadata', params)
}
