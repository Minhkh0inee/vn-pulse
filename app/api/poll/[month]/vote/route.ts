import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { ratelimit } from "@/lib/rate-limiter"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ month: string }> }
) {
  const { month } = await params

  // ── Rate limit by IP ──────────────────────────────────────────────
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous"
  const { success: allowed } = await ratelimit.limit(ip)
  if (!allowed) {
    return Response.json({ success: false, error: "Too many requests" }, { status: 429 })
  }

  // ── Validate payload ──────────────────────────────────────────────
  const { rating } = await req.json()
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return Response.json({ success: false, error: "Rating must be 1–5" }, { status: 400 })
  }

  // ── Find the open poll for this month ────────────────────────────
  const poll = await prisma.poll.findUnique({ where: { month } })
  if (!poll) {
    return Response.json({ success: false, error: "No poll found for this month" }, { status: 404 })
  }
  if (!poll.isOpen) {
    return Response.json({ success: false, error: "This poll is closed" }, { status: 403 })
  }

  // ── Hash IP (never store raw) ─────────────────────────────────────
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex")
  const userAgent = req.headers.get("user-agent") ?? undefined

  // ── Persist ───────────────────────────────────────────────────────
  try {
    await prisma.pollResponse.create({
      data: { pollId: poll.id, rating, ipHash, userAgent },
    })
  } catch (err: unknown) {
    // Unique constraint → already voted from this IP
    if (
      err instanceof Error &&
      err.message.includes("Unique constraint")
    ) {
      return Response.json({ success: false, error: "Already voted" }, { status: 409 })
    }
    throw err
  }

  return Response.json({ success: true })
}