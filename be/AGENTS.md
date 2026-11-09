# Backend Architecture Pointer — `be/`

> Reference pointer for backend coding agents working on **Satrafoods**.

---

## Repository Path Note

In this repository, the application currently operates as a client-side Single Page Application (SPA) driven by React 19 and Vite:

- **Central Project Instructions:** [`../AGENTS.md`](../AGENTS.md)
- **Backend Architecture & API Rules:** [`../.agent/rules/backend.md`](../.agent/rules/backend.md)
- **Security & Data Handling:** [`../.agent/rules/security.md`](../.agent/rules/security.md)

If a standalone backend service (e.g. Express REST API or microservice) is extracted into this directory, this file will serve as the dedicated backend instruction anchor. Currently, server-side dependencies (`express`, `@google/genai`, `dotenv`) are maintained in the root `package.json` for serverless or proxy execution.
