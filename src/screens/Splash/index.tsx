import { Animated, StatusBar, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTimeout } from 'ahooks'

const Splash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  useTimeout(() => {
    navigation.navigate('Login')
  }, 1000)

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#0096fa' }} />
    </>
  )
}
export default Splash
