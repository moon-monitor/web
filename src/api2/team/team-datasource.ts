import { EmptyReply } from '../common.types'
import request from '../request'
import {
  DeleteTeamMetricDatasourceRequest,
  GetTeamMetricDatasourceReply,
  GetTeamMetricDatasourceRequest,
  ListTeamMetricDatasourceReply,
  ListTeamMetricDatasourceRequest,
  SaveTeamMetricDatasourceRequest,
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
