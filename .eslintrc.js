module.exports = {
  root: true,
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['i18next', 'prettier', 'react', 'react-hooks'],
  rules: {
    'i18next/no-literal-string': 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
    'no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
