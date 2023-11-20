import { NavigationContainer } from '@react-navigation/native'
import AppStackRouter from '@/routers/AppStackRouter'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'react-native'

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
          <AppStackRouter />
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
export default App
