import { StackActions, useNavigation } from '@react-navigation/native'
import { Button, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { AnimatedImage } from '../../../components/AnimatedViews'

export const ImagePage = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ImagePage</Text>
      <Button
        title='回'
        onPress={() => {
          navigation.dispatch(StackActions.popTo('HomePage'))
          console.log('回')
        }}
      />
      <AnimatedImage
        source={'https://pixiv.nl/129653063.jpg'}
        style={{ width: 300, height: 300 }}
        sharedTransitionTag='image'
      />
    </View>
  )
}
