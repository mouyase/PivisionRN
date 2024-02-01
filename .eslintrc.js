module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    eqeqeq: 'error', // 必须使用全等
    'react-native/no-inline-styles': 'off', // 关闭行内样式检测
    'react/display-name': 'off', // 关闭display-name检测，打开会导致无法定义箭头函数组件
    '@typescript-eslint/no-unused-vars': 'off', // 关闭默认未使用变量提示
    curly: 'error', // 强制要求if换行
    'unused-imports/no-unused-imports': 'error', // 自动删除未使用import
    'unused-imports/no-unused-vars': ['warn'], // 定义了但未使用的变量警告
  },
}
