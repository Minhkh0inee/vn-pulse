import { IMonthlyIndex } from "@/app/types/monthlyIndex"
import { prisma } from "@/lib/prisma"
import { redis } from "@/lib/redis"


export async function getLatestIndex() {
  const cacheKey = "index:latest"
  const cached = await redis.get<IMonthlyIndex>(cacheKey)
  if (cached) return cached

  const data = await prisma.monthlyIndex.findFirst({
    where:   { isPublished: true },
    orderBy: { month: "desc" },
    include: { sectorScores: true },
  })

  if (data) await redis.set(cacheKey, data, { ex: 3600 })
  return data
}

export async function getLatestTwoIndexes() {
  const cacheKey = "index:latest-two"
  const cached = await redis.get<IMonthlyIndex[]>(cacheKey)
  if (cached) return cached

  const data = await prisma.monthlyIndex.findMany({
    where:   { isPublished: true },
    orderBy: { month: "desc" },
    take:    2,
    include: { sectorScores: true },
  })

  if (data) await redis.set(cacheKey, data, { ex: 3600 })
  return data
}

export async function getLast6Months() {
  const cacheKey = "index:last-6"
  const cached = await redis.get<IMonthlyIndex[]>(cacheKey)
  if (cached) return cached

  const data = await prisma.monthlyIndex.findMany({
    where:   { isPublished: true },
    orderBy: { month: "desc" },
    take:    6,
  })

  if (data) await redis.set(cacheKey, data, { ex: 3600 })
  return data
}

export async function getAllIndexes() {
  const cacheKey = "index:all"
  const cached = await redis.get<IMonthlyIndex[]>(cacheKey)
  if (cached) return cached

  const data = await prisma.monthlyIndex.findMany({
    where:   { isPublished: true },
    orderBy: { month: "desc" },
  })

  if (data) await redis.set(cacheKey, data, { ex: 3600 })
  return data
}

export async function getLast6MonthsUpTo(month: string) {
  const cacheKey = `index:last-6-upto:${month}`
  const cached = await redis.get<IMonthlyIndex[]>(cacheKey)
  if (cached) return cached

  const data = await prisma.monthlyIndex.findMany({
    where:   { isPublished: true, month: { lte: month } },
    orderBy: { month: "desc" },
    take:    6,
  })

  if (data) await redis.set(cacheKey, data, { ex: 86400 })
  return data
}

export async function getPollByMonth(month: string) {
  const data = await prisma.poll.findUnique({
    where: { month },
    // select: { id: true, month: true, question: true, isOpen: true },
  })
  return data
}

export async function getIndexByMonth(month: string) {
  const cacheKey = `index:${month}`
  const cached = await redis.get<IMonthlyIndex>(cacheKey)
  if (cached) return cached

  const data = await prisma.monthlyIndex.findUnique({
    where:   { month },
    include: { sectorScores: true },
  })

  if (data) await redis.set(cacheKey, data, { ex: 86400 }) // 24h
  return data
}