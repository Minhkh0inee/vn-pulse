'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export interface StatsCardProps {
  icon:       React.ReactNode
  label:      string
  value:      string | number
  sub?:       string
  isLoading?: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  label,
  value,
  sub,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 space-y-3">
        <Skeleton className="size-8 rounded-md" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
    )
  }

  return (
    <div className="group h-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 transition-all duration-150 hover:border-[var(--primary)]/40 hover:shadow-sm">
      <span className="mb-3 flex size-9 items-center justify-center rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
        {icon}
      </span>
      <p className={`text-2xl font-bold tabular-nums ${value === 'Not available' ? 'text-[var(--muted-foreground)]' : 'text-[var(--foreground)]'}`}>
        {value}
      </p>
      <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">{label}</p>
      {sub && (
        <p className={`mt-0.5 text-xs ${value === 'Not available' ? 'text-[var(--muted-foreground)]/60 italic' : 'text-[var(--muted-foreground)]'}`}>
          {sub}
        </p>
      )}
    </div>
  )
}

export default StatsCard
