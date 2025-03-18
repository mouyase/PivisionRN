import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Welcome } from '../screen/Welcome'

const Stack = createNativeStackNavigator()

export const AppRouter = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name='Welcome' component={Welcome} />
    </Stack.Navigator>
  )
}
