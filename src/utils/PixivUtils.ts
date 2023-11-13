import moment from 'moment'
import CryptoJS from 'crypto-js'
import qs from 'qs'
import { SALT, USER_AGENT } from '@/values/Pixiv'

export const getTimeAndHash = () => {
  const time = moment(new Date()).format()
  const hash = CryptoJS.MD5(time + SALT).toString()
  return { time, hash }
}

export const generateCodeVerifier = () => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let code_verifier = ''
  let code_challenge = ''
  for (let i = 0; i < 128; i++) {
    code_verifier += possible.charAt(
      Math.floor(Math.random() * possible.length),
    )
  }
  code_challenge = CryptoJS.SHA256(code_verifier)
    .toString(CryptoJS.enc.Base64)
    .replace(/[=]/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return { code_verifier, code_challenge }
}

export const getHeader = () => {
  const { time, hash } = getTimeAndHash()
  return {
    'user-agent': USER_AGENT,
    'accept-language': 'zh_CN',
    'app-accept-language': 'zh-hans',
    'app-os': 'android',
    'app-os-version': '12',
    'app-version': '6.5.0',
    'content-type': 'application/x-www-form-urlencoded',
    'x-client-time': time,
    'x-client-hash': hash,
  }
}

export const auth = async (code_verifier: string, code: string) => {
  let { time, hash } = getTimeAndHash()
  return fetch('https://oauth.secure.pixiv.net/auth/token', {
    method: 'POST',
    headers: {
      'user-agent': USER_AGENT,
      'accept-language': 'zh_CN',
      'app-accept-language': 'zh-hans',
      'app-os': 'android',
      'app-os-version': '12',
      'app-version': '6.5.0',
      'content-type': 'application/x-www-form-urlencoded',
      'x-client-time': time,
      'x-client-hash': hash,
    },
    body: qs.stringify({
      code_verifier: code_verifier,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri:
        'https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback',
      client_id: 'MOBrBDS8blbauoSck0ZfDbtuzpyT',
      client_secret: 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj',
      include_policy: 'true',
    }),
  }).then(response => response.json())
}

export const refresh = async (refresh_token: string) => {
  let { time, hash } = getTimeAndHash()
  return fetch('https://oauth.secure.pixiv.net/auth/token', {
    method: 'POST',
    headers: {
      'user-agent': 'PixivAndroidApp/6.5.0 (Android 10; Xiaomi Mi 10)',
      'accept-language': 'zh_CN',
      'app-accept-language': 'zh-hans',
      'app-os': 'android',
      'app-os-version': '12',
      'app-version': '6.5.0',
      'content-type': 'application/x-www-form-urlencoded',
      'x-client-time': time,
      'x-client-hash': hash,
    },
    body: qs.stringify({
      refresh_token: refresh_token,
      grant_type: 'refresh_token',
      redirect_uri:
        'https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback',
      client_id: 'MOBrBDS8blbauoSck0ZfDbtuzpyT',
      client_secret: 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj',
      include_policy: 'true',
    }),
  }).then(response => response.json())
}
