import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@/screens/LoginScreen'
import HomeScreen from '@/screens/HomeScreen'
import LoginWebViewScreen from '@/screens/LoginWebViewScreen'
import Splash from '@/screens/Splash'
import { StatusBar } from 'react-native'

const Stack = createNativeStackNavigator()

const AppStackRouter = () => {
  return (
    <>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerShown: false,
            // headerTransparent: true,
          }}
        />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='LoginWebView' component={LoginWebViewScreen} />
      </Stack.Navigator>
    </>
  )
}
export default AppStackRouter
