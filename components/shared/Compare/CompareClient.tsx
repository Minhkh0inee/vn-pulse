'use client'

import { useRouter } from 'next/navigation'
import { IMonthlyIndex } from '@/app/types/monthlyIndex'
import CompareBarChart from './CompareBarChart'
import { GitCompare } from 'lucide-react'
import { formatMonthLabel } from '@/utils/formatMonthLabel'
import MetricBreakdown from './MetricBreakdown'
import CompareSelector from './CompareSelector'
import { getComparisonLabel } from '@/utils/getComparisonLabel'

export interface MonthOption {
  value: string
  label: string
}

interface CompareClientProps {
  monthOptions: MonthOption[]
  selectedA: string | null
  selectedB: string | null
  indexA: IMonthlyIndex | null
  indexB: IMonthlyIndex | null
}



export default function CompareClient({
  monthOptions,
  selectedA,
  selectedB,
  indexA,
  indexB,
}: CompareClientProps) {
  const router = useRouter()

  function handleSelect(side: 'a' | 'b', value: string) {
    const params = new URLSearchParams()
    if (side === 'a') {
      params.set('a', value)
      if (selectedB) params.set('b', selectedB)
    } else {
      if (selectedA) params.set('a', selectedA)
      params.set('b', value)
    }
    router.push(`/compare?${params.toString()}`)
  }

  const labelA = selectedA ? formatMonthLabel(selectedA) : 'Month A'
  const labelB = selectedB ? formatMonthLabel(selectedB) : 'Month B'

  const comparisonLabel =
    selectedA && selectedB ? getComparisonLabel(selectedA, selectedB) : null

  const chartData =
    indexA && indexB
      ? [
          { metric: 'Overall',  a: indexA.totalScore,       b: indexB.totalScore },
          { metric: 'Funding',  a: indexA.fundingScore,     b: indexB.fundingScore },
          { metric: 'Jobs',     a: indexA.jobPostingScore,  b: indexB.jobPostingScore },
          { metric: 'News',     a: indexA.newsVolumeScore,  b: indexB.newsVolumeScore },
          { metric: 'Poll',     a: indexA.pollScore,        b: indexB.pollScore },
        ]
      : []

  return (
    <div className="space-y-8">

      <CompareSelector handleSelect={handleSelect} monthOptions={monthOptions} selectedA={selectedA || ''} selectedB={selectedB || ''}/>

      {!selectedA || !selectedB ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center text-[var(--muted-foreground)]">
          <GitCompare className="size-10 opacity-40" />
          <p className="text-base font-medium">Select two months to compare</p>
          <p className="text-sm">
            Pick a base month and a comparison month from the dropdowns above.
          </p>
        </div>
      ) : !indexA || !indexB ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--muted-foreground)]">
          <p className="text-sm">One or both selected months have no published data.</p>
        </div>
      ) : (
        <div className="space-y-6">

          {comparisonLabel && (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 text-xs font-semibold">
                {comparisonLabel}
              </span>
            </div>
          )}

          {/* ── Bar chart ── */}
          <CompareBarChart labelA={labelA} labelB={labelB} data={chartData} />

          <MetricBreakdown indexA={indexA} indexB={indexB} labelA={labelA} labelB={labelB} />

        </div>
      )}
    </div>
  )
}
