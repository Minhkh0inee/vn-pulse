import { generateSectorSummary } from "@/lib/ai"
import { z } from "zod"

const InputSchema = z.object({
  sector:     z.string(),
  score:      z.number().min(0).max(100),
  trend:      z.number().nullable(),
  month:      z.string().regex(/^\d{4}-\d{2}$/),
  totalScore: z.number().min(0).max(100),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = InputSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ success: false, error: "Invalid input" }, { status: 400 })
  }

  try {
    const result = await generateSectorSummary(parsed.data)
    return Response.json({ success: true, ...result })
  } catch (err) {
    console.error("[generate-sector-summary]", err)
    return Response.json({ success: false, error: "Generation failed" }, { status: 500 })
  }
}
