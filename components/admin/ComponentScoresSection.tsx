import { Input } from "@/components/ui/input"
import { SectionCard, FieldGroup } from "./shared"

interface ComponentScoresSectionProps {
  fundingScore: string
  jobPostingScore: string
  newsVolumeScore: string
  pollScore: string
  onChange: (key: "fundingScore" | "jobPostingScore" | "newsVolumeScore" | "pollScore", value: string) => void
}

export function ComponentScoresSection({
  fundingScore,
  jobPostingScore,
  newsVolumeScore,
  pollScore,
  onChange,
}: ComponentScoresSectionProps) {
  return (
    <SectionCard title="Component Scores (0 – 100)">
      <div className="grid grid-cols-2 gap-4">
        <FieldGroup label="Funding Score">
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="0"
            value={fundingScore}
            onChange={(e) => onChange("fundingScore", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup label="Job Postings Score">
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="0"
            value={jobPostingScore}
            onChange={(e) => onChange("jobPostingScore", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup label="News Volume Score">
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="0"
            value={newsVolumeScore}
            onChange={(e) => onChange("newsVolumeScore", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup label="Poll Score">
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="0"
            value={pollScore}
            onChange={(e) => onChange("pollScore", e.target.value)}
          />
        </FieldGroup>
      </div>
    </SectionCard>
  )
}
