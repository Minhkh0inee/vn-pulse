import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionCard, FieldGroup } from "./shared"

interface PeriodSectionProps {
  month: string
  existingMonths: string[]
  onChange: (value: string) => void
}

function generateMonths(): string[] {
  const months: string[] = []
  const now = new Date()
  // 24 months back, 3 months forward
  for (let offset = 24; offset >= -3; offset--) {
    const d = new Date(now.getFullYear(), now.getMonth() - offset, 1)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    months.push(`${yyyy}-${mm}`)
  }
  return months
}

const MONTHS = generateMonths()

export function PeriodSection({ month, existingMonths, onChange }: PeriodSectionProps) {
  const taken = new Set(existingMonths)

  return (
    <SectionCard title="Period">
      <FieldGroup label="Month">
        <Select value={month} onValueChange={onChange}>
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select month…" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m} value={m} disabled={taken.has(m)}>
                {taken.has(m) ? `${m} (exists)` : m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldGroup>
    </SectionCard>
  )
}
