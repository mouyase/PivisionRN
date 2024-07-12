/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 Pixiv登陆模块
 */

import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useCallback, useEffect } from 'react'
import { Account } from '@/api/account.ts'
import { Pixiv } from '@/values/Pixiv.ts'
import { useAuthRequest } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

WebBrowser.maybeCompleteAuthSession()

export const usePixivOAuth = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync().then((value) => {
      console.log('浏览器预加载完成', value.servicePackage)
    })
    return () => {
      WebBrowser.coolDownAsync().then((value) => {
        console.log('浏览器已卸载', value.servicePackage)
      })
    }
  }, [])

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Pixiv.CLIENT_ID,
      clientSecret: Pixiv.CLIENT_SECRET,
      redirectUri: Linking.createURL('account/login', {
        scheme: 'pixiv',
      }),
      extraParams: { client: 'pixiv-android' },
    },
    {
      authorizationEndpoint: Pixiv.LOGIN_URL,
    },
  )
  return useCallback(async () => {
    if (request) {
      const result = await promptAsync()
      if (result.type === 'success' || result.type === 'error') {
        const code = result.params.code
        const account = await Account.auth({
          code,
          code_verifier: request.codeVerifier!,
        })
        await SecureStore.setItemAsync('access_token', account.access_token)
        await SecureStore.setItemAsync('refresh_token', account.refresh_token)
        return Promise.resolve(account)
      }
    }
    return Promise.reject()
  }, [promptAsync, request])
}
