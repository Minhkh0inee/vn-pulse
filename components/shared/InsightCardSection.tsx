'use client'

import { useEffect, useState } from 'react'
import { Banknote, Briefcase, Newspaper } from 'lucide-react'
import StatsCard from './StatsCard'
import { IMonthlyIndex } from '@/app/types/monthlyIndex'

interface ApiResponse {
  success: boolean
  data:    IMonthlyIndex
}

function formatFunding(value: number | null): string {
  if (value == null) return '—'
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function formatNumber(value: number | null): string {
  if (value == null) return '—'
  return value.toLocaleString()
}

export default function InsightCardSection() {
  const [data,      setData]      = useState<IMonthlyIndex | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/index/latest')
      .then(r => r.json())
      .then((res: ApiResponse) => {
        if (res.success) setData(res.data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard
        icon={<Banknote className="size-4" />}
        label="Total Funding"
        value={isLoading ? '—' : formatFunding(data?.rawFundingValue ?? null)}
        sub={
          !isLoading && data?.rawFundingDeals != null
            ? `across ${data.rawFundingDeals} deals this month`
            : undefined
        }
        isLoading={isLoading}
      />
      <StatsCard
        icon={<Briefcase className="size-4" />}
        label="Job Postings"
        value={isLoading ? '—' : formatNumber(data?.rawJobPostings ?? null)}
        sub="active listings tracked"
        isLoading={isLoading}
      />
      <StatsCard
        icon={<Newspaper className="size-4" />}
        label="News Articles"
        value={isLoading ? '—' : formatNumber(data?.rawNewsArticles ?? null)}
        sub="startup-related stories"
        isLoading={isLoading}
      />
    </div>
  )
}
