# GitHub Copilot Instructions — Satrafoods

> Project-level guidance for **GitHub Copilot** working on the **Satrafoods** repository.

---

## 1. Project Context & Stack

Satrafoods is a fresh food retail e-commerce application built for consumers in Ho Chi Minh City and Can Tho, Vietnam.

- **Framework:** React 19 (`react`, `react-dom`)
- **Language:** TypeScript 5/7 (strict typing, module resolution: `bundler`)
- **Bundler:** Vite 8 (`@vitejs/plugin-react`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with `@theme` custom variables in `src/index.css`
- **Design Metaphor:** "Gói" (Vietnamese grocery packaging, crisp borders, high contrast WCAG AA)
- **Central Instruction Source:** Refer to [`AGENTS.md`](../AGENTS.md) and [`.agent/rules/`](../.agent/rules/)

---

## 2. Code Generation Guidelines

### 2.1. React & TypeScript
- Write clean, functional components with explicit TypeScript prop interfaces.
- Avoid any untyped `any` or `@ts-ignore` comments.
- Reuse existing interfaces from `src/types/index.ts` (`Product`, `CartItem`, `FilterOptions`, `StoreLocation`, etc.).

### 2.2. Styling & Tailwind CSS v4
- Use semantic design tokens from `src/index.css`:
  - Brand Green: `bg-[#01B341]` / `text-[#01B341]` / `bg-[#006e24]`
  - Brand Lime: `bg-[#DAFF01]` / `text-[#DAFF01]`
  - Neutral Black: `text-[#111111]` (always use for text on lime or green backgrounds)
  - Surfaces: `bg-[#FFFFFF]`, `bg-[#F6F8F5]`, `border-[#E3E8E1]`
- Use typography helper classes: `font-headline-*`, `font-title-*`, `font-body-*`, `font-label-*`.

### 2.3. Iconography & Accessibility
- **Never suggest emojis as functional icons.**
- Use Google Material Symbols Outlined:
  ```tsx
  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
  ```
- Always include `aria-label` on buttons that contain only icons.
- Ensure touch targets on mobile are at least $44\text{px} \times 44\text{px}$.

### 2.4. Business Logic & Utilities
- When formatting currency, always call `formatVND(value)` from `src/utils/cart.ts`.
- Calculate cart subtotals and discounts using `calculateCartTotals` from `src/utils/cart.ts`.

---

## 3. Quality Gates

Before suggesting code changes as complete, ensure:
```bash
npm run lint  # TypeScript check
npm test      # Unit test suite
npm run build # Production build
```
