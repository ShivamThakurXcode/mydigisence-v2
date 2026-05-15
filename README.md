# MyDigiSence — Digital Presence Platform

> A modular intelligent digital ecosystem platform for businesses, professionals, creators, and explorers.

**Stack:** Next.js 15 · Node.js · Fastify · MongoDB · Redis · Elasticsearch · Qdrant · Tailwind CSS v4 · Prisma · BullMQ · Socket.IO

---

## Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`npm install -g pnpm`)
- Docker + Docker Compose

### 1. Clone and install

```bash
git clone https://github.com/your-org/mydigisence.git
cd mydigisence
pnpm install
```

### 2. Start infrastructure (MongoDB, Redis, Elasticsearch, Qdrant, MailHog)

```bash
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
```

| Service | URL |
|---|---|
| MongoDB | `localhost:27017` |
| Redis | `localhost:6379` |
| Elasticsearch | `http://localhost:9200` |
| Qdrant | `http://localhost:6333` |
| MailHog (email UI) | `http://localhost:8025` |
| Mongo Express | `http://localhost:8081` |

### 3. Configure environment

```bash
cp .env.example services/auth-service/.env
cp .env.example services/gateway-service/.env
cp .env.example apps/web-platform/.env.local
```

Edit each file and fill in the required values.

### 4. Generate Prisma client + push schema

```bash
pnpm --filter @mydigisence/database db:generate
pnpm --filter @mydigisence/database db:push
```

### 5. Run services

```bash
# Terminal 1 — Auth service
pnpm --filter @mydigisence/auth-service dev

# Terminal 2 — Gateway
pnpm --filter @mydigisence/gateway-service dev

# Terminal 3 — Web platform
pnpm --filter @mydigisence/web-platform dev
```

Visit: http://localhost:3000

---

## Repository Structure

```
mydigisence/
├── apps/
│   ├── web-platform/          # Next.js 15 app (primary UI)
│   ├── admin-panel/           # Admin dashboard
│   └── ...
├── packages/
│   ├── database/              # Prisma schema + client
│   ├── auth/                  # JWT + bcrypt utilities
│   ├── validations/           # Zod schemas
│   ├── constants/             # Shared constants
│   ├── logger/                # Pino logger
│   └── ...
├── services/
│   ├── auth-service/          # Auth: signup, login, JWT
│   ├── gateway-service/       # API gateway (BFF)
│   └── ...
├── infrastructure/
│   └── docker/                # Docker Compose dev setup
└── docs/
    ├── TECHNICAL_DOCUMENTATION.md
    └── development-roadmap.md
```

---

## Development

```bash
pnpm build          # Build all packages
pnpm lint           # Lint all packages
pnpm type-check     # TypeScript check
pnpm test           # Run all tests
pnpm format         # Format with Prettier
```

---

## Architecture

MyDigiSence is built on **9 platform engines**:

| Engine | Purpose |
|---|---|
| Onboarding Engine | Dynamic setup wizards per user type |
| Workspace Engine | Permissions, modules, branding |
| Profile Engine | Registry-based dynamic profiles |
| Dashboard Engine | Widget-driven adaptive dashboards |
| Module Engine | Enable/disable features per workspace |
| Recommendation Engine | AI-powered personalized discovery |
| Search Engine | Elasticsearch + Qdrant semantic search |
| AI Engine | LLM features, embeddings, optimization |
| Automation Engine | Workflows, triggers, campaigns |

See [docs/TECHNICAL_DOCUMENTATION.md](docs/TECHNICAL_DOCUMENTATION.md) for the full technical reference.

---

## Services

| Service | Port | Status |
|---|---|---|
| gateway-service | 4000 | ✅ Scaffold |
| auth-service | 4001 | ✅ Implemented |
| user-service | 4002 | 🔄 In progress |
| profile-service | 4003 | 📋 Planned |
| marketplace-service | 4004 | 📋 Planned |
| booking-service | 4005 | 📋 Planned |
| search-service | 4006 | 📋 Planned |
| ai-service | 4007 | 📋 Planned |
| websocket-service | 4010 | 📋 Planned |

---

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| Phase 0 | Monorepo setup, CI/CD | ✅ Done |
| Phase 1 | Auth service, database schema | ✅ Done |
| Phase 2 | Gateway service, API contracts | ✅ Done |
| Phase 3 | Web platform baseline, auth UI | ✅ Done |
| Phase 4 | Marketplace & booking | 🔄 Next |
| Phase 5 | Search, AI, recommendations | 📋 Planned |
| Phase 6 | Admin panel, moderation | 📋 Planned |
| Phase 7 | Payments, email, notifications | 📋 Planned |
| Phase 8 | Infrastructure, scaling | 📋 Planned |
| Phase 9 | Security, compliance | 📋 Planned |
| Phase 10 | Polish, tests, launch | 📋 Planned |

---

## Contributing

1. Branch from `develop`
2. Follow the monorepo structure — each package has one responsibility
3. Run `pnpm lint && pnpm type-check` before opening a PR
4. All PRs require at least one reviewer

---

*Built with ❤️ by the MyDigiSence team.*
