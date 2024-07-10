import { View, ViewProps } from 'react-native'
import { useCallback, useState } from 'react'

export const LazyView = (props: ViewProps) => {
  const { children } = props
  const [isMount, setIsMount] = useState(false)

  const onLayout = useCallback(() => {
    setIsMount(true)
  }, [])

  return (
    <View {...props} onLayout={onLayout}>
      {isMount && children}
    </View>
  )
}
