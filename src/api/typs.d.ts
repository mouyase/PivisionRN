/**
 * @作者 某亚瑟
 * @日期 2024/7/12
 * @用途 接口类型定义
 */

declare namespace TAccount {
  export type UserRes = {
    // 登陆token
    access_token: string
    // 刷新token
    refresh_token: string
    // 过期时间
    expires_in: number
    // 权限范围，似乎用不到
    scope: string
    // token类型，似乎只能是bearer
    token_type: 'bearer'
    // 用户信息
    user: {
      account: string
      id: string
      is_mail_authorized: boolean
      is_premium: boolean
      mail_address: string
      name: string
      profile_image_urls: {
        px_16x16: string
        px_170x170: string
        px_50x50: string
      }
      require_policy_agreement: boolean
      x_restrict: number
    }
  }
  export type User = {
    access_token: string
    refresh_token: string
  }
}
