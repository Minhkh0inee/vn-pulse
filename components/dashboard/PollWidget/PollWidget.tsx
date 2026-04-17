"use client";

import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  month: string;    // formatted label for display, e.g. "March 2026"
  rawMonth: string; // YYYY-MM for API calls, e.g. "2026-03"
}

export function PollWidget({
  question = "How do you feel about the Vietnamese startup ecosystem this month?",
  month,
  rawMonth,
}: PollWidgetProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [thanksEmoji, setThanksEmoji] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check on mount whether this IP already voted
  useEffect(() => {
    fetch(`/api/poll/${rawMonth}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.hasVoted) setThanksEmoji("✅");
      })
      .catch(() => {/* ignore — fall through to voting form */})
      .finally(() => setChecking(false));
  }, [rawMonth]);

  if (checking) {
    return (
      <div className="w-full md:max-w-xl rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex gap-2">
          {OPTIONS.map((o) => <Skeleton key={o.value} className="flex-1 h-16 rounded-xl" />)}
        </div>
        <Skeleton className="h-8 w-24 ml-auto" />
      </div>
    );
  }

  if (thanksEmoji !== null) {
    return <PollThanks emoji={thanksEmoji} month={month} />;
  }

  async function handleVote(rating: number) {
    const res = await fetch(`/api/poll/${rawMonth}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error ?? "Vote failed");
  }

  function handleSubmit() {
    if (selected === null) return;
    setError(null);
    setLoading(true);
    startTransition(async () => {
      try {
        await handleVote(selected);
        setThanksEmoji(OPTIONS.find((o) => o.value === selected)!.emoji);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Vote thất bại");
      } finally {
        setLoading(false);
      }
    });
  }

  return (
    <div className="w-full md:max-w-xl rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Community Poll · {month}
        </p>
        <p className="text-sm font-medium text-[var(--foreground)] leading-snug">{question}</p>
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted-foreground)]">
            {selected
              ? `You selected: ${OPTIONS.find((o) => o.value === selected)!.label}`
              : "Select an option above"}
          </p>
          <Button size="sm" disabled={selected === null || loading} onClick={handleSubmit}>
            {loading ? "Submitting…" : "Submit vote"}
          </Button>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
}
