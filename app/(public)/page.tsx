import ScoreCard from '@/components/shared/ScoreCard'
import { PollWidget } from '@/components/dashboard/PollWidget'
import CommentaryComponent from '@/components/shared/CommentaryComponent/CommentaryComponent'
import StatsCard from '@/components/shared/StatsCard'
import InsightCard from '@/components/shared/InsightCard'
import TrendChart, { TrendDataPoint } from '@/components/shared/TrendCard/TrendChart'
import ComponentBreakdown, { ComponentBreakdownData } from '@/components/shared/ComponentBreakdown/ComponentBreakdown'
import { getLast6Months, getLatestTwoIndexes, getPollByMonth } from '@/lib/fetchers'
import { SubscribeWidget } from '@/components/shared/SubscribeWidget'
import { Banknote, Briefcase } from 'lucide-react'

export const revalidate = 3600

function formatMonthLabel(month: string): string {
  const [year, mon] = month.split('-')
  const date = new Date(Number(year), Number(mon) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function formatMonthShort(month: string): string {
  const [year, mon] = month.split('-')
  const date = new Date(Number(year), Number(mon) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

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

  const poll = await getPollByMonth(latest.month)
  const trendData: TrendDataPoint[] = [...last6Raw].reverse().map((idx, _, arr) => ({
    month:     formatMonthShort(idx.month),
    score:     idx.totalScore,
    isCurrent: idx.month === arr[arr.length - 1].month,
  }))

  const breakdown: ComponentBreakdownData = {
    fundingScore:     latest.fundingScore,
    jobPostingScore:  latest.jobPostingScore,
    newsVolumeScore:  latest.newsVolumeScore,
    pollScore:        latest.pollScore,
    fundingWeight:    latest.fundingWeight,
    jobPostingWeight: latest.jobPostingWeight,
    newsVolumeWeight: latest.newsVolumeWeight,
    pollWeight:       latest.pollWeight,
  }
  const monthLabel   = formatMonthLabel(latest.month)
  const hasFunding     = latest.rawFundingValue != null
  const fundingValue   = hasFunding
    ? `$${(latest.rawFundingValue! / 1_000_000).toFixed(1)}M`
    : 'Not available'
  const fundingSub     = hasFunding && latest.rawFundingDeals != null
    ? `across ${latest.rawFundingDeals} deals`
    : 'Data not collected for this period'

  const hasJobs    = latest.rawJobPostings != null
  const jobPostings = hasJobs
    ? latest.rawJobPostings!.toLocaleString()
    : 'Not available'
  const jobsSub    = hasJobs
    ? 'active listings tracked'
    : 'Data not collected for this period'

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
              value={fundingValue}
              sub={fundingSub}
            />
          </div>
          <div className="flex-1">
            <StatsCard
              icon={<Briefcase className="size-4" />}
              label="Job Postings"
              value={jobPostings}
              sub={jobsSub}
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

      {/* ── AI INSIGHT SECTION ── */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          category="funding"
          headline="Early-stage rounds dominate activity"
          body="Seed and Series A deals accounted for the majority of disclosed transactions, signalling healthy pipeline formation in the ecosystem."
        />
        <InsightCard
          category="jobs"
          headline="Hiring momentum accelerates post-funding"
          body="Job postings surged across funded startups, particularly in engineering and product roles, reflecting confidence in growth trajectories."
        />
        <InsightCard
          category="sentiment"
          headline="Community optimism at 6-month high"
          body="Poll respondents rated the monthly outlook more positively than any period since Q3 2025, driven by visible deal flow and media coverage."
        />
      </section>

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
