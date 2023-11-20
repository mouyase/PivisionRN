import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Account from '@/utils/Account'
import { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types'

const checkLogin = async () => {
  try {
    const tokens = await Account.getToken()
    await Account.doAuthWithToken(tokens.refresh_token)
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

const Splash = ({ route, navigation }: NativeStackScreenProps<any>) => {
  useEffect(() => {
    checkLogin()
      .then(() => {
        navigation.navigate('Home')
      })
      .catch(() => {
        navigation.navigate('Login')
      })
  }, [navigation])

  return <View style={{ flex: 1, backgroundColor: '#0096fa' }} />
}
export default Splash
