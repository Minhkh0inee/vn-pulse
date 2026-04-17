import { NextResponse }                          from "next/server"
import { prisma }                                from "@/lib/prisma"
import { redis }                                 from "@/lib/redis"
import { hashIP, secondsUntilEndOfMonth }        from "@/utils/month.utils"
import { z }                                     from "zod"

const VoteSchema = z.object({
  rating: z.number().int().min(1).max(5),
})

export async function POST(
  req: Request,
  { params }: { params: Promise<{ month: string }> }
) {
  const { month } = await params
  const ip        = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const ipHash    = await hashIP(ip)

  const body   = await req.json()
  const parsed = VoteSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error:   "Invalid rating",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { rating } = parsed.data

  const poll = await prisma.poll.findUnique({
    where: { month },
  })

  if (!poll) {
    return NextResponse.json(
      { success: false, error: "Poll not found" },
      { status: 404 }
    )
  }

  if (!poll.isOpen) {
    return NextResponse.json(
      { success: false, error: "Poll đã đóng tháng này" },
      { status: 403 }
    )
  }

  const votedKey = `poll:voted:${month}:${ipHash}`

  const [redisVoted, dbVoted] = await Promise.all([
    redis.get(votedKey),
    prisma.pollResponse.findUnique({
      where:  { pollId_ipHash: { pollId: poll.id, ipHash } },
      select: { id: true },
    }),
  ])

  if (redisVoted || dbVoted) {
    if (!redisVoted && dbVoted) {
      await redis.set(votedKey, "1", { ex: secondsUntilEndOfMonth() })
    }

    return NextResponse.json(
      { success: false, error: "Bạn đã vote tháng này rồi" },
      { status: 429 }
    )
  }

  try {
    await prisma.pollResponse.create({
      data: {
        pollId:    poll.id,
        rating,
        ipHash,
        userAgent: req.headers.get("user-agent") ?? undefined,
      },
    })
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Bạn đã vote tháng này rồi" },
        { status: 429 }
      )
    }
    throw error
  }

  await Promise.all([
    redis.set(votedKey, "1", { ex: secondsUntilEndOfMonth() }),
    redis.del(`poll:result:${month}`),
  ])

  const responses = await prisma.pollResponse.findMany({
    where:  { pollId: poll.id },
    select: { rating: true },
  })

  const totalVotes = responses.length
  const avgRating  = totalVotes > 0
    ? responses.reduce((sum, r) => sum + r.rating, 0) / totalVotes
    : 0

  const distribution = [1, 2, 3, 4, 5].map(r => {
    const count = responses.filter(res => res.rating === r).length
    return {
      rating:  r,
      count,
      percent: totalVotes > 0
        ? Math.round((count / totalVotes) * 100)
        : 0,
    }
  })

  return NextResponse.json({
    success: true,
    message: "Vote thành công!",
    data: {
      totalVotes,
      avgRating:  Math.round(avgRating * 10) / 10,
      distribution,
      yourRating: rating,
    },
  })
}