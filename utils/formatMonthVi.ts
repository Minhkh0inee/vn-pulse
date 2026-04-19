export function formatMonthVi(month: string): string {
  const [, mon] = month.split('-')
  const [year] = month.split('-')
  return `Tháng ${Number(mon)}/${year}`
}
