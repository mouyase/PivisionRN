import { ReanimatedEvent, useEvent, useHandler } from 'react-native-reanimated'
import { DependencyList } from 'react-native-reanimated/lib/typescript/reanimated2/hook'

type Handlers = {
  onPageScroll: (
    event: ReanimatedEvent<{ position: number; offset: number }>,
    context: Record<string, unknown>,
  ) => void
}

/**
 * 处理PagerView的ScrollEvent事件的自定义AnimatedHandler
 * @param handlers
 * @param dependencies
 */
export function useAnimatedPagerScrollHandler(
  handlers: Handlers,
  dependencies?: DependencyList,
) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies)
  return useEvent<any>(
    (event) => {
      'worklet'
      const { onPageScroll } = handlers
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context)
      }
    },
    ['onPageScroll'],
    doDependenciesDiffer,
  )
}
