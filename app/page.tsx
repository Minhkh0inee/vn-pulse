import {
  InsightCards,
  InsightCardsSkeleton,
} from "@/components/dashboard/InsightCards";
import { CommentarySection } from "@/components/dashboard/CommentarySection";
import { generateInsightCards } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

async function InsightSection() {
  const [latest, previous] = await prisma.monthlyIndex.findMany({
    where: { isPublished: true },
    orderBy: { month: "desc" },
    take: 2,
  });
  const insights = await generateInsightCards(latest, previous);
  return <InsightCards insights={insights} />;
}

export default function Home() {
  const data = {
    month: "2026-03",
    totalScore: 72,
    trend: 4,
    fundingScore: 65,
    jobScore: 80,
    newsScore: 70,
    pollScore: 75,
    rawData: {
      fundingDeals: 3,
      fundingValueUsd: 8.5,
      jobPostings: 142,
      newsArticles: 47,
      pollAvg: 3.8,
      pollCount: 24,
    },
  };

  return (
    <main>
      <Suspense fallback={<InsightCardsSkeleton />}>
        {/* <InsightSection /> */}
      </Suspense>
      <CommentarySection input={data} />
    </main>
  );
}
