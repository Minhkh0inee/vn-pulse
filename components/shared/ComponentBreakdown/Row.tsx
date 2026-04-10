import { barColor, scoreTextColor } from '@/utils/componentBreakdown.utils'
import React from 'react'

interface RowProps {
  icon:   React.ReactNode
  label:  string
  weight: number   // 0–1
  score:  number   // 0–100
}

const Row:React.FC<RowProps> = ({weight, score, label, icon}) => {
  const pct     = Math.round(weight * 100)
  const txtColor = scoreTextColor(score)
  const bar     = barColor(score)

  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-150 hover:bg-[var(--accent)] hover:scale-[1.01] cursor-default">
      {/* Icon */}
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--muted)] text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
        {icon}
      </span>

      {/* Label + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-sm font-medium text-[var(--foreground)] truncate">{label}</span>
          <span className="text-xs text-[var(--muted-foreground)] shrink-0">({pct}%)</span>
        </div>
        {/* shadcn Progress with colour override */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <span className={`text-sm font-bold tabular-nums shrink-0 ${txtColor}`}>
        {score}
      </span>
    </div>
  )
}

export default Row