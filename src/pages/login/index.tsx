/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 主页
 */
import { Pressable, View } from 'react-native'
import { BGC, CENTER, F, WH } from '@/common/CommonStyles.ts'
import { useCallback, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { CodeChallengeMethod, useAuthRequest } from 'expo-auth-session'
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession()

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

export const LoginPage = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'MOBrBDS8blbauoSck0ZfDbtuzpyT',
      clientSecret: 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj',
      redirectUri: redirectUrl,
      codeChallenge: getCodeVerifier(),
      codeChallengeMethod: CodeChallengeMethod.S256,
      extraParams: { client: 'pixiv-android' },
    },
    {
      authorizationEndpoint: 'https://app-api.pixiv.net/web/v1/login',
      tokenEndpoint: 'https://oauth.secure.pixiv.net/auth/token',
    },
  )

  // useEffect(() => {
  //   console.log(request)
  // }, [request])

  useEffect(() => {
    console.log('???', response)
    // if (response?.type === 'success') {
    //   const { code } = response.params
    //   console.log('???', response)
    // }
  }, [response])

  const onPress = useCallback(() => {
    if (!request) {
      return
    }
    console.log(request)
    promptAsync()
      .then((value) => {
        console.log('你好', value)
      })
      .catch((reason) => {
        console.log(reason)
      })
  }, [promptAsync, request])

  return (
    <View style={[F, CENTER]}>
      <Pressable onPress={onPress}>
        <View style={[WH(100), BGC('red')]} />
      </Pressable>
    </View>
  )
}
