"use client";

import { useActionState } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions/subscribe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import posthog from "posthog-js";

const initialState: SubscribeState = {};

export function SubscribeWidget() {
  const [state, action, isPending] = useActionState(subscribeAction, initialState);

  if (state.success) {
    return (
      <div className="w-full md:max-w-xl rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Newsletter
        </p>
        <p className="text-sm font-medium text-[var(--foreground)]">
          You&apos;re subscribed. See you next month.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-xl rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Newsletter
        </p>
        <p className="text-sm font-medium text-[var(--foreground)] leading-snug">
          Get the monthly VN Pulse index delivered to your inbox.
        </p>
      </div>

      <form
        action={action}
        className="flex gap-2"
        onSubmit={(e) => {
          const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;
          posthog.capture("subscribe_submitted", { email });
        }}
      >
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="flex-1 h-10"
        />
        <Button type="submit" className="h-10" disabled={isPending}>
          {isPending ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>

      {state.error && (
        <p className="text-xs text-red-500">{state.error}</p>
      )}
    </div>
  );
}
