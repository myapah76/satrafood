# Security Rules & Data Protection

> Mandatory security invariants, credential handling, and threat mitigation guidelines for **Satrafoods**.

---

## 1. Secrets & Credential Management

- **Zero Secrets in VCS:** Never commit `.env`, private keys, API credentials, passwords, or session tokens to Git.
- **Gitignore Verification:** Verify that `.gitignore` contains rules blocking `.env*` while preserving `!.env.example`.
- **Client Bundle Isolation:** In Vite applications, all variables prefixed with `VITE_` are embedded into the client-side JavaScript bundle and are publicly visible. **Never prefix private credentials (such as `GEMINI_API_KEY`) with `VITE_`.**
- **Automated Audit:** If a credential is inadvertently committed, it must be considered compromised and rotated immediately.

---

## 2. Input Sanitization & Injection Prevention

- **Search Queries:** Sanitize user input before processing regexes or DOM updates to prevent ReDoS (Regular Expression Denial of Service).
- **No `dangerouslySetInnerHTML`:** Never render unescaped user input using `dangerouslySetInnerHTML`. Use native JSX text nodes, which automatically escape HTML entities to prevent Cross-Site Scripting (XSS).
- **Telephone & Form Inputs:** Enforce strict format checks on phone numbers (e.g. Vietnamese telephone formats `^0[3|5|7|8|9][0-9]{8}$`) and email addresses before submission.

---

## 3. Financial & Business Logic Security

- **Client vs Server Trust:** Currently, cart totals and discount codes are computed client-side in `src/utils/cart.ts` for demonstration and UI responsiveness.
- **Production Warning:** When connecting to a production payment gateway or order management system, **all pricing, coupons, member discounts, and delivery charges must be recalculated and verified server-side.** Never trust client-submitted transaction totals.

---

## 4. Operational Security Rules

1. **Never Disable Security for Tests:** Never turn off TypeScript strict mode, disable lint rules, or bypass security checks just to make a test pass.
2. **Safe Logging:** Never log customer Personally Identifiable Information (PII) such as unmasked phone numbers, email addresses, or transaction details to public browser logs.
3. **External Dependencies:** Only install reputable, verified packages from npm. Check for known CVEs using `npm audit` when adding new libraries.
