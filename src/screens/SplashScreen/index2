import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useEvent,
  useHandler,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated'
import PagerView from 'react-native-pager-view'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const TopHeight = [64, 256]
const TopHeightDiff = TopHeight[1] - TopHeight[0]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    backgroundColor: 'gray',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  image: {
    flex: 1,
  },
  navBar: {
    height: 32,
    backgroundColor: 'pink',
    flexDirection: 'row',
  },
  navBarButton: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    position: 'absolute',
    width: 64,
    bottom: 0,
    left: 0,
    height: 8,
    backgroundColor: 'orange',
  },
  pageText: {
    color: 'purple',
    fontSize: 48,
  },
})

const Page = ({
  colours,
  id,
  index,
  scrollChangeValue,
  topHeight,
  ...props
}) => {
  const animatedRef = useAnimatedRef()
  const scrollOffset = useScrollViewOffset(animatedRef)

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

  return (
    <Animated.ScrollView
      ref={animatedRef}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingTop: TopHeight[1] }}
      {...props}>
      {Array.from({ length: 100 }).map((_, index) => (
        <View
          key={index}
          style={{ height: 64, backgroundColor: colours[index % 2] }}>
          <Text style={styles.pageText}>{index}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  )
}

const usePageScrollHandler = (handlers, dependencies) => {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies)
  const subscribeForEvents = ['onPageScroll']

  return useEvent(
    (event) => {
      'worklet'
      const { onPageScroll } = handlers
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context)
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  )
}

const Splash = () => {
  const index = useSharedValue(0)
  const height = useSharedValue(TopHeight[1])
  const scrollChangeValue = useSharedValue([0, 0])

  useAnimatedReaction(
    () => scrollChangeValue.value,
    ([pre, cur]) => {
      const isGoingDown = pre >= cur
      const isGoingUp = pre <= cur
      const isMaximum = height.value >= TopHeight[1]
      const isMinimum = height.value <= TopHeight[0]
      if (
        (isGoingDown && isMinimum) ||
        (isGoingUp && isMaximum && cur <= TopHeightDiff)
      ) {
        if (cur <= TopHeightDiff) {
          height.value =
            TopHeight[1] - Math.min(TopHeightDiff, Math.max(0, cur))
        }
        return
      }
      height.value = Math.min(
        TopHeight[1],
        Math.max(TopHeight[0], height.value + (pre - cur)),
      )
    },
  )

  const pageRef = useAnimatedRef()
  const barLeft = useSharedValue(0)
  const pageScrollHandler = usePageScrollHandler({
    onPageScroll: (e) => {
      'worklet'
      barLeft.value = (e.position + e.offset) * 64
    },
  })

  return (
    <View style={styles.container}>
      <AnimatedPagerView
        ref={pageRef}
        initialPage={0}
        onPageSelected={(e) => (index.value = e.nativeEvent.position)}
        onPageScroll={pageScrollHandler}
        style={styles.container}>
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
      <Animated.View style={[styles.topView, { height }]}>
        <Image
          source={{
            uri: 'https://gravatar.com/avatar/7201277b91738714c2aeded14b8315bdcdc216ff5ae362094df8c1bd74aac5cd?size=1024',
          }}
          style={styles.image}
          resizeMode='contain'
        />
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navBarButton}
            onPress={() => pageRef.current?.setPage(0)}>
            <Text>PageA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBarButton}
            onPress={() => pageRef.current?.setPage(1)}>
            <Text>PageB</Text>
          </TouchableOpacity>
          <Animated.View style={[styles.bar, { left: barLeft }]} />
        </View>
      </Animated.View>
    </View>
  )
}

export default Splash
