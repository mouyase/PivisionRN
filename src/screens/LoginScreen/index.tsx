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
    navigation.navigate('LoginWebView')
    const url = `https://app-api.pixiv.net/web/v1/login?code_challenge=${codeChallenge}&code_challenge_method=S256&client=pixiv-android`
    console.log(url)
  }, [codeChallenge, navigation])
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title='Login' onPress={login} />
    </View>
  )
}
export default LoginScreen
