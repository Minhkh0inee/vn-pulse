import ScoreCard from '@/components/shared/ScoreCard'
import { PollWidget } from '@/components/dashboard/PollWidget'
import CommentaryComponent from '@/components/shared/CommentaryComponent/CommentaryComponent'
import StatsCard from '@/components/shared/StatsCard'
import InsightCard from '@/components/shared/InsightCard'
import TrendChart, { TrendDataPoint } from '@/components/shared/TrendCard/TrendChart'
import ComponentBreakdown from '@/components/shared/ComponentBreakdown/ComponentBreakdown'
import { getLast6Months, getLatestTwoIndexes, getPollByMonth, getInsightCardsAI } from '@/lib/fetchers'
import { SubscribeWidget } from '@/components/shared/SubscribeWidget'
import { SectorIndex } from '@/components/shared/SectorIndex'
import { Banknote, Briefcase } from 'lucide-react'
import { formatMonthLabel } from '@/utils/formatMonthLabel'
import type { ISectorScore } from "@/app/types/sectorScore"
import type { InsightType } from "@/app/types/insightCard"
import type { InsightCategory } from "@/components/shared/InsightCard"
import { buildComponentBreakdown } from '@/utils/buildComponentBreakdown.utils'
import { buildFundingStatus } from '@/utils/buildFundingStatus.util'
import { buildJobPostingStatus } from '@/utils/buildJobPostingStatus.util'
import { REVALIDATE_DEFAULT } from '@/lib/constant/config'

export const revalidate = REVALIDATE_DEFAULT


export default async function HomePage() {
  const [twoIndexes, last6Raw] = await Promise.all([
    getLatestTwoIndexes(),
    getLast6Months(),
  ])

  const [latest, previous] = twoIndexes
  if (!latest) {
    return (
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-20 text-center text-[var(--muted-foreground)]">
        No published index data yet.
      </div>
    )
  }

  const [poll, insights] = await Promise.all([
    getPollByMonth(latest.month),
    getInsightCardsAI(latest.month),
  ])
  const trendData: TrendDataPoint[] = [...last6Raw].reverse().map((idx, _, arr) => ({
    month:     formatMonthLabel(idx.month),
    score:     idx.totalScore,
    isCurrent: idx.month === arr[arr.length - 1].month,
  }))

  const breakdown = buildComponentBreakdown(latest)

  const TYPE_TO_CATEGORY: Record<InsightType, InsightCategory> = {
    positive: 'funding',
    warning:  'sentiment',
    neutral:  'general',
  }

  const monthLabel   = formatMonthLabel(latest.month)
  const {value, sub} = buildFundingStatus(latest)
  const {value: jobValue, sub:jobSub} = buildJobPostingStatus(latest)


  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-10">

      {/* ── HERO SECTION ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-full">
          <ScoreCard
            score={latest.totalScore}
            month={monthLabel}
            previousScore={previous?.totalScore}
          />
        </div>

        {/* Right: StatsCards — each grows to fill equal share */}
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <StatsCard
              icon={<Banknote className="size-4" />}
              label="Total Funding"
              value={value}
              sub={sub}
            />
          </div>
          <div className="flex-1">
            <StatsCard
              icon={<Briefcase className="size-4" />}
              label="Job Postings"
              value={jobValue}
              sub={jobSub}
            />
          </div>
        </div>
      </section>

      {/* ── TREND SECTION ── */}
      <section>
        <TrendChart data={trendData} />
      </section>

      {/* ── ANALYSIS SECTION ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <ComponentBreakdown data={breakdown} />
        <CommentaryComponent
          month={monthLabel}
          commentary={latest.commentary}
          publishedAt={latest.publishedAt}
        />
      </section>

      {/* ── SECTOR INDEX ── */}
      {latest.sectorScores && latest.sectorScores.length > 0 && (
        <section>
          <SectorIndex sectorScores={latest.sectorScores as ISectorScore[]} />
        </section>
      )}

      {/* ── AI INSIGHT SECTION ── */}
      {insights.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {insights.map((card) => (
            <InsightCard
              key={card.id}
              category={TYPE_TO_CATEGORY[card.type as InsightType]}
              headline={`${card.icon} ${card.text}`}
            />
          ))}
        </section>
      )}

      {/* ── POLL SECTION ── */}
      <section className="flex justify-center">
        <PollWidget
          month={monthLabel}
          rawMonth={latest.month}
          question={poll?.question}
        />
      </section>

      {/* ── SUBSCRIBE SECTION ── */}
      <section className="flex justify-center">
        <SubscribeWidget />
      </section>

    </div>
  )
}
