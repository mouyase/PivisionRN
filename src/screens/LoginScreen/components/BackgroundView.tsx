import {
  Animated,
  Easing,
  FlatList,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import api from '@/api'
import Pixiv from '@/values/Pixiv'
import AnimatedFastImage from '@/components/AnimatedFastImage'
import { useRequest } from 'ahooks'

const BackgroundView = () => {
  const [imageUrlList, setImageUrlList] = useState<string[][]>(
    new Array(10).fill(new Array(10)),
  )

  useRequest(() => api.getWalkthrough(), {
    onSuccess: (data, params) => {
      const array = data.illusts.map((item) => item.image_urls.square_medium)
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += 10)))
      }
      setImageUrlList(newArray)
      console.log('加载到数据')
    },
    onError: (e, params) => {
      console.error(e)
    },
  })

  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

  const doTranslate = useCallback(() => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(translate, {
          toValue: {
            x: -screenWidth * 4,
            y: -screenWidth * 4 + screenHeight,
          },
          duration: 1000 * 60 * 2,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translate, {
          toValue: { x: 0, y: 0 },
          duration: 1000 * 60 * 2,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    )
  }, [screenHeight, screenWidth, translate])

  useEffect(() => {
    doTranslate().start()
  }, [doTranslate])
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return <ListItem url={item} />
  }
  return (
    <>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: screenWidth * 5,
          height: screenWidth * 5,
          flexDirection: 'row',
          transform: [{ translateX: translate.x }, { translateY: translate.y }],
        }}>
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
