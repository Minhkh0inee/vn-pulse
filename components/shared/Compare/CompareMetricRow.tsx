import { getScoreColor } from '@/utils/scoreCard.utils'

interface CompareMetricRowProps {
  label: string
  weight?: number
  scoreA: number
  scoreB: number
}

function DeltaBadge({ delta, pct }: { delta: number; pct: number }) {
  const isPositive = delta > 0
  const isNeutral  = delta === 0
  const sign       = isPositive ? '+' : ''

  const colorClass = isNeutral
    ? 'bg-[var(--accent)] text-[var(--muted-foreground)]'
    : isPositive
    ? 'bg-[var(--trend-up)]/15 text-[var(--trend-up)]'
    : 'bg-[var(--trend-down)]/15 text-[var(--trend-down)]'

  const arrow = isNeutral ? '→' : isPositive ? '↑' : '↓'

  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${colorClass}`}>
      {arrow} {sign}{delta.toFixed(1)} ({sign}{pct.toFixed(1)}%)
    </span>
  )
}

export default function CompareMetricRow({ label, weight, scoreA, scoreB }: CompareMetricRowProps) {
  const delta = scoreB - scoreA
  const pct   = scoreA !== 0 ? (delta / scoreA) * 100 : 0

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
      {/* Month A score */}
      <div className="text-right">
        <span className={`text-xl font-bold tabular-nums ${getScoreColor(scoreA)}`}>
          {scoreA.toFixed(1)}
        </span>
      </div>

      {/* Center label + delta */}
      <div className="flex flex-col items-center gap-1 min-w-[140px] text-center">
        <span className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
          {label}
        </span>
        {weight !== undefined && (
          <span className="text-[10px] text-[var(--muted-foreground)]">
            weight {(weight * 100).toFixed(0)}%
          </span>
        )}
        <DeltaBadge delta={delta} pct={pct} />
      </div>

      {/* Month B score */}
      <div className="text-left">
        <span className={`text-xl font-bold tabular-nums ${getScoreColor(scoreB)}`}>
          {scoreB.toFixed(1)}
        </span>
      </div>
    </div>
  )
}
