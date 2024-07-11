/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 主页
 */
import { Pressable, View } from 'react-native'
import { BGC, CENTER, F, WH } from '@/common/CommonStyles.ts'
import { usePixivOAuth } from '@/hooks/usePixivOAuth.ts'
import { useCallback } from 'react'
import { Pixiv } from '@/values/Pixiv.ts'

export const LoginPage = () => {
  const OAuth = usePixivOAuth()

  const onLoginPress = useCallback(() => {
    // OAuth().then()
    // console.log(Device)
    console.log(Pixiv)
  }, [])

  return (
    <View style={[F, CENTER]}>
      <Pressable onPress={onLoginPress}>
        <View style={[WH(100), BGC('red')]} />
      </Pressable>
    </View>
  )
}
