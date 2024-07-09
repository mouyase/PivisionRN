/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 App导航
 */
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from '@/pages/home'
import { StatusBar } from 'react-native'
import { WorksPage } from '@/pages/works'

const Stack = createNativeStackNavigator()

export const AppRouter = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={'HomePage'}>
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name='WorksPage' component={WorksPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
