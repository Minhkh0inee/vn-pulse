import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
    timeout: 10000,
    prefix: 'poll_vote'
})

export const pollVoteRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter:   Ratelimit.slidingWindow(10, "1 m"),  // 10 req/min per IP
  prefix:    "rl:poll-vote",
  analytics: true,
})

export const chatRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  prefix:  "rl:chat",
})

export const subscribeRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix:  "rl:subscribe",
})

export type RatelimitResponse = Awaited<ReturnType<typeof ratelimit.limit>>;