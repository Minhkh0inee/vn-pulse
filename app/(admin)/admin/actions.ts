"use server"

import { prisma } from "@/lib/prisma"

export async function getExistingMonths(): Promise<string[]> {
  const records = await prisma.monthlyIndex.findMany({
    select: { month: true },
    orderBy: { month: "desc" },
  })
  return records.map((r) => r.month)
}
