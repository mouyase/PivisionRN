import { StackActions, useNavigation } from '@react-navigation/native'
import { Button, Text, View } from 'react-native'
import { AnimatedImage } from '../../../components/AnimatedViews'

export const HomePage = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomePage</Text>
      <Button
        title='去'
        onPress={() => {
          navigation.dispatch(StackActions.push('ImagePage'))
          console.log('去')
        }}
      />
      <AnimatedImage
        source={'https://pixiv.nl/129723130.jpg'}
        style={{ width: 100, height: 100 }}
        sharedTransitionTag='image'
      />
    </View>
  )
}
