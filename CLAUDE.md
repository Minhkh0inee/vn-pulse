# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check (no emit)
npm run seed         # Seed database (npx prisma db seed)
npx prisma migrate dev   # Run DB migrations in dev
npx prisma studio        # Browse DB
npx vitest           # Run tests
npx vitest run       # Run tests once (no watch)
```

## Architecture

**vn-pulse** is a Vietnamese startup ecosystem tracker that publishes a monthly composite index (0–100) scored across funding, job postings, news volume, and community polls.

### Route structure (App Router)

- `app/(public)/` — public-facing pages (index, archive, sector detail)
- `app/(admin)/` — admin dashboard (protected, requires auth)
- `app/(auth)/login/` — Google OAuth login page
- `app/api/auth/[...nextauth]/` — NextAuth handler
- `app/api/cron/` — daily cron job (keep-alive / future data pipeline), secured via `CRON_SECRET`

### Key layers

| Layer | Location | Notes |
|---|---|---|
| DB | `prisma/schema.prisma` | PostgreSQL via `DATABASE_URL` |
| ORM | `lib/prisma.ts` | Singleton Prisma client |
| Cache / Rate limit | `lib/redis.ts`, `lib/rate-limiter.ts` | Upstash Redis; poll votes rate-limited at 5 req/60 s per IP |
| Auth | `app/api/auth/[...nextauth]/route.ts` | NextAuth v4, Google provider; access restricted to `ADMIN_EMAILS` env var |
| Session | `app/providers.tsx` | `SessionProvider` wraps the tree |
| UI primitives | `components/ui/` | shadcn/ui components |
| TypeScript types | `app/types/` | Interface definitions mirroring Prisma models |

### Data model summary

- **MonthlyIndex** — one record per month (`"2026-03"`), holds weighted scores and raw signal data, bilingual summaries (Vi/En), publish state
- **SectorScore** — per-sector breakdown (fintech, ecommerce, edtech, healthtech, deeptech) linked to a MonthlyIndex
- **Poll / PollResponse** — one open poll per month; responses store SHA-256-hashed IP to prevent duplicates
- **Subscriber** — email list with verify token flow
- **User** — admin/editor roles, linked to AuditLog
- **AuditLog** — tracks publish/update/unpublish actions on MonthlyIndex records
- **PageView** — lightweight analytics

### Environment variables required

```
DATABASE_URL
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_SECRET
ADMIN_EMAILS          # comma-separated list of allowed admin emails
CRON_SECRET           # Bearer token checked by /api/cron
```

### Cron job

Configured in `vercel.json` to run daily at `0 0 * * *` (UTC midnight). The handler at `/api/cron` verifies the `Authorization: Bearer <CRON_SECRET>` header before executing.

### Stack versions (check docs before writing code)

- Next.js **16.2.1** — may have breaking changes vs earlier versions; consult `node_modules/next/dist/docs/`
- React **19.2.4**
- Tailwind CSS **v4** — config via `postcss.config.mjs`, not `tailwind.config.js`
- Shadcn/UI **v4**
- Prisma **v6**
- Zod **v4**
- next-safe-action **v8**
- Sentry **@sentry/nextjs v10** — error monitoring
- Vitest **v4** — test runner
