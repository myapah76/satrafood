# Frontend Workspace Instructions — `fe/`

> **Active Frontend Workspace** for all AI coding agents working on the **Satrafoods** frontend client application.

---

## 1. Workspace Overview

The Satrafoods frontend is structured as a dedicated Vite 8 + React 19 + TypeScript + Tailwind CSS v4 application inside `fe/`:

- **Root Directory:** `fe/`
- **Source Code:** `fe/src/`
- **Static Assets:** `fe/public/`
- **Configuration:** `fe/vite.config.ts`, `fe/tsconfig.json`, `fe/package.json`

---

## 2. Directory Structure

```text
fe/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── images/
│       └── logo/
├── src/
│   ├── components/            # Header, Footer, MobileBottomNav
│   ├── data/                  # Single Source of Truth JSON files (*.json)
│   ├── features/              # Feature-based business screens
│   │   ├── home/              # HomeScreen & subcomponents
│   │   ├── catalog/           # CatalogScreen & subcomponents
│   │   ├── cart/              # CartDrawer
│   │   ├── traceability/      # TraceabilityModal
│   │   ├── membership/        # MembershipModal
│   │   └── location/          # LocationModal
│   ├── stores/                # State management hooks (cart.store.ts)
│   ├── types/                 # Modular domain types (*.types.ts)
│   ├── utils/                 # Utilities (cart.ts, tests)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Essential Workspace Commands

From the workspace root or from `fe/`:

```bash
# Inside fe/
npm run dev      # Start dev server on http://localhost:3000
npm run lint     # TypeScript check (tsc --noEmit)
npm test         # Run unit tests via tsx
npm run build    # Vite production build
```

From repository root:
```bash
npm run dev      # Delegates to fe
npm run lint     # Delegates to fe
npm test         # Delegates to fe
npm run build    # Delegates to fe
```
