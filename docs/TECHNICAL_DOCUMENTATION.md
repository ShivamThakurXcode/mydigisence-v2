# MyDigiSence — Complete Technical Documentation

> **Version:** 1.0 | **Date:** 2026-05-15 | **Status:** Platform Architecture & Scaffold Phase

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Platform Vision & Philosophy](#2-platform-vision--philosophy)
3. [Platform User Types & Identity Model](#3-platform-user-types--identity-model)
4. [Monorepo Structure & Workspace Layout](#4-monorepo-structure--workspace-layout)
5. [Technology Stack](#5-technology-stack)
6. [Frontend Architecture — Web Platform](#6-frontend-architecture--web-platform)
7. [Routing Architecture — Next.js App Router](#7-routing-architecture--nextjs-app-router)
8. [Component Architecture & Design System](#8-component-architecture--design-system)
9. [Backend Architecture](#9-backend-architecture)
10. [Microservices Catalog](#10-microservices-catalog)
11. [Shared Packages Catalog](#11-shared-packages-catalog)
12. [Database Architecture](#12-database-architecture)
13. [Core Data Collections](#13-core-data-collections)
14. [Authentication & Authorization System](#14-authentication--authorization-system)
15. [Core Platform Engines](#15-core-platform-engines)
16. [Dynamic Profile Architecture](#16-dynamic-profile-architecture)
17. [Dynamic Dashboard Architecture](#17-dynamic-dashboard-architecture)
18. [Workspace System](#18-workspace-system)
19. [Marketplace System](#19-marketplace-system)
20. [Search & Discovery Architecture](#20-search--discovery-architecture)
21. [Messaging & Real-Time System](#21-messaging--real-time-system)
22. [CRM & Automation System](#22-crm--automation-system)
23. [AI Integration Layer](#23-ai-integration-layer)
24. [Infrastructure Architecture](#24-infrastructure-architecture)
25. [Security Architecture](#25-security-architecture)
26. [Scalability Strategy](#26-scalability-strategy)
27. [Design System & Theme Tokens](#27-design-system--theme-tokens)
28. [CI/CD & Development Workflow](#28-cicd--development-workflow)
29. [Development Roadmap & Phases](#29-development-roadmap--phases)
30. [Current Project State](#30-current-project-state)
31. [MVP Feature Set](#31-mvp-feature-set)
32. [Future Expansion Roadmap](#32-future-expansion-roadmap)
33. [Engineering Principles](#33-engineering-principles)

---


## 1. Executive Summary

**MyDigiSence** is an enterprise-grade, modular intelligent digital ecosystem platform. It unifies businesses, professionals, creators, freelancers, agencies, and explorers into a single scalable architecture.

The platform combines capabilities typically found across ten separate products — LinkedIn, Shopify, Upwork, HubSpot, Notion, Webflow, Behance, Calendly, Fiverr, and CRM systems — into a single engine-based, config-driven, dynamically rendered system.

**Core equation:**

```
Identity + Discovery + Profiles + Dashboards + Marketplace + AI + Automation
= MyDigiSence
```

**Current status:** Architectural scaffold complete. All directories and structural files exist. Core implementation begins at Phase 1 of the development roadmap.

---

## 2. Platform Vision & Philosophy

### 2.1 Core Vision

> To become the unified operating system for digital presence, business identity, professional identity, service discovery, and intelligent online ecosystems.

The platform enables:
- Businesses to create scalable digital ecosystems
- Professionals to build intelligent portfolios and service identities
- Users to discover services, businesses, professionals, and communities
- AI systems to optimize digital presence automatically
- Dynamic dashboards that adapt to user role and business type

### 2.2 Dynamic Architecture Principle

The platform never relies on hardcoded layouts, dashboards, or workflows. Everything is:

| Characteristic | Meaning |
|---|---|
| Config-driven | All behaviors configurable without code changes |
| Registry-based | Components loaded from a central registry |
| Modular | Every feature is an isolated, swappable module |
| Scalable | Designed for horizontal scaling from day one |
| Dynamically rendered | UI adapts to user role, workspace type, enabled modules |

### 2.3 Engine-Based Platform

The system is not a collection of static pages. It is composed of **9 core engines**:

| Engine | Responsibility |
|---|---|
| Onboarding Engine | Adaptive setup flows per user type and business type |
| Workspace Engine | Manages workspace state, permissions, modules |
| Profile Engine | Dynamic section loading per role and config |
| Dashboard Engine | Widget-driven adaptive dashboards |
| Module Engine | Enable/disable/configure features per workspace |
| Recommendation Engine | Personalized content and profile discovery |
| Search Engine | Multi-modal search with semantic AI support |
| AI Engine | Platform intelligence, content generation, optimization |
| Automation Engine | Workflow triggers, campaigns, scheduled actions |

### 2.4 Multi-Identity System

One user account can simultaneously:
- Own multiple businesses
- Act as a professional across different workspaces
- Operate as a creator
- Manage teams
- Explore services as a consumer
- Sell products
- Join communities

The identity system supports multi-workspace architecture, multi-role systems, dynamic permissions, and profile switching.

---

## 3. Platform User Types & Identity Model

### 3.1 Business Users

Target types:
- SaaS companies, Agencies, Startups, Consulting firms
- Restaurants, Hotels, Healthcare organizations
- E-commerce stores, Education platforms
- Coaching businesses, Local businesses, Creator brands

**What they get:** Workspace, CRM, booking system, analytics dashboard, service listings, team management, marketing automation, custom domain.

### 3.2 Professional Users

Target types:
- Developers, Designers, Writers, Architects
- Video editors, Marketers, Teachers, Coaches
- Lawyers, Accountants, Consultants, Freelancers
- Researchers, Artists

**What they get:** Professional portfolio profile, skills management, service offerings, booking calendar, client management, reviews/testimonials, messaging.

### 3.3 Explorer Users

Actions available:
- Discover businesses and professionals
- Search and filter services
- Follow profiles
- Book services
- Join communities and consume content
- Write reviews
- Message service providers

---

## 4. Monorepo Structure & Workspace Layout

The repository uses **pnpm + Turborepo** as a monorepo.

```
mydigisence/
├── apps/                        # Application shells (5)
│   ├── web-platform/            # PRIMARY — Next.js 15 App Router
│   ├── admin-panel/             # Admin dashboard (scaffold)
│   ├── ai-studio/               # AI tools app (scaffold)
│   ├── marketing-site/          # Public marketing site (scaffold)
│   └── mobile-app/              # Mobile application (scaffold)
│
├── packages/                    # Shared libraries (23)
│   ├── ai-sdk/                  # AI service integration layer
│   ├── analytics/               # Event tracking
│   ├── auth/                    # Auth utilities & token helpers
│   ├── configs/                 # Shared ESLint, TS, Prettier configs
│   ├── constants/               # App-wide constants
│   ├── database/                # DB client, utilities
│   ├── design-system/           # Design tokens
│   ├── emails/                  # Transactional email templates
│   ├── feature-flags/           # Feature flag evaluation
│   ├── hooks/                   # Shared React hooks
│   ├── logger/                  # Structured logging
│   ├── notifications/           # Notification SDK
│   ├── payments/                # Payment utilities
│   ├── permissions/             # Permission evaluation
│   ├── search/                  # Search client utilities
│   ├── seo/                     # SEO utilities
│   ├── stores/                  # Zustand state stores
│   ├── templates/               # Template engine
│   ├── ui/                      # Reusable React component library
│   ├── utils/                   # General utilities
│   ├── validations/             # Zod schemas & validators
│   ├── websocket/               # WebSocket client utilities
│   └── (one more implied)
│
├── services/                    # Backend microservices (20+)
│   └── [see Section 10]
│
├── docs/                        # Documentation
│   ├── project-overview.md      # Master architecture paper
│   ├── development-roadmap.md   # Phased delivery plan
│   └── TECHNICAL_DOCUMENTATION.md  # This file
│
├── infrastructure/              # IaC & DevOps configs
│   ├── aws/
│   ├── clickhouse/
│   ├── cloudflare/
│   ├── docker/
│   ├── elasticsearch/
│   ├── kubernetes/
│   ├── logging/
│   ├── mongodb/
│   ├── monitoring/
│   ├── nginx/
│   ├── qdrant/
│   ├── redis/
│   ├── scripts/
│   └── terraform/
│
├── scripts/                     # Development & ops scripts
│   ├── backup/
│   ├── deployment/
│   ├── indexing/
│   ├── migration/
│   ├── monitoring/
│   ├── setup/
│   └── workers/
│
├── .github/workflows/ci.yml     # GitHub Actions CI
├── package.json                 # Root workspace config
├── pnpm-workspace.yaml          # pnpm workspace definition
├── turbo.json                   # Turborepo pipeline config
├── tsconfig.json                # Root TypeScript config
└── .env                        # Root environment (NODE_ENV=development)
```

### 4.1 Key Configuration Files

| File | Purpose |
|---|---|
| `pnpm-workspace.yaml` | Declares `apps/*`, `packages/*`, `services/*` as workspace members |
| `turbo.json` | Turborepo pipeline (currently empty — needs task definitions) |
| `tsconfig.json` (root) | Base TypeScript config extended by all packages |
| `.env` | Root env (`NODE_ENV=development`) |
| `.github/workflows/ci.yml` | CI on push/PR with Node.js setup |

---

## 5. Technology Stack

### 5.1 Frontend Stack

| Layer | Technology | Version/Notes |
|---|---|---|
| Framework | Next.js | 15, App Router |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | v4 |
| Component Library | shadcn/ui | Radix-based accessible components |
| Animations | Framer Motion | Page transitions, element animations |
| State Management | Zustand | Global stores |
| Color System | OKLCH | Perceptually uniform |
| Font: Sans | Inter | Primary body font |
| Font: Serif | Playfair Display | Display headings |
| Font: Mono | JetBrains Mono | Code blocks |

### 5.2 Backend Stack

| Layer | Technology | Notes |
|---|---|---|
| Runtime | Node.js | TypeScript |
| HTTP Framework | Express or Fastify | (NestJS optional) |
| ORM | Prisma | Schema + migrations |
| Primary Database | MongoDB Atlas | Normalized refs, shallow docs |
| Cache & Sessions | Redis | JWT session caching, PubSub |
| Search | Elasticsearch | Full-text indexes |
| Vector DB | Qdrant | Embeddings & semantic search |
| Analytics DB | ClickHouse | Analytical data warehouse |
| Job Queue | BullMQ | Async job processing |
| Real-time | Socket.IO | WebSocket connections |
| File Storage | Cloudflare R2 | Object storage |

### 5.3 Infrastructure Stack

| Layer | Technology |
|---|---|
| Containers | Docker |
| Orchestration | Kubernetes |
| IaC | Terraform |
| Reverse Proxy | Nginx |
| CDN / Edge | Cloudflare |
| Cloud Provider | AWS or VPS |
| Monitoring | Prometheus + Grafana |
| Error Tracking | Sentry |
| CI/CD | GitHub Actions |

### 5.4 Monorepo Tooling

| Tool | Purpose |
|---|---|
| pnpm | Package manager with workspace support |
| Turborepo | Parallel build system with caching |
| Husky | Pre-commit hooks |
| ESLint | Code linting |
| Prettier | Code formatting |

---

## 6. Frontend Architecture — Web Platform

**Location:** `apps/web-platform/`

The web platform is the primary user-facing Next.js application. It implements the dynamic engine-based rendering model defined in the platform architecture.

### 6.1 App Directory Structure

```
apps/web-platform/
├── public/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   ├── logos/
│   └── manifest/
├── src/
│   └── app/
│       ├── (admin)/             # Admin route group
│       ├── (auth)/              # Auth route group
│       ├── (community)/         # Community route group
│       ├── (dashboard)/         # Workspace dashboard group
│       ├── (explore)/           # Discovery route group
│       ├── (marketing)/         # Marketing pages group
│       ├── (profile)/           # Public profile group
│       ├── (public)/            # Public browsing group
│       ├── search/              # Global search
│       ├── shared/              # Shared UI components
│       ├── stores/              # Zustand state stores
│       ├── styles/              # Global styles
│       ├── tests/               # Test files
│       └── workers/             # Service workers
├── middleware.ts                # Next.js middleware (auth guards)
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # Extends root tsconfig
└── .env.local                  # NEXT_PUBLIC_APP_NAME=web-platform
```

### 6.2 Frontend Rendering Philosophy

The frontend renders everything dynamically:

```
User accesses workspace
       ↓
Workspace config loaded
       ↓
Enabled modules resolved
       ↓
Section/widget registry queried
       ↓
Components dynamically loaded
       ↓
UI rendered per role + config
```

### 6.3 Frontend Systems

| System | Description |
|---|---|
| Design System | CSS variables + Tailwind tokens |
| Component Registry | Dynamic component lookup by key |
| Dynamic Rendering Engine | Renders sections/widgets from registry |
| Workspace Renderer | Renders workspace UI from config |
| Profile Renderer | Renders profile sections per role |
| Module Renderer | Renders enabled module UI |

---

## 7. Routing Architecture — Next.js App Router

The web platform uses **Next.js App Router** with route groups (parentheses notation) for logical page organization. Route groups do not affect URL structure.

### 7.1 Authentication Routes — `(auth)/`

| Route | Purpose |
|---|---|
| `/login` | Email/password and OAuth login |
| `/signup` | New user registration |
| `/verify-email` | Email verification flow |
| `/forgot-password` | Password recovery request |
| `/reset-password` | Password reset form |
| `/workspace-selection` | Multi-workspace switcher |
| `/onboarding/business` | Business user onboarding wizard |
| `/onboarding/professional` | Professional user onboarding wizard |
| `/onboarding/explorer` | Explorer user onboarding |

### 7.2 Marketing Pages — `(marketing)/`

| Route | Purpose |
|---|---|
| `/` | Home page (`page.tsx`) |
| `/about` | About MyDigiSence |
| `/pricing` | Subscription pricing |
| `/features` | Feature showcase |
| `/solutions` | Solution pages per use case |
| `/contact` | Contact form |
| `/enterprise` | Enterprise offering |
| `/help` | Help center & FAQ |
| `/guides` | Documentation & guides |
| `/blog` | Blog articles |
| `/ai` | AI features showcase |
| `/cities` | Location-specific landing pages |
| `/industries` | Industry-specific landing pages |

### 7.3 Dashboard Routes — `(dashboard)/`

**Dynamic workspace route:** `/dashboard/[workspace]/`

| Sub-route | Purpose |
|---|---|
| `/ai` | AI tools, suggestions, automation |
| `/analytics` | Traffic and engagement analytics |
| `/automation` | Workflow builder and automation |
| `/billing` | Subscription and payment management |
| `/bookings` | Booking calendar and management |
| `/campaigns` | Email and marketing campaigns |
| `/community` | Community features per workspace |
| `/crm` | Contacts, pipelines, lead tracking |
| `/custom-domain` | Custom domain setup |
| `/feeds` | Content feeds management |
| `/insights` | Business intelligence insights |
| `/integrations` | Third-party app integrations |
| `/marketplace` | Marketplace listings management |
| `/media` | Media library and uploads |
| `/messages` | Real-time messaging/chat |
| `/notifications` | Notification preferences |
| `/permissions` | Team permissions management |
| `/profile-builder` | Profile section customization |
| `/reviews` | Review and reputation management |
| `/seo` | SEO tools and meta management |
| `/settings` | Workspace settings |
| `/team` | Team members management |
| `/templates` | Template library |
| `/themes` | Theme and branding customization |

### 7.4 Explore / Discovery Routes — `(explore)/`

| Route | Purpose |
|---|---|
| `/explore` | Main exploration hub |
| `/categories` | Browse by category |
| `/industries` | Browse by industry |
| `/skills` | Filter by skill |
| `/cities` | Location-based discovery |
| `/nearby` | Geo-proximity profiles |
| `/recommendations` | Personalized recommendations |
| `/trending` | Trending profiles and services |
| `/top-rated` | Top-rated by reviews |
| `/featured` | Featured / promoted listings |

### 7.5 Profile Routes — `(profile)/`

| Route | Purpose |
|---|---|
| `/[username]` | Public user profile |
| `/[workspace]` | Public workspace profile |

### 7.6 Public Routes — `(public)/`

| Route | Purpose |
|---|---|
| `/browse` | Service browsing |
| `/discover` | Business discovery |
| `/search` | Search results page |
| `/[username]` | Alternative public profile path |

### 7.7 Community Routes — `(community)/`

| Route | Purpose |
|---|---|
| `/community` | Community hub |
| `/feed` | Community activity feed |
| `/creators` | Creator directory |
| `/discussions` | Forum discussions |
| `/groups` | Group communities |
| `/events` | Event listings |
| `/webinars` | Webinar listings |
| `/networking` | Networking page |

### 7.8 Admin Routes — `(admin)/`

| Route | Purpose |
|---|---|
| `/admin` | Admin dashboard overview |
| `/admin/users` | User management |
| `/admin/businesses` | Business management |
| `/admin/professionals` | Professional management |
| `/admin/marketplace` | Marketplace administration |
| `/admin/verification` | Verification queue |
| `/admin/moderation` | Content moderation queue |
| `/admin/reports` | Report management |
| `/admin/fraud` | Fraud detection |
| `/admin/analytics` | Platform-level analytics |
| `/admin/support` | Support ticket management |
| `/admin/settings` | Admin configuration |
| `/admin/feature-flags` | Feature flag toggles |

---

## 8. Component Architecture & Design System

### 8.1 Shared Components — `src/app/shared/`

Organized by component category:

| Directory | Contents |
|---|---|
| `animations/` | Framer Motion wrappers, page transitions, scroll reveals |
| `cards/` | Profile cards, service cards, booking cards, listing cards |
| `charts/` | Revenue charts, analytics charts, dashboard visualizations |
| `components/` | Buttons, headers, footers, layout primitives |
| `dialogs/` | Confirmation dialogs, form modals, action sheets |
| `empty-states/` | No-results, onboarding prompts, error states |
| `forms/` | Input fields, form layouts, validation displays |
| `loaders/` | Spinners, skeleton screens, progress bars |
| `navigation/` | Headers, sidebars, breadcrumbs, nav menus |
| `skeletons/` | Content shimmer placeholders |
| `tables/` | Data tables, admin tables, report tables |
| `ui/` | Base shadcn/ui components, buttons, inputs, selects |
| `widgets/` | Dashboard stats, chart widgets, metric cards, summary widgets |

### 8.2 Registry Pattern

Profile sections and dashboard widgets are loaded from registries:

**Section Registry (Profile):**
```typescript
const sectionRegistry = {
  HERO: HeroSection,
  ABOUT: AboutSection,
  SERVICES: ServicesSection,
  PRODUCTS: ProductsSection,
  PRICING: PricingSection,
  GALLERY: GallerySection,
  REVIEWS: ReviewsSection,
  SKILLS: SkillsSection,
  EXPERIENCE: ExperienceSection,
  PROJECTS: ProjectsSection,
  BOOKING: BookingSection,
  FAQS: FAQsSection,
  CONTACT: ContactSection,
}
```

**Widget Registry (Dashboard):**
```typescript
const widgetRegistry = {
  SALES_CHART: SalesChartWidget,
  BOOKINGS: BookingWidget,
  CRM: CRMWidget,
  REVENUE_ANALYTICS: RevenueAnalyticsWidget,
  CUSTOMER_INSIGHTS: CustomerInsightsWidget,
  LEAD_TRACKING: LeadTrackingWidget,
  SEO_ANALYTICS: SEOAnalyticsWidget,
  AI_SUGGESTIONS: AISuggestionsWidget,
  ENGAGEMENT_METRICS: EngagementMetricsWidget,
}
```

### 8.3 State Management

**Location:** `src/app/stores/` (per-app) + `packages/stores/` (shared)

Technology: **Zustand**

Planned stores:
- `userStore` — Authenticated user state
- `workspaceStore` — Current workspace config and modules
- `profileStore` — Profile data and section config
- `dashboardStore` — Dashboard widget layout state
- `uiStore` — Theme, sidebar state, modal state

---

## 9. Backend Architecture

### 9.1 Architecture Philosophy

The backend is fully modular. Every feature is treated as an isolated module. The layered structure is:

```
API Layer
  → Controllers        (request/response handling)
  → Services           (business logic)
  → Repositories       (data access)
  → Database           (persistence)
```

### 9.2 Module Structure

Each backend module contains:

```
module/
├── controller.ts      # Route handlers
├── service.ts         # Business logic
├── repository.ts      # Database queries
├── validator.ts       # Request validation (Zod)
├── permissions.ts     # RBAC permission definitions
├── routes.ts          # Express/Fastify route definitions
└── types.ts           # TypeScript interfaces
```

### 9.3 Gateway Pattern

The `gateway-service` acts as a **BFF (Backend for Frontend)**:

```
Web Platform (Next.js)
        ↓
   gateway-service         ← single entry point
   /     |     \
auth   profile  marketplace
service service  service    ← individual microservices
```

The gateway:
- Proxies and aggregates requests from `apps/web-platform`
- Implements OpenAPI contracts for core endpoints
- Handles API versioning
- Performs request logging
- Acts as the sole data source for the frontend

### 9.4 Core API Endpoint Groups

| Group | Endpoints |
|---|---|
| Auth | `POST /auth/signup`, `/login`, `/verify-email`, `/forgot-password`, `/reset-password`, `/logout`, `GET /auth/session` |
| Users | `GET/PUT /users/:id`, `GET /users/:id/workspaces`, `POST /users/:id/workspaces` |
| Profiles | `GET /profiles/:username`, `PUT /profiles/:id`, `GET/PUT /profiles/:id/sections` |
| Workspaces | `GET/PUT /workspaces/:id`, `GET/PUT /workspaces/:id/modules`, `GET /workspaces/:id/dashboard` |
| Marketplace | `GET/POST /marketplace/listings`, `GET/PUT /marketplace/listings/:id` |
| Bookings | `GET/POST /bookings`, `GET/PUT /bookings/:id` |
| Search | `GET /search?q=`, `GET /search/profiles`, `GET /search/services` |
| Messaging | `GET/POST /messages/:conversation`, `WS /ws/messages` |
| CRM | `GET/POST /crm/contacts`, `GET/PUT /crm/contacts/:id` |
| AI | `POST /ai/generate`, `/ai/optimize`, `GET /ai/recommendations` |

---

## 10. Microservices Catalog

All 20 services live in `services/`. Each has one responsibility.

| Service | Directory | Responsibility |
|---|---|---|
| auth-service | `services/auth-service/` | Authentication, sessions, JWT, OAuth |
| user-service | `services/user-service/` | User accounts, profile metadata |
| profile-service | `services/profile-service/` | Profile CRUD, section management |
| business-service | `services/business-service/` | Business profile data and operations |
| professional-service | `services/professional-service/` | Professional profile data |
| workspace-service | *(implicit in gateway)* | Workspace config, modules, permissions |
| marketplace-service | `services/marketplace-service/` | Listings, products, services |
| booking-service | `services/booking-service/` | Availability, reservations, calendar |
| payment-service | `services/payment-service/` | Stripe integration, billing records |
| crm-service | `services/crm-service/` | Contacts, pipelines, lead tracking |
| automation-service | `services/automation-service/` | Workflows, triggers, scheduled actions |
| search-service | `services/search-service/` | Elasticsearch indexing and querying |
| recommendation-service | `services/recommendation-service/` | Personalized recommendation logic |
| ai-service | `services/ai-service/` | LLM calls, embeddings, AI features |
| analytics-service | `services/analytics-service/` | Event tracking, ClickHouse writes |
| notification-service | `services/notification-service/` | Push, email, in-app notifications |
| email-service | `services/email-service/` | Transactional email delivery (SES/SendGrid) |
| media-service | `services/media-service/` | File uploads, Cloudflare R2, CDN |
| moderation-service | `services/moderation-service/` | Content moderation, fraud detection |
| onboarding-service | `services/onboarding-service/` | Onboarding flow state management |
| queue-service | `services/queue-service/` | BullMQ job queues, background workers |
| websocket-service | `services/websocket-service/` | Socket.IO real-time connections |
| gateway-service | `services/gateway-service/` | API gateway / BFF aggregator |

---

## 11. Shared Packages Catalog

All 23 packages live in `packages/`. They are consumed by both `apps/` and `services/`.

| Package | Purpose |
|---|---|
| `packages/ai-sdk` | Abstraction layer over AI provider APIs |
| `packages/analytics` | Client-side event tracking utilities |
| `packages/auth` | JWT helpers, session utilities, OAuth helpers |
| `packages/configs` | Shared ESLint, Prettier, TypeScript configs |
| `packages/constants` | App-wide constants (roles, plan types, event names) |
| `packages/database` | Prisma client, migration helpers, DB utilities |
| `packages/design-system` | Design tokens, CSS variable exports |
| `packages/emails` | React Email templates for transactional emails |
| `packages/feature-flags` | Feature flag client and evaluation logic |
| `packages/hooks` | Shared React hooks (useDebounce, useIntersection, etc.) |
| `packages/logger` | Structured logging (JSON format, log levels) |
| `packages/notifications` | Notification SDK, push subscription management |
| `packages/payments` | Stripe SDK wrapper, billing utilities |
| `packages/permissions` | RBAC evaluation, permission check utilities |
| `packages/search` | Elasticsearch client, query builders |
| `packages/seo` | Meta tag generation, sitemap utilities |
| `packages/stores` | Shared Zustand stores and store factories |
| `packages/templates` | Template engine for dynamic content generation |
| `packages/ui` | Reusable React component library |
| `packages/utils` | General TypeScript utilities, formatters |
| `packages/validations` | Zod schemas for shared data types |
| `packages/websocket` | WebSocket client utilities and event types |

---

## 12. Database Architecture

### 12.1 Database Philosophy

| Principle | Implementation |
|---|---|
| Normalized references | IDs, not embedded objects, for cross-collection relations |
| Shallow documents | Avoid deeply nested structures |
| Indexed collections | Every frequently queried field is indexed |
| Scalable modular schemas | Each domain owns its collection |

### 12.2 Database Topology

| Database | Technology | Used For |
|---|---|---|
| Primary | MongoDB Atlas | All platform data (users, profiles, workspaces, listings, bookings, messages) |
| Cache | Redis | JWT sessions, PubSub channels, hot data caching |
| Search Index | Elasticsearch | Full-text search, filtered queries, autocomplete |
| Vector Store | Qdrant | AI embeddings, semantic search, recommendations |
| Analytics | ClickHouse | Event streams, platform analytics, business intelligence |

### 12.3 ORM & Migrations

- **ORM:** Prisma ORM
- **Migrations:** Prisma Migrate
- **Schema file:** `packages/database/schema.prisma` (to be created)

---

## 13. Core Data Collections

### users

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `email` | String | Unique, indexed |
| `passwordHash` | String | bcrypt hash |
| `emailVerified` | Boolean | Verification status |
| `roles` | String[] | Platform roles |
| `workspaceIds` | ObjectId[] | Associated workspace IDs |
| `createdAt` | DateTime | Account creation |
| `updatedAt` | DateTime | Last update |

### profiles

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId | Reference to users |
| `username` | String | Unique URL slug |
| `displayName` | String | Public display name |
| `bio` | String | Profile biography |
| `avatar` | String | Image URL (Cloudflare R2) |
| `banner` | String | Banner image URL |
| `sections` | Object[] | Ordered section config array |
| `settings` | Object | Profile visibility settings |

### workspaces

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `ownerId` | ObjectId | Reference to users |
| `slug` | String | URL slug |
| `type` | Enum | business / professional / creator / agency / enterprise |
| `members` | Object[] | Members with roles |
| `modules` | Object | Enabled/disabled module map |
| `branding` | Object | Logo, colors, theme config |
| `subscription` | Object | Plan type and billing status |
| `settings` | Object | Workspace-level settings |

### business_profiles

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `workspaceId` | ObjectId | Reference to workspaces |
| `industry` | String | Business industry |
| `category` | String | Business category |
| `location` | GeoPoint | Lat/long coordinates |
| `address` | Object | Full address |
| `phone` | String | Contact number |
| `website` | String | External website |
| `businessHours` | Object[] | Hours per day |

### professional_profiles

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `workspaceId` | ObjectId | Reference to workspaces |
| `skills` | String[] | Skill tags |
| `experience` | Object[] | Work experience entries |
| `education` | Object[] | Education history |
| `portfolio` | Object[] | Portfolio items |
| `certifications` | Object[] | Certifications |
| `hourlyRate` | Number | Rate in USD |
| `availability` | Object | Available hours/days |

### services

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `workspaceId` | ObjectId | Provider workspace |
| `title` | String | Service name |
| `description` | String | Service description |
| `price` | Number | Base price |
| `category` | String | Service category |
| `tags` | String[] | Searchable tags |
| `images` | String[] | Image URLs |
| `availability` | Object | Booking availability |
| `status` | Enum | active / draft / archived |

### bookings

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `serviceId` | ObjectId | Reference to services |
| `customerId` | ObjectId | Reference to users |
| `workspaceId` | ObjectId | Provider workspace |
| `dateTime` | DateTime | Booking time |
| `duration` | Number | Duration in minutes |
| `status` | Enum | pending / confirmed / cancelled / completed |
| `paymentId` | String | Stripe payment intent ID |
| `notes` | String | Customer notes |

### reviews

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `rating` | Number | 1–5 rating |
| `comment` | String | Review text |
| `authorId` | ObjectId | Reviewer user |
| `targetId` | ObjectId | Reviewed workspace |
| `verifiedPurchase` | Boolean | Booking-verified flag |
| `createdAt` | DateTime | Review date |

### conversations

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `participants` | ObjectId[] | Participating user IDs |
| `workspaceId` | ObjectId | Context workspace (if any) |
| `lastMessageAt` | DateTime | Last activity |
| `metadata` | Object | Type, subject, etc. |

### messages

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `conversationId` | ObjectId | Parent conversation |
| `authorId` | ObjectId | Sender user |
| `content` | String | Message text |
| `attachments` | Object[] | File attachments |
| `readBy` | ObjectId[] | Users who read it |
| `createdAt` | DateTime | Sent timestamp |

### notifications

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId | Target user |
| `type` | String | Notification type enum |
| `content` | String | Notification message |
| `actionUrl` | String | Deep link target |
| `read` | Boolean | Read status |
| `createdAt` | DateTime | Created timestamp |

### analytics_events

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `eventType` | String | Event name |
| `data` | Object | Event payload |
| `userId` | ObjectId | Actor user |
| `workspaceId` | ObjectId | Context workspace |
| `sessionId` | String | Browser session |
| `createdAt` | DateTime | Event timestamp |

### crm_contacts

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `workspaceId` | ObjectId | Owning workspace |
| `name` | String | Contact name |
| `email` | String | Email address |
| `phone` | String | Phone number |
| `company` | String | Company name |
| `status` | Enum | lead / active / inactive |
| `stage` | String | Pipeline stage |
| `notes` | Object[] | Timestamped notes |
| `communicationHistory` | Object[] | Messages, emails, calls |

### ai_embeddings

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `contentRef` | ObjectId | Source document ID |
| `contentType` | String | Type of content embedded |
| `vector` | Float[] | Embedding vector (stored in Qdrant) |
| `metadata` | Object | Retrieval metadata |
| `createdAt` | DateTime | Embedding timestamp |

### automations

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `workspaceId` | ObjectId | Owning workspace |
| `name` | String | Automation name |
| `trigger` | Object | Trigger type and conditions |
| `actions` | Object[] | Ordered action steps |
| `enabled` | Boolean | Active status |
| `lastRunAt` | DateTime | Last execution |

---

## 14. Authentication & Authorization System

### 14.1 Authentication Flow

```
1. User submits signup form (email + password)
        ↓
2. auth-service creates user record
        ↓
3. Verification email sent via email-service
        ↓
4. User clicks verification link
        ↓
5. Email marked verified, JWT session created
        ↓
6. User selects role (business / professional / explorer)
        ↓
7. Workspace initialized for role
        ↓
8. Dynamic onboarding engine activated
```

### 14.2 Session Management

| Mechanism | Detail |
|---|---|
| Token Type | JWT (signed, not encrypted) |
| Storage | Secure HTTP-only cookies |
| Cache | Redis with TTL-based expiry |
| Refresh | Sliding session refresh on activity |
| Revocation | Redis token blacklist on logout |

### 14.3 OAuth Providers

Planned OAuth integrations:
- Google
- GitHub (for professional users — portfolio integration)
- LinkedIn (for professional users)

### 14.4 Role-Based Access Control (RBAC)

**Workspace Permission Tiers:**

| Role | Access Level |
|---|---|
| `owner` | Full control — all settings, billing, deletion |
| `admin` | Administrative — users, config, content |
| `editor` | Content creation and editing |
| `member` | Basic feature access |
| `viewer` | Read-only access |

**Permission Evaluation:**

```
Request → gateway-service
              ↓
       Extract JWT claims
              ↓
       Resolve workspace role
              ↓
       Check permission matrix
              ↓
       Allow / Deny
```

### 14.5 Multi-Workspace Architecture

One user account can own or be a member of multiple workspaces. The `/workspace-selection` route handles workspace switching. Each workspace has an isolated permission context.

---

## 15. Core Platform Engines

### 15.1 Onboarding Engine

**Location:** `services/onboarding-service/`

The onboarding engine dynamically adapts the setup wizard based on:

| Input | Examples |
|---|---|
| User role | Business, Professional, Explorer |
| Business type | Restaurant, SaaS, Agency, Healthcare |
| Professional type | Developer, Designer, Lawyer |
| Enabled modules | Menu, Booking, CRM, Portfolio |
| Subscription plan | Free, Pro, Enterprise |

**Example adaptations:**

| Business Type | Enabled Onboarding Steps |
|---|---|
| Restaurant | Menu setup → Delivery config → Booking system → Review settings |
| Developer | GitHub integration → Portfolio projects → Skills → Availability |
| Coaching | Service packages → Booking calendar → Payment → Client messaging |
| Agency | Team setup → Portfolio → Service packages → CRM |

### 15.2 Workspace Engine

Manages the runtime state of each workspace:
- Resolves enabled modules per workspace
- Enforces permissions per request
- Manages subscription limits
- Controls branding and theme config
- Maintains dashboard layout state

### 15.3 Profile Engine

Renders profiles dynamically:

```
Profile request received
        ↓
Workspace config loaded
        ↓
Profile section config fetched
        ↓
For each enabled section:
  Registry lookup → Component
        ↓
Sections rendered in configured order
```

### 15.4 Dashboard Engine

Renders dashboards dynamically:

```
Dashboard request received
        ↓
Workspace module config loaded
        ↓
User permission level resolved
        ↓
Visible widgets determined
        ↓
For each widget:
  Registry lookup → Widget component
        ↓
Layout rendered with widget data
```

---

## 16. Dynamic Profile Architecture

### 16.1 Profile Section Types

| Section | Business | Professional | Creator |
|---|---|---|---|
| Hero | ✓ | ✓ | ✓ |
| About | ✓ | ✓ | ✓ |
| Services | ✓ | ✓ | ✓ |
| Products | ✓ | — | ✓ |
| Pricing | ✓ | ✓ | ✓ |
| Gallery | ✓ | ✓ | ✓ |
| Reviews | ✓ | ✓ | ✓ |
| Skills | — | ✓ | — |
| Experience | — | ✓ | — |
| Projects | — | ✓ | ✓ |
| Booking | ✓ | ✓ | — |
| FAQs | ✓ | ✓ | ✓ |
| Contact | ✓ | ✓ | ✓ |

### 16.2 Section Properties

Each section is:

| Property | Meaning |
|---|---|
| Configurable | Content, appearance, visibility settings |
| Reorderable | Drag to reorder via profile builder |
| Optional | Can be hidden/shown without deletion |
| Role-aware | Shown only if relevant to workspace type |
| Business-aware | Shown only if relevant to business category |

### 16.3 Public Profile URL Pattern

```
/:username           → individual user profile
/:workspace-slug     → business or professional workspace profile
```

---

## 17. Dynamic Dashboard Architecture

### 17.1 Dashboard Widget Types

| Widget | Description | User Types |
|---|---|---|
| Revenue Analytics | Revenue charts, MoM growth | Business |
| Booking Calendar | Upcoming bookings, availability | Business, Professional |
| CRM Overview | Lead counts, pipeline stage | Business |
| Sales Charts | Conversion and sales trends | Business |
| Customer Insights | Demographics, retention | Business |
| Lead Tracking | Active leads, deal value | Business |
| SEO Analytics | Search ranking, traffic sources | All |
| AI Suggestions | AI-powered improvement prompts | All |
| Engagement Metrics | Views, follows, clicks | All |

### 17.2 Dashboard Customization

Users can:
- Add and remove widgets from their dashboard
- Resize and reorder widget grid positions
- Configure date ranges per widget
- Save layouts per workspace

### 17.3 Module-Driven Visibility

Widgets are only shown if their corresponding module is enabled:

```
Booking widget visible only if:
  workspace.modules.booking === true

CRM widget visible only if:
  workspace.modules.crm === true
```

---

## 18. Workspace System

### 18.1 Workspace Types

| Type | Target User |
|---|---|
| `business` | Companies, agencies, local businesses |
| `professional` | Freelancers, consultants, individual professionals |
| `creator` | Content creators, influencers |
| `agency` | Agencies managing client workspaces |
| `enterprise` | Large organizations with teams |

### 18.2 Workspace Capabilities

| Capability | Description |
|---|---|
| Permissions | Role-based access for team members |
| Module configuration | Enable/disable individual features |
| Branding | Logo, colors, custom theme |
| Themes | Visual theme selection |
| Subscriptions | Plan management and billing |
| Dashboard state | Widget layout persistence |
| Analytics | Workspace-level analytics |
| Automation | Workflow and trigger configuration |
| Integrations | Third-party app connections |
| Custom Domain | Map custom domain to profile |

### 18.3 Module System

Modules are feature units that can be independently enabled or disabled per workspace. This allows the platform to serve many different business types without code changes.

**Example module map:**

```typescript
workspace.modules = {
  booking: true,
  crm: false,
  marketplace: true,
  campaigns: false,
  analytics: true,
  ai: true,
  seo: true,
  team: true,
  reviews: true,
}
```

---

## 19. Marketplace System

### 19.1 Listing Types

| Type | Description |
|---|---|
| Service listings | Bookable professional or business services |
| Product listings | Physical or digital products |
| Subscriptions | Recurring service packages |
| Templates | Website and profile templates |
| Themes | Visual themes for profiles |
| Digital products | Downloads, courses, resources |

### 19.2 Marketplace Operations

- CRUD for listings (create, read, update, delete)
- Category and tag management
- Pricing tiers (one-time, subscription, per-session)
- Availability and inventory management
- Order processing
- Review collection
- Promotion and featuring (paid)

---

## 20. Search & Discovery Architecture

### 20.1 Search Capabilities

| Capability | Technology | Description |
|---|---|---|
| Full-text search | Elasticsearch | Keyword search across profiles, services, businesses |
| Autocomplete | Elasticsearch | Real-time search suggestions |
| Geo-based discovery | MongoDB geospatial + Elasticsearch | Location-radius filtering |
| Semantic AI search | Qdrant | Vector similarity — "designers like X" |
| Category filtering | Elasticsearch | Filter by category, industry, skill |
| Faceted search | Elasticsearch | Multi-dimensional filtering |
| Recommendations | Qdrant + recommendation-service | Personalized discovery |

### 20.2 Search Data Flow

```
User types query
       ↓
search-service receives request
       ↓
Elasticsearch: full-text + filters
       ↓                    ↓
Qdrant: vector similarity   MongoDB: geo filter
       ↓
Results merged and ranked
       ↓
Personalization layer applied
       ↓
Results returned to client
```

### 20.3 Discovery Routes

| Route | Discovery Type |
|---|---|
| `/explore` | Curated mixed discovery |
| `/nearby` | Geo-proximity (GPS required) |
| `/trending` | High-engagement profiles/services |
| `/top-rated` | Highest-rated by verified reviews |
| `/recommendations` | Personalized AI recommendations |
| `/featured` | Promoted listings |
| `/categories` | Category-based browsing |
| `/industries` | Industry-based browsing |
| `/skills` | Skill-based professional discovery |
| `/cities` | City-based discovery pages (SEO optimized) |

---

## 21. Messaging & Real-Time System

### 21.1 Messaging Features

| Feature | Description |
|---|---|
| Real-time chat | Instant message delivery via Socket.IO |
| Typing indicators | Live "User is typing..." display |
| Presence detection | Online/offline/away status |
| Media attachments | Images, documents, files (via media-service) |
| Group conversations | Multi-participant channels |
| Support chats | Platform support with workspace owners |
| Workspace messaging | Internal team messaging |

### 21.2 Technical Stack

| Component | Technology |
|---|---|
| WebSocket server | Socket.IO |
| Message broker | Redis PubSub |
| Message storage | MongoDB (conversations + messages collections) |
| File attachments | Cloudflare R2 via media-service |

### 21.3 Real-Time Architecture

```
Client (Browser)
     ↓ WebSocket
websocket-service (Socket.IO)
     ↓ PubSub
Redis (message channels)
     ↓
All connected clients in conversation
```

---

## 22. CRM & Automation System

### 22.1 CRM Features

| Feature | Description |
|---|---|
| Contacts | Customer/lead contact records |
| Pipelines | Visual sales pipeline stages |
| Lead tracking | Lead source, status, value |
| Customer stages | Prospect → Active → Churned |
| Deal management | Deal value and close probability |
| Reminders | Follow-up reminders |
| Notes | Timestamped contact notes |
| Communication history | All messages, emails, calls logged |

### 22.2 Automation Features

| Feature | Description |
|---|---|
| Workflows | Multi-step automation sequences |
| Triggers | Event-based triggers (new booking, new lead, etc.) |
| Campaigns | Email and notification campaigns |
| Reminders | Scheduled follow-up actions |
| AI automation | AI-suggested next actions |
| Webhook automation | Send data to external services |
| Scheduled actions | Time-based recurring tasks |

### 22.3 Automation Architecture

```
Trigger fires (e.g. new booking)
         ↓
automation-service evaluates rules
         ↓
Actions queued via BullMQ
         ↓
Workers execute actions:
  - send email
  - send notification
  - update CRM record
  - call webhook
  - create follow-up task
```

---

## 23. AI Integration Layer

### 23.1 AI Features

| Feature | Description |
|---|---|
| AI onboarding assistant | Guides users through setup |
| Profile optimization | Analyzes and suggests profile improvements |
| AI-generated bios | LLM-generated biography drafts |
| Recommendation engine | Personalized content and profile discovery |
| Semantic search | Natural language query understanding |
| AI analytics insights | Explains analytics trends in plain language |
| SEO content generation | Auto-generates meta titles, descriptions |
| Automated suggestions | Context-aware improvement prompts |
| Content generation | Blog posts, service descriptions, FAQs |

### 23.2 AI Infrastructure

| Component | Technology | Role |
|---|---|---|
| Embeddings store | Qdrant | Stores vectors for all embeddings |
| LLM integration | ai-service | Calls LLM APIs (OpenAI/Anthropic) |
| AI SDK package | `packages/ai-sdk` | Abstraction over LLM providers |
| Embedding pipeline | ai-service | Content → embedding vector → Qdrant |

### 23.3 AI Pipeline

```
User content (profile, bio, service)
             ↓
     ai-service: generate embedding
             ↓
     Qdrant: store vector
             ↓
     Recommendation query: retrieve similar
             ↓
     Ranking layer: score by relevance
             ↓
     Personalization: adjust for user history
             ↓
     Results: recommendations returned
```

### 23.4 Semantic Search Flow

```
User query: "I need a designer for a fintech app"
                        ↓
        search-service: convert query to embedding
                        ↓
           Qdrant: similarity search on vectors
                        ↓
          Elasticsearch: re-rank with filters
                        ↓
          Results: semantically relevant designers
```

---

## 24. Infrastructure Architecture

### 24.1 Infrastructure Stack

| Layer | Technology | Purpose |
|---|---|---|
| Containers | Docker | Service packaging |
| Orchestration | Kubernetes | Container scheduling and scaling |
| IaC | Terraform | Cloud infrastructure provisioning |
| Reverse Proxy | Nginx | Load balancing, SSL termination |
| CDN / Edge | Cloudflare | Global CDN, DDoS protection |
| Cloud | AWS / VPS | Hosting environment |
| File Storage | Cloudflare R2 | S3-compatible object storage |
| Monitoring | Prometheus + Grafana | Metrics and dashboards |
| Error Tracking | Sentry | Application error monitoring |

### 24.2 Infrastructure Directory

```
infrastructure/
├── aws/                 # AWS configurations (IAM, S3, etc.)
├── clickhouse/          # ClickHouse analytics DB setup
├── cloudflare/          # Cloudflare CDN, R2, DNS rules
├── docker/              # Dockerfiles and docker-compose
├── elasticsearch/       # Elasticsearch index mappings
├── kubernetes/          # K8s manifests (deployments, services)
├── logging/             # Log aggregation config
├── mongodb/             # MongoDB Atlas config, indexes
├── monitoring/          # Prometheus rules, Grafana dashboards
├── nginx/               # Nginx site configs
├── qdrant/              # Qdrant collection config
├── redis/               # Redis config (cluster, sentinel)
├── scripts/             # Provisioning scripts
└── terraform/           # Terraform modules and state
```

### 24.3 Deployment Strategy

| Strategy | Description |
|---|---|
| Blue/Green | Zero-downtime deployments by switching traffic |
| Canary releases | Gradual rollout to subset of users |
| Database migrations | Prisma Migrate in CI before service deploy |
| Container registry | ECR (AWS) or Docker Hub |

### 24.4 Queue Architecture

**BullMQ** handles all async background work:

| Queue | Jobs |
|---|---|
| email-queue | Transactional email delivery |
| notification-queue | Push and in-app notifications |
| automation-queue | Workflow step execution |
| indexing-queue | Elasticsearch document indexing |
| embedding-queue | AI embedding generation |
| analytics-queue | ClickHouse event writes |
| media-queue | Image processing, thumbnail generation |

---

## 25. Security Architecture

### 25.1 Security Goals

| Goal | Implementation |
|---|---|
| Secure authentication | JWT + bcrypt + Redis sessions |
| Secure sessions | HTTP-only cookies, HTTPS-only |
| RBAC permissions | 5-tier workspace role model |
| Rate limiting | Per-IP and per-user rate limits at gateway |
| CSRF protection | SameSite cookies + CSRF tokens |
| XSS protection | React's inherent DOM escaping + Next.js headers |
| Encrypted secrets | Environment-based secrets, Vault (future) |
| Audit logs | All mutations logged with actor and timestamp |

### 25.2 Input Validation

All API inputs validated at two layers:
1. **Gateway level** — Basic schema validation (Zod)
2. **Service level** — Domain-specific validation logic

### 25.3 Permission Check Flow

```
Incoming request
       ↓
gateway-service middleware
       ↓
Extract and verify JWT
       ↓
Load workspace membership
       ↓
Evaluate permission for action
       ↓
Allow request → service
OR
Return 403 Forbidden
```

### 25.4 Privacy & Compliance

| Requirement | Approach |
|---|---|
| GDPR | Data export, deletion requests, consent tracking |
| CCPA | California privacy rights support |
| Data classification | Sensitive data tagged and access-logged |
| Retention policies | Configurable retention per data type |
| Encryption at rest | MongoDB Atlas encryption, R2 encryption |
| Encryption in transit | TLS 1.3 everywhere |

---

## 26. Scalability Strategy

### 26.1 Scaling Philosophy

> Do not begin with microservices. Scale into them as usage demands.

### 26.2 Three-Phase Scaling Model

**Phase 1 — MVP: Modular Monolith**

```
Single deployment
├── Shared MongoDB
├── Redis (cache + sessions)
├── Isolated modules (no service-to-service calls yet)
└── One process, multiple modules
```

**Phase 2 — Growth: Hybrid**

```
Core monolith + gateway
├── Extracted high-traffic services
│   (auth, search, media)
├── BullMQ job queues
├── Redis distributed cache
└── Read replicas for DB
```

**Phase 3 — Scale: Microservices**

```
Kubernetes cluster
├── All 20+ services independently deployed
├── Service mesh (Istio or similar)
├── Database per service (as traffic warrants)
├── Event-driven communication (BullMQ / Kafka)
└── Distributed tracing (OpenTelemetry)
```

### 26.3 Horizontal Scaling Components

| Component | Scaling Mechanism |
|---|---|
| Next.js frontend | Vercel / edge deployment |
| API services | Kubernetes horizontal pod autoscaling |
| MongoDB | Atlas sharding + read replicas |
| Redis | Redis Cluster |
| Elasticsearch | Multi-node cluster |
| Qdrant | Distributed collection sharding |
| ClickHouse | Distributed table sharding |

---

## 27. Design System & Theme Tokens

### 27.1 Color System

The platform uses **OKLCH** (Perceptually Uniform Color Space) for all color tokens. This ensures consistent perceived brightness across the color palette.

**Light Mode Tokens:**

| Token | Value | Purpose |
|---|---|---|
| `--background` | `oklch(0.9841 0.0026 247.85)` | Page background |
| `--foreground` | `oklch(0.2064 0.0388 265.55)` | Primary text |
| `--card` | `oklch(1.0000 0 0)` | Card backgrounds |
| `--primary` | `oklch(0.2064 0.0388 265.55)` | Primary action color (dark navy) |
| `--secondary` | `oklch(0.8088 0.1704 75.35)` | Secondary accent (warm gold) |
| `--muted` | `oklch(0.9258 0.0132 255.03)` | Muted backgrounds |
| `--accent` | `oklch(0.9795 0.0242 91.61)` | Accent highlights |
| `--destructive` | `oklch(0.6356 0.2082 25.38)` | Error/danger states |
| `--border` | `oklch(0.9258 0.0132 255.03)` | Border color |
| `--ring` | `oklch(0.2064 0.0388 265.55)` | Focus ring |
| `--sidebar` | `oklch(0.2064 0.0388 265.55)` | Sidebar background |

**Dark Mode Tokens:**

| Token | Value | Purpose |
|---|---|---|
| `--background` | `oklch(0.1358 0.0163 262.71)` | Dark page background |
| `--foreground` | `oklch(0.9838 0.0035 247.86)` | Light text |
| `--primary` | `oklch(0.7858 0.1598 85.31)` | Primary action (warm gold) |
| `--secondary` | `oklch(0.2064 0.0388 265.55)` | Secondary (dark navy) |
| `--muted` | `oklch(0.2753 0.0364 259.70)` | Muted elements |
| `--destructive` | `oklch(0.3901 0.1297 25.57)` | Darker destructive |
| `--sidebar` | `oklch(0.1358 0.0163 262.71)` | Dark sidebar |

### 27.2 Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-sans` | Inter, -apple-system | Body text, UI elements |
| `--font-serif` | Playfair Display | Display headings, editorial |
| `--font-mono` | JetBrains Mono | Code, technical content |

### 27.3 Spacing & Radius

| Token | Value | Usage |
|---|---|---|
| `--spacing` | `0.25rem` | Base spacing unit |
| `--radius` | `0.5rem` | Base border radius |
| `--radius-sm` | `calc(0.5rem - 4px)` | Small radius |
| `--radius-md` | `calc(0.5rem - 2px)` | Medium radius |
| `--radius-lg` | `0.5rem` | Large radius |
| `--radius-xl` | `calc(0.5rem + 4px)` | Extra large radius |

### 27.4 Shadow System

Light mode uses subtle transparent shadows (`opacity: 0.05`).
Dark mode uses stronger opaque shadows (`opacity: 0.40` to `1.00`).

7 shadow levels: `2xs`, `xs`, `sm`, `default`, `md`, `lg`, `xl`, `2xl`.

### 27.5 Letter Spacing

Base letter tracking: `-0.015em` (slightly tighter than default for better readability at larger sizes).

---

## 28. CI/CD & Development Workflow

### 28.1 CI Pipeline

**File:** `.github/workflows/ci.yml`

Triggers on: `push`, `pull_request`

Steps:
1. Checkout code
2. Setup Node.js (via `actions/setup-node@v4`)
3. Install dependencies (`pnpm install`)
4. Run linting
5. Run type check
6. Run tests
7. Build affected packages (Turborepo)

### 28.2 Git Hooks

**Husky** is configured (`.husky/` directory exists). Pre-commit hooks planned:
- ESLint check on staged files
- Prettier format check
- TypeScript type check

### 28.3 Development Scripts

Located in `scripts/`:

| Directory | Purpose |
|---|---|
| `scripts/setup/` | Environment setup scripts |
| `scripts/migration/` | Database migration scripts |
| `scripts/indexing/` | Elasticsearch index scripts |
| `scripts/workers/` | BullMQ worker startup scripts |
| `scripts/monitoring/` | Monitoring setup scripts |
| `scripts/backup/` | Database backup scripts |
| `scripts/deployment/` | Deployment helper scripts |

### 28.4 Local Development Setup

```bash
# Install dependencies
pnpm install

# Start web platform
cd apps/web-platform && pnpm dev

# Start all services (when implemented)
pnpm --filter=... dev

# Build all packages
pnpm turbo build
```

---

## 29. Development Roadmap & Phases

### Phase 0 — Foundations (Immediate)

**Priority:** Immediate

| Task | Status |
|---|---|
| Monorepo setup (pnpm + Turborepo) | Scaffold done |
| CI pipeline (GitHub Actions) | Basic pipeline in place |
| Linting and formatters | Needs configuration |
| Pre-commit hooks (Husky) | Directory exists, needs setup |
| Repo conventions and contribution guide | Needed |

**Deliverables:** `package.json`, `pnpm-workspace.yaml`, `turbo.json`, CI workflow
**Acceptance:** CI passes on PRs, consistent linting rules

---

### Phase 1 — Core Data Model & Auth (Very High Priority)

| Task | Description |
|---|---|
| Design canonical ERD | users, profiles, workspaces, roles, listings, bookings |
| Choose and configure primary DB | PostgreSQL recommended in roadmap; MongoDB in project-overview |
| Implement auth-service | signup, login, email verification, JWT, OAuth |
| Implement user-service | user CRUD, workspace membership |
| DB schema + migrations | Prisma schema + migration files |
| Unit tests | Auth and user service tests |

**Acceptance:** Create user → verify → create workspace → fetch profile via API

---

### Phase 2 — Gateway & API Contracts (High)

| Task | Description |
|---|---|
| Implement gateway-service | BFF aggregating all services |
| OpenAPI specs | Contracts for auth, users, profiles, search, marketplace |
| API versioning | Versioned endpoint strategy |
| Request logging | Structured request/response logging |
| E2E tests | Contract test suite |

**Acceptance:** Web UI consumes gateway endpoints; contract tests pass

---

### Phase 3 — Web Platform Baseline (High)

| Task | Description |
|---|---|
| Scaffold Next.js routes | All route groups and pages |
| Auth UI flows | Login, signup, verify email, workspace selection |
| Session handling | Frontend JWT/cookie session management |
| Profile view/edit | Public `u/[username]` and owner edit flows |
| UI library bootstrap | `packages/ui` with base components |

**Acceptance:** User can sign up, log in, view and edit their profile end-to-end

---

### Phase 4 — Marketplace & Booking Core (Medium)

| Task | Description |
|---|---|
| marketplace-service | Listings, products, CRUD APIs |
| booking-service | Availability, reservations, calendar |
| Listing frontend pages | Create, view, search listings |
| Booking flow | Select time → confirm → payment stub |
| Payment stub | Stripe test mode integration |

**Acceptance:** Users can create listings and make bookings in test mode

---

### Phase 5 — Search, Recommendations, AI (Medium)

| Task | Description |
|---|---|
| search-service | Elasticsearch indexing and query API |
| Qdrant setup | Vector collection config and embedding pipeline |
| recommendation-service | Personalized recommendation endpoints |
| ai-service | LLM prompts, content synthesis, profile suggestions |
| Search UI | Search page with filters |

**Acceptance:** Search returns relevant results; AI recommendations appear

---

### Phase 6 — Admin, Moderation, Verification (Medium-Low)

| Task | Description |
|---|---|
| admin-panel app | Admin dashboard UI |
| moderation-service | Content review, fraud detection |
| Verification workflows | Business and professional verification |
| RBAC in gateway | Admin role enforcement |

**Acceptance:** Admins can review reports and act on content/users

---

### Phase 7 — Integrations & Payments (Medium)

| Task | Description |
|---|---|
| payment-service | Stripe full integration, billing records |
| email-service | SES/SendGrid transactional emails |
| notification-service | Push notifications, webhooks |
| Third-party auth | Google, GitHub OAuth |

**Acceptance:** Payments succeed in sandbox; emails deliver

---

### Phase 8 — Infrastructure & Scaling (Ongoing)

| Task | Description |
|---|---|
| Containerize services | Dockerfiles for all services |
| Kubernetes manifests | K8s deployments, services, ingress |
| Terraform modules | Cloud infrastructure as code |
| Redis caching | Hot data caching layer |
| ClickHouse analytics | Analytical event storage |
| Monitoring setup | Prometheus + Grafana + Sentry |
| CI/CD hardening | Blue/green deployments |

---

### Phase 9 — Security, Privacy & Compliance (Ongoing)

| Task | Description |
|---|---|
| Threat modeling | Document attack surfaces |
| Input validation | Zod schemas at all boundaries |
| Rate limiting | Per-user and per-IP limits |
| Secret management | Environment-based, Vault for prod |
| Data classification | Tag and protect sensitive fields |
| GDPR/CCPA | Compliance review and implementation |
| Pen test | External security assessment |

---

### Phase 10 — Polish, Docs, Tests, Launch

| Task | Description |
|---|---|
| E2E tests | Playwright/Cypress test suite |
| Performance testing | Load testing with k6 |
| UX polishing | Accessibility, animations, responsiveness |
| SEO | Sitemap, meta tags, structured data |
| Documentation | Developer docs, runbooks, API docs |
| Launch preparation | Deployment plan, rollback strategy |

---

### Milestone Timeline

| Milestone | Phases | Target |
|---|---|---|
| M1 | Phase 0 + Phase 1 | 2–4 weeks: Auth + DB + gateway + web auth flows |
| M2 | Phase 2 + Phase 3 | 4–8 weeks: Public profiles + marketing site |
| M3 | Phase 4 | 6–10 weeks: Marketplace + bookings + payments |
| M4 | Phases 5–9 | Ongoing: Search/AI + admin + infra + security |

---

## 30. Current Project State

### 30.1 What Exists (Implemented)

| Item | Status |
|---|---|
| Monorepo directory structure | Complete |
| `pnpm-workspace.yaml` config | Complete |
| Root `package.json` | Minimal (no scripts yet) |
| `turbo.json` | Exists (empty pipeline — needs tasks) |
| `.github/workflows/ci.yml` | Basic CI (checkout + Node setup) |
| `.husky/` directory | Exists (no hooks configured yet) |
| `docs/project-overview.md` | Complete — master architecture paper |
| `docs/development-roadmap.md` | Complete — phased plan |
| `apps/web-platform/` scaffold | Next.js shell with route directory structure |
| `apps/web-platform/src/app/(marketing)/page.tsx` | Placeholder home page |
| `apps/web-platform/next.config.ts` | Empty config |
| `apps/web-platform/tailwind.config.ts` | Empty config |
| `apps/web-platform/middleware.ts` | Empty export |
| All service directories | Exist (`.gitkeep` only — no implementation) |
| All package directories | Exist (`.gitkeep` only — no implementation) |
| All infrastructure directories | Exist (`.gitkeep` only — no implementation) |

### 30.2 What Needs to Be Built (Priority Order)

1. CI/CD — Linting, type check, test jobs in GitHub Actions
2. TypeScript configs — ESLint, Prettier, tsconfig in `packages/configs`
3. Database schema — Prisma schema for all core collections
4. `auth-service` — Complete authentication service
5. `user-service` — User CRUD and workspace membership
6. `gateway-service` — API gateway with proxy routing
7. `packages/ui` — Base component library
8. Web platform auth flows — Login, signup, verification UI
9. Public profile pages — View and edit profile
10. Everything in Phases 4–10

---

## 31. MVP Feature Set

The first production release should include:

| Feature | Service | Status |
|---|---|---|
| Authentication | auth-service | Not built |
| Workspace system | workspace (in gateway) | Not built |
| Dynamic onboarding | onboarding-service | Not built |
| Profile engine | profile-service | Not built |
| Service listings | marketplace-service | Not built |
| Booking system | booking-service | Not built |
| Search & discovery | search-service | Not built |
| Messaging | websocket-service | Not built |
| Reviews | marketplace-service | Not built |

---

## 32. Future Expansion Roadmap

Beyond MVP, planned platform expansions:

| Feature | Description |
|---|---|
| AI copilots | Workspace-specific AI assistants |
| Business intelligence | Advanced BI dashboards and reports |
| Advanced automation | Complex multi-step workflow builder |
| Enterprise APIs | Public API for third-party integrations |
| Mobile apps | iOS and Android apps (`apps/mobile-app`) |
| Creator economy tools | Subscriptions, tips, paid content |
| AI-generated websites | Full site generation from profile data |
| Advanced CRM | Sales forecasting, AI lead scoring |
| Business operating system | Full org management suite |

---

## 33. Engineering Principles

The platform is built on these fundamental engineering principles:

| Principle | What It Means |
|---|---|
| Modular architecture | Every feature is an isolated, independently deployable module |
| Domain-driven design | Code organized around business domains, not technical layers |
| Config-driven systems | Behaviors controlled by data, not hardcoded logic |
| Registry-based rendering | Components discovered and loaded via registry lookups |
| Scalable APIs | APIs designed for high throughput from day one |
| Reusable components | No duplication — UI and logic shared via packages |
| Engine-first development | Build engines before features; features are engine outputs |
| Performance-first | Every system measured and optimized for speed |
| Accessibility-first | WCAG AA compliance target for all UI |
| Developer experience | Clear conventions, good tooling, fast feedback loops |
| Zero-downtime ops | Blue/green deploys, backward-compatible migrations |
| Security by default | Auth, validation, and permission checks at every layer |

---

## Appendix A — Complete File Tree

```
mydigisence/
├── .github/workflows/ci.yml
├── .husky/
├── .vscode/settings.json
├── apps/
│   ├── admin-panel/
│   ├── ai-studio/
│   ├── marketing-site/
│   ├── mobile-app/
│   └── web-platform/
│       ├── public/{fonts,icons,images,logos,manifest}/
│       ├── src/app/
│       │   ├── (admin)/{admin,analytics,businesses,feature-flags,fraud,marketplace,moderation,professionals,reports,settings,support,users,verification}/
│       │   ├── (auth)/{forgot-password,login,onboarding/{business,explorer,professional},reset-password,signup,verify-email,workspace-selection}/
│       │   ├── (community)/{community,creators,discussions,events,feed,groups,networking,webinars}/
│       │   ├── (dashboard)/dashboard/[workspace]/{ai,analytics,automation,billing,bookings,campaigns,community,crm,custom-domain,feeds,insights,integrations,marketplace,media,messages,notifications,permissions,profile-builder,reviews,seo,settings,team,templates,themes}/
│       │   ├── (explore)/{categories,cities,explore,featured,industries,nearby,recommendations,skills,top-rated,trending}/
│       │   ├── (marketing)/{about,ai,blog,cities,contact,enterprise,features,guides,help,industries,page.tsx,pricing,solutions}/
│       │   ├── (profile)/{[username],[workspace]}/
│       │   ├── (public)/{browse,discover,search,[username]}/
│       │   ├── search/
│       │   ├── shared/{animations,cards,charts,components,dialogs,empty-states,forms,loaders,navigation,skeletons,tables,ui,widgets}/
│       │   ├── stores/
│       │   ├── styles/
│       │   ├── tests/
│       │   └── workers/
│       ├── .env.local
│       ├── middleware.ts
│       ├── next.config.ts
│       ├── package.json
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── packages/{ai-sdk,analytics,auth,configs,constants,database,design-system,emails,feature-flags,hooks,logger,notifications,payments,permissions,search,seo,stores,templates,ui,utils,validations,websocket}/
├── services/{ai-service,analytics-service,auth-service,automation-service,booking-service,business-service,crm-service,email-service,gateway-service,marketplace-service,media-service,moderation-service,notification-service,onboarding-service,payment-service,professional-service,profile-service,queue-service,recommendation-service,search-service,user-service,websocket-service}/
├── docs/{ai,api,architecture,dashboards,database,deployment,marketplace,onboarding,profiles,scaling,security,project-overview.md,development-roadmap.md,TECHNICAL_DOCUMENTATION.md}/
├── infrastructure/{aws,clickhouse,cloudflare,docker,elasticsearch,kubernetes,logging,mongodb,monitoring,nginx,qdrant,redis,scripts,terraform}/
├── scripts/{backup,deployment,indexing,migration,monitoring,setup,workers}/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.json
└── turbo.json
```

---

## Appendix B — Recommended Implementation Order

For a solo developer or small team (3–5 engineers), the recommended order:

```
Week 1–2:   Configure turbo.json pipeline, ESLint, Prettier, Husky hooks
Week 2–4:   Prisma schema, MongoDB setup, migration scripts
Week 3–5:   auth-service (signup, login, email verify, JWT)
Week 4–6:   user-service, workspace creation
Week 5–7:   gateway-service with proxy routing
Week 6–8:   packages/ui (base components: Button, Input, Card, etc.)
Week 7–9:   Web auth UI (login, signup, onboarding flows)
Week 8–10:  Public profile pages (view + edit)
Week 10–14: marketplace-service + booking-service
Week 12–16: search-service + Elasticsearch setup
Week 14–18: payment-service (Stripe integration)
Week 16–20: AI features (ai-service, Qdrant, recommendations)
Week 20+:   Admin panel, moderation, compliance, scaling
```

---

*This document represents the complete technical knowledge base of the MyDigiSence platform as of 2026-05-15. It covers all architectural decisions, technology choices, system designs, data models, routing structures, and development phases defined in the project.*