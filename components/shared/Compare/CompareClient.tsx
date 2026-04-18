'use client'

import { useRouter } from 'next/navigation'
import { IMonthlyIndex } from '@/app/types/monthlyIndex'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CompareBarChart from './CompareBarChart'
import CompareMetricRow from './CompareMetricRow'
import { ArrowLeftRight, GitCompare } from 'lucide-react'

interface MonthOption {
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

function formatMonthLabel(month: string): string {
  const [year, mon] = month.split('-')
  const date = new Date(Number(year), Number(mon) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function getComparisonLabel(monthA: string, monthB: string): string {
  const [yearA, monA] = monthA.split('-').map(Number)
  const [yearB, monB] = monthB.split('-').map(Number)
  const diffMonths = Math.abs((yearB - yearA) * 12 + (monB - monA))
  if (diffMonths === 12) return 'Year-over-Year (YoY)'
  if (diffMonths === 1) return 'Month-over-Month (MoM)'
  return `${diffMonths}-month comparison`
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

      {/* ── Selectors ── */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
            Month A (Base)
          </label>
          <Select value={selectedA ?? ''} onValueChange={v => handleSelect('a', v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select month…" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.value === selectedB}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center pt-5">
          <ArrowLeftRight className="size-5 text-[var(--muted-foreground)]" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
            Month B (Compare)
          </label>
          <Select value={selectedB ?? ''} onValueChange={v => handleSelect('b', v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select month…" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.value === selectedA}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Prompt when nothing selected ── */}
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

          {/* ── Comparison type badge ── */}
          {comparisonLabel && (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 text-xs font-semibold">
                {comparisonLabel}
              </span>
            </div>
          )}

          {/* ── Bar chart ── */}
          <CompareBarChart labelA={labelA} labelB={labelB} data={chartData} />

          {/* ── Side-by-side metric breakdown ── */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6">
            <div className="grid grid-cols-[1fr_auto_1fr] mb-4">
              <p className="text-right text-sm font-semibold text-[var(--foreground)]">{labelA}</p>
              <div className="min-w-[140px]" />
              <p className="text-left text-sm font-semibold text-[var(--foreground)]">{labelB}</p>
            </div>

            <CompareMetricRow
              label="Overall Index"
              scoreA={indexA.totalScore}
              scoreB={indexB.totalScore}
            />
            <CompareMetricRow
              label="Funding"
              weight={indexA.fundingWeight}
              scoreA={indexA.fundingScore}
              scoreB={indexB.fundingScore}
            />
            <CompareMetricRow
              label="Job Postings"
              weight={indexA.jobPostingWeight}
              scoreA={indexA.jobPostingScore}
              scoreB={indexB.jobPostingScore}
            />
            <CompareMetricRow
              label="News Volume"
              weight={indexA.newsVolumeWeight}
              scoreA={indexA.newsVolumeScore}
              scoreB={indexB.newsVolumeScore}
            />
            <CompareMetricRow
              label="Community Poll"
              weight={indexA.pollWeight}
              scoreA={indexA.pollScore}
              scoreB={indexB.pollScore}
            />
          </div>

        </div>
      )}
    </div>
  )
}
