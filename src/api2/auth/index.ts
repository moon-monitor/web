import { EmptyReply } from '../common.types'
import request from '../request'
import {
  GetCaptchaReply,
  GetFilingInformationReply,
  GetSelfMenuTreeReply,
  LoginByEmailRequest,
  LoginByPasswordRequest,
  LoginReply,
  LogoutReply,
  LogoutRequest,
  OAuth2ListReply,
  OAuthLoginByEmailRequest,
  ReplaceMemberRoleRequest,
  ReplaceUserRoleRequest,
  VerifyEmailReply,
  VerifyEmailRequest
} from './types'

/**
 * GetCaptcha sends a captcha image to the client
 * @returns {Promise<GetCaptchaReply>}
 */
export function getCaptcha(): Promise<GetCaptchaReply> {
  return request.GET<GetCaptchaReply>('/api/auth/captcha')
}

/**
 * GetFilingInformation gets the filing information
 * @returns {Promise<GetFilingInformationReply>}
 */
export function getFilingInformation(): Promise<GetFilingInformationReply> {
  return request.POST<GetFilingInformationReply>('/api/auth/filing/information', {})
}

/**
 * LoginByPassword authenticates a user with email and password
 * @param {LoginByPasswordRequest} params
 * @returns {Promise<LoginReply>}
 */
export function loginByPassword(params: LoginByPasswordRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/login', params)
}
/**
 * LoginByEmail logs in using email verification code
 * @param {LoginByEmailRequest} params
 * @returns {Promise<LoginReply>}
 */
export function loginByEmail(params: LoginByEmailRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/login/email', params)
}

/**
 * Logout logs out the user
 * @param {LogoutRequest} params
 * @returns {Promise<LogoutReply>}
 */
export function logout(params?: LogoutRequest): Promise<LogoutReply> {
  return request.POST<LogoutReply>('/api/auth/logout', params)
}

/**
 * ReplaceMemberRole updates the member's role
 * @param {ReplaceMemberRoleRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function replaceMemberRole(params: ReplaceMemberRoleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/member/role', params)
}

/**
 * OAuth2List returns the list of supported OAuth2.0 providers
 * @returns {Promise<OAuth2ListReply>}
 */
export function oAuth2List(): Promise<OAuth2ListReply> {
  return request.POST<OAuth2ListReply>('/api/auth/oauth2/list', {})
}

/**
 * OAuthLoginByEmail logs in using OAuth2.0 and email
 * @param {OAuthLoginByEmailRequest} params
 * @returns {Promise<LoginReply>}
 */
export function oAuthLoginByEmail(params: OAuthLoginByEmailRequest): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/oauth2/login/email', params)
}
/**
 * RefreshToken refreshes the login token
 * @returns {Promise<LoginReply>}
 */
export function refreshToken(): Promise<LoginReply> {
  return request.POST<LoginReply>('/api/auth/refresh', {})
}

/**
 * GetSelfMenuTree returns the menu tree
 * @returns {Promise<GetSelfMenuTreeReply>}
 */
export function getSelfMenuTree(): Promise<GetSelfMenuTreeReply> {
  return request.POST<GetSelfMenuTreeReply>('/api/auth/self/menu/tree')
}

/**
 * ReplaceUserRole updates the user's role
 * @param {ReplaceUserRoleRequest} params
 * @returns {Promise<EmptyReply>}
 */
export function replaceUserRole(params: ReplaceUserRoleRequest): Promise<EmptyReply> {
  return request.POST<EmptyReply>('/api/team/user/role', params)
}

/**
 * VerifyEmail verifies the user's email address
 * @param {VerifyEmailRequest} params
 * @returns {Promise<VerifyEmailReply>}
 */
export function verifyEmail(params: VerifyEmailRequest): Promise<VerifyEmailReply> {
  return request.POST<VerifyEmailReply>('/api/auth/verify/email', params)
}
