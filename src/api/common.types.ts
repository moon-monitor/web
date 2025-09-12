// 通用类型定义

export interface TeamItem {
    teamId: number
    name: string
    remark?: string
    status: number
    createdAt: string
    updatedAt: string
}

export interface UserItem {
    userId: number
    username: string
    email: string
    nickname?: string
    avatar?: string
    status: number
    createdAt: string
    updatedAt: string
}

export interface TeamMemberItem {
    teamMemberId: number
    id: number
    user: UserItem
    position: number
    status: number
    inviter?: UserItem
    roles: TeamRoleItem[]
    createdAt: string
    updatedAt: string
}

export interface TeamRoleItem {
    teamRoleId: number
    id: number
    roleId: number
    name: string
    remark?: string
    status: number
    menus: MenuTreeItem[]
    members: TeamMemberItem[]
    createdAt: string
    updatedAt: string
    creator?: UserItem
}

export interface TeamDictItem {
    dictId: number
    id: number
    teamId: number
    name: string
    type: number
    value: string
    remark?: string
    status: number
    color?: string
    createdAt: string
    updatedAt: string
}

export interface MenuTreeItem {
    menuId: number
    id: number
    name: string
    menuPath: string
    apiPath?: string
    status: number
    menuIcon?: string
    children?: MenuTreeItem[]
    menuType: number
    menuCategory: number
    processType: number
    parentId?: number
    isRelyOnBrother?: boolean
}

export interface MenuTree {
    menuId: number
    id: number
    name: string
    menuPath: string
    apiPath?: string
    status: number
    menuIcon?: string
    children?: MenuTree[]
    menuType: number
    menuCategory: number
    processType: number
    parentId?: number
    isRelyOnBrother?: boolean
    label?: string
}
