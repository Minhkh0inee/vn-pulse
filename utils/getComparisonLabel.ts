export function getComparisonLabel(monthA: string, monthB: string): string {
  const [yearA, monA] = monthA.split('-').map(Number)
  const [yearB, monB] = monthB.split('-').map(Number)
  const diffMonths = Math.abs((yearB - yearA) * 12 + (monB - monA))
  if (diffMonths === 12) return 'Year-over-Year (YoY)'
  if (diffMonths === 1) return 'Month-over-Month (MoM)'
  return `${diffMonths}-month comparison`
}