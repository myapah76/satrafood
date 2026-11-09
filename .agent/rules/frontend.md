# Frontend Engineering & UI/UX Standards

> Establishes component design standards, styling conventions, responsive guidelines, and accessibility rules for **Satrafoods** using **Tailwind CSS v4** and **UI/UX Pro Max**.

---

## 1. Visual Identity: The "Gói" Design System

The Satrafoods interface embodies the concept of **"Gói"** (packaging, safeguarding, origin verification, and market freshness). It merges **Graphic Minimalism** with **Constructed Retail Packaging**:

### 1.1. Color Tokens (`src/index.css`)
| Token | Variable | Hex | Usage & WCAG Compliance |
|---|---|---|---|
| **Brand Green** | `--color-brand-green` | `#01B341` | Primary branding, buttons, verification seals, header trims |
| **Deep Green** | `--color-primary` | `#006E24` | Accessible text tone on white, primary dark containers |
| **Brand Lime** | `--color-brand-lime` | `#DAFF01` | High-voltage promo badges, countdowns, active cart counter |
| **Neutral Black** | `--color-text-primary` | `#111111` | Primary typography. **Mandatory** on Brand Lime (16.3:1) and Brand Green (6.7:1) |
| **Muted Slate** | `--color-text-muted` | `#555E57` | Secondary metadata, units, strikethrough original prices |
| **Surface Canvas** | `--color-surface-canvas` | `#FFFFFF` | Base background for product cards and modals |
| **Surface Subtle** | `--color-surface-subtle` | `#F6F8F5` | Alternating shelf rows, input backgrounds, tag surfaces |
| **Surface Border** | `--color-surface-border` | `#E3E8E1` | Crisp hairline dividers and structured container outlines |
| **Discount Red** | `--color-accent-red` | `#FF161F` | Clearance badges, sale pricing, urgent notifications |
| **Combo Orange** | `--color-accent-orange` | `#FF9500` | Combo package tags, special bundle callouts |

### 1.2. Typography System
- **Engine:** Google Fonts `Familjen Grotesk` with fallback to sans-serif.
- **Heading Styles:** Set in heavy weights (700/800) with subtle negative letter spacing (`-0.01em` to `-0.02em`).
- **Data & Pricing:** Tabular numeric alignment with `font-title-lg` and `font-label-lg` for fast horizontal price comparison.
- **Available Utility Classes:** `font-headline-xl`, `font-headline-lg`, `font-headline-md`, `font-headline-sm`, `font-title-lg`, `font-title-md`, `font-body-lg`, `font-body-md`, `font-body-sm`, `font-label-lg`, `font-label-md`, `font-label-sm`.

---

## 2. Component Design & Code Conventions

1. **TypeScript First**: Every component file must export explicit interfaces for its props:
   ```tsx
   interface ProductCardProps {
     product: Product;
     onAddToCart: (product: Product) => void;
     onShowTraceability: (product: Product) => void;
   }
   ```
2. **Semantic Elements**: Never use a generic `<div>` where `<header>`, `<main>`, `<nav>`, `<aside>`, `<section>`, `<footer>`, or `<button>` is semantically appropriate.
3. **Icons & Controls**:
   - **No Emojis as Structural Icons**: Always use Google Material Symbols Outlined or Lucide vector icons (`<span className="material-symbols-outlined">...</span>`).
   - Every icon-only button must include a descriptive `aria-label` attribute (e.g. `aria-label="Đóng giỏ hàng"`).
4. **Currency Formatting**: Always invoke `formatVND(amount)` from `src/utils/cart.ts` to output `76.000 đ`. Never format currency strings manually.

---

## 3. Responsive Layout Strategy

| Viewport | Breakpoint | Header Layout | Catalog Layout | Navigation |
|---|---|---|---|---|
| **Mobile** | `< 640px` | 3-row stack (Logo+Location+Cart, Search, Chips) | 2-column grid (`grid-cols-2 gap-3`) | `MobileBottomNav` fixed at bottom |
| **Tablet** | `640px - 1023px` | 3-row stack with wider search | 3-column grid (`grid-cols-3 gap-4`) | `MobileFilterDrawer` for filters |
| **Desktop** | `1024px - 1280px` | 3-column top bar + Mega menu sub-bar | 4-column grid (`grid-cols-4 gap-4`) | Left static filter sidebar |
| **Large Desktop** | `>= 1280px` | Max container 1240px, centered | 4-column grid (`grid-cols-4 gap-5`) | Full sidebar + voucher module |

### Responsive Invariants:
- **Touch Target Minimum:** All interactive buttons on mobile must provide a touch target $\ge 44\text{px}$ in height/width.
- **Zero Horizontal Overflow:** Never allow viewport stretching; verify on 375px screens.
- **Above-The-Fold Rule on Mobile:** On mobile screens, never render long desktop filter sidebars above the catalog. Use `MobileFilterDrawer` instead.
- **Safe Area Insets:** Fixed bottom bars must use `pb-[env(safe-area-inset-bottom,0px)]`.

---

## 4. Accessibility (A11y) & Usability Gates

- [ ] All images have descriptive `alt` text explaining product details or brand identity.
- [ ] Meaningful color contrast $\ge 4.5:1$ for body copy and $\ge 3:1$ for large text and UI components.
- [ ] Keyboard navigation: All clickable elements are natively focusable buttons or links with visible `:focus-visible` styles.
- [ ] Toast notifications do not steal keyboard focus and auto-dismiss gracefully.
