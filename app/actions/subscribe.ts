"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import { getPostHogClient } from "@/lib/posthog-server";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vn-pulse.com";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type SubscribeState = { error?: string; success?: boolean };

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { email } = parsed.data;

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      // already verified and active
      if (existing.isVerified && !existing.unsubscribedAt) {
        return { success: true };
      }

      // resend verification (unverified or previously unsubscribed)
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your VN Pulse subscription",
        react: VerifyEmailTemplate({
          verifyUrl: `${SITE_URL}/verify?token=${existing.verifyToken}`,
          siteUrl: SITE_URL,
        }),
      });

      return { success: true };
    }

    // new subscriber
    const verifyToken = randomBytes(32).toString("hex");
    await prisma.subscriber.create({
      data: { email, isVerified: false, verifyToken },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your VN Pulse subscription",
      react: VerifyEmailTemplate({
        verifyUrl: `${SITE_URL}/verify?token=${verifyToken}`,
        siteUrl: SITE_URL,
      }),
    });

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: "subscribe_succeeded",
      properties: { email, is_new: true },
    });
    await posthog.shutdown();

    return { success: true };
  } catch (err) {
    console.error("[subscribe]", err);
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: "subscribe_failed",
      properties: { email, error: err instanceof Error ? err.message : String(err) },
    });
    await posthog.shutdown();
    return { error: "Something went wrong. Please try again." };
  }
}