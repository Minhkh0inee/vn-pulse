'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export type InsightCategory = 'funding' | 'jobs' | 'news' | 'sentiment' | 'general'

export interface InsightCardProps {
  category?:  InsightCategory
  headline:   string
  body?:      string
  isLoading?: boolean
}

const CATEGORY_META: Record<InsightCategory, { label: string; color: string; bg: string }> = {
  funding:   { label: 'Funding',   color: 'text-[var(--score-high)]',  bg: 'bg-[var(--score-high)]/10'  },
  jobs:      { label: 'Jobs',      color: 'text-[var(--primary)]',     bg: 'bg-[var(--primary)]/10'     },
  news:      { label: 'News',      color: 'text-[var(--score-mid)]',   bg: 'bg-[var(--score-mid)]/10'   },
  sentiment: { label: 'Sentiment', color: 'text-purple-400',           bg: 'bg-purple-400/10'           },
  general:   { label: 'General',   color: 'text-[var(--muted-foreground)]', bg: 'bg-[var(--muted)]'    },
}

function InsightCardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
      {/* badge row */}
      <div className="flex items-center gap-2">
        <Skeleton className="size-5 rounded" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
      {/* headline */}
      <Skeleton className="h-5 w-3/4" />
      {/* body */}
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-[88%]" />
        <Skeleton className="h-3.5 w-[72%]" />
      </div>
    </div>
  )
}

const InsightCard: React.FC<InsightCardProps> = ({
  category = 'general',
  headline,
  body,
  isLoading = false,
}) => {
  if (isLoading) return <InsightCardSkeleton />

  const meta = CATEGORY_META[category]

  return (
    <div className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 flex flex-col gap-3 transition-all duration-150 hover:border-[var(--primary)]/30 hover:shadow-sm">

      {/* Top row: AI badge + category tag */}
      <div className="flex items-center justify-between gap-2">
        {/* AI indicator */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <span className="flex size-5 items-center justify-center rounded bg-[var(--primary)]/10 text-[var(--primary)]">
            <Sparkles className="size-3" />
          </span>
          <span className="font-medium">AI Insight</span>
        </div>

        {/* Category badge */}
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${meta.bg} ${meta.color}`}>
          {meta.label}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)]" />

      {/* Headline */}
      <h3 className="text-sm font-semibold leading-snug text-[var(--foreground)]">
        {headline}
      </h3>

      {/* Body */}
      {body && (
        <p className="text-xs leading-5 text-[var(--muted-foreground)]">
          {body}
        </p>
      )}

    </div>
  )
}

export default InsightCard
