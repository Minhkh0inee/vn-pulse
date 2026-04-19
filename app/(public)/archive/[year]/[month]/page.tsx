import { getAllIndexes, getIndexByMonth, getLast6MonthsUpTo } from '@/lib/fetchers'
import ScoreCard from '@/components/shared/ScoreCard'
import StatsCard from '@/components/shared/StatsCard'
import TrendChart, { TrendDataPoint } from '@/components/shared/TrendCard/TrendChart'
import ComponentBreakdown, { ComponentBreakdownData } from '@/components/shared/ComponentBreakdown/ComponentBreakdown'
import CommentaryComponent from '@/components/shared/CommentaryComponent/CommentaryComponent'
import ShareButton from '@/components/shared/ShareButton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { Banknote, Briefcase } from 'lucide-react'
import { notFound } from 'next/navigation'
import { SectorIndex } from '@/components/shared/SectorIndex'
import { ISectorScore } from '@/app/types/sectorScore'
import { formatMonthLabel } from '@/utils/formatMonthLabel'
import { formatMonthShort } from '@/utils/formatMonthShort'
import { formatMonthVi } from '@/utils/formatMonthVi'

export const revalidate = 86400

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ year: string; month: string }>
}) {
  const { year, month } = await params
  const monthKey = `${year}-${month}` // e.g. "2026-03"

  const [index, last6Raw] = await Promise.all([
    getIndexByMonth(monthKey),
    getLast6MonthsUpTo(monthKey),
  ])

  if (!index) notFound()

  // last6Raw is DESC; reverse for chronological chart, mark last as current
  const trendData: TrendDataPoint[] = [...last6Raw].reverse().map((idx, _, arr) => ({
    month:     formatMonthShort(idx.month),
    score:     idx.totalScore,
    isCurrent: idx.month === arr[arr.length - 1].month,
  }))

  // Previous month is the second item in the DESC list
  const previousScore = last6Raw[1]?.totalScore

  const breakdown: ComponentBreakdownData = {
    fundingScore:     index.fundingScore,
    jobPostingScore:  index.jobPostingScore,
    newsVolumeScore:  index.newsVolumeScore,
    pollScore:        index.pollScore,
    fundingWeight:    index.fundingWeight,
    jobPostingWeight: index.jobPostingWeight,
    newsVolumeWeight: index.newsVolumeWeight,
    pollWeight:       index.pollWeight,
  }

  const monthLabel   = formatMonthLabel(index.month)
  const monthLabelVi = formatMonthVi(index.month)

  const hasFunding  = index.rawFundingValue != null
  const fundingValue = hasFunding
    ? `$${(index.rawFundingValue! / 1_000_000).toFixed(1)}M`
    : 'Not available'
  const fundingSub   = hasFunding && index.rawFundingDeals != null
    ? `across ${index.rawFundingDeals} deals`
    : 'Data not collected for this period'

  const hasJobs     = index.rawJobPostings != null
  const jobPostings  = hasJobs ? index.rawJobPostings!.toLocaleString() : 'Not available'
  const jobsSub      = hasJobs ? 'active listings tracked' : 'Data not collected for this period'

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-10">

      {/* ── TOP BAR: Breadcrumb + Share ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Trang chủ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/archive">Lịch sử</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{monthLabelVi}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ShareButton title={`VN Pulse — ${monthLabelVi}`} />
      </div>

      {/* ── HERO: ScoreCard + StatsCards ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-full">
          <ScoreCard
            score={index.totalScore}
            month={monthLabel}
            previousScore={previousScore}
          />
        </div>
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

      {/* ── TREND CHART ── */}
      {trendData.length > 0 && (
        <section>
          <TrendChart data={trendData} />
        </section>
      )}

      {/* ── ANALYSIS: Breakdown + Commentary ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <ComponentBreakdown data={breakdown} />
        <CommentaryComponent
          month={monthLabel}
          commentary={index.commentary}
          publishedAt={index.publishedAt}
        />
      </section>

      {/* ── SECTOR INDEX ── */}
      {index.sectorScores && index.sectorScores.length > 0 && (
        <section>
          <SectorIndex sectorScores={index.sectorScores as ISectorScore[]} />
        </section>
      )}

    </div>
  )
}
