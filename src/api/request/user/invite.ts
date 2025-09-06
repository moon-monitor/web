
import { request } from '../index.ts'

export interface TeamRole {
  id: number
  name: string
}

export interface TeamItem {
  id: number
  name: string
}

export interface InviteItem {
  roles: TeamRole[]
  team: TeamItem
  id: number
  inviteType: number
}

export interface GetInviteRequest {
  id: number
}

export interface GetInviteReply {
  detail: InviteItem
}

export function getInvite(params: GetInviteRequest): Promise<GetInviteReply> {
  return request.GET(`/v1/admin/invite/detail/${params.id}`)
}
