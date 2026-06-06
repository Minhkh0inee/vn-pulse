import { geminiFlash }                            from "@/lib/ai"
import { getLast6Months, getSectorScoresByIndexIds } from "@/lib/fetchers"
import { chatRateLimit } from "@/lib/rate-limiter"
import { convertToModelMessages, streamText }     from "ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"

  const { success, remaining } = await chatRateLimit.limit(ip)
  console.log("[chat] ip:", ip, "| success:", success, "| remaining:", remaining)
  if (!success) {
    return NextResponse.json(
      { success: false, error: "Rate limit exceeded" },
      { status: 429 }
    )
  }
  
  const { messages } = await req.json()

  const data = await getLast6Months()

  const indexIds = data.map(d => d.id)
  const sectorData = await getSectorScoresByIndexIds(indexIds)

  const sectorByMonth = data.map(d => ({
    month:   d.month,
    sectors: sectorData.filter(s => s.indexId === d.id),
  }))

  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: geminiFlash,
    system: `You are the AI analyst for VN Startup Pulse, a monthly composite index (0–100) tracking Vietnam's startup ecosystem across Funding, Job Postings, News Volume, and Community Poll signals.

## Your role
Answer questions about trends, scores, and signals using ONLY the data provided below. Do not fabricate numbers or events. If the data does not cover what the user asks, say so clearly.

## How to interpret the index data
Each record represents one published month:
- \`totalScore\` — composite index (0–100, higher = healthier ecosystem)
- \`fundingScore / jobPostingScore / newsVolumeScore / pollScore\` — sub-scores (0–100)
- \`rawFundingDeals / rawFundingValue\` — number and USD value of funding deals
- \`rawJobPostings\` — startup job listings counted
- \`rawNewsArticles\` — media articles about VN startups
- \`rawPollAvg / rawPollCount\` — community sentiment (1–5 scale) and respondent count
- \`summaryEn / summaryVi\` — editorial commentary
- \`month\` format: "YYYY-MM"

## How to interpret the sector data
Each month has scores for 5 sectors: fintech, ecommerce, edtech, healthtech, deeptech
- \`score\` — sector health score (0–100)
- \`trend\` — delta vs previous month (positive = improving)
- \`summaryEn / summaryVi\` — sector-specific commentary

## Response guidelines
- Respond in the same language the user writes in (Vietnamese or English)
- Lead with the direct answer, then support with specific numbers
- When comparing months, highlight the delta and what drove it
- When comparing sectors, reference score and trend together
- Keep answers concise — 2–4 short paragraphs unless a breakdown is requested
- Format numbers clearly: funding in USD millions, scores to one decimal place

## Index data (last 6 published months, newest first)
${JSON.stringify(data, null, 2)}

## Sector data (grouped by month)
${JSON.stringify(sectorByMonth, null, 2)}`,
    messages: modelMessages,
  })

  return result.toUIMessageStreamResponse()
}