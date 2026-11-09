# Testing & Quality Gates

> Testing conventions, verification commands, and quality gates for **Satrafoods**.

---

## 1. Testing Infrastructure

- **Test Runner:** Node.js native test runner (`node:test` and `node:assert/strict`).
- **TypeScript Execution:** Executed via `tsx` for instant, compilation-free execution.
- **Test File Location:** Co-located with source files using `.test.ts` naming convention (e.g., `src/utils/cart.test.ts`).
- **Configuration:** Registered in `package.json` under `"scripts": { "test": "tsx --test src/**/*.test.ts" }`.

---

## 2. Quality Gates Checklist

Before submitting or completing any task, every AI agent must execute and pass the following quality gates in order:

```bash
# Gate 1: Static Type Check (must exit with 0 errors)
npm run lint

# Gate 2: Unit Test Suite (all suites must pass)
npm test

# Gate 3: Production Build (must bundle cleanly without warnings)
npm run build
```

> **Honesty Mandate:** Never report that a test, typecheck, or build passed if it was not actually executed in the current session.

---

## 3. Writing Unit Tests

When adding or modifying business logic in `src/utils/` or data transformers:

1. **Use Native Assertions:**
   ```typescript
   import test from 'node:test';
   import assert from 'node:assert/strict';
   import { calculateCartTotals, formatVND } from './cart';
   ```
2. **Cover Boundary Conditions:**
   - Empty collections (e.g. empty cart `[]`).
   - Boundary values for discounts (e.g. subtotal just below or equal to 200.000đ freeship threshold).
   - Case-insensitive search queries and accent-insensitive Vietnamese matching.
   - Zero or negative quantities.
3. **Keep Tests Deterministic:** Tests must not depend on network access, active clocks, or external disk state.
