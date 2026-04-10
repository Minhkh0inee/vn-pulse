import { getLabelColor, getPercentChange, getScoreColor, getScoreLabel, getTrend, getTrendColor, getTrendIcon } from '@/utils/scoreCard.utils'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

interface ScoreCardProps {
  score:         number
  month:         string
  previousScore?: number
  isLoading?:    boolean
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  score,
  month,
  previousScore,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 w-full">
        <Skeleton className="h-4 w-28 mb-6" />
        <Skeleton className="h-20 w-32 mb-4" />
        <Skeleton className="h-5 w-20 mb-4 rounded-full" />
        <Skeleton className="h-4 w-36" />
      </div>
    )
  }

  const trend      = getTrend(score, previousScore)
  const trendIcon  = getTrendIcon(trend)
  const trendColor = getTrendColor(trend)
  const scoreColor = getScoreColor(score)
  const label      = getScoreLabel(score)
  const labelColor = getLabelColor(score)

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 w-full h-full shadow-sm">
      {/* Month label */}
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
        {month}
      </p>

      {/* Score */}
      <div className="flex items-end gap-2 mb-4">
        <span className={`text-7xl sm:text-8xl font-bold leading-none tabular-nums ${scoreColor}`}>
          {score}
        </span>
        <span className="text-2xl font-semibold text-[var(--muted-foreground)] mb-2 leading-none">
          /100
        </span>
      </div>

      {/* Status badge */}
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mb-4 ${labelColor}`}>
        {label}
      </span>

      {/* Trend + change */}
      {previousScore !== undefined && (
        <div className={`flex items-center gap-1.5 text-sm font-medium ${trendColor}`}>
          <span className="text-base leading-none">{trendIcon}</span>
          <span>{getPercentChange(score, previousScore)}</span>
          <span className="text-[var(--muted-foreground)] font-normal">vs last month</span>
        </div>
      )}
    </div>
  )
}

export default ScoreCard
