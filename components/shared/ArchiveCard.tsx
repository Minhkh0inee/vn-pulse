import Link from 'next/link'
import {
  getLabelColor,
  getPercentChange,
  getScoreColor,
  getScoreLabel,
  getTrend,
  getTrendColor,
  getTrendIcon,
} from '@/utils/scoreCard.utils'

interface ArchiveCardProps {
  month: string          // "2026-03"
  score: number
  previousScore?: number
}

export default function ArchiveCard({ month, score, previousScore }: ArchiveCardProps) {
  const [yr, mn] = month.split('-')
  const href = `/archive/${yr}/${mn}`
  const monthLabel = `Tháng ${Number(mn)} · ${yr}`

  const trend      = getTrend(score, previousScore)
  const trendIcon  = getTrendIcon(trend)
  const trendColor = getTrendColor(trend)
  const scoreColor = getScoreColor(score)
  const label      = getScoreLabel(score)
  const labelColor = getLabelColor(score)

  return (
    <Link href={href} className="block group">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 h-full transition-all hover:border-[var(--primary)]/40 hover:shadow-md">

        {/* Header: month + badge */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
            {monthLabel}
          </p>
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${labelColor}`}>
            {label}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-end gap-1.5 mb-3">
          <span className={`text-5xl font-bold leading-none tabular-nums ${scoreColor}`}>
            {Math.round(score)}
          </span>
          <span className="text-lg font-semibold text-[var(--muted-foreground)] mb-0.5 leading-none">
            /100
          </span>
        </div>

        {/* Trend */}
        {previousScore !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <span>{trendIcon}</span>
            <span>{getPercentChange(score, previousScore)}</span>
            <span className="text-[var(--muted-foreground)] font-normal">vs tháng trước</span>
          </div>
        )}
      </div>
    </Link>
  )
}
