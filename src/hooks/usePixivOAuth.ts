/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 Pixiv登陆模块
 */

import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { CodeChallengeMethod, useAuthRequest } from 'expo-auth-session'
import { Pixiv } from '@/values/Pixiv.ts'
import { useCallback } from 'react'

WebBrowser.maybeCompleteAuthSession()

export const usePixivOAuth = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Pixiv.CLIENT_ID,
      clientSecret: Pixiv.CLIENT_SECRET,
      redirectUri: redirectUrl,
      codeChallenge: getCodeVerifier(),
      codeChallengeMethod: CodeChallengeMethod.S256,
      extraParams: { client: 'pixiv-android' },
    },
    {
      authorizationEndpoint: Pixiv.LOGIN_URL,
    },
  )

  return useCallback(async () => {
    promptAsync().then((value) => {
      if (value.type === 'success' || value.type === 'error') {
        const code = value.params.code
        console.log(code)
      }
    })
  }, [promptAsync])
}

const getCodeVerifier = () => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let codeVerifier = ''
  for (let i = 0; i < 128; i++) {
    codeVerifier += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return codeVerifier
}

const redirectUrl = Linking.createURL('account/login', {
  scheme: 'pixiv',
})
