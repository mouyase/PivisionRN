import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { Button, ToastAndroid, View } from 'react-native'
import Account from '@/utils/Account'
import BackgroundView from '@/screens/LoginScreen/components/BackgroundView'

const LoginScreen = ({ route, navigation }: NativeStackScreenProps<any>) => {
  const onBack = (code: string) => {
    Account.doAuth(code)
      .then(value => {
        console.log(value.user.name)
        ToastAndroid.show('登陆成功 ' + value.user.name, ToastAndroid.LONG)
      })
      .catch(reason => {
        console.log(reason)
      })
  }

  const login = useCallback(async () => {
    const url = Account.createLoginUrl()
    navigation.navigate('LoginWebView', {
      url,
      onBack,
    })
  }, [navigation])

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <BackgroundView />
        <Button title='Login' onPress={login} />
      </View>
    </>
  )
}
export default LoginScreen
