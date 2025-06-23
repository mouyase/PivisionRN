// https://docs.expo.dev/guides/using-eslint/
import eslintJS from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import expoConfig from "eslint-config-expo/flat.js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 应用ESLint推荐的基础规则集，包含常见的最佳实践
  eslintJS.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  {
    // 注册React Hooks相关插件，用于检查Hooks的使用规范
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    // 应用React Hooks推荐的规则，确保Hooks的正确使用
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    // 自定义的代码风格规则，用于统一代码格式
    rules: {
      // 数组括号内的空格规则，error表示禁止数组括号内缺少空格或有多余空格
      "array-bracket-spacing": "error",
      // 逗号后的空格规则，error表示禁止逗号后缺少空格
      "comma-spacing": "error",
      // 对象键值对冒号后的空格规则，error表示禁止冒号后缺少空格
      "key-spacing": "error",
      // 多个连续空格规则，error表示禁止使用多个连续空格
      "no-multi-spaces": "error",
      // 连续空行规则，error表示禁止出现多个连续空行
      "no-multiple-empty-lines": "error",
      // 行尾空格规则，error表示禁止行尾出现空格
      "no-trailing-spaces": "error",
      // 对象大括号内的空格规则，error表示禁止对象大括号内缺少空格
      "object-curly-spacing": ["error", "always"],
      // React组件displayName检查规则，off表示不检查该属性
      "react/display-name": "off",
      // 函数组件定义方式规则，error表示禁止使用不符合规范的函数组件定义方式
      "react/function-component-definition": "error",
      // 强制JSX属性排序规则，error表示禁止未按字母顺序排序的属性
      "react/jsx-sort-props": "error",
      // JSX花括号内的空格规则，error表示禁止花括号内缺少空格
      "react/jsx-curly-spacing": "error",
      // 强制JSX花括号内的空格规则，error表示禁止花括号内缺少空格
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "always", children: "ignore" },
      ],
      // 分号前后的空格规则，error表示禁止分号前后缺少空格
      "semi-spacing": "error",
      // 代码块前的空格规则，error表示禁止代码块前缺少空格
      "space-before-blocks": "error",
      // 圆括号内的空格规则，error表示禁止圆括号内缺少空格
      "space-in-parens": "error",
    },
  },
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        // 精确匹配您的字符串
        {
          selector:
            'CallExpression[callee.name="tw"] Literal[value=/.*\\[.*\\].*/]:not([value=/^[^\\[]*\\[(-?\\d+(\\.\\d+)?|#[0-9a-fA-F]{3}|#[0-9a-fA-F]{4}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8}|rgba?\\([0-9,\\s.]+\\))\\][^\\[]*$/])',
          message:
            "❌ 中括号内只允许：纯数字、#3位色值、#4位色值、#6位色值、#8位色值、rgb()、rgba()",
        },
      ],
    },
  },
  {
    ignores: ["dist/*", "node_modules/*", "ios", "android"],
  },
]);
