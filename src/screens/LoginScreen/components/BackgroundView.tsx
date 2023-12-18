import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { FC, useCallback, useEffect, useState } from 'react'
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
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: screenWidth * 5,
            height: screenWidth * 5,
            flexDirection: 'row',
          },
          animatedStyle,
        ]}>
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
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: 0.5,
          backgroundColor: 'black',
          width: screenWidth,
          height: screenHeight,
        }}
      />
    </>
  )
}
const ListItem: FC<{ url: string }> = ({ url }) => {
  const { width: screenWidth } = useWindowDimensions()

  return (
    <AnimatedFastImage
      style={{ width: screenWidth / 2, height: screenWidth / 2 }}
      url={url}
    />
  )
}
export default BackgroundView
