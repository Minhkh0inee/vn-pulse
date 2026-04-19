import { prisma } from "@/lib/prisma";
import Result from "./Result";

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

