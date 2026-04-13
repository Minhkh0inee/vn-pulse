import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionCard, FieldGroup } from "./shared"

interface WeightsSectionProps {
  fundingWeight: string
  jobPostingWeight: string
  newsVolumeWeight: string
  pollWeight: string
  weightSum: number
  weightsValid: boolean
  editing: boolean
  onToggleEdit: () => void
  onChange: (key: "fundingWeight" | "jobPostingWeight" | "newsVolumeWeight" | "pollWeight", value: string) => void
}

export function WeightsSection({
  fundingWeight,
  jobPostingWeight,
  newsVolumeWeight,
  pollWeight,
  weightSum,
  weightsValid,
  editing,
  onToggleEdit,
  onChange,
}: WeightsSectionProps) {
  const readOnlyItems = [
    { label: "Funding", value: fundingWeight },
    { label: "Job Postings", value: jobPostingWeight },
    { label: "News Volume", value: newsVolumeWeight },
    { label: "Poll", value: pollWeight },
  ]

  return (
    <SectionCard title="Weights">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Sum:</span>
          <span
            className={`text-xs font-semibold tabular-nums ${
              weightsValid ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {weightSum.toFixed(2)}
          </span>
          {!weightsValid && (
            <span className="text-xs text-rose-400">— must equal 1.00</span>
          )}
        </div>
        <Button variant="outline" size="xs" onClick={onToggleEdit}>
          {editing ? "Done" : "Edit"}
        </Button>
      </div>

      {editing ? (
        <div className="grid grid-cols-2 gap-4">
          <FieldGroup label="Funding Weight">
            <Input
              type="number"
              step={0.01}
              min={0}
              max={1}
              value={fundingWeight}
              onChange={(e) => onChange("fundingWeight", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Job Postings Weight">
            <Input
              type="number"
              step={0.01}
              min={0}
              max={1}
              value={jobPostingWeight}
              onChange={(e) => onChange("jobPostingWeight", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="News Volume Weight">
            <Input
              type="number"
              step={0.01}
              min={0}
              max={1}
              value={newsVolumeWeight}
              onChange={(e) => onChange("newsVolumeWeight", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Poll Weight">
            <Input
              type="number"
              step={0.01}
              min={0}
              max={1}
              value={pollWeight}
              onChange={(e) => onChange("pollWeight", e.target.value)}
            />
          </FieldGroup>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {readOnlyItems.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
            >
              <span className="text-xs text-white/50">{label}</span>
              <span className="text-sm font-medium tabular-nums text-white">{value}</span>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}
