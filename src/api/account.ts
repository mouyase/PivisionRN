/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 用户相关api
 */
import { Pixiv } from '@/values/Pixiv.ts'
import qs from 'qs'
import { api } from '@/network/api.ts'

const auth = async ({
  code_verifier,
  code,
}: {
  code_verifier: string
  code: string
}) => {
  const body = {
    code_verifier,
    code,
    grant_type: 'authorization_code',
    redirect_uri: Pixiv.REDIRECT_URI,
    client_id: Pixiv.CLIENT_ID,
    client_secret: Pixiv.CLIENT_SECRET,
    include_policy: true,
  }
  return await api.post('/auth/token', qs.stringify(body), {
    baseURL: Pixiv.OAUTH_BASE_URI,
  })
}

export const Account = {
  auth,
}
