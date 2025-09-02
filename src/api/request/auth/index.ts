// auth 模块API函数
import {
  EmptyReply,
  EmptyRequest,
  GetCaptchaReply,
  GetFilingInformationReply,
  GetSelfMenuTreeReply,
  LoginByEmailRequest,
  LoginByPasswordRequest,
  LoginInfo,
  LoginReply,
  LoginRequest,
  OAuth2ListReply,
  OAuthLoginByEmailRequest,
  RegisterRequest,
  ReplaceMemberRoleRequest,
  ReplaceUserRoleRequest,
  UserBaseItem,
  VerifyEmailRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * Login Auth
 * @param { LoginRequest } params
 * @returns {Promise<LoginInfo>}
 */
export function login(params: LoginRequest): Promise<LoginInfo> {
  return request.POST<LoginInfo>('/api/portal/auth/login', params)
}

/**
 * GetUserInfo Auth
 * @param { EmptyRequest } params
 * @returns {Promise<UserBaseItem>}
 */
export function getUserInfo(params: EmptyRequest): Promise<UserBaseItem> {
  return request.GET<UserBaseItem>('/api/portal/auth/user-info', params)
}

/**
 * VerifyEmail Auth
 * @param { VerifyEmailRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function verifyEmail(params: VerifyEmailRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/portal/auth/verify-email', params)
}

/**
 * RefreshToken Auth
 * @param { EmptyRequest } params
 * @returns {Promise<LoginReply>}
 */
export function refreshToken(params: EmptyRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/refresh', params)
}

/**
 * OAuthLoginByEmail Auth
 * @param { OAuthLoginByEmailRequest } params
 * @returns {Promise<LoginReply>}
 */
export function oAuthLoginByEmail(params: OAuthLoginByEmailRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/oauth2/login/email', params)
}

/**
 * LoginByPassword Auth
 * @param { LoginByPasswordRequest } params
 * @returns {Promise<LoginReply>}
 */
export function loginByPassword(params: LoginByPasswordRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/login', params)
}

/**
 * GetSelfMenuTree Auth
 * @param { EmptyRequest } params
 * @returns {Promise<GetSelfMenuTreeReply>}
 */
export function getSelfMenuTree(params: EmptyRequest): Promise<GetSelfMenuTreeReply> {
  return request.GET<GetSelfMenuTreeReply>('/api/auth/self/menu/tree', params)
}

/**
 * Register Auth
 * @param { RegisterRequest } params
 * @returns {Promise<LoginInfo>}
 */
export function register(params: RegisterRequest): Promise<LoginInfo> {
  return request.POST<LoginInfo>('/api/portal/auth/register', params)
}

/**
 * Logout Auth
 * @param { EmptyRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function logout(params: EmptyRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/portal/auth/logout', params)
}

/**
 * OAuth2List Auth
 * @param { EmptyRequest } params
 * @returns {Promise<OAuth2ListReply>}
 */
export function oAuth2List(params: EmptyRequest): Promise<OAuth2ListReply> {
  return request.POST<OAuth2ListReply>('/api/auth/oauth2/list', params)
}

/**
 * GetFilingInformation Auth
 * @param { EmptyRequest } params
 * @returns {Promise<GetFilingInformationReply>}
 */
export function getFilingInformation(params: EmptyRequest): Promise<GetFilingInformationReply> {
  return request.POST<GetFilingInformationReply>('/api/auth/filing/information', params)
}

/**
 * GetCaptcha Auth
 * @param { EmptyRequest } params
 * @returns {Promise<GetCaptchaReply>}
 */
export function getCaptcha(params: EmptyRequest): Promise<GetCaptchaReply> {
  return request.GET<GetCaptchaReply>('/api/portal/auth/captcha', params)
}

/**
 * ReplaceMemberRole Auth
 * @param { ReplaceMemberRoleRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function replaceMemberRole(params: ReplaceMemberRoleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/auth/member/role', params)
}

/**
 * LoginByEmail Auth
 * @param { LoginByEmailRequest } params
 * @returns {Promise<LoginReply>}
 */
export function loginByEmail(params: LoginByEmailRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/login/email', params)
}

/**
 * ReplaceUserRole Auth
 * @param { ReplaceUserRoleRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function replaceUserRole(params: ReplaceUserRoleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/auth/user/role', params)
}
