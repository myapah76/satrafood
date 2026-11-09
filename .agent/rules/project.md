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

---

## 3. Directory Layout

The repository follows a single unified structure rooted in `src/`:

```text
satrafoods/
├── .agent/                     # Antigravity & AI Agent Instruction System
│   └── rules/                  # Modular rules (project, architecture, frontend, etc.)
├── .github/                    # GitHub configuration & Copilot instructions
│   └── copilot-instructions.md # GitHub Copilot entry point
├── public/                     # Public assets served directly by Vite
│   └── assets/aistudio/        # Historical design reference assets & specs
├── src/                        # Main application source code
│   ├── components/             # Reusable & page-level UI components
│   │   ├── CartDrawer.tsx      # Slide-out interactive shopping basket
│   │   ├── CategoryPage.tsx    # Catalog view with filters & product grid
│   │   ├── Footer.tsx          # 4 commitments, legal info, CSKH hotline
│   │   ├── Header.tsx          # Responsive navigation, search & quick delivery
│   │   ├── HomePage.tsx        # Hero banner, deals countdown, store locator
│   │   ├── LocationModal.tsx   # Fast 2-hour delivery district selector
│   │   ├── MembershipModal.tsx # Satra Rewards member card & 2% point tracker
│   │   ├── MobileBottomNav.tsx # 5-tab fixed bottom navigation for mobile
│   │   ├── MobileFilterDrawer.tsx # Sliding bottom-sheet filter for mobile/tablet
│   │   └── TraceabilityModal.tsx  # QR code provenance record popup
│   ├── data/                   # In-memory mock data
│   │   └── mockData.ts         # 12 VietGAP products, 3 deals, 18 categories, 6 stores
│   ├── types/                  # TypeScript interface contracts
│   │   └── index.ts            # Product, CartItem, FilterOptions, StoreLocation, etc.
│   ├── utils/                  # Pure utility functions & unit tests
│   │   ├── cart.ts             # Currency formatter, pricing, filtering, sorting
│   │   └── cart.test.ts        # Unit test suite for cart & filtering logic
│   ├── AGENTS.md               # Frontend module-specific agent instructions
│   ├── App.tsx                 # Root application coordinator
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Tailwind v4 theme tokens & typography classes
├── AGENTS.md                   # Central agent instructions (Codex / Universal)
├── CLAUDE.md                   # Claude Code CLI instructions
├── GEMINI.md                   # Gemini CLI instructions
├── index.html                  # HTML entry point with meta tags & fonts
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
