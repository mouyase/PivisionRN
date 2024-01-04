import CryptoJS from 'crypto-js'
import qs from 'qs'
import dayjs from 'dayjs'
import Pixiv from '@/values/Pixiv'

type AuthResponseType = {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
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

const getTimeAndHash = () => {
  const time = dayjs().format()
  const hash = CryptoJS.MD5(time + Pixiv.SALT).toString()
  return { time, hash }
}

const generateCodeVerifier = () => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let codeVerifier = ''
  let codeChallenge = ''
  for (let i = 0; i < 128; i++) {
    codeVerifier += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  codeChallenge = CryptoJS.SHA256(codeVerifier)
    .toString(CryptoJS.enc.Base64)
    .replace(/[=]/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return { code_verifier: codeVerifier, code_challenge: codeChallenge }
}

const getHeader = () => {
  const { time, hash } = getTimeAndHash()
  return {
    'user-agent': Pixiv.USER_AGENT,
    'accept-language': 'zh_CN',
    'app-accept-language': 'zh-hans',
    'app-os': 'android',
    'app-os-version': '12',
    'app-version': Pixiv.APP_VERSION,
    'content-type': 'application/x-www-form-urlencoded',
    'x-client-time': time,
    'x-client-hash': hash,
  }
}

const auth = async (
  code_verifier: string,
  code: string,
): Promise<AuthResponseType> => {
  return fetch(Pixiv.AUTH_TOKEN_URL, {
    method: 'POST',
    headers: getHeader(),
    body: qs.stringify({
      grant_type: 'authorization_code',
      code_verifier,
      code,
      redirect_uri: Pixiv.REDIRECT_URI,
      client_id: Pixiv.CLIENT_ID,
      client_secret: Pixiv.CLIENT_SECRET,
      include_policy: 'true',
    }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      return Promise.reject(response.status)
    }
  })
}

const refresh = async (refresh_token: string): Promise<AuthResponseType> => {
  return fetch(Pixiv.AUTH_TOKEN_URL, {
    method: 'POST',
    headers: getHeader(),
    body: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token,
      redirect_uri: Pixiv.REDIRECT_URI,
      client_id: Pixiv.CLIENT_ID,
      client_secret: Pixiv.CLIENT_SECRET,
      include_policy: 'true',
    }),
  }).then((response) => response.json())
}

const getImageUrl = () => {}

const PixivUtils = {
  auth,
  refresh,
  generateCodeVerifier,
  getHeader,
  getImageUrl,
}
export default PixivUtils
