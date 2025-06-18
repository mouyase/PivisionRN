// https://docs.expo.dev/guides/using-eslint/
import expoConfig from "eslint-config-expo/flat.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
  },
]);
