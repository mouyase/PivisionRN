import { ColorValue, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Pixiv from '@/values/Pixiv'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ABSOLUTE, BGC, CIRCLE, F, H, W } from '@/utils/CommonStyles'
import { memo, useMemo } from 'react'

const AnimatedFastImage = (props: AnimatedFastImageProps) => {
  const {
    url,
    width,
    height,
    resizeMode,
    enableColorful = false,
    imageStyle,
  } = props

  const backgroundColor = enableColorful ? getRandomColor() : '#DDD'

  const fade = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: fade.value }
  })
  const onLoadStart = () => {
    fade.value = 1
  }

  const onLoad = () => {
    fade.value = withTiming(0, { duration: 300, easing: Easing.linear })
  }

  const resizeModeData = useMemo(() => {
    switch (resizeMode) {
      case 'stretch':
        return FastImage.resizeMode.stretch
      case 'center':
        return FastImage.resizeMode.center
      case 'contain':
        return FastImage.resizeMode.contain
      case 'cover':
        return FastImage.resizeMode.cover
      default:
        return FastImage.resizeMode.cover
    }
  }, [resizeMode])

  return (
    <View {...props}>
      <View style={[W(width ? width : '100%'), H(height ? height : '100%')]}>
        <FastImage
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          style={[F]}
          source={{
            uri: url,
            headers: { Referer: Pixiv.REFERER },
            priority: FastImage.priority.normal,
          }}
          resizeMode={resizeModeData}
        />
        <Animated.View
          style={[animatedStyle, ABSOLUTE, BGC(backgroundColor)]}
        />
      </View>
    </View>
  )
}
export default memo(AnimatedFastImage)

const RandomColorList: ColorValue[] = [
  '#edcace',
  '#efd2ca',
  '#eacfb2',
  '#e3e9bd',
  '#bee8ba',
  '#bce9e6',
  '#b9ceeb',
  '#bfbee8',
  '#d4c4e9',
  '#d4c4eb',
  '#e6bed9',
]

const getRandomColor = (): ColorValue => {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return RandomColorList[getRandomInt(0, RandomColorList.length)]
}
