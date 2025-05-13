import request from '../request'
import { ListTeamNoticeGroupReply, ListTeamNoticeGroupRequest } from './types'

/**
 * ListTeamNoticeGroup
 * @param {ListTeamNoticeGroupRequest} params
 * @returns {Promise<GetTeamStrategyReply>}
 */
export const listTeamNoticeGroup = async (parama: ListTeamNoticeGroupRequest) => {
  return await request.POST<ListTeamNoticeGroupReply>('/api/team/notice/group/list', parama)
}
