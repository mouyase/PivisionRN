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

const Stack = createNativeStackNavigator()

export const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={'LoginPage'}>
        <Stack.Screen name='LoginPage' component={LoginPage} />
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name='WorksPage' component={WorksPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
