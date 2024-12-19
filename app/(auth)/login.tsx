import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function LoginPage() {
  const handleLogin = () => {
    // TODO: 实现登录逻辑
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录到 Pixiv</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
  },
})
