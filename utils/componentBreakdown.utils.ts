export function barColor(score: number): string {
  if (score > 70) return 'bg-[var(--score-high)]'
  if (score >= 40) return 'bg-[var(--score-mid)]'
  return 'bg-[var(--score-low)]'
}

export function scoreTextColor(score: number): string {
  if (score > 70) return 'text-[var(--score-high)]'
  if (score >= 40) return 'text-[var(--score-mid)]'
  return 'text-[var(--score-low)]'
}