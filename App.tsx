import { StatusBar } from 'expo-status-bar'
import { getApiKey } from 'modules/expo-native-configuration'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>API key: {getApiKey()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
