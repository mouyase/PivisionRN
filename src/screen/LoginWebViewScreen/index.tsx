import { Button, Linking, View } from 'react-native'
import { error, info, log } from '@/utils/LogUtils'
import { useRoute } from '@react-navigation/native'
import { auth, generateCodeVerifier, getHeader } from '@/utils/PixivUtils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useAppActiveEffect from '@/hooks/useAppActiveEffect'
import {
  AUTH_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  LOGIN_URL,
} from '@/values/Pixiv'
import React, { Component } from 'react'
import WebView from 'react-native-webview'

const LoginWebViewScreen = () => {
  const CodeData = useMemo(() => {
    return generateCodeVerifier()
  }, [])
  const Url = useMemo(() => {
    return `https://app-api.pixiv.net/web/v1/login?code_challenge=${CodeData.code_challenge}&code_challenge_method=S256&client=pixiv-android`
  }, [CodeData.code_challenge])
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
    // const url = `https://app-api.pixiv.net/web/v1/login?code_challenge=${codeChallenge}&code_challenge_method=S256&client=pixiv-android`
    // log(url)
    // Linking.canOpenURL(url).then(() => {
    //     Linking.openURL(url)
    // })
    // const config: AuthConfiguration = {
    //     redirectUrl: 'pixiv://account/login',
    //     clientId: '0303f987f663334b0e62',
    //     clientSecret: 'b3cb3da010447c5041165d7fe53c5e41b1c6a4d2',
    //     scopes: ['identity'],
    //     additionalHeaders: { Accept: 'application/json' },
    //     serviceConfiguration: {
    //         authorizationEndpoint:
    //             'https://github.com/login/oauth/authorize',
    //         tokenEndpoint: 'https://github.com/login/oauth/access_token',
    //         revocationEndpoint:
    //             'https://github.com/settings/connections/applications/0303f987f663334b0e62',
    //     },
    // }
    // const config: AuthConfiguration = {
    //     clientAuthMethod: 'post',
    //     redirectUrl: 'pixiv://account/login',
    //     clientId: CLIENT_ID,
    //     clientSecret: CLIENT_SECRET,
    //     scopes: [],
    //     additionalParameters: { client: 'pixiv-android' },
    //     // customHeaders: { token: getHeader() },
    //     serviceConfiguration: {
    //         authorizationEndpoint: LOGIN_URL,
    //         tokenEndpoint: AUTH_TOKEN_URL,
    //     },
    //     // skipCodeExchange: true,
    //     // androidAllowCustomBrowsers: ['chrome'],
    // }
    // authorize(config)
    //     .then(value => {
    //         info(value)
    //     })
    //     .catch(reason => {
    //         error(reason)
    //     })
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <WebView source={{ uri: Url }} style={{ marginTop: 20 }} />
    </View>
  )
}
export default LoginWebViewScreen
