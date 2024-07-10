/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 Todo
 */
import { ViewProps } from 'react-native'
import { useMemo } from 'react'

type LazyPagerViewProps = {
  current: number
  index: number
} & ViewProps

export const LazyPagerView = (props: LazyPagerViewProps) => {
  const { current, index } = props

  const isLoad = useMemo(() => {
    return index >= current - 1 && index <= current + 1
  }, [current, index])

  if (!isLoad) {
    return <></>
  }

  return <>{props.children}</>
}
