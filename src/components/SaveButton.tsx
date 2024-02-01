import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import SvgSave from '@/assets/svg/icon/SvgSave'
import { CENTER, WH } from '@/utils/CommonStyles'
import { useCallback, useState } from 'react'
import ImageDownloader from '@/utils/ImageDownloader'

type SaveButtonProps = {
  url: string
} & ViewProps
const SaveButton = (props: SaveButtonProps) => {
  const { url } = props
  const [isDownloading, setIsDownloading] = useState(false)
  const onPress = useCallback(() => {
    setIsDownloading(true)
    ImageDownloader.download({ url, album: 'PivisionRN' })
      .then((value) => {
        console.log(value)
      })
      .finally(() => {
        setIsDownloading(false)
      })
  }, [url])
  return (
    <>
      {isDownloading && (
        <View style={[WH(32), CENTER]}>
          <ActivityIndicator color={'#FFF'} />
        </View>
      )}
      {!isDownloading && (
        <TouchableOpacity activeOpacity={0.3} onPress={onPress}>
          <SvgSave style={[WH(32)]} />
        </TouchableOpacity>
      )}
    </>
  )
}
export default SaveButton
