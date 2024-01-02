import {
  FlatList,
  ListRenderItem,
  useWindowDimensions,
  View,
} from 'react-native'
import { memo, useCallback, useEffect, useState } from 'react'
import api from '@/api'
import AnimatedFastImage from '@/components/AnimatedFastImage'
import { useRequest } from 'ahooks'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { ABSOLUTE, BGC, ROW, WH } from '@/utils/CommonStyles'

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
    },
    onError: (e) => {
      console.error(e)
    },
  })

  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const translate = useSharedValue({ x: 0, y: 0 })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translate.value.x },
        { translateY: translate.value.y },
      ],
    }
  })

  const doTranslate = useCallback(() => {
    translate.value = withRepeat(
      withTiming(
        { x: -screenWidth * 4, y: -screenWidth * 4 + screenHeight },
        { duration: 1000 * 60 * 2, easing: Easing.linear },
      ),
      -1,
      true,
    )
  }, [screenHeight, screenWidth, translate])

  useEffect(() => {
    doTranslate()
  }, [doTranslate])

  const renderItem: ListRenderItem<string> = ({ item }) => {
    return <ListItem url={item} />
  }
  return (
    <>
      <Animated.View
        style={[ABSOLUTE, ROW, WH(screenWidth * 5), animatedStyle]}>
        {imageUrlList.map((item, index) => (
          <View
            style={{
              width: screenWidth / 2,
              height: screenWidth * 5,
            }}
            key={index}>
            <FlatList
              scrollEnabled={false}
              data={item}
              style={{ flex: 1 }}
              renderItem={renderItem}
            />
          </View>
        ))}
      </Animated.View>
      <View
        style={[
          ABSOLUTE,
          BGC('#000'),
          {
            opacity: 0.6,
          },
        ]}
      />
    </>
  )
}
const ListItem = memo(({ url }: { url: string }) => {
  const { width: screenWidth } = useWindowDimensions()
  return <AnimatedFastImage style={[WH(screenWidth * 5)]} url={url} />
})
export default BackgroundView
