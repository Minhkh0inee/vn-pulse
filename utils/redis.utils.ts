import { redis } from "@/lib/redis";

export const getKey = async (key: string) => {
   return await redis.get(key);
};

export const setKey = async (key: string, value: unknown, ttl: number) => {
   await redis.set(key, value, { ex: ttl });
};

export const deleteKey = async (key: string) => {
   await redis.del(key);
};

export const deletePattern = async (pattern: string) => {
  // ⚠️ Note: redis.keys() is O(N) — fine for small datasets
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};
