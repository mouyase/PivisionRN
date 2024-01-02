import PixivUtils from '@/utils/PixivUtils'
import Fetch from '@/utils/Fetch'
import Keychain from 'react-native-keychain'

const AccountUtil = () => {
  let code_verifier = '',
    code_challenge = ''

  const createLoginUrl = () => {
    const { code_verifier: cv, code_challenge: cc } =
      PixivUtils.generateCodeVerifier()
    code_verifier = cv
    code_challenge = cc
    return `https://app-api.pixiv.net/web/v1/login?code_challenge=${code_challenge}&code_challenge_method=S256&client=pixiv-android`
  }
  const doAuth = async (code: string) => {
    return await PixivUtils.auth(code_verifier, code).then((value) => {
      setToken({ ...value })
      return value
    })
  }
  return { createLoginUrl, doAuth }
}

const doAuthWithToken = async (refresh_token: string) => {
  return await PixivUtils.refresh(refresh_token).then((value) => {
    setToken({ ...value })
    return value
  })
}

const getToken = async (): Promise<{
  access_token: string
  refresh_token: string
}> => {
  return await Keychain.getGenericPassword().then((value) => {
    if (value) {
      return JSON.parse(value.password)
    } else {
      return Promise.reject('Account.getToken.error 用户未保存凭据')
    }
  })
}

const setToken = ({
  access_token,
  refresh_token,
}: {
  access_token: string
  refresh_token: string
}) => {
  Fetch.token = access_token
  Keychain.setGenericPassword(
    'Pixiv',
    JSON.stringify({ access_token, refresh_token }),
  )
    .then((b) => {
      console.log('设置秘钥', b)
    })
    .catch((reason) => {
      console.error(reason, '设置秘钥错误')
    })
}

const { createLoginUrl, doAuth } = AccountUtil()

const Account = {
  createLoginUrl,
  doAuth,
  getToken,
  setToken,
  doAuthWithToken,
}
export default Account
