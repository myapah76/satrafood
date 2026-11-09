# Git Workflow & Version Control Rules

> Git safety invariants, branching standards, and commit message conventions for **Satrafoods**.

---

## 1. Safety Invariants

- **Inspect First:** Always run `git status` before starting work to inspect the working tree and preserve uncommitted changes.
- **No Destructive Commands:** Never execute destructive commands (`git reset --hard`, `git clean -fd`, `git checkout .`) without explicit, documented user confirmation.
- **No Force Pushing:** Never execute `git push --force` or `git push --force-with-lease`.
- **Do Not Push Without Approval:** Only commit and push when the user explicitly instructs you to do so.

---

## 2. Commit Message Standards

When instructed to create commits, follow the **Conventional Commits** specification:

```text
<type>(<scope>): <short summary in imperative mood>

[optional body explaining motivation and technical approach]
```

### Supported Types:
- `feat`: A new user-facing feature or component.
- `fix`: A bug fix or layout correction.
- `refactor`: Code restructuring without changing external behavior.
- `style`: Formatting, whitespace, or CSS token adjustments.
- `docs`: Documentation updates (README, rules, architectural notes).
- `test`: Adding or correcting automated unit tests.
- `chore`: Build configuration, dependency bumps, or tool adjustments.

### Examples:
- `feat(mobile): add 5-tab fixed bottom navigation bar`
- `fix(catalog): prevent filter sidebar from pushing products below fold on mobile`
- `docs(rules): establish multi-agent instruction system`
