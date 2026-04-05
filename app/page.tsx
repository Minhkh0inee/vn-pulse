import {
  InsightCards,
  InsightCardsSkeleton,
} from "@/components/dashboard/InsightCards";
import { generateInsightCards } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
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
  return (
    <main>
      <Suspense fallback={<InsightCardsSkeleton />}>
        {/* <InsightSection /> */}
      </Suspense>
    </main>
  );
}
