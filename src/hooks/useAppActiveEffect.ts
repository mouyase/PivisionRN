import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'

type EffectCallback = () => undefined | void | (() => void)

const useAppActiveEffect = (effectCallback: EffectCallback) => {
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })
    return () => {
      subscription.remove()
    }
  }, [])
  useEffect(() => {
    if (appStateVisible === 'active') {
      effectCallback && effectCallback()
    }
  }, [appStateVisible, effectCallback])
}
export default useAppActiveEffect
