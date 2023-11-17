import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { TextComponent, ToastAndroid, View } from 'react-native'
import Account from '@/utils/Account'
import BackgroundView from '@/screens/LoginScreen/components/BackgroundView'
import { ActivityIndicator, Button, Dialog, Portal } from 'react-native-paper'
import { Text } from 'react-native-paper'

const LoginScreen = ({ route, navigation }: NativeStackScreenProps<any>) => {
  const [isLoading, setIsLoading] = useState(false)

  const onBack = useCallback(
    (code: string) => {
      setIsLoading(true)
      Account.doAuth(code)
        .then(value => {
          ToastAndroid.show('登陆成功 ' + value.user.name, ToastAndroid.LONG)
          setIsLoading(false)
          navigation.navigate('Home')
        })
        .catch(reason => {
          console.log(reason)
        })
    },
    [navigation],
  )

  const login = useCallback(async () => {
    const url = Account.createLoginUrl()
    navigation.navigate('LoginWebView', {
      url,
      onBack,
    })
  }, [navigation, onBack])

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <BackgroundView />
        <Portal>
          <Dialog visible={isLoading} dismissable={false}>
            <Dialog.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} style={{ marginRight: 16 }} />
                <Text variant={'bodyLarge'}>Loading</Text>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
        <Button mode='contained' onPress={login}>
          Login
        </Button>
      </View>
    </>
  )
}
export default LoginScreen
