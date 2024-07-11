/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import 'react-native-url-polyfill/auto'

LogBox.ignoreLogs([
  "Linking requires a build-time setting `scheme` in the project's",
  "The provided Linking scheme 'pixiv' does not appear in the list of possible URI schemes in your Expo config",
])

AppRegistry.registerComponent(appName, () => App)
