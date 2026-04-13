export function getPreviousMonth(month: string): string {
  const [year, mon] = month.split("-").map(Number)

  if (mon === 1) {
    return `${year - 1}-12`
  }
  return `${year}-${String(mon - 1).padStart(2, "0")}`
}

export function getCurrentMonth(): string {
  const now = new Date()
  const year  = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}

export function secondsUntilEndOfMonth(): number {
  const now      = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return Math.floor((endOfMonth.getTime() - now.getTime()) / 1000)
}

export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data     = encoder.encode(ip + process.env.NEXTAUTH_SECRET)
  const hash     = await crypto.subtle.digest("SHA-256", data)
  return Buffer.from(hash).toString("hex").slice(0, 32)
}
