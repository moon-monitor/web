// teamdashboard 模块API函数
import {
  EmptyReply,
  EmptyRequest,
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
 * SelectTeamDashboard TeamDashboard
 * @param { SelectTeamDashboardRequest } params
 * @returns {Promise<SelectTeamDashboardReply>}
 */
export function selectTeamDashboard(params: SelectTeamDashboardRequest): Promise<SelectTeamDashboardReply> {
  return request.POST<SelectTeamDashboardReply>('/api/team/dashboard/select', params)
}

/**
 * GetTeamDashboard TeamDashboard
 * @param { EmptyRequest } params
 * @returns {Promise<TeamDashboardItem>}
 */
export function getTeamDashboard(params: EmptyRequest): Promise<TeamDashboardItem> {
  return request.GET<TeamDashboardItem>('/api/team/dashboard', params)
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
 * DeleteTeamDashboard TeamDashboard
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamDashboard(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/dashboard', params)
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
 * GetTeamDashboardChart TeamDashboard
 * @param { EmptyRequest } params
 * @returns {Promise<TeamDashboardChartItem>}
 */
export function getTeamDashboardChart(params: EmptyRequest): Promise<TeamDashboardChartItem> {
  return request.GET<TeamDashboardChartItem>('/api/team/dashboard/chart', params)
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
 * DeleteTeamDashboardChart TeamDashboard
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function deleteTeamDashboardChart(params: EmptyRequest): Promise<EmptyReply> {
  return request.DELETE<EmptyReply>('/api/team/dashboard/chart', params)
}

/**
 * UpdateTeamDashboardStatus TeamDashboard
 * @param { UpdateTeamDashboardStatusRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function updateTeamDashboardStatus(params: UpdateTeamDashboardStatusRequest): Promise<EmptyReply> {
  return request.PUT<EmptyReply>('/api/team/dashboard/status', params)
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
 * ListTeamDashboard TeamDashboard
 * @param { ListTeamDashboardRequest } params
 * @returns {Promise<ListTeamDashboardReply>}
 */
export function listTeamDashboard(params: ListTeamDashboardRequest): Promise<ListTeamDashboardReply> {
  return request.POST<ListTeamDashboardReply>('/api/team/dashboard/list', params)
}
