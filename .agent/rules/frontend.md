# Frontend Engineering & UI/UX Standards

> Establishes component design standards, styling conventions, responsive guidelines, and accessibility rules for **Satrafoods** using **Tailwind CSS v4** and **UI/UX Pro Max**.

---

## 1. Visual Identity: The "Gói" Design System

The Satrafoods interface embodies the concept of **"Gói"** (packaging, safeguarding, origin verification, and market freshness). It merges **Graphic Minimalism** with **Constructed Retail Packaging**:

### 1.1. Color Tokens (`src/index.css`)

Exact print and digital color standards for Satrafoods:

| Color Name | RGB | CMYK | Hex | CSS Variable | Usage & WCAG Compliance |
|---|---|---|---|---|---|
| **Primary Brand Green** | `1 179 65` | `99 0 64 30` | `#01B341` | `--color-brand-green` | Primary branding, buttons, verification seals, header trims |
| **Brand Lime** | `218 255 110` | `15 0 100 0` | `#DAFF01` | `--color-brand-lime` | High-voltage badges, active cart counter |
| **Promo Pink (HOT)** | `252 149 253` | `0 41 0 1` | `#FC95FD` | `--color-promo-pink` | HOT khuyến mãi badges, special deals, flash sale chips |
| **White Canvas** | `255 255 255` | `0 0 0 0` | `#FFFFFF` | `--color-white` | Base card backgrounds, container surfaces |
| **Accent Orange** | `255 148 0` | `0 42 100 0` | `#FF9400` | `--color-promo-orange` | Combo package tags, bundle callouts, deal highlights |
| **Alert Red** | `255 22 31` | `0 91 88 0` | `#FF161F` | `--color-promo-red` | Flash sale badges, discount tags, urgent notifications |
| **Deep Green** | `0 110 36` | `100 0 67 57` | `#006E24` | `--color-primary` | High-contrast accessible text tone on white surfaces |
| **Neutral Black** | `17 17 17` | `0 0 0 93` | `#111111` | `--color-text-primary` | Primary typography. Mandatory on Lime, Pink (#FC95FD), and Green |
| **Muted Slate** | `85 94 87` | `10 0 7 63` | `#555E57` | `--color-text-muted` | Secondary metadata, units, strikethrough original prices |
| **Surface Border** | `227 232 225` | `2 0 3 9` | `#E3E8E1` | `--color-surface-border` | Hairline dividers and structured container outlines |
| **Surface Subtle** | `246 248 245` | `1 0 1 3` | `#F6F8F5` | `--color-surface-subtle` | Alternating shelf rows, input backgrounds, tag surfaces |

### 1.2. Corner Radius Standard: Strict 4px Rule
To align with the constructed packaging aesthetic ("Gói") and graphic retail minimalism:
- All buttons, chips, badges, input controls, dropdowns, search bars, and card containers must strictly use **4px corner radius** (`rounded-[4px]`).
- Do NOT use pill-shaped (`rounded-full`) or excessively rounded (`rounded-xl`, `rounded-2xl`) corners for structural controls unless specifically documenting a special exception.

### 1.3. Slug-Based Navigation Standard
- Every category and sub-category route supports bi-directional URL slugs via `fe/src/utils/slug.ts`:
  - `Thịt heo thảo mộc & VietGAP` $\leftrightarrow$ `thit-heo-thao-moc-vietgap`
  - `Bò Úc & Bò ta nhập khẩu` $\leftrightarrow$ `bo-uc-bo-ta-nhap-khau`
  - `Gia cầm tươi chuẩn CP` $\leftrightarrow$ `gia-cam-tuoi-chuan-cp`
  - `Cá & Hải sản tươi sống` $\leftrightarrow$ `ca-hai-san-tuoi-song`
  - `Rau ăn lá VietGAP` $\leftrightarrow$ `rau-an-la-vietgap`
  - `Củ quả sạch Đà Lạt` $\leftrightarrow$ `cu-qua-sach-da-lat`
  - `Trái cây nhiệt đới Nam Bộ` $\leftrightarrow$ `trai-cay-nhiet-doi-nam-bo`
  - `Món sơ chế nấu ngay` $\leftrightarrow$ `mon-so-che-nau-ngay`
  - `Khuyến mãi hot` $\leftrightarrow$ `khuyen-mai-hot`
  - `all` $\leftrightarrow$ `tat-ca-thuc-pham`
- Catalog breadcrumb navigation must strictly follow: `Trang chủ` / `Danh mục sản phẩm` / `[Tên phân ngành]`.

### 1.4. Typography System
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
