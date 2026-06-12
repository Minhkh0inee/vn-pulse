import { IMonthlyIndex } from "@/app/types/monthlyIndex"
import { ISectorScore, Sector } from "@/app/types/sectorScore"
import { IInsightCard } from "@/app/types/insightCard"
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
  return data as IMonthlyIndex | null
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
  return data as IMonthlyIndex[]
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

export async function getSectorScoresByMonth(month: string) {
  const cacheKey = `sectors:${month}`
  const cached = await redis.get<ISectorScore[]>(cacheKey)
  if (cached) return cached

  const data = await prisma.sectorScore.findMany({
    where:   { index: { month } },
    orderBy: { sector: "asc" },
  })

  if (data.length) await redis.set(cacheKey, data, { ex: 86400 })
  return data as ISectorScore[]
}

const VALID_SECTORS = [
  "fintech", "ecommerce", "edtech", "healthtech", "deeptech"
] as const satisfies readonly Sector[]

function isSector(value: string): value is Sector {
  return VALID_SECTORS.includes(value as Sector)
}

export async function getSectorScoresByIndexIds(indexIds: string[]): Promise<ISectorScore[]> {
  const cacheKey = `sectors:${indexIds.sort().join(",")}`
  const cached = await redis.get<ISectorScore[]>(cacheKey)
  if (cached) return cached

  const raw = await prisma.sectorScore.findMany({
    where: { indexId: { in: indexIds } },
  })

  const data: ISectorScore[] = raw
    .filter(item => isSector(item.sector))
    .map(item => ({ ...item, sector: item.sector as Sector }))

  await redis.set(cacheKey, data, { ex: 3600 })
  return data
}

export async function getPollByMonth(month: string) {
  const data = await prisma.poll.findUnique({
    where: { month },
    // select: { id: true, month: true, question: true, isOpen: true },
  })
  return data
}

export async function getIndexesByMonths(monthA: string, monthB: string) {
  const cacheKey = `index:compare:${[monthA, monthB].sort().join(':')}`;
  const cached = await redis.get<IMonthlyIndex[]>(cacheKey);
  if (cached) return cached;

  const data = await prisma.monthlyIndex.findMany({
    where:   { month: { in: [monthA, monthB] }, isPublished: true },
    include: { sectorScores: true },
  });

  if (data.length) await redis.set(cacheKey, data, { ex: 3600 });
  return data as IMonthlyIndex[];
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

export async function getInsightCardsAI(month: string): Promise<IInsightCard[]> {
  const cacheKey = `insight:${month}`
  const cached = await redis.get<IInsightCard[]>(cacheKey)
  if (cached) return cached

  const data = await prisma.insightCard.findMany({
    where: { index: { month } },
  })

  if (data.length) await redis.set(cacheKey, data, { ex: 86400 })
  return data as IInsightCard[]
}