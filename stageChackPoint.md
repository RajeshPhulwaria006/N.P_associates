# Stage 2 Checkpoint Report — Backend Foundations & Core Models

**Project:** N.P Associates Website + Admin Prototype  
**Date:** 2026-10-28  
**Status:** Completed & Tested

---

## 1. Summary of Changes & Rationale

1. **Workspace and Lint Configuration Fixed**:
   - Fixed `package.json` workspace configuration and script definitions (`"lint": "npm run lint -ws --if-present"`).
   - Inspected installed ESLint version: ESLint **v9.39.5** (flat config). Created `client/eslint.config.js` and `server/eslint.config.js` flat configs utilizing `@eslint/js`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `globals`.
   - Added `client/src/styles/global.css` with design token imports and CSS reset.
   - Tested and verified `npm run lint` completes with 0 errors and 0 warnings across all workspaces.

2. **Environment Configuration**:
   - Created `server/src/config/env.js` with Zod schema validation. Validates `PORT`, `NODE_ENV`, `CLIENT_ORIGIN`, `SESSION_SECRET`, and optional `MONGODB_URI` for test/dev mode so automated test suites and health checks can run without a live MongoDB instance.
   - Created `.env.example` with clear, safe development placeholders and zero hardcoded secrets.

3. **Database Connection Helper**:
   - Created `server/src/config/database.js` managing mongoose connection state with graceful handling when `MONGODB_URI` is not provided in test/dev modes, and state query helper `isDbConnected()`.

4. **Minimal Mongoose Schemas & Models**:
   - `LoanService`: bilingual fields (`title`, `shortDescription`, `description`, `eligibility`, `documents`), unique indexed `slug`, publication status enum (`draft`, `published`), sort order, and timestamps.
   - `Guideline`: bilingual `title` and `content`, unique indexed `slug`, status enum (`draft`, `published`), review date, sort order, and timestamps.
   - `Enquiry`: random non-sequential `referenceId` (format `NP-XXXXXXXX`), validated name/phone/serviceType, consent metadata, status enum (`new`, `in_progress`, `contacted`, `closed`, `spam`), and private `adminNotes` with `select: false` so internal notes are never exposed in queries by default.
   - `AdminUser`: normalized email, `passwordHash` (`select: false`), role (`admin`), active boolean, last login timestamp, and `verifyPassword` method using `bcryptjs`.
   - `AuditLog`: immutable append-only log capturing actor ID, action enum, entity type, entity ID, and safe change metadata (no passwords or credentials).

5. **Express App & Security Middleware**:
   - Created `server/src/app.js` configured with `helmet()`, explicit `cors()` restricted to `env.CLIENT_ORIGIN` with credentials, body parsers limited to 10kb, `cookie-parser()`, IP rate limiting on `/api/`, health route `/api/v1/health`, 404 handler, and centralized error handler (`errorHandler.js`).
   - Created `server/src/middleware/rateLimiters.js` with distinct limits for general API, enquiries (strict), and auth attempts.
   - Created `server/src/middleware/validate.js` Zod request validator helper.
   - Created `server/src/server.js` startup entry point with graceful shutdown handling for `SIGTERM` and `SIGINT`.

---

## 2. Files Created / Modified

| File | Status | Description |
|------|--------|-------------|
| `.env.example` | Created | Safe template environment variables |
| `package.json` | Modified | Workspaces configuration, cross-workspace scripts |
| `client/package.json` | Modified | Frontend dependencies & scripts |
| `client/index.html` | Created | HTML entry point |
| `client/eslint.config.js` | Created | ESLint 9 flat config for React |
| `client/src/main.jsx` | Modified | Clean React entry point |
| `client/src/App.jsx` | Modified | Minimal shell component |
| `client/src/styles/tokens.css` | Created | Design tokens (colors, radii, spacing, typography) |
| `client/src/styles/global.css` | Created | Token imports and baseline CSS reset |
| `client/vite.config.js` | Created | Vite config with API proxy |
| `server/package.json` | Created | Backend dependencies & scripts |
| `server/eslint.config.js` | Created | ESLint 9 flat config for Node |
| `server/src/config/env.js` | Created | Zod schema environment validation |
| `server/src/config/database.js` | Created | MongoDB connection lifecycle helper |
| `server/src/models/LoanService.js` | Created | Bilingual loan service model |
| `server/src/models/Guideline.js` | Created | Bilingual guideline model |
| `server/src/models/Enquiry.js` | Created | Customer enquiry model with non-sequential reference ID |
| `server/src/models/AdminUser.js` | Created | Admin user model with bcrypt verification |
| `server/src/models/AuditLog.js` | Created | Audit log model for change tracking |
| `server/src/middleware/rateLimiters.js` | Created | Rate limiters for general API, enquiries, and auth |
| `server/src/middleware/errorHandler.js` | Created | Centralized error handler without stack leak in prod |
| `server/src/middleware/validate.js` | Created | Zod request validation middleware |
| `server/src/routes/health.routes.js` | Created | `GET /api/v1/health` endpoint |
| `server/src/app.js` | Created | Express application setup |
| `server/src/server.js` | Created | Server listen and shutdown handler |
| `server/test/health.routes.test.js` | Created | Vitest tests for health and 404 routes |

---

## 3. Real Check Results

- **ESLint**:
  ```bash
  $ npm run lint
  > client@0.1.0 lint
  > eslint .
  > server@0.1.0 lint
  > eslint .
  ```
  Result: **0 errors, 0 warnings**.

- **Backend Tests**:
  ```bash
  $ npm run test
  > server@0.1.0 test
  > vitest run
  ✓ test/health.routes.test.js (2)
    ✓ GET /api/v1/health (2)
      ✓ should return 200 with healthy status
      ✓ should return 404 for non-existent API routes
  Test Files  1 passed (1)
       Tests  2 passed (2)
  ```
  Result: **All 2 tests passed**.

- **Client Production Build**:
  ```bash
  $ npm run build
  ✓ 31 modules transformed.
  ✓ built in 1.63s
  ```
  Result: **Success**.

---

## 4. Known Limitations & Remaining Risks

1. **MongoDB Connection**: Requires a running MongoDB instance when storing live enquiries or service records. In test/dev mode without MongoDB active, health checks report `database: disconnected` gracefully.
2. **Authentication Middleware**: Intentionally reserved for Stage 4 when session authentication is fully built.

---

## 5. Next Steps (Stage 3)

- Public website implementation (Home, Services, Guidelines, About, Contact, Legal/Privacy/Terms).
- Bilingual toggle and context with persistence.
- Public enquiry form with client and server validation.
- Public read API routes (`GET /api/v1/services`, `GET /api/v1/guidelines`) and enquiry submission (`POST /api/v1/enquiries`).
