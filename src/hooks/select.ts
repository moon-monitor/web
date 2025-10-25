import { DictType } from '@/api/enum'
import { listMetricDatasourceMetadata } from '@/api/request/teamdatasource'
import { selectTeamDict } from '@/api/request/teamdict'
import { listTeamStrategyGroup } from '@/api/request/teamstrategy'
import { listTimeEngineRule } from '@/api/request/timeengine'
import { ListTimeEngineRuleRequest } from '@/api/request/types'
import { ListMetricDatasourceMetadataRequest, ListTeamStrategyGroupRequest, SelectTeamDictRequest } from '@/api/request/types/index'
import { useRequest } from 'ahooks'

/**
 * 获取数据源列表
 * @param params
 * @returns { datasourceList: Datasource[], error, datasourceListLoading: boolean }
 */
export const useDatasourceList = (params: ListMetricDatasourceMetadataRequest) => {
  const { data, loading, error } = useRequest(listMetricDatasourceMetadata, {
    defaultParams: [params]
  })
  return { datasourceList: data?.items || [], error, page: data?.pagination, datasourceListLoading: loading }
}

/**
 * 获取策略组列表
 * @param params
 * @returns { strategyGroupList: StrategyGroup[], error, page: PaginationReply, strategyGroupListLoading: boolean }
 */
export const useStrategyGroupList = (params: ListTeamStrategyGroupRequest) => {
  const { data, loading, error } = useRequest(listTeamStrategyGroup, {
    defaultParams: [params]
  })
  return { strategyGroupList: data?.items || [], error, page: data?.pagination, strategyGroupListLoading: loading }
}

/**
 * 获取策略分类列表
 * @param params
 * @returns { strategyCategoryList: DictItem[], error, strategyCategoryListLoading: boolean }
 */
export const useStrategyCategoryList = (params: SelectTeamDictRequest) => {
  const { data, loading, error } = useRequest(selectTeamDict, {
    defaultParams: [{ ...params, dictTypes: [DictType.DictTypeStrategyCategory] }]
  })
  return { strategyCategoryList: data?.items || [], error, strategyCategoryListLoading: loading }
}

/**
 * 获取告警组列表
 * @param params
 * @returns { alarmGroupList: AlarmGroup[], error, alarmGroupListLoading: boolean }
 */
export const useAlarmNoticeGroupList = (params: ListAlarmGroupRequest) => {
  const { data, loading, error } = useRequest(listAlarmGroup, {
    defaultParams: [params]
  })
  return { alarmGroupList: data?.list || [], error, alarmGroupListLoading: loading }
}

/**
 * 获取告警页面列表
 * @param params
 * @returns { alarmPageList: AlarmPage[], error, alarmPageListLoading: boolean }
 */
export const useAlarmPageList = (params: SelectTeamDictRequest) => {
  const { data, loading, error } = useRequest(selectTeamDict, {
    defaultParams: [{ ...params, dictTypes: [DictType.DictTypeAlarmPage] }]
  })
  return { alarmPageList: data?.items || [], error, alarmPageListLoading: loading }
}

/**
 * 获取告警等级列表
 * @param params
 * @returns { alarmLevelList: DictItem[], error, alarmLevelListLoading: boolean }
 */
export const useAlarmLevelList = (params: SelectTeamDictRequest) => {
  const { data, loading, error } = useRequest(selectTeamDict, {
    defaultParams: [{ ...params, dictTypes: [DictType.DictTypeAlarmLevel] }]
  })
  return { alarmLevelList: data?.items || [], error, alarmLevelListLoading: loading }
}

/**
 * 获取时间引擎规则列表
 * @param params
 * @returns { timeEngineRuleList: TimeEngineRule[], error, timeEngineRuleListLoading: boolean }
 */
export const useTimeEngineRuleList = (params: ListTimeEngineRuleRequest) => {
  const { data, loading, error } = useRequest(listTimeEngineRule, {
    defaultParams: [params]
  })
  return { timeEngineRuleList: data?.items || [], error, timeEngineRuleListLoading: loading }
}
