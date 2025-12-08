module.exports = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  rules: {
    "subject-case": [
      2,
      "always",
      [
        // lower case
        "lower-case",
        // UPPERCASE
        "upper-case",
        // camelCase
        "camel-case",
        // kebab-case
        "kebab-case",
        // PascalCase
        "pascal-case",
        // Sentence case
        "sentence-case",
        // snake_case
        "snake-case",
        // Start Case
        "start-case",
      ],
    ],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "vibe"],
    ],
  },
};
