import React from 'react'
import { TrendDataPoint } from './TrendChart'

interface TooltipPayloadItem {
  payload: TrendDataPoint
}

interface CustomTooltipProps {
  active?:  boolean
  payload?: TooltipPayloadItem[]
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({active,payload}) => {
  if (!active || !payload?.length) return null
  const { month, score } = payload[0].payload
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 shadow-md">
      <p className="text-xs text-[var(--muted-foreground)] mb-0.5">{month}</p>
      <p className="text-sm font-semibold text-[var(--foreground)]">{score}<span className="text-[var(--muted-foreground)] font-normal">/100</span></p>
    </div>
  )
}

export default CustomTooltip