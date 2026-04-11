import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[100px] w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white placeholder:text-white/30 transition-colors outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
