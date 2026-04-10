export function splitWords(text: string, limit: number): { head: string; tail: string } {
const words = text.trim().split(/\s+/)
if (words.length <= limit) return { head: text, tail: '' }
return {
    head: words.slice(0, limit).join(' '),
    tail: ' ' + words.slice(limit).join(' '),
  }
}

export function formatDate(value: Date | string | null): string {
  if (!value) return '—'
  const d = typeof value === 'string' ? new Date(value) : value
  return d.toLocaleDateString('en-GB', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
    hour:  '2-digit',
    minute:'2-digit',
  })
}