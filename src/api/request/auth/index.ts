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
  LogoutReply,
  LogoutRequest,
  OAuth2ListReply,
  OAuthLoginByEmailRequest,
  RegisterRequest,
  ReplaceMemberRoleRequest,
  ReplaceUserRoleRequest,
  UserBaseItem,
  VerifyEmailReply,
  VerifyEmailRequest
} from '../types/index.ts'
import { request } from '../index.ts'

/**
 * GetCaptcha Auth
 * @param { EmptyRequest } params
 * @returns {Promise<GetCaptchaReply>}
 */
export function getCaptcha(params: EmptyRequest): Promise<GetCaptchaReply> {
  return request.GET<GetCaptchaReply>('/api/portal/auth/captcha', params)
}

/**
 * GetCaptcha Auth
 * @param { EmptyRequest } params
 * @returns {Promise<GetCaptchaReply>}
 */
export function getCaptcha2(params: EmptyRequest): Promise<GetCaptchaReply> {
  return request.GET<GetCaptchaReply>('/api/auth/captcha', params)
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
 * GetSelfMenuTree Auth
 * @param { EmptyRequest } params
 * @returns {Promise<GetSelfMenuTreeReply>}
 */
export function getSelfMenuTree(params: EmptyRequest): Promise<GetSelfMenuTreeReply> {
  return request.GET<GetSelfMenuTreeReply>('/api/auth/self/menu/tree', params)
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
 * Login Auth
 * @param { LoginRequest } params
 * @returns {Promise<LoginInfo>}
 */
export function login(params: LoginRequest): Promise<LoginInfo> {
  return request.POST<LoginInfo>('/api/portal/auth/login', params)
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
 * LoginByPassword Auth
 * @param { LoginByPasswordRequest } params
 * @returns {Promise<LoginReply>}
 */
export function loginByPassword(params: LoginByPasswordRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/login', params)
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
 * Logout Auth
 * @param { LogoutRequest } params
 * @returns {Promise<LogoutReply>}
 */
export function logout2(params: LogoutRequest): Promise<LogoutReply> {
  return request.POST<LogoutReply>('/api/auth/logout', params)
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
 * OAuthLoginByEmail Auth
 * @param { OAuthLoginByEmailRequest } params
 * @returns {Promise<LoginReply>}
 */
export function oAuthLoginByEmail(params: OAuthLoginByEmailRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/oauth2/login/email', params)
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
 * Register Auth
 * @param { RegisterRequest } params
 * @returns {Promise<LoginInfo>}
 */
export function register(params: RegisterRequest): Promise<LoginInfo> {
  return request.POST<LoginInfo>('/api/portal/auth/register', params)
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
 * ReplaceUserRole Auth
 * @param { ReplaceUserRoleRequest } params
 * @returns {Promise<EmptyReply>}
 */
export function replaceUserRole(params: ReplaceUserRoleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/auth/user/role', params)
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
 * VerifyEmail Auth
 * @param { VerifyEmailRequest } params
 * @returns {Promise<VerifyEmailReply>}
 */
export function verifyEmail2(params: VerifyEmailRequest): Promise<VerifyEmailReply> {
  return request.POST<VerifyEmailReply>('/api/auth/verify/email', params)
}
