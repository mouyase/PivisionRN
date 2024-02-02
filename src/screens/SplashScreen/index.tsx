import { Image, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import PagerView from 'react-native-pager-view'
import { useAnimatedPagerScrollHandler } from '@/components/PagerViewWithTab/hooks/useAnimatedPagerScrollHandler'
import { ABSOLUTE, BGC, CENTER, F, H, ROW, W, WH } from '@/utils/CommonStyles'
import { MasonryFlashList, MasonryListRenderItem } from '@shopify/flash-list'
import { useCallback } from 'react'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)
const AnimatedMasonryFlashList =
  Animated.createAnimatedComponent(MasonryFlashList)

const HeaderHeightMin = 64
const HeaderHeightMax = 240
const TabHeight = 48
const TopHeightMin = TabHeight + HeaderHeightMin
const TopHeightMax = TabHeight + HeaderHeightMax
const TopHeightDiff = TopHeightMax - TopHeightMin

const Splash = ({ route, navigation }: NativeStackScreenProps<any>) => {
  const index = useSharedValue(0)
  const height = useSharedValue(TopHeightMax)
  const scrollChangeValue = useSharedValue([0, 0])

  useAnimatedReaction(
    () => scrollChangeValue.value,
    ([pre, cur]) => {
      const isGoingDown = pre >= cur
      const isGoingUp = pre <= cur
      const isMaximum = height.value >= TopHeightMax
      const isMinimum = height.value <= TopHeightMin
      if (
        (isGoingDown && isMinimum) ||
        (isGoingUp && isMaximum && cur <= TopHeightDiff)
      ) {
        if (cur <= TopHeightDiff) {
          height.value =
            TopHeightMax - Math.min(TopHeightDiff, Math.max(0, cur))
        }
        return
      }
      height.value = Math.min(
        TopHeightMax,
        Math.max(TopHeightMin, height.value + (pre - cur)),
      )
    },
  )

  const pageRef = useAnimatedRef<PagerView>()
  const barLeft = useSharedValue(0)
  const pageScrollHandler = useAnimatedPagerScrollHandler({
    onPageScroll: (e) => {
      'worklet'
      barLeft.value = (e.position + e.offset) * 64
    },
  })

  return (
    <View style={[F]}>
      <AnimatedPagerView
        ref={pageRef}
        initialPage={0}
        onPageSelected={(event) => {
          index.value = event.nativeEvent.position
        }}
        onPageScroll={pageScrollHandler}
        style={[F]}>
        <Page
          id={0}
          index={index}
          scrollChangeValue={scrollChangeValue}
          topHeight={height}
          colours={['red', 'yellow']}
        />
        <Page
          id={1}
          index={index}
          scrollChangeValue={scrollChangeValue}
          topHeight={height}
          colours={['green', 'blue']}
        />
      </AnimatedPagerView>
      <Animated.View style={[ABSOLUTE, BGC('gray'), { height }]}>
        <Image
          source={{
            uri: 'https://gravatar.com/avatar/7201277b91738714c2aeded14b8315bdcdc216ff5ae362094df8c1bd74aac5cd?size=1024',
          }}
          style={[F]}
          resizeMode='contain'
        />
        <View style={[ROW, H(TabHeight), BGC('pink')]}>
          <TouchableOpacity
            style={[W(64), CENTER]}
            onPress={() => pageRef.current?.setPage(0)}>
            <Text>PageA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[W(64), CENTER]}
            onPress={() => pageRef.current?.setPage(1)}>
            <Text>PageB</Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 64,
                bottom: 0,
                left: 0,
                height: 8,
                backgroundColor: 'orange',
              },
              { left: barLeft },
            ]}
          />
        </View>
      </Animated.View>
    </View>
  )
}
export default Splash

const Page = ({ id, index, scrollChangeValue, topHeight }: any) => {
  const animatedRef = useAnimatedRef<any>()
  const scrollOffset = useSharedValue(0)
  const log = useCallback((message?: any, ...optionalParams: any[]) => {
    console.log(message, ...optionalParams)
  }, [])
  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      'worklet'
      scrollOffset.value = event.contentOffset.y
    },
    onBeginDrag: () => {
      'worklet'
      runOnJS(log)('onBeginDrag')
    },
    onMomentumBegin: (event) => {
      'worklet'
      runOnJS(log)('onMomentumBegin')
    },
    onEndDrag: () => {
      'worklet'
      runOnJS(log)('onEndDrag')
    },
    onMomentumEnd: (event) => {
      'worklet'
      runOnJS(log)('onMomentumEnd')
    },
  })

  useAnimatedReaction(
    () => scrollOffset.value,
    (cur, pre) => {
      if (id === index.value) {
        scrollChangeValue.value = [pre, cur]
      }
    },
    [id],
  )

  useAnimatedReaction(
    () => topHeight.value,
    (cur, pre) => {
      if (id !== index.value) {
        scrollTo(animatedRef, 0, scrollOffset.value + (pre - cur), false)
      }
    },
  )
  const renderItem: MasonryListRenderItem<any> = ({ index: i }) => {
    return (
      <View key={i} style={[WH(64)]}>
        <Image
          source={{
            uri: 'https://gravatar.com/avatar/7201277b91738714c2aeded14b8315bdcdc216ff5ae362094df8c1bd74aac5cd?size=1024',
          }}
          style={[F]}
          resizeMode='contain'
        />
      </View>
    )
  }

  return (
    <AnimatedMasonryFlashList
      ref={animatedRef}
      onScroll={animatedScrollHandler}
      contentContainerStyle={{ paddingTop: TopHeightMax }}
      data={new Array(100)}
      renderItem={renderItem}
      scrollEventThrottle={16}
      numColumns={2}
      estimatedItemSize={64}
      showsVerticalScrollIndicator={false}
      optimizeItemArrangement={true}
      overrideItemLayout={(layout) => {
        layout.size = 64
      }}
    />
    // <Animated.ScrollView
    //   ref={animatedRef}
    //   scrollEventThrottle={16}
    //   contentContainerStyle={{ paddingTop: TopHeightMax }}>
    //   {Array.from({ length: 100 }).map((_, i) => (
    //     <View key={i} style={[WH(64)]}>
    //       <Image
    //         source={{
    //           uri: 'https://gravatar.com/avatar/7201277b91738714c2aeded14b8315bdcdc216ff5ae362094df8c1bd74aac5cd?size=1024',
    //         }}
    //         style={[F]}
    //         resizeMode='contain'
    //       />
    //     </View>
    //   ))}
    // </Animated.ScrollView>
  )
}
