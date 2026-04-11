import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder:text-white/30 transition-colors outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
