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
