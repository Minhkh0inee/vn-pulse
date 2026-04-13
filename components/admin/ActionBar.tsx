"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { publishIndex } from "@/app/(admin)/admin/actions"
import type { FormState, SectorRow } from "./types"

interface ActionBarProps {
  month: string
  weightsValid: boolean
  canPublish: boolean
  form: FormState
  sectorScores: SectorRow[]
  onPublishSuccess: () => void
}

export function ActionBar({
  month,
  weightsValid,
  canPublish,
  form,
  sectorScores,
  onPublishSuccess,
}: ActionBarProps) {
  const [isPending, startTransition] = useTransition()

  let hint = ""
  if (!month) hint = "Enter a month to enable publish."
  else if (!weightsValid) hint = "Fix weights (must sum to 1.00) to enable publish."
  else hint = "Ready to publish."

  function handlePublish() {
    startTransition(async () => {
      const toastId = toast.loading(`Publishing ${form.month}…`)
      const result = await publishIndex(form, sectorScores)
      if (result.success) {
        toast.success(`${form.month} published successfully`, { id: toastId })
        onPublishSuccess()
      } else {
        toast.error(result.error ?? "Something went wrong", { id: toastId })
      }
    })
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs text-white/30 hidden sm:block">{hint}</p>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm" disabled={isPending}>
          Save Draft
        </Button>
        <Button size="sm" disabled={!canPublish || isPending} onClick={handlePublish}>
          {isPending ? (
            <>
              <Loader2Icon className="size-3.5 animate-spin" />
              Publishing…
            </>
          ) : (
            "Publish →"
          )}
        </Button>
      </div>
    </div>
  )
}
