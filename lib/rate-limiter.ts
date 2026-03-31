import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
    timeout: 10000,
    prefix: 'poll_vote'
})

export type RatelimitResponse = Awaited<ReturnType<typeof ratelimit.limit>>;