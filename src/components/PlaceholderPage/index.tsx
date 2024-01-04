import { ActivityIndicator, View } from 'react-native'
import { BGC, CENTER, F } from '@/utils/CommonStyles'
import { useEffect, useState } from 'react'

const PlaceholderPage = (props: PlaceholderPageProps) => {
  const { children, backgroundColor = '#FFF' } = props
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  return (
    <View style={[F]}>
      {!isMount && (
        <View style={[F, BGC(backgroundColor), CENTER]}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      {isMount && children}
    </View>
  )
}
export default PlaceholderPage
