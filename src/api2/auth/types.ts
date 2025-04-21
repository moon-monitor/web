import { MenuTreeItem, UserBaseItem } from '../common.types'

/**
 * api.palace.GetCaptchaReply, GetCaptchaReply contains the response data for the GetCaptcha
 * method
 */
export interface GetCaptchaReply {
  /**
   * Unique identifier for the captcha
   */
  captchaId: string
  /**
   * Base64 encoded captcha image data
   */
  captchaImg: string
  /**
   * Captcha expiration time in seconds
   */
  expiredSeconds: number
}

/**
 * api.palace.GetFilingInformationReply, GetFilingInformationReply contains the response data
 * for getting the filing information
 */
export interface GetFilingInformationReply {
  /**
   * Filing information
   */
  filingInformation: string
  /**
   * URL of the filing information
   */
  url: string
}

/**
 * api.palace.LoginByPasswordRequest, LoginByPasswordRequest represents the request data for
 * logging in with password
 */
export interface LoginByPasswordRequest {
  /**
   * Captcha validation information
   */
  captcha: Captcha
  /**
   * User email
   */
  email: string
  /**
   * User password
   */
  password: string
}

/**
 * Captcha validation information
 *
 * api.palace.CaptchaValidateRequest, CaptchaValidateRequest is used to validate the captcha
 */
export interface Captcha {
  /**
   * User's captcha answer
   */
  answer: string
  /**
   * Captcha ID, used to identify the captcha image
   */
  captchaId: string
}

/**
 * api.palace.LoginReply, LoginReply contains the response data for successful login
 */
export interface LoginReply {
  /**
   * Token expiration time in seconds
   */
  expiredSeconds: number
  /**
   * Login token
   */
  token: string
  /**
   * User basic information
   */
  user: UserBaseItem
}

/**
 * api.palace.LoginByEmailRequest, LoginByEmailRequest represents the request data for
 * logging in with email verification code
 */
export interface LoginByEmailRequest {
  /**
   * Email verification code
   */
  code: string
  /**
   * User email
   */
  email: string
  /**
   * User gender, optional
   */
  gender: number
  /**
   * User nickname, optional
   */
  nickname: string
  /**
   * Remark, for additional information
   */
  remark: string
  /**
   * Username, not email
   */
  username: string
}

/**
 * api.palace.LogoutRequest, LogoutRequest represents the request data for logging out
 */
export interface LogoutRequest {
  /**
   * Redirect URL after logout, optional
   */
  redirect: string
}

/**
 * api.palace.LogoutReply, LogoutReply contains the response data for successful logout
 */
export interface LogoutReply {
  /**
   * Redirect URL after logout, if any
   */
  redirect: string
}

/**
 * api.palace.ReplaceMemberRoleRequest, ReplaceMemberRoleRequest represents the request data
 * for replacing a member's role
 */
export interface ReplaceMemberRoleRequest {
  memberID: number
  roleIds: number[]
}

/**
 * api.palace.OAuth2ListReply, OAuth2ListReply contains the list of supported OAuth2.0
 * providers
 */
export interface OAuth2ListReply {
  /**
   * List of OAuth2.0 providers
   */
  items: OAuthItem[]
}

/**
 * api.palace.OAuth2ListReply_OAuthItem, OAuth2.0 provider information item
 */
export interface OAuthItem {
  /**
   * Provider icon URL
   */
  icon: string
  /**
   * Provider label or name
   */
  label: string
  /**
   * Provider redirect URL
   */
  redirect: string
}

/**
 * api.palace.OAuthLoginByEmailRequest, OAuthLoginByEmailRequest represents the request data
 * for OAuth2.0 login with email
 */
export interface OAuthLoginByEmailRequest {
  /**
   * Application ID, to identify the application
   */
  app: number
  /**
   * OAuth2.0 authorization code
   */
  code: string
  /**
   * User email
   */
  email: string
  /**
   * OAuth2.0 provider ID
   */
  oauthID: number
  /**
   * OAuth2.0 token
   */
  token: string
}

/**
 * api.palace.GetSelfMenuTreeReply, GetSelfMenuTreeReply contains the response data for
 * getting the menu tree
 */
export interface GetSelfMenuTreeReply {
  /**
   * Menu tree data
   */
  items: MenuTreeItem[]
}

/**
 * api.palace.ReplaceUserRoleRequest, ReplaceUserRoleRequest represents the request data for
 * replacing a user's role
 */
export interface ReplaceUserRoleRequest {
  roleIds: number[]
  userID: number
}

/**
 * api.palace.VerifyEmailRequest，VerifyEmailRequest represents the request data for email
 * verification
 */
export interface VerifyEmailRequest {
  /**
   * Captcha validation information
   */
  captcha: Captcha
  /**
   * Email to verify
   */
  email: string
}

/**
 * api.palace.VerifyEmailReply，VerifyEmailReply contains the response data for successful
 * email verification
 */
export interface VerifyEmailReply {
  /**
   * Email verification code expiration time in seconds
   */
  expiredSeconds: number
}
