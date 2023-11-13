import { AppRegistry, Button, Linking, View } from 'react-native'
import { error, info, log } from '@/utils/LogUtils'
import { useNavigation, useRoute } from '@react-navigation/native'
import { auth, generateCodeVerifier, getHeader } from '@/utils/PixivUtils'
import { useCallback, useEffect, useState } from 'react'
import useAppActiveEffect from '@/hooks/useAppActiveEffect'
import {
  AUTH_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  LOGIN_URL,
  REDIRECT_URI,
} from '@/values/Pixiv'
import React, { Component } from 'react'
import WebView from 'react-native-webview'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import {
  AuthConfiguration,
  authorize,
  register,
  RegistrationConfiguration,
} from 'react-native-app-auth'
import registerConfig = AppRegistry.registerConfig
import { AppConfig } from 'react-native/Libraries/ReactNative/AppRegistry'

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [codeVerifier, setCodeVerifier] = useState('')
  const [codeChallenge, setCodeChallenge] = useState('')
  useEffect(() => {
    let { code_verifier, code_challenge } = generateCodeVerifier()
    setCodeVerifier(code_verifier)
    setCodeChallenge(code_challenge)
  }, [])
  // const state = useNavigationState(state => state)
  // const route = useRoute()
  // useAppActiveEffect(() => {
  //     log('获得焦点', route)
  //     if (route?.params) {
  //         // @ts-ignore
  //         let { code } = route.params
  //         log('获得焦点', route.params)
  //         if (code) {
  //             info(code)
  //             // auth(codeVerifier, code).then(json => {
  //             //     info(json)
  //             // })
  //         }
  //     }
  // })

  // useFocusEffect(() => {
  //     log('获得焦点', route)
  //     if (route?.params) {
  //         let { code } = route.params
  //         log('获得焦点', route.params)
  //         if (code) {
  //             info(code)
  //             auth(codeVerifier, code).then(json => {
  //                 info(json)
  //             })
  //         }
  //     }
  // })
  const login = useCallback(async () => {
    // navigation.navigate('LoginWebView')
    // const url = `https://app-api.pixiv.net/web/v1/login?code_challenge=${codeChallenge}&code_challenge_method=S256&client=pixiv-android`
    // log(url)
    // Linking.canOpenURL(url).then(() => {
    //     Linking.openURL(url)
    // })
    // const config: AuthConfiguration = {
    //   redirectUrl: 'pixiv://account/login',
    //   clientId: '0303f987f663334b0e62',
    //   clientSecret: 'b3cb3da010447c5041165d7fe53c5e41b1c6a4d2',
    //   scopes: ['identity'],
    //   additionalHeaders: { Accept: 'application/json' },
    //   serviceConfiguration: {
    //     authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    //     tokenEndpoint: 'https://github.com/login/oauth/access_token',
    //     revocationEndpoint:
    //       'https://github.com/settings/connections/applications/0303f987f663334b0e62',
    //   },
    // }
    // const config: AuthConfiguration = {
    //   clientAuthMethod: 'post',
    //   redirectUrl: REDIRECT_URI,
    //   clientId: CLIENT_ID,
    //   clientSecret: CLIENT_SECRET,
    //   scopes: [],
    //   additionalParameters: {
    //     client: 'pixiv-android',
    //   },
    //   customHeaders: { token: getHeader(), authorize: getHeader() },
    //   serviceConfiguration: {
    //     authorizationEndpoint: LOGIN_URL,
    //     tokenEndpoint: AUTH_TOKEN_URL,
    //   },
    //   // skipCodeExchange: true,
    //   // androidAllowCustomBrowsers: ['chrome'],
    //   useNonce: false,
    // }
    const config: RegistrationConfiguration = {
      redirectUrls: [REDIRECT_URI],
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scopes: [],
      additionalParameters: {
        client: 'pixiv-android',
      },
      customHeaders: { token: getHeader(), authorize: getHeader() },
      serviceConfiguration: {
        authorizationEndpoint: LOGIN_URL,
        tokenEndpoint: AUTH_TOKEN_URL,
      },
      // skipCodeExchange: true,
      // androidAllowCustomBrowsers: ['chrome'],
      useNonce: false,
    }
    register(config)
      .then(value => {
        info(value)
      })
      .catch(reason => {
        error(reason)
      })
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title='Login' onPress={login} />
    </View>
  )
}
export default LoginScreen
