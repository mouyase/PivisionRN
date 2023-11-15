import { NavigationContainer } from '@react-navigation/native'
import AppStackRouter from '@/routers/AppStackRouter'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, View } from 'react-native'
import { PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider>
          <AppStackRouter />
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
export default App
