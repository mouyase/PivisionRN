import { NavigationContainer } from '@react-navigation/native'
import AppStackRouter from '@/AppStackRouter'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

const App = () => {
  // const linking = {
  //     prefixes: ['pixiv://'],
  //     config: {
  //         screens: {
  //             Login: 'account/login',
  //             Home: 'home',
  //         },
  //     },
  // }
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <AppStackRouter />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
