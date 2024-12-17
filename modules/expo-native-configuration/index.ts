import ExpoNativeConfigurationModule from './src/ExpoNativeConfigurationModule'

export function getApiKey(): string {
  return ExpoNativeConfigurationModule.getApiKey()
}
