/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import 'react-native-url-polyfill/auto'
import { InitValueDevice } from '@/values/Device'
import { InitValuePixiv } from '@/values/Pixiv'

LogBox.ignoreLogs([
  "Linking requires a build-time setting `scheme` in the project's",
  "The provided Linking scheme 'pixiv' does not appear in the list of possible URI schemes in your Expo config",
])

InitValueDevice().then(() => {
  InitValuePixiv()
})

AppRegistry.registerComponent(appName, () => App)
