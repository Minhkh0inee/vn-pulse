interface PollThanksProps {
  emoji: string
  month: string
}

export function PollThanks({ emoji, month }: PollThanksProps) {
  
  return (
    <div className="w-full md:max-w-xl rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-center space-y-3">
      <p className="text-2xl">{emoji}</p>
      <p className="text-sm font-medium text-[var(--foreground)]">Thanks for your vote!</p>
      <p className="text-xs text-[var(--muted-foreground)]">
        Your response has been recorded for{" "}
        <span className="font-semibold text-[var(--foreground)]">{month}</span>.
      </p>
    </div>
  )
}
