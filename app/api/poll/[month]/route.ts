import { prisma } from "@/lib/prisma"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ month: string }> }
) {
  const { month } = await params

  const poll = await prisma.poll.findUnique({
    where: { month },
    select: { id: true, month: true, question: true, isOpen: true },
  })

  if (!poll) {
    return Response.json({ success: false, error: "No poll found for this month" }, { status: 404 })
  }

  return Response.json({ success: true, data: poll })
}