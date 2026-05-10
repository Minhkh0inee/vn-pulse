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
npx vitest           # Run tests (watch mode)
npx vitest run       # Run tests once
npx vitest run test/scoring.test.ts   # Run a single test file
```

## Architecture

**vn-pulse** is a Vietnamese startup ecosystem tracker that publishes a monthly composite index (0–100) scored across funding, job postings, news volume, and community polls.

### Route structure (App Router)

- `app/(public)/` — public-facing pages: home, archive, archive detail (`[year]/[month]`), compare tool, verify email, unsubscribe
- `app/(admin)/admin/` — admin dashboard (protected, requires auth); server actions in `actions.ts`
- `app/(auth)/login/` — Google OAuth login page
- `app/api/auth/[...nextauth]/` — NextAuth handler
- `app/api/ai/generate-commentary/` — streams AI commentary for admin (Gemini Flash)
- `app/api/ai/generate-sector-summary/` — generates bilingual sector summaries (structured output)
- `app/api/chat/` — RAG chat endpoint backed by last 6 months of index + sector data
- `app/api/index/` — public REST endpoint for index data
- `app/api/poll/[month]/` — poll fetch and vote submission (rate-limited)
- `app/api/cron/` — daily keep-alive, secured via `CRON_SECRET`
- `app/api/cron/reset-poll/` — monthly poll reset (runs 1st of each month)
- `app/api/health/` — health check

### Key layers

| Layer | Location | Notes |
|---|---|---|
| DB | `prisma/schema.prisma` | PostgreSQL via `DATABASE_URL` |
| ORM | `lib/prisma.ts` | Singleton Prisma client |
| Data access | `lib/fetchers/index.ts` | All Prisma queries with Redis caching; use these instead of querying Prisma directly |
| Cache / Rate limit | `lib/redis.ts`, `lib/rate-limiter.ts` | Upstash Redis; poll votes rate-limited at 5 req/60 s per IP |
| AI | `lib/ai.ts` | Gemini Flash via `@ai-sdk/google`; exports `generateInsightCards`, `generateSectorSummary`, `commentaryGenerate` |
| Scoring | `lib/scoring.ts` | Pure `calculateIndex()` and `normalizeToScore()` — no side effects, fully tested |
| Auth | `app/api/auth/[...nextauth]/route.ts` | NextAuth v4, Google provider; access restricted to `ADMIN_EMAILS` env var |
| Session | `app/providers.tsx` | `SessionProvider` + PostHog provider wraps the tree |
| Email | `app/actions/newsletter.ts` | Resend batches newsletters to all verified subscribers on publish |
| UI primitives | `components/ui/` | shadcn/ui components |
| TypeScript types | `app/types/` | Types mirroring Prisma models (frontend use); `types/` holds scoring/commentary types (lib use) |

### Data flow: publishing a monthly index

1. Admin fills the form → calls `publishIndex()` server action (`app/(admin)/admin/actions.ts`)
2. Prisma transaction: creates `MonthlyIndex` + `SectorScore` rows + `AuditLog` entry
3. Redis cache bust: deletes `index:all`, `index:latest`, `index:latest-two`, `index:<month>`, `sectors:<month>`
4. Newsletter batch-sent via Resend to all verified subscribers
5. PostHog event `index_published` captured

### Redis cache key patterns

All fetchers in `lib/fetchers/index.ts` follow the same read-through pattern (check cache → query DB → set cache). Cache TTLs: 1 h for mutable data, 24 h for archived months.

| Key | Content |
|---|---|
| `index:latest` | Latest published MonthlyIndex (with sectorScores) |
| `index:latest-two` | Last 2 published indexes |
| `index:last-6` | Last 6 published indexes (no sectorScores) |
| `index:all` | All published indexes |
| `index:<month>` | Single month (e.g. `index:2026-03`) |
| `sectors:<month>` | SectorScore array for a month |
| `index:compare:<a>:<b>` | Two months for compare view |

### Data model summary

- **MonthlyIndex** — one record per month (`"2026-03"`), holds weighted scores and raw signal data, bilingual summaries (Vi/En), publish state
- **SectorScore** — per-sector breakdown (fintech, ecommerce, edtech, healthtech, deeptech) linked to a MonthlyIndex
- **Poll / PollResponse** — one open poll per month; responses store SHA-256-hashed IP to prevent duplicates
- **Subscriber** — email list with verify token flow
- **User** — admin/editor roles, linked to AuditLog
- **AuditLog** — tracks publish/update/unpublish actions on MonthlyIndex records
- **PageView** — lightweight analytics

### AI layer

`lib/ai.ts` exports three functions, all using `gemini-2.5-flash`:

- `generateInsightCards(data, previousData?)` — returns 3 structured Zod-validated insight objects (Vietnamese, with emoji + type)
- `generateSectorSummary(input)` — returns `{ summaryVi, summaryEn }` structured output
- `commentaryGenerate(input)` — returns a streaming text response (200–250 Vietnamese words)

The chat endpoint (`/api/chat`) uses `streamText` with all 6-month data + sector data injected into the system prompt as JSON context.

### Environment variables required

```
DATABASE_URL
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_SECRET
ADMIN_EMAILS                  # comma-separated list of allowed admin emails
CRON_SECRET                   # Bearer token checked by /api/cron routes
GOOGLE_GENERATIVE_AI_API_KEY  # Gemini API key for @ai-sdk/google
NEXT_RESEND_API_KEY           # Resend API key for newsletter emails
NEXT_PUBLIC_SITE_URL          # e.g. https://vn-pulse.com (used in email unsubscribe links)
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN  # PostHog project API key (client + server)
NEXT_PUBLIC_POSTHOG_HOST           # PostHog host, e.g. https://eu.i.posthog.com
```

### Cron jobs (`vercel.json`)

| Path | Schedule | Purpose |
|---|---|---|
| `/api/cron` | `0 0 * * *` | Daily keep-alive / future data pipeline |
| `/api/cron/reset-poll` | `0 0 1 * *` | Resets poll on 1st of each month |

Both routes verify `Authorization: Bearer <CRON_SECRET>`.

### Stack versions (check docs before writing code)

- Next.js **16.2.1** — may have breaking changes vs earlier versions; consult `node_modules/next/dist/docs/`
- React **19.2.4**
- Tailwind CSS **v4** — config via `postcss.config.mjs`, not `tailwind.config.js`
- Shadcn/UI **v4**
- Prisma **v6**
- Zod **v4**
- next-safe-action **v8**
- Vercel AI SDK **v6** (`ai` package) — `@ai-sdk/google` for Gemini
- Sentry **@sentry/nextjs v10** — error monitoring
- Vitest **v4** — test runner; tests live in `test/`
