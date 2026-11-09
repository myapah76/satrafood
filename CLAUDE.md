# Claude Code Instructions — Satrafoods

> Quick-reference and architectural guide for **Claude Code** (`claude`) on the **Satrafoods** repository.

---

## Single Source of Truth Reference

Claude Code must adhere to the central project rules defined across:
- **Central Entrypoint:** [`AGENTS.md`](./AGENTS.md)
- **Modular Project Rules:** [`.agent/rules/`](./.agent/rules/)
  - [Project & Stack](.agent/rules/project.md) | [Architecture](.agent/rules/architecture.md) | [Frontend](.agent/rules/frontend.md) | [Testing](.agent/rules/testing.md) | [Security](.agent/rules/security.md)

---

## Build & Test Commands

```bash
# Type check (must pass with 0 errors)
npm run lint

# Run unit tests
npm test

# Build production bundle
npm run build

# Start dev server (port 3000)
npm run dev
```

---

## Architectural Summary

- **App Model:** Client-side SPA driven by React 19 (`^19.0.1`), TypeScript (`^7.0.2`), and Vite 8 (`^8.3.0`).
- **Styling Engine:** Tailwind CSS v4 via `@tailwindcss/vite`. Tokens configured in `src/index.css` via `@theme`.
- **Iconography:** Material Symbols Outlined (`<span className="material-symbols-outlined">...</span>`) & Lucide React. **No emojis as UI icons.**
- **Brand Palette:** Brand Green (`#01B341` / `#006E24`), Brand Lime (`#DAFF01`), Neutral Black (`#111111`), Border (`#E3E8E1`), Subtle (`#F6F8F5`).
- **Typography:** `Familjen Grotesk` (`font-headline-*`, `font-title-*`, `font-body-*`, `font-label-*`).
- **Data & Logic:** Domain models in `src/types/index.ts`, in-memory store in `src/data/mockData.ts`, pure calculation functions in `src/utils/cart.ts`.

---

## Non-Negotiable Directives for Claude

1. **Inspect First:** Inspect actual code before changing anything. Never guess component APIs or interfaces.
2. **Never Invent Functionality:** Do not assume backend endpoints exist. The project currently runs in-memory data models.
3. **Responsive Quality:** Every UI change must be verified across mobile (<640px), tablet (640-1023px), and desktop (>=1024px).
4. **Touch Targets:** All interactive mobile buttons must have touch hit areas $\ge 44\text{px}$.
5. **Quality Gates:** Before concluding, run `npm run lint`, `npm test`, and `npm run build`. Never report success without running them.
