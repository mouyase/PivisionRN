import { StatusBar, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation = useNavigation()
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#0096fa' }} />
    </>
  )
}
export default Splash
