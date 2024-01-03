import { ColorValue, ViewProps } from 'react-native'
import { PropsWithChildren } from 'react'

declare global {
  declare type PlaceholderPageProps = {
    backgroundColor?: ColorValue
  } & PropsWithChildren<ViewProps>
}
