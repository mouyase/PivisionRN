import { AppRouter } from '@/router/AppRouter'
import { NavigationContainer } from '@react-navigation/native'

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  )
}
