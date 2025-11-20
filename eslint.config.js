// https://docs.expo.dev/guides/using-eslint/
/* @ts-check */
const oxlint = require("eslint-plugin-oxlint");
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const pluginTailwindCSS = require("eslint-plugin-better-tailwindcss");

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      "better-tailwindcss": pluginTailwindCSS,
    },
    settings: {
      "better-tailwindcss": {
        tailwindConfig: "tailwind.config.js",
        callees: ["tw"],
      },
    },
    rules: {
      "better-tailwindcss/enforce-consistent-class-order": "error",
      "better-tailwindcss/no-unnecessary-whitespace": "error",
      "better-tailwindcss/enforce-shorthand-classes": "error",
    },
  },
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
  {
    ignores: ["dist/*"],
  },
]);
