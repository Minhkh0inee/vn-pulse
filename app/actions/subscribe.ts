"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { WelcomeEmailTemplate } from "@/components/email/WelcomeEmailTemplate";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vn-pulse.com";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type SubscribeState = { error?: string; success?: boolean }

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  console.log("[subscribe] action called");
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { email } = parsed.data;

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.unsubscribedAt) {
        await prisma.subscriber.update({
          where: { email },
          data: { unsubscribedAt: null, isVerified: true },
        });
        return { success: true };
      }
      return { success: true };
    }

    const verifyToken = randomBytes(32).toString("hex");
    await prisma.subscriber.create({
      data: {
        email,
        isVerified: true,
        verifyToken,
      },
    });

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'khoidev159@gmail.com',
      subject: "Welcome to VN Pulse",
      react: WelcomeEmailTemplate({
        unsubscribeUrl: `${SITE_URL}/unsubscribe?token=${verifyToken}`,
        siteUrl: SITE_URL,
      }),
    });

    if (error) {
      console.error("[subscribe] Resend error:", error);
    } else {
      console.log("[subscribe] Welcome email sent:", data?.id);
    }

    return { success: true };
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
