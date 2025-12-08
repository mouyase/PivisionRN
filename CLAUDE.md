# AI 操作指南

> 项目信息详见 `docs/ai/project.json`

## 核心原则

1. **先看后做**：任何开发任务开始前，**必须先阅读相关文档和现有代码**
2. **JSON 优先**：大模型处理 JSON 比 Markdown 效率更高，AI 文档全部使用 JSON
3. **文档驱动**：开发前读文档，开发后更新文档
4. **分块处理**：项目信息、模块记忆、流程数据分开存储
5. **参考现有**：写新代码前先看项目中类似功能的实现方式

---

## 开发前：读取文档（必须执行）

> ⚠️ **禁止跳过此步骤直接开始编码**

**必须先读取对应模块的 JSON 文档**：

```
1. 读取模块记忆    → src/features/{module}/module.json（或 CLAUDE.md）
2. 读取流程数据    → docs/ai/{module}-flows.json
3. 读取踩坑记录    → docs/ai/troubleshooting-issues.json
4. 如需架构图      → docs/business/{module}/architecture.md
5. 查看同类代码    → 找到项目中类似功能的现有实现作为参考
```

**快速定位模块文档**：
```
docs/ai/project.json → modules 数组 → memoryFile / flowsFile
```

**为什么必须先看文档**：
- 避免重复踩坑（踩坑记录里可能已有解决方案）
- 保持代码风格一致（参考现有实现）
- 了解项目约定（如：不随意安装新包、使用特定的工具函数等）

---

## 开发后：更新文档

**按类型更新对应文档**：

| 变更类型 | 更新文件 | 格式 |
|---------|---------|------|
| 流程/状态变更 | `docs/ai/{module}-flows.json` | JSON |
| API/导出变更 | `src/features/{module}/module.json` | JSON |
| 踩坑经验 | `docs/ai/troubleshooting-issues.json` | JSON |
| 架构设计图 | `docs/business/{module}/architecture.md` | Markdown |
| 新增模块 | 同时创建 `module.json` + `*-flows.json` + 更新 `project.json` | - |

---

## 代码校验

**编辑代码后按顺序执行**：

```bash
# 1. 格式化
pnpm oxfmt --no-error-on-unmatched-pattern <文件路径>

# 2. 类型检查
pnpm tsc --jsx react-native --noEmit --locale zh-CN

# 3. oxlint 校验并修复
pnpm oxlint --type-aware --type-check --fix <文件路径>

# 4. ESLint 校验并修复
pnpm eslint --fix <文件路径>
```

**测试命令**：
```bash
pnpm test              # 运行测试
pnpm test:watch        # 监听模式
```

---

## MCP 工具使用

**遇到问题时优先使用 MCP**：

- **查文档**：`mcp__context7__get-library-docs` - 获取第三方库最新文档
- **搜索**：`WebSearch` - 搜索解决方案
- **获取页面**：`mcp__fetch__fetch` - 获取网页内容
- **获取时间**：`mcp__time__get_current_time` - 记录文档/日志时获取当前时间

**记录时间戳**：

更新文档的 `lastUpdated` 字段或记录日志时，使用 time MCP 获取准确时间：
```
mcp__time__get_current_time(timezone: "Asia/Shanghai")
```

---

## 文档格式规范

### JSON 文档（AI 读取）

**位置**：`docs/ai/`、`src/**/module.json`

**类型**：
- `*-flows.json` → 流程、状态机、步骤
- `*-plan.json` → 计划书、Roadmap、任务
- `module.json` → 模块记忆（API、结构、导出）
- `troubleshooting-*.json` → 踩坑记录

**Schema**：`docs/ai/schemas/*.schema.json`

### Markdown 文档（人类阅读）

**位置**：`docs/guides/`、`docs/business/`

**用途**：架构图（Mermaid）、使用说明、教程

**流程图必须用 Mermaid**，禁止 box-drawing 字符

---

## 关键约束

### 命名

- **禁止** `Id`（大写 I + 小写 d）→ 用 `ID` 或 `id`
- 类型名：`UserID`、变量名：`userId`

### JSX

- 布尔属性必须 `={true}`
- 字符串属性必须 `={"文本"}`

### 导入

- **禁止** `SafeAreaView` from `react-native-safe-area-context` → 用 `@/src/shared/components/safe-area-view`
- **禁止** 导入库的 `src/` 或 `lib/` 内部路径

### 文件

- UTF-8 编码，不带 BOM
- 敏感文件（.env、*.keystore）不提交

### 依赖管理

- **禁止随意安装新包** → 先看现有代码如何解决类似问题
- 如确需新包，必须先询问用户确认

### 脚本开发（scripts/）

- 使用 TypeScript（`.ts`），不用 `.js` 或 `.mjs`
- 运行方式：`npx tsx scripts/xxx.ts`
- **开发前先查看 `scripts/` 目录下的现有脚本**，学习项目的脚本编写风格
- 网络请求：如遇代理问题，优先使用 `execSync` 调用 `curl`
- ESM 模块中获取 `__dirname`：
  ```typescript
  import { fileURLToPath } from "node:url";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  ```

---

## 设计模式速查

| 模式 | 说明 | 位置 |
|------|------|------|
| 服务组装 | 服务间协作在 bootstrap.ts 管理 | `src/bootstrap.ts` |
| 版本号防护 | 用户切换时递增版本号，异步响应比对 | 各 Service |
| 监听器 | addListener 返回移除函数 | 各 Service |
| API 聚合 | api/index.ts 聚合导出 | `src/features/*/api/` |

**详细说明**：`docs/ai/project.json` → patterns

---

## API 接口规范

### 参数定义与转换

API 函数的参数 `body` 使用业务语义命名（camelCase），内部通过 `modifyBody` 转换为接口要求的格式（snake_case）。**类型直接内联定义在函数参数中，不单独创建 type**：

```typescript
// ✅ 正确示例：类型内联定义
export const getAiAppDetails = (body: { id: string }) => {
  const modifyBody = {
    template_id: body.id,  // 转换为接口要求的字段名
  };

  return Alova.instance.Post("/api/v1/xxx", modifyBody, {
    transform(data) {
      return responseSchema.parse(data);
    },
  });
};

// ❌ 错误示例：单独定义 type
type GetAiAppDetailsBody = { id: string };
export const getAiAppDetails = (body: GetAiAppDetailsBody) => { ... };

// ❌ 错误示例：直接使用接口字段名
export const getAiAppDetails = (body: { template_id: string }) => { ... };
```

### 文件命名

- 每个 API 独立一个文件
- 文件名格式：`{method}-{resource}-{action}.ts`
- 示例：`get-ai-app-details.ts`、`post-ai-app-create.ts`

### 响应处理

使用 Zod Schema 校验并转换响应数据：

```typescript
const responseSchema = z
  .object({
    raw_field: z.string(),
  })
  .transform((value) => ({
    businessField: value.raw_field,  // 转换为业务语义
  }));
```

---

## 文档索引

| 类型 | 路径 |
|------|------|
| 项目信息 | `docs/ai/project.json` |
| 所有流程 | `docs/ai/*-flows.json` |
| 踩坑记录 | `docs/ai/troubleshooting-issues.json` |
| Schema | `docs/ai/schemas/*.schema.json` |
| 文档索引 | `docs/ai/README.json` |
| 人类文档 | `docs/README.md` |
