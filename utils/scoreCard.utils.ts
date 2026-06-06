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

export interface TrendResult {
  direction: TrendDirection
  delta: number | null
  deltaStr: string
  absStr: string
  icon: string
  isFlat: boolean
}

export function computeTrend(diff: number | null | undefined): TrendResult {
  if (diff == null) {
    return { direction: 'stable', delta: null, deltaStr: '—', absStr: '0.0', icon: '→', isFlat: true }
  }
  const isFlat = Math.abs(diff) < 0.1
  const direction: TrendDirection = isFlat ? 'stable' : diff > 0 ? 'up' : 'down'
  return {
    direction,
    delta: diff,
    deltaStr: isFlat ? '—' : `${diff > 0 ? '+' : ''}${diff.toFixed(1)}`,
    absStr: Math.abs(diff).toFixed(1),
    icon: direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→',
    isFlat,
  }
}

export function getTrend(score: number, previousScore?: number): TrendDirection {
  if (previousScore === undefined) return 'stable'
  return computeTrend(score - previousScore).direction
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