import { NavigationContainer } from '@react-navigation/native'
import AppStackRouter from '@/routers/AppStackRouter'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, View } from 'react-native'

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStackRouter />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
export default App
