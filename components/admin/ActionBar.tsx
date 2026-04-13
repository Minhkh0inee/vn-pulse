import { Button } from "@/components/ui/button"

interface ActionBarProps {
  month: string
  weightsValid: boolean
  canPublish: boolean
}

export function ActionBar({ month, weightsValid, canPublish }: ActionBarProps) {
  let hint = ""
  if (!month) hint = "Enter a month to enable publish."
  else if (!weightsValid) hint = "Fix weights (must sum to 1.00) to enable publish."
  else hint = "Ready to publish."

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs text-white/30 hidden sm:block">{hint}</p>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm">
          Save Draft
        </Button>
        <Button size="sm" disabled={!canPublish}>
          Publish →
        </Button>
      </div>
    </div>
  )
}
