// https://docs.expo.dev/guides/using-eslint/
const oxlint = require("eslint-plugin-oxlint");
const tslint = require("typescript-eslint");
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const pluginTailwindCSS = require("eslint-plugin-better-tailwindcss");

module.exports = defineConfig([
  expoConfig,
  {
    rules: {
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "never", prev: "return", next: "*" },
      ],
      "brace-style": "warn",
      "semi-spacing": "warn",
      "space-before-blocks": "warn",
      "space-in-parens": "warn",
      "react/function-component-definition": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      ...tslint.configs.recommended.rules,
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/strict-boolean-expressions": [
        "warn",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: true,
          allowNullableBoolean: true,
          allowNullableString: false,
          allowNullableNumber: false,
          allowNullableEnum: false,
          allowAny: false,
        },
      ],
    },
  },
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
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
    },
  },
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
  {
    ignores: ["dist/*", ".expo/*"],
  },
]);
