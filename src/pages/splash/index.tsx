/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 主页
 */
import { Pressable, View } from 'react-native'
import { BGC, CENTER, F, WH } from '@/common/CommonStyles.ts'
import { usePixivOAuth } from '@/hooks/usePixivOAuth.ts'
import { useCallback, useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { useNavigation } from '@react-navigation/native'

export const SplashPage = () => {
  const navigation = useNavigation<any>()

  useEffect(() => {
    setTimeout(function () {
      navigation.navigate('LoginPage')
      NavigationBar.setPositionAsync('relative').then()
      NavigationBar.setVisibilityAsync('visible').then()
    }, 3000)
  }, [navigation])

  useEffect(() => {
    NavigationBar.setPositionAsync('absolute').then()
    NavigationBar.setVisibilityAsync('hidden').then()
  }, [])

  return <View style={[F, BGC('#0096fa')]} />
}
