# Satrafoods Multi-Agent System Instructions

> **Central Instruction File & Single Source of Truth** for all AI coding agents working on the **Satrafoods** repository (`https://github.com/myapah76/satrafood.git`).

---

## 1. Core Operating Principles

Every AI coding agent (including Codex, Gemini CLI, Claude Code, Antigravity, and GitHub Copilot) must strictly adhere to the following principles:

1. **Read Root Instructions First**: Read this document and applicable project rules before starting any work.
2. **Inspect Before Acting**: Inspect the repository structure, existing source code, package configurations, and lockfiles. Never assume architecture or dependencies.
3. **Understand Existing Architecture**: Understand how components, types, data, and utilities are organized.
4. **Identify Affected Modules**: Map out which files and dependencies will be affected before modifying any code.
5. **Reuse Existing Patterns**: Reuse existing components, styling tokens, utilities, and types. Do not create duplicates.
6. **Avoid Unnecessary Refactoring**: Keep changes minimal, surgical, and scoped strictly to the user request.
7. **Never Invent Functionality**: Never invent fictional API endpoints, non-existent database schemas, or fake features.
8. **No Silent Architectural Changes**: Never switch frameworks, build systems, state paradigms, or styling libraries without explicit instruction.
9. **Preserve User Changes**: Always preserve existing user changes and prior work.
10. **Execute Quality Gates**: Always run TypeScript checks (`npm run lint`), unit tests (`npm test`), and production builds (`npm run build`).
11. **Report Results Honestly**: Report exact test execution counts and results. Never claim a test passed if it was not run.

---

## 2. Mandatory Pre-Implementation Checklist

Before writing or editing any code, verify every item below:

- [ ] I have read `AGENTS.md` and the relevant specialized rule files in `.agent/rules/`.
- [ ] I have verified the current Git status using `git status` to detect uncommitted changes.
- [ ] I have inspected the target component, utility, or test file to understand its existing implementation.
- [ ] I have identified the exact design tokens, typography classes, and utility functions needed.
- [ ] I have verified that no unnecessary dependencies will be introduced.
- [ ] I know which tests must be run to validate my changes.

---

## 3. Specialized Rule Modules (`.agent/rules/`)

This root instruction delegates detailed domain standards to specialized rule files to prevent duplication and preserve a **Single Source of Truth**:

| Rule Module | Path | Description & Scope |
|---|---|---|
| **Project & Stack** | [`.agent/rules/project.md`](file:///d:/satrafoods/.agent/rules/project.md) | Verified stack versions, directory tree, scripts, and env variables. |
| **Architecture** | [`.agent/rules/architecture.md`](file:///d:/satrafoods/.agent/rules/architecture.md) | System design, component hierarchy, state flow, and data layers. |
| **Frontend & UI/UX** | [`.agent/rules/frontend.md`](file:///d:/satrafoods/.agent/rules/frontend.md) | "Gói" design system, color tokens, responsive standards, touch targets, and a11y. |
| **Backend & APIs** | [`.agent/rules/backend.md`](file:///d:/satrafoods/.agent/rules/backend.md) | Current SPA state, future Express API conventions, and Gemini server integration. |
| **Security** | [`.agent/rules/security.md`](file:///d:/satrafoods/.agent/rules/security.md) | Zero-secret rules, client bundle isolation, input sanitization, and PII protection. |
| **Testing** | [`.agent/rules/testing.md`](file:///d:/satrafoods/.agent/rules/testing.md) | Quality gates, `npm test` runner, and test authoring standards. |
| **Git Workflow** | [`.agent/rules/git-workflow.md`](file:///d:/satrafoods/.agent/rules/git-workflow.md) | Branch safety, non-destructive operations, and commit formatting. |

---

## 4. Mandatory 5-Phase Agent Workflow

All coding agents must follow this structured 5-phase execution workflow:

### Phase 1 — Understand
- Read this `AGENTS.md` file and applicable rules in `.agent/rules/`.
- Inspect the repository layout and existing code related to the task.
- Understand the existing dependencies in `package.json`.

### Phase 2 — Plan
- Identify the exact files that need to be created or modified.
- Identify potential risks, breaking changes, or layout regressions.
- Confirm the implementation strategy adheres to project conventions.
- Identify required quality gate commands.

### Phase 3 — Implement
- Implement changes following existing code conventions and styling tokens.
- Keep modifications minimal, clean, and focused.
- Maintain backward compatibility and preserve all existing functionality.

### Phase 4 — Verify
- Run static type checks: `npm run lint`
- Run unit tests: `npm test`
- Run production build: `npm run build`
- Inspect responsive behavior on mobile (375px), tablet (768px), and desktop (1240px+).

### Phase 5 — Report
Provide a structured summary to the user:
- Summary of changes implemented.
- List of files created or modified.
- Architectural decisions made.
- Test and build execution results.
- Any known limitations or remaining items.

---

## 5. Dependency Management Rules

- **Inspect First:** Check `package.json` and lockfiles before proposing any new package.
- **Strict Peer Dependencies:** Never use `--force` or `--legacy-peer-deps` to bypass dependency conflicts.
- **No Unnecessary Packages:** Always evaluate if the requested capability can be cleanly implemented using modern standard library APIs, React primitives, or Tailwind utilities.
- **No Major Version Surprises:** Never upgrade major package versions without explicit request.

---

## 6. Supported Agent Integration Map

| Agent | Primary Entry Point | Loading Mechanism |
|---|---|---|
| **Codex & Universal** | [`AGENTS.md`](file:///d:/satrafoods/AGENTS.md) | Auto-discovered at repository root. |
| **Gemini CLI** | [`GEMINI.md`](file:///d:/satrafoods/GEMINI.md) | Auto-discovered at workspace root. |
| **Claude Code** | [`CLAUDE.md`](file:///d:/satrafoods/CLAUDE.md) | Auto-discovered at workspace root. |
| **Antigravity** | [`.agent/rules/`](file:///d:/satrafoods/.agent/rules/) & [`AGENTS.md`](file:///d:/satrafoods/AGENTS.md) | Hierarchical discovery via `.agent/rules/*.md`. |
| **GitHub Copilot** | [`.github/copilot-instructions.md`](file:///d:/satrafoods/.github/copilot-instructions.md) | Auto-loaded by Copilot Chat. |
| **Frontend Module** | [`src/AGENTS.md`](file:///d:/satrafoods/src/AGENTS.md) | Discovered when editing files inside `src/`. |
