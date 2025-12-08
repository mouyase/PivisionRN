/** @type {import('jest').Config} */
const config = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|native-base|react-native-svg|nanoid|immer)",
  ],
  // 排除 .mock.ts 文件，避免被当作测试文件执行
  testPathIgnorePatterns: ["/node_modules/", "\\.mock\\.ts$"],
  moduleNameMapper: {
    // 将 RN 依赖的 storage 模块映射到纯 TS 的 mock 实现
    "^@/src/lib/zustand/zustandStorage$":
      "<rootDir>/src/lib/zustand/__tests__/zustand-storage.mock.ts",
  },
  // CI 环境配置
  ...(process.env.CI && {
    // 生成 JUnit XML 报告
    reporters: ["default", ["jest-junit", { outputDirectory: "reports", outputName: "junit.xml" }]],
    // 生成覆盖率报告
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "cobertura", "lcov"],
  }),
};

module.exports = config;
