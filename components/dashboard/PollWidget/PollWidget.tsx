"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { PollOption } from "./PollOption";
import { PollThanks } from "./PollThanks";

const OPTIONS = [
  { value: 1, emoji: "😞", label: "Very Bad" },
  { value: 2, emoji: "🙁", label: "Bad" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😄", label: "Great" },
] as const;

interface PollWidgetProps {
  question?: string;
  month: string;      // formatted label for display, e.g. "March 2026"
  rawMonth: string;   // YYYY-MM for API calls, e.g. "2026-03"
}

export function PollWidget({
  question = "How do you feel about the Vietnamese startup ecosystem this month?",
  month,
  rawMonth,
}: PollWidgetProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleVote = async (rating: number) => {
    await fetch(`/api/poll/${rawMonth}/vote`, {
      method: "POST",
      body: JSON.stringify({ rating }),
    });
  };
  if (submitted) {
    const choice = OPTIONS.find((o) => o.value === selected)!;

    return <PollThanks emoji={choice.emoji} month={month} />;
  }

  function handleSubmit() {
    if (selected === null) return;
    startTransition(async () => {
      await handleVote(selected);
      setSubmitted(true);
    });
  }

  return (
    <div className="w-full md:max-w-xl rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Community Poll · {month}
        </p>
        <p className="text-sm font-medium text-[var(--foreground)] leading-snug">
          {question}
        </p>
      </div>

      {/* Rating options */}
      <div className="flex items-end justify-between gap-2">
        {OPTIONS.map((opt) => (
          <PollOption
            key={opt.value}
            value={opt.value}
            emoji={opt.emoji}
            label={opt.label}
            isSelected={selected === opt.value}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[var(--muted-foreground)]">
          {selected
            ? `You selected: ${OPTIONS.find((o) => o.value === selected)!.label}`
            : "Select an option above"}
        </p>
        <Button
          size="sm"
          disabled={selected === null}
          onClick={handleSubmit}
        >
          Submit vote
        </Button>
      </div>
    </div>
  );
}
