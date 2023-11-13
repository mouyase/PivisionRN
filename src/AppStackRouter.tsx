import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@/screen/LoginScreen'
import HomeScreen from '@/screen/HomeScreen'
import LoginWebViewScreen from '@/screen/LoginWebViewScreen'

const Stack = createNativeStackNavigator()

const AppStackRouter = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='LoginWebView' component={LoginWebViewScreen} />
    </Stack.Navigator>
  )
}
export default AppStackRouter
