# Frontend Module Instructions — `src/`

> Localized instructions for AI coding agents and developers working inside the `src/` directory of **Satrafoods**.

---

## 1. Scope & Relationship to Root Instructions

This module contains the entire client-side frontend implementation of Satrafoods.

- **Primary Entry Point:** [`../AGENTS.md`](../AGENTS.md)
- **Central Project Rules:** [`../.agent/rules/`](../.agent/rules/)
  - Frontend Standards: [`../.agent/rules/frontend.md`](../.agent/rules/frontend.md)
  - System Architecture: [`../.agent/rules/architecture.md`](../.agent/rules/architecture.md)
  - Testing & Quality Gates: [`../.agent/rules/testing.md`](../.agent/rules/testing.md)

---

## 2. Directory Layout & Module Responsibilities

```text
src/
├── components/          # React UI Components
│   ├── CartDrawer.tsx   # Shopping cart flyout & checkout simulation
│   ├── CategoryPage.tsx # Product catalog, sorting, desktop filter sidebar
│   ├── Footer.tsx       # Corporate info, service commitments, hotline
│   ├── Header.tsx       # Top navigation, search, delivery location, cart counter
│   ├── HomePage.tsx     # Hero banner, deals countdown, 18 categories, store locator
│   ├── LocationModal.tsx # Fast 2-hour delivery district selector
│   ├── MembershipModal.tsx # Satra Rewards virtual gold card & points tracker
│   ├── MobileBottomNav.tsx # 5-tab fixed navigation for mobile viewports
│   ├── MobileFilterDrawer.tsx # Sliding bottom-sheet filter for mobile/tablet
│   └── TraceabilityModal.tsx # QR provenance certificate popup
├── data/
│   └── mockData.ts      # Domain seed data (VietGAP items, deals, store branches)
├── types/
│   └── index.ts         # TypeScript data contracts & interfaces
├── utils/
│   ├── cart.ts          # Pure e-commerce math, filter, and sort algorithms
│   └── cart.test.ts     # Automated unit tests for cart and filter logic
├── App.tsx              # Top-level coordinator for view routing and modal state
├── main.tsx             # React DOM root mounting
└── index.css            # Tailwind v4 @theme design tokens & typography
```

---

## 3. Frontend Development Rules

1. **Component Modularity**:
   - Keep components focused on a single responsibility.
   - Colocate component props interfaces at the top of the component file.
   - Export named components (`export const Component: React.FC<Props> = ...`).
2. **State Management**:
   - Global view and cart state are maintained in `App.tsx`.
   - Pass state and handlers via props. Avoid introducing external state libraries.
   - Use `useMemo` for filtering/sorting product lists in `CategoryPage.tsx`.
3. **Styling & Design Tokens**:
   - Never hardcode arbitrary colors when a design token exists.
   - Always use `#111111` for text on `#DAFF01` (Brand Lime) or `#01B341` (Brand Green) to maintain WCAG AA contrast.
   - Use typography classes: `font-headline-*`, `font-title-*`, `font-body-*`, `font-label-*`.
4. **Responsive Invariants**:
   - Test on 375px (mobile), 768px (tablet), and 1240px (desktop).
   - Ensure touch targets are at least $44\text{px} \times 44\text{px}$ on mobile.
   - Ensure `MobileBottomNav` and fixed headers respect device safe areas (`env(safe-area-inset-bottom)`).
5. **Testing**:
   - Whenever modifying calculation logic in `src/utils/cart.ts`, update or add corresponding tests in `src/utils/cart.test.ts`.
   - Execute tests with `npm test`.
