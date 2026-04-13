import { Input } from "@/components/ui/input"
import { SectionCard, FieldGroup } from "./shared"
import type { FormState } from "./types"

type RawKey =
  | "rawFundingDeals"
  | "rawFundingValue"
  | "rawJobPostings"
  | "rawNewsArticles"
  | "rawPollAvg"
  | "rawPollCount"

interface RawSignalDataSectionProps {
  rawFundingDeals: string
  rawFundingValue: string
  rawJobPostings: string
  rawNewsArticles: string
  rawPollAvg: string
  rawPollCount: string
  onChange: (key: keyof FormState, value: string) => void
}

export function RawSignalDataSection({
  rawFundingDeals,
  rawFundingValue,
  rawJobPostings,
  rawNewsArticles,
  rawPollAvg,
  rawPollCount,
  onChange,
}: RawSignalDataSectionProps) {
  const fields: { label: string; key: RawKey; props: React.InputHTMLAttributes<HTMLInputElement> }[] = [
    { label: "Funding Deals (#)", key: "rawFundingDeals", props: { type: "number", min: 0, placeholder: "e.g. 12" } },
    { label: "Funding Value (USD M)", key: "rawFundingValue", props: { type: "number", min: 0, step: 0.1, placeholder: "e.g. 45.5" } },
    { label: "Job Postings (#)", key: "rawJobPostings", props: { type: "number", min: 0, placeholder: "e.g. 320" } },
    { label: "News Articles (#)", key: "rawNewsArticles", props: { type: "number", min: 0, placeholder: "e.g. 87" } },
    { label: "Poll Average (1–5)", key: "rawPollAvg", props: { type: "number", min: 1, max: 5, step: 0.1, placeholder: "e.g. 3.7" } },
    { label: "Poll Responses (#)", key: "rawPollCount", props: { type: "number", min: 0, placeholder: "e.g. 154" } },
  ]

  const values: Record<RawKey, string> = {
    rawFundingDeals,
    rawFundingValue,
    rawJobPostings,
    rawNewsArticles,
    rawPollAvg,
    rawPollCount,
  }

  return (
    <SectionCard title="Raw Signal Data (optional)">
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ label, key, props }) => (
          <FieldGroup key={key} label={label}>
            <Input
              {...props}
              value={values[key]}
              onChange={(e) => onChange(key, e.target.value)}
            />
          </FieldGroup>
        ))}
      </div>
    </SectionCard>
  )
}
