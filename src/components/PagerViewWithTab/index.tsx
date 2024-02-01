import { Text, View, ViewProps } from 'react-native'
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated'
import Pressable from '@/components/Pressable'
import {
  BGC,
  CENTER,
  H,
  W,
  ROW,
  W100,
  F,
  ABSOLUTE,
  AC,
  JE,
  H100,
  MB,
  FC,
  FS,
} from '@/utils/CommonStyles'
import { useState } from 'react'
import PagerView from 'react-native-pager-view'
import { useAnimatedPagerScrollHandler } from '@/components/PagerViewWithTab/hooks/useAnimatedPagerScrollHandler'
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes'
import { OnPageSelectedEventData } from 'react-native-pager-view/src/PagerViewNativeComponent'

type TabBarProps = {
  tabs: string[]
  onPageSelected?: DirectEventHandler<OnPageSelectedEventData>
} & ViewProps

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const PagerViewWithTab = (props: TabBarProps) => {
  const { tabs, children, onPageSelected = () => {} } = props
  const [position, setPosition] = useState(0)
  const [width, setWidth] = useState(0)
  const tabWidth = width / tabs.length

  const ref = useAnimatedRef<PagerView>()
  const left = useSharedValue(0)

  const pageScrollHandler = useAnimatedPagerScrollHandler(
    {
      onPageScroll: (event) => {
        'worklet'
        left.value = (event.position + event.offset) * tabWidth
      },
    },
    [tabWidth],
  )

  return (
    <View {...props}>
      <View
        style={[W100, H(48), ROW]}
        onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
        {tabs.map((i, index) => (
          <Pressable
            key={index}
            style={[CENTER, W(tabWidth)]}
            onPress={() => {
              ref?.current?.setPage(index)
            }}>
            <Text style={[FS(16), FC('#FFF')]} numberOfLines={1}>
              {i}
            </Text>
          </Pressable>
        ))}
        <Animated.View style={[ABSOLUTE, JE, AC, H100, W(tabWidth), { left }]}>
          <View style={[BGC('#6326FF'), W(48), H(4), MB(4)]} />
        </Animated.View>
      </View>
      <AnimatedPagerView
        ref={ref}
        scrollEnabled={true}
        initialPage={position}
        onPageSelected={(event) => {
          onPageSelected(event)
          setPosition(event.nativeEvent.position)
        }}
        onPageScroll={pageScrollHandler}
        style={[F]}>
        {children}
      </AnimatedPagerView>
    </View>
  )
}
export default PagerViewWithTab
