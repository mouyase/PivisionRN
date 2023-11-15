import { View } from 'react-native'
import WebView from 'react-native-webview'
import qs from 'qs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const LOGIN_URL = 'pixiv://account/login?'
const LoginWebViewScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<any>) => {
  const { url, onBack } = route.params as {
    url: string
    onBack: (code: string) => void
  }
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onLoad={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          if (nativeEvent.url.includes(LOGIN_URL)) {
            const { code } = qs.parse(nativeEvent.url.replace(LOGIN_URL, ''))
            onBack(code as string)
            navigation.goBack()
          }
        }}
      />
    </View>
  )
}
export default LoginWebViewScreen
