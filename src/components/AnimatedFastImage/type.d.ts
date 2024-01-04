import { ViewProps, ViewStyle } from 'react-native'

declare global {
  declare type ResizeMode = 'cover' | 'contain' | 'stretch' | 'center'

  declare type AnimatedFastImageProps = {
    url: string
    resizeMode?: ResizeMode
    width?: number
    height?: number
    enableColorful?: boolean
    imageStyle?: ViewStyle | ViewStyle[]
  } & ViewProps
}
