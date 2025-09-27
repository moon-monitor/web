// teamdashboard 模块API函数
import {
  DeleteTeamDashboardChartRequest,
  DeleteTeamDashboardRequest,
  EmptyReply,
  GetTeamDashboardChartRequest,
  GetTeamDashboardRequest,
  ListTeamDashboardChartReply,
  ListTeamDashboardChartRequest,
  ListTeamDashboardReply,
  ListTeamDashboardRequest,
  SaveTeamDashboardChartRequest,
  SaveTeamDashboardRequest,
  SelectTeamDashboardChartReply,
  SelectTeamDashboardChartRequest,
  SelectTeamDashboardReply,
  SelectTeamDashboardRequest,
  TeamDashboardChartItem,
  TeamDashboardItem,
  UpdateTeamDashboardChartStatusRequest,
  UpdateTeamDashboardStatusRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * DeleteTeamDashboard TeamDashboard
 * @param { DeleteTeamDashboardRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamDashboard(params: DeleteTeamDashboardRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/dashboard', params)
}

/**
 * DeleteTeamDashboardChart TeamDashboard
 * @param { DeleteTeamDashboardChartRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamDashboardChart(params: DeleteTeamDashboardChartRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/dashboard/chart', params)
}

/**
 * GetTeamDashboard TeamDashboard
 * @param { GetTeamDashboardRequest } params
 * @returns {Promise<TeamDashboardItem>}
 */
export function getTeamDashboard(params: GetTeamDashboardRequest): Promise<TeamDashboardItem> {
  return request.GET<TeamDashboardItem>('/api/team/dashboard', params)
}

/**
 * GetTeamDashboardChart TeamDashboard
 * @param { GetTeamDashboardChartRequest } params
 * @returns {Promise<TeamDashboardChartItem>}
 */
export function getTeamDashboardChart(params: GetTeamDashboardChartRequest): Promise<TeamDashboardChartItem> {
  return request.GET<TeamDashboardChartItem>('/api/team/dashboard/chart', params)
}

/**
 * ListTeamDashboard TeamDashboard
 * @param { ListTeamDashboardRequest } params
 * @returns {Promise<ListTeamDashboardReply>}
 */
export function listTeamDashboard(params: ListTeamDashboardRequest): Promise<ListTeamDashboardReply> {
  return request.POST<ListTeamDashboardReply>('/api/team/dashboard/list', params)
}

/**
 * ListTeamDashboardChart TeamDashboard
 * @param { ListTeamDashboardChartRequest } params
 * @returns {Promise<ListTeamDashboardChartReply>}
 */
export function listTeamDashboardChart(params: ListTeamDashboardChartRequest): Promise<ListTeamDashboardChartReply> {
  return request.POST<ListTeamDashboardChartReply>('/api/team/dashboard/chart/list', params)
}

/**
 * SaveTeamDashboard TeamDashboard
 * @param { SaveTeamDashboardRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamDashboard(params: SaveTeamDashboardRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/dashboard', params)
}

/**
 * SaveTeamDashboardChart TeamDashboard
 * @param { SaveTeamDashboardChartRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function saveTeamDashboardChart(params: SaveTeamDashboardChartRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/dashboard/chart', params)
}

/**
 * SelectTeamDashboard TeamDashboard
 * @param { SelectTeamDashboardRequest } params
 * @returns {Promise<SelectTeamDashboardReply>}
 */
export function selectTeamDashboard(params: SelectTeamDashboardRequest): Promise<SelectTeamDashboardReply> {
  return request.POST<SelectTeamDashboardReply>('/api/team/dashboard/select', params)
}

/**
 * SelectTeamDashboardChart TeamDashboard
 * @param { SelectTeamDashboardChartRequest } params
 * @returns {Promise<SelectTeamDashboardChartReply>}
 */
export function selectTeamDashboardChart(
  params: SelectTeamDashboardChartRequest
): Promise<SelectTeamDashboardChartReply> {
  return request.POST<SelectTeamDashboardChartReply>('/api/team/dashboard/chart/select', params)
}

/**
 * UpdateTeamDashboardChartStatus TeamDashboard
 * @param { UpdateTeamDashboardChartStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamDashboardChartStatus(params: UpdateTeamDashboardChartStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/dashboard/chart/status', params)
}

/**
 * UpdateTeamDashboardStatus TeamDashboard
 * @param { UpdateTeamDashboardStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamDashboardStatus(params: UpdateTeamDashboardStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/dashboard/status', params)
}
