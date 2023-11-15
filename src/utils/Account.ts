import PixivUtils from '@/utils/PixivUtils'

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
    return await PixivUtils.auth(code_verifier, code)
  }
  return { createLoginUrl, doAuth }
}

const { createLoginUrl, doAuth } = AccountUtil()

const Account = {
  createLoginUrl,
  doAuth,
}
export default Account
