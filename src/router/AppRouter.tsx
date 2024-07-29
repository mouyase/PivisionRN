/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 App导航
 */
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from '@/pages/home'
import { WorksPage } from '@/pages/works'
import { LoginPage } from '@/pages/login'
import { SplashPage } from '@/pages/splash'
import * as Linking from 'expo-linking'

const Stack = createNativeStackNavigator()

const prefix = Linking.createURL('account/login', {
  scheme: 'pixiv',
})

export const AppRouter = () => {
  const linking = {
    prefixes: [prefix],
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={'SplashPage'}>
        <Stack.Screen name='SplashPage' component={SplashPage} />
        <Stack.Screen name='LoginPage' component={LoginPage} />
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name='WorksPage' component={WorksPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
