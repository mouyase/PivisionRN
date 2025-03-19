import { defineConfig } from "eslint/config";
import eslintPluginPrettier from 'eslint-plugin-prettier'

export const expoConfig = [
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
];
