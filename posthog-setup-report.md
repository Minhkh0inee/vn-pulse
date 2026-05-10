<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into VN Pulse. Here is a summary of all changes made:

**Client-side initialization** — PostHog is initialized in `instrumentation-client.ts` (alongside the existing Sentry setup) using `posthog-js` with a reverse proxy via `/ingest`, exception capture enabled, and debug mode in development.

**Reverse proxy** — `next.config.ts` updated to proxy `/ingest/static/*`, `/ingest/array/*`, and `/ingest/*` to PostHog's US servers, reducing ad-blocker interception. `skipTrailingSlashRedirect` set to `true` as required.

**Server-side client** — New `lib/posthog-server.ts` provides a `getPostHogClient()` factory using `posthog-node` with `flushAt: 1` and `flushInterval: 0` for immediate event delivery in serverless/edge contexts.

**User identification** — `app/(auth)/login/page.tsx` calls `posthog.identify()` with email and name whenever a session is detected, linking all browser events to the known admin user.

**Event tracking** — 11 events instrumented across 5 files:

| Event | Description | File |
|---|---|---|
| `subscribe_submitted` | User submits newsletter subscribe form | `components/shared/SubscribeWidget.tsx` |
| `subscribe_succeeded` | Server confirms new subscription (includes `is_new: true`) | `app/actions/subscribe.ts` |
| `subscribe_failed` | Server-side subscription error | `app/actions/subscribe.ts` |
| `poll_option_selected` | User selects a rating option in the community poll | `components/dashboard/PollWidget/PollWidget.tsx` |
| `poll_vote_submitted` | User clicks Submit Vote | `components/dashboard/PollWidget/PollWidget.tsx` |
| `poll_vote_succeeded` | Server records the poll vote (includes `month`, `rating`, `total_votes`, `avg_rating`) | `app/api/poll/[month]/vote/route.ts` |
| `email_verified` | Email verification completed (server page) | `app/(public)/verify/page.tsx` |
| `unsubscribed` | User successfully unsubscribed | `app/(public)/unsubscribe/page.tsx` |
| `index_published` | Admin publishes a new monthly index | `app/(admin)/admin/actions.ts` |
| `admin_login_clicked` | Admin clicks Login with Google | `app/(auth)/login/page.tsx` |
| `compare_months_selected` | User selects months to compare | `components/shared/Compare/CompareClient.tsx` |

**Error tracking** — `posthog.captureException()` added in `PollWidget.tsx` to capture vote submission errors.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1565878)
- [Newsletter Subscription Funnel](/insights/KdBrn3mP) — conversion from form submit → server-confirmed subscription
- [Poll Engagement Funnel](/insights/bhNBnIjJ) — drop-off from option selected → vote submitted → vote recorded
- [Newsletter Subscriptions Over Time](/insights/OFtNm7ir) — daily trend of new subscriptions
- [Poll Votes Over Time](/insights/chVNfcsB) — daily trend of community poll votes
- [Monthly Index Publishing Activity](/insights/crPrevrK) — monthly bar chart of index publish events

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
