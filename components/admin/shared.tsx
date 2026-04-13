import { Label } from "@/components/ui/label"

export function parseNum(v: string): number {
  const n = parseFloat(v)
  return isNaN(n) ? 0 : n
}

export function scoreColor(score: number): string {
  if (score >= 70) return "text-emerald-400"
  if (score >= 40) return "text-amber-400"
  return "text-rose-400"
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col gap-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{title}</p>
      {children}
    </div>
  )
}

export function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
