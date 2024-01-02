import {
  Dimensions,
  Easing,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
} from 'react-native'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import api from '@/api'
import AnimatedFastImage from '@/components/AnimatedFastImage'
import { useRequest } from 'ahooks'
import { ABSOLUTE, BGC, F, H, OPT, ROW, W, WH } from '@/utils/CommonStyles'
import Animated, {
  ReduceMotion,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { Text } from 'react-native-paper'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const BackgroundView = () => {
  const [imageUrlList, setImageUrlList] = useState<string[][]>(
    new Array(10).fill(new Array(10)),
  )

  useRequest(() => api.getWalkthrough(), {
    onSuccess: (data) => {
      const array = data.illusts.map((item) => item.image_urls.square_medium)
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += 10)))
      }
      setImageUrlList(newArray)
      console.log('加载到数据')
    },
    onError: (e) => {
      console.error(e)
    },
  })

  const translate = useSharedValue({ x: 0, y: 0 })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translate.value.x },
        { translateY: translate.value.y },
      ],
    }
  })

  useEffect(() => {
    const x = -screenWidth * 4
    const y = x + screenHeight
    const duration = 60000
    translate.value = withRepeat(withTiming({ x, y }, { duration }), -1, true)
  }, [translate])

  return (
    <>
      <Animated.View
        style={[ABSOLUTE, WH(screenWidth * 5), ROW, animatedStyle]}>
        {imageUrlList.map((item, index) => (
          <View style={[W(screenWidth / 2), H(screenWidth * 5)]} key={index}>
            <FlatList
              scrollEnabled={false}
              data={item}
              style={[F]}
              renderItem={renderItem}
            />
          </View>
        ))}
      </Animated.View>
      <View style={[ABSOLUTE, BGC('#000'), OPT(0.6)]} />
    </>
  )
}

const renderItem: ListRenderItem<string> = ({ item }) => {
  return <AnimatedFastImage style={[WH(screenWidth / 2)]} url={item} />
}
export default BackgroundView
