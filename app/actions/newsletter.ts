"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import NewsletterTemplate from "@/components/email/NewsletterTemplate";
import { IMonthlyIndex } from "@/app/types/monthlyIndex";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vn-pulse.com";

export async function sendNewsletter(index: IMonthlyIndex): Promise<{ sent: number; errors: number }> {
  const subscribers = await prisma.subscriber.findMany({
    where: { isVerified: true, unsubscribedAt: null },
    select: { email: true, verifyToken: true },
  });

  if (subscribers.length === 0) return { sent: 0, errors: 0 };
  const subject = `VN Pulse — ${index.month} Index is now live`;

  const batches = subscribers.map((sub) =>
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "khoidev159@gmail.com",
      subject,
      react: NewsletterTemplate({
        index,
        baseUrl: SITE_URL,
        unsubscribeUrl: `${SITE_URL}/unsubscribe?token=${sub.verifyToken}`,
      }),
    })
  );

  const results = await Promise.allSettled(batches);

  let sent = 0;
  let errors = 0;
  for (const result of results) {
    if (result.status === "fulfilled" && !result.value.error) {
      sent++;
    } else {
      errors++;
      if (result.status === "rejected") {
        console.error("[newsletter] Send error:", result.reason);
      } else if (result.value.error) {
        console.error("[newsletter] Resend error:", result.value.error);
      }
    }
  }

  return { sent, errors };
}
