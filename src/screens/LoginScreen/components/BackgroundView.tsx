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

const BackgroundView = () => {
  const [imageUrlList, setImageUrlList] = useState<string[][]>(
    new Array(10).fill(new Array(10)),
  )

  useEffect(() => {
    api
      .getWalkthrough()
      .then((value) => {
        const array = value.illusts.map((item) => item.image_urls.square_medium)
        let index = 0
        let newArray = []
        while (index < array.length) {
          newArray.push(array.slice(index, (index += 10)))
        }
        setImageUrlList(newArray)
        console.log('加载到数据')
      })
      .catch((reason) => {
        console.error(reason)
      })
  }, [])

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
  const fade = useRef(new Animated.Value(0)).current

  const onLoad = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      delay: 10,
      useNativeDriver: true,
    }).start()
  }
  return (
    <View style={{ width: screenWidth / 2, height: screenWidth / 2 }}>
      {url && (
        <Animated.View style={{ opacity: fade, flex: 1 }}>
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
        </Animated.View>
      )}
    </View>
  )
}
export default BackgroundView
