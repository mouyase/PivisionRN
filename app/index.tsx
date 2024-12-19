import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

export default function HomePage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>主页</Text>
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity>
          <Text style={{ color: 'blue', marginTop: 20 }}>点击去登录</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}
