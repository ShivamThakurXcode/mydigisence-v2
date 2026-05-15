# Mydigisence — Development Roadmap

## Purpose
This document describes a phased, dependency-aware development plan for the Mydigisence platform and the recommended order of work to deliver a minimal, production-ready product and iterate faster.

## Principles
- Build the data model and core APIs first (single source of truth).
- Keep services small and testable (one responsibility per service).
- Deliver an end-to-end slice early (backend + API + web client) before expanding features.
- Automate CI, linting, and infra-as-code from day one.

## Phase 0 — Foundations
Priority: Immediate
Tasks:
- Finalize monorepo setup (pnpm, turbo, workspace boundaries).
- Add CI (build/test), linting, formatters, pre-commit hooks.
- Define repo conventions and contribution guidelines.
Deliverables: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, CI workflow.
Acceptance: CI passes on PRs, consistent linting rules.

## Phase 1 — Core data model & auth
Priority: Very High
Tasks:
- Design canonical data model (users, profiles, workspaces, roles, listings, bookings).
- Pick primary DB (recommended: Postgres + Prisma/ORM) and create schema + migrations.
- Implement `services/auth-service` and `services/user-service` (signup/login, email verification, tokens, workspace membership).
- Add local dev DB & migration scripts.
Deliverables: DB schema, migration scripts, auth API, unit tests.
Acceptance: Able to create users, verify, create workspace, and fetch profile via API.

## Phase 2 — Gateway & API contracts
Priority: High
Tasks:
- Implement `gateway-service` (API gateway / BFF) that proxies/aggregates microservices for `apps/web-platform`.
- Specify OpenAPI contracts for core endpoints (auth, users, profiles, search, marketplace basics).
- Implement API versioning strategy and request logging.
Deliverables: Gateway service, OpenAPI specs, basic e2e tests.
Acceptance: Web UI can consume gateway endpoints; contract tests pass.

## Phase 3 — Web platform baseline
Priority: High
Tasks:
- Scaffold `apps/web-platform` with Next.js routes for marketing, auth flows, and profile pages.
- Implement frontend auth flows (login/signup, session handling) calling gateway.
- Implement profile viewing and editing (public `u/[username]` and owner edit flows).
Deliverables: Working Next.js app with auth and profile slice, UI library bootstrap (`packages/ui`).
Acceptance: User can sign up, log in, and view/edit their profile end-to-end.

## Phase 4 — Marketplace & Booking core
Priority: Medium
Tasks:
- Implement `marketplace-service` (listings, services, products) and `booking-service` (availability, reservations).
- Expose marketplace APIs and frontend listing pages, booking flow.
Deliverables: Marketplace CRUD APIs, booking workflow, payment stub integration.
Acceptance: Users can create listings and make bookings (test mode).

## Phase 5 — Search, Recommendations, AI
Priority: Medium
Tasks:
- Add search service (Elasticsearch or OpenSearch) and vector search (Qdrant) for semantic queries.
- Implement `recommendation-service` and `ai-service` for prompts, content synthesis, and profile suggestions.
Deliverables: Search indexes, recommendation endpoints, basic AI-backed features.
Acceptance: Search returns relevant results; recommendations appear for profiles/listings.

## Phase 6 — Admin, Moderation, Verification
Priority: Medium-Low
Tasks:
- Build `admin-panel` app and `moderation-service` for content reviews, fraud detection, verification flows.
- Implement role-based access control in gateway and services.
Deliverables: Admin UI, moderation queue, verification workflows.
Acceptance: Admins can review reports and act on content/users.

## Phase 7 — Integrations & Payments
Priority: Medium
Tasks:
- Integrate payments (Stripe), email (SES/SendGrid), notifications (Webhooks/Push), and third-party auth.
- Implement `payment-service`, `email-service`, and `notification-service`.
Deliverables: Payment flows, billing records, transactional emails.
Acceptance: Payments succeed in sandbox; emails deliver.

## Phase 8 — Infrastructure & Scaling
Priority: Ongoing
Tasks:
- Containerize services; add Kubernetes manifests or Terraform for infra provisioning.
- Add caching (Redis), analytical storage (ClickHouse), and monitoring (Prometheus/Grafana, Sentry).
- Harden CI/CD, add blue/green or canary deployments.
Deliverables: `infrastructure/` manifests, deployment pipelines, monitoring dashboards.
Acceptance: Services deploy reproducibly and metrics are captured.

## Phase 9 — Security, Privacy & Compliance
Priority: Ongoing
Tasks:
- Threat modeling, input validation, rate-limiting, secret management.
- Data classification, retention policies, GDPR/CCPA compliance checks.
Deliverables: Security checklist, pen-test remediation plan.
Acceptance: Security review complete, critical issues resolved.

## Phase 10 — Polish, Docs, Tests, and Launch
Priority: After feature parity
Tasks:
- End-to-end tests, performance testing, UX polishing, SEO, accessibility.
- Complete developer docs (`/docs`), runbooks, and onboarding for engineers.
Deliverables: Test suites, README, runbooks, and knowledge transfer docs.
Acceptance: Stable release candidate and deployment plan.

## Milestones (example)
- M1 (2–4 weeks): Phase 0 + Phase 1 minimal (auth + user + DB + gateway) + web auth flows.
- M2 (4–8 weeks): Phase 2 + Phase 3 (public profiles + marketing).
- M3 (6–10 weeks): Phase 4 (marketplace + bookings) + payments.
- M4 (ongoing): Phase 5–9 (search/AI, admin, infra, security).

## Recommended Tech Stack (opinionated)
- Backend: Node.js/TypeScript, Express or Fastify, NestJS optional.
- DB: PostgreSQL (primary), Redis (cache), ClickHouse (analytics), Qdrant (vectors).
- Orm/Migrations: Prisma or TypeORM.
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS.
- Monorepo: pnpm + Turborepo.
- CI/CD: GitHub Actions, Docker, Kubernetes/Terraform.

## Next immediate steps (actionable)
1. Finalize data model ERD for users, profiles, workspaces, listings, bookings.
2. Implement DB schema and migrations.
3. Implement `auth-service` + `user-service` and basic gateway routes.
4. Build a small web slice: signup → login → create profile → view profile.

---

Created by automation — iterate this roadmap with stakeholders and convert prioritized items into scoped tickets (Jira/GitHub Issues) before coding.



```
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.9841 0.0026 247.8489);
  --foreground: oklch(0.2064 0.0388 265.5472);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0.2064 0.0388 265.5472);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.2064 0.0388 265.5472);
  --primary: oklch(0.2064 0.0388 265.5472);
  --primary-foreground: oklch(0.9846 0.0208 91.5819);
  --secondary: oklch(0.8088 0.1704 75.3501);
  --secondary-foreground: oklch(0.2064 0.0388 265.5472);
  --muted: oklch(0.9258 0.0132 255.0276);
  --muted-foreground: oklch(0.5564 0.0398 256.8166);
  --accent: oklch(0.9795 0.0242 91.6074);
  --accent-foreground: oklch(0.2064 0.0388 265.5472);
  --destructive: oklch(0.6356 0.2082 25.3782);
  --destructive-foreground: oklch(0.9838 0.0035 247.8583);
  --border: oklch(0.9258 0.0132 255.0276);
  --input: oklch(0.9258 0.0132 255.0276);
  --ring: oklch(0.2064 0.0388 265.5472);
  --chart-1: oklch(0.2064 0.0388 265.5472);
  --chart-2: oklch(0.8088 0.1704 75.3501);
  --chart-3: oklch(0.6776 0.1481 238.1044);
  --chart-4: oklch(0.8775 0.1567 89.7854);
  --chart-5: oklch(0.3752 0.0394 256.8467);
  --sidebar: oklch(0.2064 0.0388 265.5472);
  --sidebar-foreground: oklch(0.9838 0.0035 247.8583);
  --sidebar-primary: oklch(0.8088 0.1704 75.3501);
  --sidebar-primary-foreground: oklch(0.2064 0.0388 265.5472);
  --sidebar-accent: oklch(0.2753 0.0364 259.6978);
  --sidebar-accent-foreground: oklch(0.9838 0.0035 247.8583);
  --sidebar-border: oklch(0.3499 0.0503 259.6623);
  --sidebar-ring: oklch(0.8088 0.1704 75.3501);
  --font-sans: Inter, -apple-system, sans-serif;
  --font-serif: Playfair Display, serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.5rem;
  --shadow-x: 0px;
  --shadow-y: 4px;
  --shadow-blur: 10px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.05;
  --shadow-color: hsl(222, 47%, 11%);
  --shadow-2xs: 0px 4px 10px 0px hsl(222 47% 11% / 0.03);
  --shadow-xs: 0px 4px 10px 0px hsl(222 47% 11% / 0.03);
  --shadow-sm: 0px 4px 10px 0px hsl(222 47% 11% / 0.05), 0px 1px 2px -1px hsl(222 47% 11% / 0.05);
  --shadow: 0px 4px 10px 0px hsl(222 47% 11% / 0.05), 0px 1px 2px -1px hsl(222 47% 11% / 0.05);
  --shadow-md: 0px 4px 10px 0px hsl(222 47% 11% / 0.05), 0px 2px 4px -1px hsl(222 47% 11% / 0.05);
  --shadow-lg: 0px 4px 10px 0px hsl(222 47% 11% / 0.05), 0px 4px 6px -1px hsl(222 47% 11% / 0.05);
  --shadow-xl: 0px 4px 10px 0px hsl(222 47% 11% / 0.05), 0px 8px 10px -1px hsl(222 47% 11% / 0.05);
  --shadow-2xl: 0px 4px 10px 0px hsl(222 47% 11% / 0.13);
  --tracking-normal: -0.015em;
  --spacing: 0.25rem;
}

.dark {
  --background: oklch(0.1358 0.0163 262.7113);
  --foreground: oklch(0.9838 0.0035 247.8583);
  --card: oklch(0.1573 0.0228 265.6559);
  --card-foreground: oklch(0.9838 0.0035 247.8583);
  --popover: oklch(0.1468 0.0195 264.6191);
  --popover-foreground: oklch(0.9838 0.0035 247.8583);
  --primary: oklch(0.7858 0.1598 85.3091);
  --primary-foreground: oklch(0.1358 0.0163 262.7113);
  --secondary: oklch(0.2064 0.0388 265.5472);
  --secondary-foreground: oklch(0.7858 0.1598 85.3091);
  --muted: oklch(0.2753 0.0364 259.6978);
  --muted-foreground: oklch(0.7100 0.0348 256.7872);
  --accent: oklch(0.2753 0.0364 259.6978);
  --accent-foreground: oklch(0.7858 0.1598 85.3091);
  --destructive: oklch(0.3901 0.1297 25.5736);
  --destructive-foreground: oklch(0.9838 0.0035 247.8583);
  --border: oklch(0.2753 0.0364 259.6978);
  --input: oklch(0.2753 0.0364 259.6978);
  --ring: oklch(0.7858 0.1598 85.3091);
  --chart-1: oklch(0.7858 0.1598 85.3091);
  --chart-2: oklch(0.9838 0.0035 247.8583);
  --chart-3: oklch(0.6776 0.1481 238.1044);
  --chart-4: oklch(0.2887 0.0646 265.1126);
  --chart-5: oklch(0.9110 0.1206 91.4553);
  --sidebar: oklch(0.1358 0.0163 262.7113);
  --sidebar-foreground: oklch(0.9838 0.0035 247.8583);
  --sidebar-primary: oklch(0.7858 0.1598 85.3091);
  --sidebar-primary-foreground: oklch(0.2064 0.0388 265.5472);
  --sidebar-accent: oklch(0.2261 0.0270 259.7371);
  --sidebar-accent-foreground: oklch(0.7858 0.1598 85.3091);
  --sidebar-border: oklch(0.2753 0.0364 259.6978);
  --sidebar-ring: oklch(0.7858 0.1598 85.3091);
  --font-sans: Inter, -apple-system, sans-serif;
  --font-serif: Playfair Display, serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.5rem;
  --shadow-x: 0px;
  --shadow-y: 8px;
  --shadow-blur: 15px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.4;
  --shadow-color: hsl(0, 0%, 0%);
  --shadow-2xs: 0px 8px 15px 0px hsl(0 0% 0% / 0.20);
  --shadow-xs: 0px 8px 15px 0px hsl(0 0% 0% / 0.20);
  --shadow-sm: 0px 8px 15px 0px hsl(0 0% 0% / 0.40), 0px 1px 2px -1px hsl(0 0% 0% / 0.40);
  --shadow: 0px 8px 15px 0px hsl(0 0% 0% / 0.40), 0px 1px 2px -1px hsl(0 0% 0% / 0.40);
  --shadow-md: 0px 8px 15px 0px hsl(0 0% 0% / 0.40), 0px 2px 4px -1px hsl(0 0% 0% / 0.40);
  --shadow-lg: 0px 8px 15px 0px hsl(0 0% 0% / 0.40), 0px 4px 6px -1px hsl(0 0% 0% / 0.40);
  --shadow-xl: 0px 8px 15px 0px hsl(0 0% 0% / 0.40), 0px 8px 10px -1px hsl(0 0% 0% / 0.40);
  --shadow-2xl: 0px 8px 15px 0px hsl(0 0% 0% / 1.00);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    letter-spacing: var(--tracking-normal);
  }
}
```

