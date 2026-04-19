import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { WelcomeEmailTemplate } from "@/components/email/WelcomeEmailTemplate";
import Result from "../unsubscribe/Result";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vn-pulse.com";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams; 
  if (!token) {
    return <Result title="Invalid link" description="No verification token found." error />
  }

  const subscriber = await prisma.subscriber.findUnique({
    where: { verifyToken: token },
  });

  if (!subscriber) {
    return <Result title="Invalid link" description="This link is invalid or has already been used." error />
  }

  if (!subscriber.isVerified) {
    await prisma.subscriber.update({
      where: { verifyToken: token },
      data: { isVerified: true, unsubscribedAt: null },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "khoidev159@gmail.com",
      subject: "Welcome to VN Pulse",
      react: WelcomeEmailTemplate({
        unsubscribeUrl: `${SITE_URL}/unsubscribe?token=${token}`,
        siteUrl: SITE_URL,
      }),
    });
  }

  return (
    <Result
      title="You're verified!"
      description="You'll receive the next VN Pulse issue in your inbox."
    />
  );
}