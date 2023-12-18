import { View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import Pixiv from '@/values/Pixiv'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type AnimatedFastImageProps = {
  url?: string
} & ViewProps

const AnimatedFastImage = (props: AnimatedFastImageProps) => {
  const { url } = props
  const fade = useSharedValue(0)

  const onLoad = () => {
    fade.value = withTiming(1, { duration: 300 })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    }
  })
  return (
    <View {...props}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        {url && (
          <FastImage
            onLoad={onLoad}
            style={{
              flex: 1,
            }}
            source={{
              uri: url,
              headers: { Referer: Pixiv.REFERER },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            key={url}
          />
        )}
      </Animated.View>
    </View>
  )
}
export default AnimatedFastImage
