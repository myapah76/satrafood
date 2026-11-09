# Backend Architecture & API Standards

> Specifies the current backend state, architectural guidelines for future server integrations, and API conventions for **Satrafoods**.

---

## 1. Current State of the Backend

- **Current Implementation:** The application is a client-side Single Page Application (SPA).
- **Persistence & Data:** In-memory mock data store defined in `src/data/mockData.ts`.
- **Business Logic:** Pure TypeScript algorithms for calculating cart totals, discounts, vouchers, and VietGAP filtering in `src/utils/cart.ts`.
- **Existing Dependencies:** `express`, `@google/genai`, and `dotenv` are present in `package.json`, reserved for server-side Gemini AI features and backend proxy services.

> **Principle:** AI agents must not pretend an active external database or live REST/GraphQL backend exists when one does not. Always distinguish between actual implementation and planned architecture.

---

## 2. Standards for Future Backend Implementations

When developing Node.js / Express backend endpoints or server-side functions:

### 2.1. Layered Architecture
```text
server/ (or api/)
├── controllers/    # HTTP request handling, status codes, DTO mapping
├── services/       # Domain business logic, coupon verification, AI orchestration
├── repositories/   # Data access layer, database queries
├── middleware/     # Auth, error handling, rate limiting, request validation
└── utils/          # Pure helper utilities
```

### 2.2. Standardized Response Envelope
All API endpoints must return a predictable JSON payload:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}
```

### 2.3. Request Validation & DTOs
- Validate all incoming payloads before passing data to service layers.
- Check data types, value boundaries (e.g. quantity > 0), and string lengths.
- Sanitize user inputs to prevent injection attacks.

### 2.4. Error Handling Guidelines
- Implement centralized error-handling middleware in Express.
- Map internal exceptions to standard HTTP status codes:
  - `400 Bad Request`: Validation failures or malformed inputs.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `403 Forbidden`: Insufficient permissions.
  - `404 Not Found`: Resource does not exist.
  - `422 Unprocessable Entity`: Business logic violations (e.g., expired coupon).
  - `500 Internal Server Error`: Unexpected server errors.
- **Never expose raw stack traces, database schema details, or system paths in responses.**

### 2.5. Server-Side AI (Gemini) Integration
- Call `@google/genai` only from secure server-side environments.
- Read `GEMINI_API_KEY` from `process.env`.
- Implement rate limiting and input truncation to prevent token exhaustion.
- Never pass unvalidated user input directly into model system prompts without guardrails.
