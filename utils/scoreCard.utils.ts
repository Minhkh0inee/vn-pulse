export function getScoreColor(score: number): string {
  if (score > 70) return 'text-[var(--score-high)]'
  if (score >= 40) return 'text-[var(--score-mid)]'
  return 'text-[var(--score-low)]'
}

export function getScoreLabel(score: number): string {
  if (score > 70) return 'Good'
  if (score >= 40) return 'Average'
  return 'Critical'
}

export function getLabelColor(score: number): string {
  if (score > 70) return 'bg-[var(--score-high)]/15 text-[var(--score-high)]'
  if (score >= 40) return 'bg-[var(--score-mid)]/15 text-[var(--score-mid)]'
  return 'bg-[var(--score-low)]/15 text-[var(--score-low)]'
}

type TrendDirection = 'up' | 'down' | 'stable'

export function getTrend(score: number, previousScore?: number): TrendDirection {
  if (previousScore === undefined) return 'stable'
  if (score > previousScore) return 'up'
  if (score < previousScore) return 'down'
  return 'stable'
}

export function getTrendIcon(trend: TrendDirection): string {
  if (trend === 'up') return '↑'
  if (trend === 'down') return '↓'
  return '→'
}

export function getTrendColor(trend: TrendDirection): string {
  if (trend === 'up') return 'text-[var(--trend-up)]'
  if (trend === 'down') return 'text-[var(--trend-down)]'
  return 'text-[var(--muted-foreground)]'
}

export function getPercentChange(score: number, previousScore: number): string {
  const diff = score - previousScore
  const pct  = previousScore !== 0 ? (diff / previousScore) * 100 : 0
  const sign  = pct >= 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}