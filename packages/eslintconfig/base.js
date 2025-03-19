import eslint from '@eslint/js'
import { globalIgnores } from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export const baseConfig = [
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  globalIgnores([
    '**/.yarn',
    '**/.turbo',
    '**/node_modules',
    '**/dist',
    '**/build',
    '**/.expo',
    '**/android',
    '**/ios',
  ]),
]
