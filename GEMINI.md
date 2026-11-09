# Gemini CLI Instructions — Satrafoods

> Instructions for **Gemini CLI** and Gemini-based agents working on the **Satrafoods** repository.

---

## 1. Single Source of Truth

This workspace uses a centralized, modular agent rule system. Before making any changes, read:

- **Primary Entry Point:** [`AGENTS.md`](./AGENTS.md)
- **Detailed Rules Directory:** [`.agent/rules/`](./.agent/rules/)
  - Project & Stack: [`.agent/rules/project.md`](./.agent/rules/project.md)
  - Architecture: [`.agent/rules/architecture.md`](./.agent/rules/architecture.md)
  - Frontend Standards: [`.agent/rules/frontend.md`](./.agent/rules/frontend.md)
  - Security Rules: [`.agent/rules/security.md`](./.agent/rules/security.md)
  - Testing & Quality Gates: [`.agent/rules/testing.md`](./.agent/rules/testing.md)

---

## 2. Gemini Quick Reference

- **Framework:** React 19 + TypeScript 5/7 + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with `@theme` CSS tokens in `src/index.css`
- **Color Palette:** Brand Green (`#01B341` / `#006E24`), Brand Lime (`#DAFF01`), Neutral Black (`#111111`), Border (`#E3E8E1`), Subtle (`#F6F8F5`)
- **Typography:** `Familjen Grotesk`
- **Testing:** Node.js native test runner via `tsx`

---

## 3. Essential Commands

```bash
# Start local development server
npm run dev

# Run static TypeScript type check
npm run lint

# Run automated unit tests
npm test

# Build production bundle
npm run build
```

---

## 4. Key Directives for Gemini

1. **Verify Before Coding:** Inspect `package.json`, `src/types/index.ts`, and target components before proposing modifications.
2. **Never Hallucinate Backend APIs:** The app currently operates as a client-side SPA with mock data in `src/data/mockData.ts` and utilities in `src/utils/cart.ts`. Do not invent non-existent server endpoints.
3. **Responsive Discipline:** Any UI change must look clean on mobile (375px), tablet (768px), and desktop (1240px+). Never cause horizontal overflow.
4. **Mandatory Quality Gates:** Always run `npm run lint; npm test; npm run build` before reporting task completion.
