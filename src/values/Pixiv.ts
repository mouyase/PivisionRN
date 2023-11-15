const APP_VERSION = '6.91.0'
const USER_AGENT = `PixivAndroidApp/${APP_VERSION} (Android 14; Xiaomi Mi 14)`
const API_HOST = 'https://app-api.pixiv.net'
const REFERER = 'https://www.pixiv.net'
const SALT = '28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c'
const REDIRECT_URI =
  'https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback'
const LOGIN_URL = 'https://app-api.pixiv.net/web/v1/login'
const AUTH_TOKEN_URL = 'https://oauth.secure.pixiv.net/auth/token'
const CLIENT_ID = 'MOBrBDS8blbauoSck0ZfDbtuzpyT'
const CLIENT_SECRET = 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj'

const Pixiv = {
  API_HOST,
  USER_AGENT,
  SALT,
  REDIRECT_URI,
  LOGIN_URL,
  AUTH_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REFERER,
  APP_VERSION,
}
export default Pixiv
