# VN Pulse

A monthly composite index tracking the health of Vietnam's startup ecosystem. Scores are derived from four weighted signals: funding activity, job postings, news volume, and community polls.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Database**: PostgreSQL via Prisma v6
- **Cache / Rate limiting**: Upstash Redis
- **Auth**: NextAuth v4 (Google OAuth, admin-allowlist)
- **UI**: shadcn/ui + Tailwind CSS v4 + Recharts + Motion
- **Forms / Validation**: next-safe-action v8 + Zod v4
- **Monitoring**: Sentry (@sentry/nextjs)
- **Testing**: Vitest
- **Deployment**: Vercel (with daily cron job)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Upstash Redis instance

### Environment variables

Create a `.env` file at the project root:

```env
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
ADMIN_EMAILS=           # comma-separated list of allowed admin emails
CRON_SECRET=            # Bearer token for /api/cron authorization
```

### Install & run

```bash
npm install
npx prisma migrate dev  # apply migrations
npm run seed            # seed Oct 2025 – Mar 2026 data
npm run dev             # http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run seed` | Seed database |
| `npx vitest` | Run tests in watch mode |
| `npx vitest run` | Run tests once |
| `npx prisma studio` | Browse database |

## Architecture

```
app/
├── (public)/       # Public-facing pages
├── (admin)/        # Admin dashboard (auth required)
├── (auth)/login/   # Google OAuth login
└── api/
    ├── auth/       # NextAuth handler
    └── cron/       # Daily cron job (secured via CRON_SECRET)

lib/                # prisma client, redis, rate-limiter
components/ui/      # shadcn/ui primitives
prisma/
├── schema.prisma   # DB schema
├── seed.ts         # Seed data (Oct 2025 – Mar 2026)
└── migrations/
```

### Index scoring formula

```
totalScore = fundingScore × 0.30
           + jobPostingScore × 0.25
           + newsVolumeScore × 0.25
           + pollScore × 0.20
```

Sectors tracked: `fintech`, `ecommerce`, `edtech`, `healthtech`, `deeptech`

## Cron Job

Configured in `vercel.json` to run daily at `00:00 UTC` via `/api/cron`. Requires `Authorization: Bearer <CRON_SECRET>` header.
