"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { redis } from "@/lib/redis"
import type { FormState, SectorRow } from "@/components/admin/types"

export async function getExistingMonths(): Promise<string[]> {
  const records = await prisma.monthlyIndex.findMany({
    select: { month: true },
    orderBy: { month: "desc" },
  })
  return records.map((r) => r.month)
}

export async function publishIndex(
  form: FormState,
  sectorScores: SectorRow[],
): Promise<{ success: boolean; error?: string }> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized" }
  }

  const monthMatch = form.month.trim().match(/^(\d{4})-(\d{2})$/)
  if (!monthMatch) {
    return { success: false, error: "Invalid month format (expected YYYY-MM)" }
  }
  const year = parseInt(monthMatch[1])
  const month_num = parseInt(monthMatch[2])

  const p = (v: string) => parseFloat(v) || 0
  const totalScore =
    p(form.fundingScore) * p(form.fundingWeight) +
    p(form.jobPostingScore) * p(form.jobPostingWeight) +
    p(form.newsVolumeScore) * p(form.newsVolumeWeight) +
    p(form.pollScore) * p(form.pollWeight)

  try {
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      create: {
        email: session.user.email,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
      },
      update: {},
    })

    await prisma.$transaction(async (tx) => {
      const index = await tx.monthlyIndex.create({
        data: {
          month: form.month.trim(),
          year,
          month_num,
          totalScore,
          fundingScore: p(form.fundingScore),
          jobPostingScore: p(form.jobPostingScore),
          newsVolumeScore: p(form.newsVolumeScore),
          pollScore: p(form.pollScore),
          fundingWeight: p(form.fundingWeight),
          jobPostingWeight: p(form.jobPostingWeight),
          newsVolumeWeight: p(form.newsVolumeWeight),
          pollWeight: p(form.pollWeight),
          rawFundingDeals: form.rawFundingDeals !== "" ? parseInt(form.rawFundingDeals) : null,
          rawFundingValue: form.rawFundingValue !== "" ? parseFloat(form.rawFundingValue) : null,
          rawJobPostings: form.rawJobPostings !== "" ? parseInt(form.rawJobPostings) : null,
          rawNewsArticles: form.rawNewsArticles !== "" ? parseInt(form.rawNewsArticles) : null,
          rawPollAvg: form.rawPollAvg !== "" ? parseFloat(form.rawPollAvg) : null,
          rawPollCount: form.rawPollCount !== "" ? parseInt(form.rawPollCount) : null,
          commentary: form.commentary,
          summaryVi: form.summaryVi || null,
          summaryEn: form.summaryEn || null,
          isPublished: true,
          publishedAt: new Date(),
          sectorScores: {
            create: sectorScores
              .filter((s) => s.score !== "")
              .map((s) => ({
                sector: s.sector,
                score: parseFloat(s.score) || 0,
                trend: s.trend !== "" ? parseFloat(s.trend) : null,
              })),
          },
        },
      })

      await tx.auditLog.create({
        data: {
          userId: user.id,
          indexId: index.id,
          action: "publish",
          details: { month: form.month.trim(), totalScore },
        },
      })
    })

    await redis.del("index:all", "index:latest")

    return { success: true }
  } catch (error) {
    console.error("[publishIndex]", error)
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return { success: false, error: `${form.month} already exists in the database` }
    }
    return { success: false, error: "Failed to publish. Please try again." }
  }
}
