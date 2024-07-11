/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 Pixiv相关信息
 */
import { Device } from '@/values/Device.ts'

const CLIENT_VERSION = '6.114.1'

export const Pixiv = {
  CLIENT_VERSION,
  USER_AGENT: `PixivAndroidApp/${CLIENT_VERSION} (${Device.OS} ${Device.API_LEVEL}; ${Device.BRAND} ${Device.MODEL})`,
  LOGIN_URL: 'https://app-api.pixiv.net/web/v1/login',
  AUTH_TOKEN_URL: 'https://oauth.secure.pixiv.net/auth/token',
  REDIRECT_URI: 'https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback',
  API_BASE_URI: 'https://app-api.pixiv.net',
  OAUTH_BASE_URI: 'https://oauth.secure.pixiv.net',
  CLIENT_ID: 'MOBrBDS8blbauoSck0ZfDbtuzpyT',
  CLIENT_SECRET: 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj',
  SALT: '28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c',
}
