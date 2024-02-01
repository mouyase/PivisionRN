import { useCallback } from 'react'
import {
  ColorValue,
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
} from 'react-native'
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { PressableStateCallbackType } from 'react-native/Libraries/Components/Pressable/Pressable'

type PressableProps = {
  activeOpacity?: number
  underlayColor?: ColorValue
} & RNPressableProps

const Pressable = (props: PressableProps) => {
  const { children, style, activeOpacity, underlayColor, ...otherProps } = props

  const _style = useCallback(
    (state: PressableStateCallbackType) => {
      return [
        style as StyleProp<ViewStyle>,
        ...(state.pressed ? [{ backgroundColor: underlayColor }] : [{}]),
        ...(state.pressed ? [{ opacity: activeOpacity }] : [{}]),
      ]
    },
    [activeOpacity, style, underlayColor],
  )

  return (
    <RNPressable style={_style} {...otherProps}>
      {children}
    </RNPressable>
  )
}

export default Pressable
