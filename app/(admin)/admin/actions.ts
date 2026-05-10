"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import type { FormState, SectorRow } from "@/components/admin/types";
import { sendNewsletter } from "@/app/actions/newsletter";
import type { IMonthlyIndex } from "@/app/types/monthlyIndex";
import { getPostHogClient } from "@/lib/posthog-server";

export async function getExistingMonths(): Promise<string[]> {
  const records = await prisma.monthlyIndex.findMany({
    select: { month: true },
    orderBy: { month: "desc" },
  });
  return records.map((r) => r.month);
}

export async function publishIndex(
  form: FormState,
  sectorScores: SectorRow[],
): Promise<{ success: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized" };
  }

  const monthMatch = isMonthMatch(form.month);

  const year = parseInt(monthMatch[1]);
  const month_num = parseInt(monthMatch[2]);

  const totalScore = calculateTotalScore(
    form.fundingScore,
    form.fundingWeight,
    form.jobPostingScore,
    form.jobPostingWeight,
    form.newsVolumeScore,
    form.newsVolumeWeight,
    form.pollScore,
    form.pollWeight,
  );

  try {
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      create: {
        email: session.user.email,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
      },
      update: {},
    });

    await prisma.$transaction(async (tx) => {
      const index = await tx.monthlyIndex.create({
        data: {
          month: form.month.trim(),
          year,
          month_num,
          totalScore,
          fundingScore: converStringToFloat(form.fundingScore),
          jobPostingScore: converStringToFloat(form.jobPostingScore),
          newsVolumeScore: converStringToFloat(form.newsVolumeScore),
          pollScore: converStringToFloat(form.pollScore),
          fundingWeight: converStringToFloat(form.fundingWeight),
          jobPostingWeight: converStringToFloat(form.jobPostingWeight),
          newsVolumeWeight: converStringToFloat(form.newsVolumeWeight),
          pollWeight: converStringToFloat(form.pollWeight),
          rawFundingDeals:
            form.rawFundingDeals !== "" ? parseInt(form.rawFundingDeals) : null,
          rawFundingValue:
            form.rawFundingValue !== ""
              ? parseFloat(form.rawFundingValue)
              : null,
          rawJobPostings:
            form.rawJobPostings !== "" ? parseInt(form.rawJobPostings) : null,
          rawNewsArticles:
            form.rawNewsArticles !== "" ? parseInt(form.rawNewsArticles) : null,
          rawPollAvg:
            form.rawPollAvg !== "" ? parseFloat(form.rawPollAvg) : null,
          rawPollCount:
            form.rawPollCount !== "" ? parseInt(form.rawPollCount) : null,
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
                summaryVi: s.summaryVi || null,
                summaryEn: s.summaryEn || null,
              })),
          },
        },
      });

      await tx.auditLog.create({
        data: {
          userId: user.id,
          indexId: index.id,
          action: "publish",
          details: { month: form.month.trim(), totalScore },
        },
      });
    });

    await redis.del(
      "index:all",
      "index:latest",
      "index:latest-two",
      `index:${form.month.trim()}`,
      `sectors:${form.month.trim()}`,
    );

    const publishedIndex = await prisma.monthlyIndex.findFirst({
      where: { month: form.month.trim() },
      include: { sectorScores: true },
    });
   
    if (publishedIndex) {
      await sendNewsletter(publishedIndex as IMonthlyIndex);
    }

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: session.user.email,
      event: "index_published",
      properties: {
        month: form.month.trim(),
        total_score: totalScore,
        publisher_email: session.user.email,
      },
    });
    await posthog.shutdown();

    return { success: true };
  } catch (error) {
    console.error("[publishIndex]", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return {
        success: false,
        error: `${form.month} already exists in the database`,
      };
    }
    return { success: false, error: "Failed to publish. Please try again." };
  }
}

function isMonthMatch(month: string): RegExpMatchArray | null | any {
  const monthMatch = month.trim().match(/^(\d{4})-(\d{2})$/);
  if (!monthMatch) {
    return { success: false, error: "Invalid month format (expected YYYY-MM)" };
  }

  return monthMatch;
}

function calculateTotalScore(
  fundingScore: string,
  fundingWeight: string,
  jobPostingScore: string,
  jobPostingWeight: string,
  newsVolumeScore: string,
  newsVolumeWeight: string,
  pollScore: string,
  pollWeight: string,
) {

  return (
    converStringToFloat(fundingScore) * converStringToFloat(fundingWeight) +
    converStringToFloat(jobPostingScore) * converStringToFloat(jobPostingWeight) +
    converStringToFloat(newsVolumeScore) * converStringToFloat(newsVolumeWeight) +
    converStringToFloat(pollScore) * converStringToFloat(pollWeight)
  );
}

function converStringToFloat(v: string): number{
  return parseFloat(v) || 0;
}
