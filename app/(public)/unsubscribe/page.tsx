import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <Result title="Invalid link" description="No token found." error />
  }

  const subscriber = await prisma.subscriber.findUnique({
    where: { verifyToken: token },
  });

  if (!subscriber) {
    return <Result title="Invalid link" description="This unsubscribe link is invalid." error />
  }

  if (!subscriber.unsubscribedAt) {
    await prisma.subscriber.update({
      where: { verifyToken: token },
      data: { unsubscribedAt: new Date() },
    });
  }

  return (
    <Result
      title="You've been unsubscribed."
      description="You won't receive any more emails from VN Pulse."
    />
  );
}

function Result({
  title,
  description,
  error = false,
}: {
  title: string;
  description: string;
  error?: boolean;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-2">
        <p className={`text-sm font-semibold ${error ? "text-red-500" : ""}`}>{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Link href="/" className="text-sm underline">Back to site →</Link>
      </div>
    </div>
  );
}