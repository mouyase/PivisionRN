import { ColorValue, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Pixiv from '@/values/Pixiv'
import ListUtils from '@/utils/ListUtils'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ABSOLUTE, BGC } from '@/utils/CommonStyles'
import { memo } from 'react'

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

const ListItemFastImageView = ({
  item,
  numColumns,
}: {
  item: Illust
  numColumns: number
}) => {
  const url = item.image_urls.medium

  const { width, height } = ListUtils.getListItemWH({
    width: item.width,
    height: item.height,
    numColumns,
  })

  const fade = useSharedValue(1)

  const onLoadStart = () => {
    if (!Model.isLoadFinishMap.get(url)) {
      fade.value = 1
    }
  }

  const onLoad = () => {
    Model.isLoadFinishMap.set(url, true)
    fade.value = withTiming(0, { duration: 300 })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: fade.value }
  })

  return (
    <View style={{ width, height }}>
      <FastImage
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        style={{ flex: 1 }}
        source={{
          uri: url,
          headers: { Referer: Pixiv.REFERER },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <Animated.View style={[animatedStyle, ABSOLUTE, BGC(getRandomColor())]} />
    </View>
  )
}
export default memo(ListItemFastImageView)

class ModelClass {
  private constructor() {}

  private static _instance: ModelClass = new ModelClass()
  static get instance(): ModelClass {
    return this._instance
  }
  private _isLoadFinishMap = new Map<string, boolean>()

  get isLoadFinishMap(): Map<string, boolean> {
    return this._isLoadFinishMap
  }
}
const Model = ModelClass.instance
