# Project Rules & Specifications

> **Single Source of Truth** for the project identity, technology stack, directory structure, environment configuration, and execution scripts for **Satrafoods**.

---

## 1. Project Overview

- **Project Name:** Satrafoods
- **Repository:** `https://github.com/myapah76/satrafood.git`
- **Application Type:** E-commerce Web Application for Fresh Groceries & VietGAP Food Retail
- **Target Audience:** Consumers in Ho Chi Minh City and Can Tho, Vietnam requiring authenticated VietGAP meat, fish, produce, and 2-hour express delivery.
- **Brand Metaphor:** **"Gói"** — Packaging, Care, Origin Verification, and Market Freshness.

---

## 2. Technology Stack & Exact Versions

Every AI coding agent must respect and preserve these verified technology choices:

| Category | Technology | Version | Purpose & Notes |
|---|---|---|---|
| **Core Framework** | React | `^19.0.1` | Client UI library using modern functional components and hooks |
| **DOM Renderer** | React DOM | `^19.0.1` | React DOM binding |
| **Language** | TypeScript | `^7.0.2` | Strict static typing, module resolution: `bundler` |
| **Bundler & Dev Server** | Vite | `^8.3.0` | Ultra-fast build tool using native ES modules |
| **Vite Plugins** | `@vitejs/plugin-react` | `^6.1.1` | Fast Refresh and JSX transformation |
| **Styling Engine** | Tailwind CSS v4 | `^4.3.3` | Modern CSS-first configuration via `@import "tailwindcss";` |
| **Vite Tailwind Plugin** | `@tailwindcss/vite` | `^4.3.3` | Direct Vite compiler integration (replaces PostCSS) |
| **Icons** | Material Symbols Outlined & Lucide | `lucide-react: ^0.546.0` | High-contrast vector icons; no emojis as structural controls |
| **Typography** | Familjen Grotesk | Google Fonts | Primary geometric retail typography engine |
| **Animation** | Motion (`motion`) | `^12.23.24` | Micro-interactions and smooth transitions |
| **Testing** | Node.js Test Runner via `tsx` | `tsx: ^4.21.0` | Fast zero-config testing using native `node:test` & `node:assert` |
| **Package Manager** | `npm` | `10.x+` (Node 18+) | Primary package manager; `package-lock.json` is authoritative |

### 2.1. Verified Brand & Print/Digital Color Palette
All agents must adhere to the official color specifications:

| Color Name | RGB | CMYK | Hex | Usage |
|---|---|---|---|---|
| **Primary Green** | `1 179 65` | `99 0 64 30` | `#01B341` | Main brand identity, buttons, badges, active states |
| **Brand Lime** | `218 255 110` | `15 0 100 0` | `#DAFF01` | High-voltage badges, active cart counter |
| **Promo Pink (HOT)** | `252 149 253` | `0 41 0 1` | `#FC95FD` | HOT khuyến mãi deals, promotional buttons & chips |
| **White Canvas** | `255 255 255` | `0 0 0 0` | `#FFFFFF` | Backgrounds, surface cards, negative space |
| **Accent Orange** | `255 148 0` | `0 42 100 0` | `#FF9400` | Combo tags, special bundles, secondary highlights |
| **Alert Red** | `255 22 31` | `0 91 88 0` | `#FF161F` | Flash sales, discount percentages, urgent notifications |

> **Strict Corner Radius Standard:** All interactive elements, cards, inputs, and badges must use a **4px corner radius** (`rounded-[4px]`). Emojis must never be used as primary UI icons; use Material Symbols Outlined vector icons.

---

## 3. Directory Layout

The repository follows a clean monorepo architecture with a dedicated `fe/` frontend workspace:

```text
satrafoods/
├── .agent/                     # Antigravity & AI Agent Instruction System
│   └── rules/                  # Modular rules (project, architecture, frontend, etc.)
├── .github/                    # GitHub configuration & Copilot instructions
│   └── copilot-instructions.md # GitHub Copilot entry point
├── be/                         # Backend module anchor
│   └── AGENTS.md
├── fe/                         # Active Frontend Workspace (Vite + React 19 + TypeScript)
│   ├── public/                 # Static assets (favicon.ico, favicon.svg, images/)
│   ├── src/                    # Source code
│   │   ├── components/         # Shared global components (Header, Footer, MobileBottomNav)
│   │   ├── data/               # Single Source of Truth (*.json)
│   │   ├── features/           # Feature-based business modules (home, catalog, cart, etc.)
│   │   ├── stores/             # Reactive state management hooks (cart.store.ts)
│   │   ├── types/              # Domain TypeScript types (*.types.ts)
│   │   ├── utils/              # Calculation & currency utilities and tests
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json            # Frontend workspace dependencies & scripts
│   ├── tsconfig.json
│   └── vite.config.ts
├── package.json                # Root orchestration workspace scripts
├── AGENTS.md                   # Central instruction entry point
└── README.md
```

├── metadata.json               # AI Studio project metadata
├── package.json                # Project dependencies and script declarations
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite configuration with path aliases (@ -> .)
```

---

## 4. Environment Variables

The project operates cleanly out-of-the-box. Optional variables are documented in `.env.example`:

- `PORT`: Development server port (default: `3000`).
- `GEMINI_API_KEY`: API key for optional server-side Gemini intelligence (never expose to client code).

> **Rule:** Never reference `import.meta.env` variables that contain secret credentials in client-side bundles.

---

## 5. Available Scripts & Commands

All agents must execute commands using `npm`:

```bash
# Start development server on port 3000
npm run dev

# Run TypeScript static type checking
npm run lint

# Run unit tests
npm test

# Build production bundle to dist/
npm run build

# Preview production build locally
npm run preview

# Clean build artifacts
npm run clean
```
