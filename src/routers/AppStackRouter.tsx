import LoginScreen from '@/screens/LoginScreen'
import HomeScreen from '@/screens/HomeScreen'
import LoginWebViewScreen from '@/screens/LoginWebViewScreen'
import Splash from 'src/screens/SplashScreen'
import { StatusBar } from 'react-native'
import IllustDetailScreen from '@/screens/IllustDetailScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const AppStackRouter = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
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
          }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='IllustDetail'
          component={IllustDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='LoginWebView' component={LoginWebViewScreen} />
      </Stack.Navigator>
    </>
  )
}
export default AppStackRouter
