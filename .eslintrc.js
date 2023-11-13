module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  rules: {
    eqeqeq: 'error', // 必须使用全等
    'react-native/no-inline-styles': 'off', // 关闭行内样式检测
    'react/display-name': 'off', // 关闭display-name检测，打开会导致无法定义箭头函数组件
    '@typescript-eslint/no-unused-vars': ['warn'], // 定义了但未使用的变量警告
  },
}
