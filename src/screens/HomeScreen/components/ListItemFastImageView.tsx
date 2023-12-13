import { Animated, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Pixiv from '@/values/Pixiv'
import ListUtils from '@/utils/ListUtils'
import { useRef } from 'react'

const ListItemFastImageView = ({
  item,
  numColumns,
}: {
  item: illust
  numColumns: number
}) => {
  const url = item.image_urls.medium

  const { width, height } = ListUtils.getListItemWH({
    width: item.width,
    height: item.height,
    numColumns,
  })

  const fade = useRef(new Animated.Value(1)).current

  const onLoadStart = () => {
    if (!Model.isLoadFinishMap.get(url)) {
      fade.setValue(1)
    }
  }

  const onLoad = () => {
    Model.isLoadFinishMap.set(url, true)
    Animated.timing(fade, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

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
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: '100%',
          height: '100%',
          opacity: fade,
          backgroundColor: '#eee',
        }}
      />
    </View>
  )
}
export default ListItemFastImageView

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
