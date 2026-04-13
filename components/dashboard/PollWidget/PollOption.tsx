interface PollOptionProps {
  value: number
  emoji: string
  label: string
  isSelected: boolean
  onSelect: (value: number) => void
}

export function PollOption({ value, emoji, label, isSelected, onSelect }: PollOptionProps) {
  return (
    <button
      onClick={() => onSelect(value)}
      aria-pressed={isSelected}
      aria-label={label}
      className={[
        "flex flex-1 flex-col items-center gap-1.5 rounded-xl border py-3 px-1 transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
        isSelected
          ? "border-[var(--primary)] bg-[var(--primary)]/10 scale-105"
          : "border-[var(--border)] bg-transparent hover:border-[var(--muted-foreground)]/40 hover:bg-[var(--muted)]/50",
      ].join(" ")}
    >
      <span className="text-2xl leading-none select-none">{emoji}</span>
      <span
        className={[
          "text-[10px] font-medium leading-none whitespace-nowrap transition-colors",
          isSelected ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]",
        ].join(" ")}
      >
        {label}
      </span>
    </button>
  )
}
