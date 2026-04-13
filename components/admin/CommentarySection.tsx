import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import GenerateCommentaryBtn from "@/components/dashboard/GenerateCommentaryBtn"
import { SectionCard, FieldGroup } from "./shared"
import type { ICommentaryInput } from "@/types/commentary"

interface CommentarySectionProps {
  commentary: string
  summaryVi: string
  summaryEn: string
  canGenerate: boolean
  commentaryInput: ICommentaryInput
  onChange: (key: "commentary" | "summaryVi" | "summaryEn", value: string) => void
}

export function CommentarySection({
  commentary,
  summaryVi,
  summaryEn,
  canGenerate,
  commentaryInput,
  onChange,
}: CommentarySectionProps) {
  return (
    <SectionCard title="Commentary & Summaries">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <Label>Commentary (required)</Label>
          <GenerateCommentaryBtn
            input={commentaryInput}
            onGenerated={(text) => onChange("commentary", text)}
            disabled={!canGenerate}
          />
        </div>
        <Textarea
          rows={5}
          placeholder="Monthly analysis and insights..."
          value={commentary}
          onChange={(e) => onChange("commentary", e.target.value)}
        />
        {!canGenerate && (
          <p className="text-xs text-white/30">
            Fill month, all 4 scores, and valid weights to enable AI generation.
          </p>
        )}
      </div>
      <FieldGroup label="Summary — Vietnamese">
        <Input
          placeholder="Tóm tắt ngắn tiếng Việt"
          value={summaryVi}
          onChange={(e) => onChange("summaryVi", e.target.value)}
        />
      </FieldGroup>
      <FieldGroup label="Summary — English">
        <Input
          placeholder="Short summary in English"
          value={summaryEn}
          onChange={(e) => onChange("summaryEn", e.target.value)}
        />
      </FieldGroup>
    </SectionCard>
  )
}
