module.exports = {
  // 标记为根配置文件，停止向上查找
  root: true,

  // 扩展其他规则集
  extends: [
    // ESLint 推荐规则
    'eslint:recommended',
    // TypeScript 推荐规则
    'plugin:@typescript-eslint/recommended',
    // React 推荐规则
    'plugin:react/recommended',
    // React Hooks 推荐规则
    'plugin:react-hooks/recommended',
    // React Native 所有规则
    'plugin:react-native/all',
    // 禁用所有与 Prettier 冲突的规则
    'prettier',
  ],

  // 指定解析器
  parser: '@typescript-eslint/parser',

  // 使用的插件列表
  plugins: [
    // TypeScript 语法检查
    '@typescript-eslint',
    // React 语法检查
    'react',
    // React Native 特定规则
    'react-native',
    // 代码格式化集成
    'prettier',
    // 导入/导出语法检查
    'import',
  ],

  // 共享设置
  settings: {
    react: {
      // 自动检测 React 版本
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        // 使用 TypeScript 模块解析
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },

  // 具体规则配置
  rules: {
    // React 相关规则

    // 关闭强制在 JSX 中导入 React
    'react/react-in-jsx-scope': 'off',

    // 关闭 PropTypes 检查（使用 TypeScript 类型检查）
    'react/prop-types': 'off',

    // 强制执行 Hooks 规则
    'react-hooks/rules-of-hooks': 'error',

    // 检查 useEffect 的依赖项
    'react-hooks/exhaustive-deps': 'warn',

    // 警告使用内联样式
    'react-native/no-inline-styles': 'warn',

    // 允许直接使用文本节点
    'react-native/no-raw-text': 'off',

    // TypeScript 相关规则

    // 未使用变量检查
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        // 忽略以_开头的参数
        argsIgnorePattern: '^_',
        // 忽略以_开头的变量
        varsIgnorePattern: '^_',
      },
    ],

    // 警告使用 any 类型
    '@typescript-eslint/no-explicit-any': 'warn',

    // 关闭强制函数返回类型明
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // 导入相关规则

    // 导入顺序规则
    'import/order': [
      'error',
      {
        groups: [
          // 内置模块
          'builtin',
          // 外部模块
          'external',
          // 内部模块
          'internal',
          // 父级目录
          'parent',
          // 同级目录
          'sibling',
          // 当前目录
          'index',
        ],
        // 不同组之间空行
        'newlines-between': 'always',
        alphabetize: {
          // 按字母顺序排序
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // 确保导入的模块可以被解析
    'import/no-unresolved': 'error',

    // 禁止重复导入
    'import/no-duplicates': 'error',

    // 通用规则

    // 控制 console 的使用
    'no-console': [
      'warn',
      {
        // 允许使用 console.warn 和 console.error
        allow: ['warn', 'error'],
      },
    ],

    // 强制使用 Prettier 格式化
    'prettier/prettier': 'error',

    // 警告使用 debugger
    'no-debugger': 'warn',

    // 警告使用 alert
    'no-alert': 'warn',

    // 强制使用 === 和 !==
    eqeqeq: ['error', 'always'],

    // 强制所有控制语句使用大括号
    curly: ['error', 'all'],
  },
}
