module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.ts', '.tsx', '.tsx'],
        alias: {
          '@': './src/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
