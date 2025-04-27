const { defineConfig } = require('eslint/config')
const eslintConfigReactNativeFlat = require('eslint-config-react-native-flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
  eslintConfigReactNativeFlat,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js'
    ],
  },
])
