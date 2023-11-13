import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@/screens/LoginScreen'
import HomeScreen from '@/screens/HomeScreen'
import LoginWebViewScreen from '@/screens/LoginWebViewScreen'
import Splash from '@/screens/Splash'

const Stack = createNativeStackNavigator()

const AppStackRouter = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name='Splash'
        component={Splash}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='LoginWebView' component={LoginWebViewScreen} />
    </Stack.Navigator>
  )
}
export default AppStackRouter
