---
name: add-new-skill
description: 在这个项目中创建新的 Copilot Agent Skill。当用户需要新增一个技能、添加一个新的 SKILL.md 文件，或询问如何扩展 Copilot 能力时，使用此技能。
argument-hint: '[技能名称] [技能描述]'
---

# 新增 Copilot Skill 指南

在开始之前，**务必先阅读官方文档**，了解 Agent Skills 的完整规范和最新特性：

📖 https://code.visualstudio.com/docs/copilot/customization/agent-skills

## 目录结构规则

所有 skill 存放在 `.github/skills/` 目录下，每个 skill 对应一个独立子目录，目录名即为 skill 的唯一标识符：

```text
.github/skills/
└── <skill-name>/          # 目录名必须与 SKILL.md 中的 name 字段完全一致
    ├── SKILL.md           # 必填：技能定义文件
    └── （可选附加资源）    # 脚本、示例文件、参考文档等
```

## 第一步：创建 SKILL.md

在 `.github/skills/<skill-name>/` 下创建 `SKILL.md`，文件由两部分组成：

### YAML frontmatter（必填）

```markdown
---
name: skill-name
description: 技能的描述，说清楚它能做什么、什么时候该用它。
argument-hint: [参数提示]
---
```

字段说明：

| 字段                       | 必填 | 说明                                                                         |
| -------------------------- | ---- | ---------------------------------------------------------------------------- |
| `name`                     | ✅   | 唯一标识符，只能用小写字母和连字符，**必须与父目录名相同**，最长 64 字符     |
| `description`              | ✅   | 描述技能的能力和适用场景，Copilot 依靠此字段判断何时自动加载，最长 1024 字符 |
| `argument-hint`            | 可选 | 在聊天输入框中显示的参数提示文字                                             |
| `user-invokable`           | 可选 | 默认 `true`，设为 `false` 则隐藏于 `/` 菜单，但 Copilot 仍可自动加载         |
| `disable-model-invocation` | 可选 | 默认 `false`，设为 `true` 则只能通过 `/` 命令手动调用                        |

### 技能正文（必填）

正文用 Markdown 编写，内容应包括：

- 技能的目标和适用场景
- 清晰的分步操作流程
- 输入/输出示例
- 对附加资源文件的引用（使用相对路径，如 `[脚本](./script.sh)`）

## 第二步：完成

VS Code 会自动发现 `.github/skills/` 目录下的所有 skill，**无需手动注册**。只要目录名与 `name` 字段一致，重新打开聊天窗口后即可通过 `/skill-name` 调用。

## 完整示例

新增一个帮助调试 Docusaurus 构建问题的 skill：

1. 创建目录和文件：

   ```
   .github/skills/debug-build/
   └── SKILL.md
   ```

2. `SKILL.md` 内容：

   ```markdown
   ---
   name: debug-build
   description: 诊断和修复 Docusaurus 构建错误。当用户遇到 npm run build 报错或页面渲染异常时使用。
   argument-hint: [错误信息]
   ---

   # 调试 Docusaurus 构建问题

   ## 常见原因

   ...
   ```

3. 重新打开聊天窗口，输入 `/debug-build` 即可调用。
