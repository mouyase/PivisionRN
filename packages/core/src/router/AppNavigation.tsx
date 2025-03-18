import { NavigationContainer } from '@react-navigation/native'
import { AppRouter } from './AppRouter'

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  )
}
