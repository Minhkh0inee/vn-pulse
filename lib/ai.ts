import { google } from "@ai-sdk/google";
import {  generateText, Output, streamText } from "ai";
import { z } from "zod";
import { IMonthlyIndex } from "@/app/types/monthlyIndex";
import { ICommentaryInput } from "@/types/commentary";

export const geminiFlash = google("gemini-2.5-flash");

const insightElement = z.object({
  icon: z.string().describe("Single emoji related to the insight"),
  text: z.string().describe("Vietnamese, concise, under 20 words"),
  type: z.enum(["positive", "warning", "neutral"]),
});

export type Insight = z.infer<typeof insightElement>;

export async function generateInsightCards(
  data: IMonthlyIndex,
  previousData?: IMonthlyIndex | null,
): Promise<Insight[]> {
  const trend = previousData ? data.totalScore - previousData.totalScore : null;

  try {
    const object = await generateText({
      model: geminiFlash,
      output: Output.object((
        {
        schema: z.object({
        insights: z.array(insightElement).length(3),
      })
        }
      )),
      
      prompt: `Analyze Vietnam startup ecosystem data for ${data.month} and provide 3 key insights.
      
      Current Month Data:
      - Total Score: ${data.totalScore}
      - Funding Score: ${data.fundingScore}
      - Job Posting Score: ${data.jobPostingScore}
      - News Volume Score: ${data.newsVolumeScore}
      - Poll Score: ${data.pollScore}
      ${trend !== null ? `- Monthly Trend: ${trend > 0 ? "+" : ""}${trend} points` : ""}

      Requirements:
      - Language: Vietnamese
      - Length: Each insight must be under 20 words
      - Format: Return exactly 3 items
      - Icons: Use relevant emojis`
    });

    return object.output.insights;
  } catch (error) {
    console.error("[AI ERROR] Failed to generate structured insights:", error);
    
    return [
      {
        icon: "📈",
        text: "Hệ sinh thái startup đang có dấu hiệu tăng trưởng ổn định.",
        type: "positive",
      },
      { 
        icon: "💼", 
        text: "Nhu cầu tuyển dụng trong lĩnh vực công nghệ duy trì ở mức khá.", 
        type: "neutral" 
      },
      {
        icon: "⚠️",
        text: "Cần chú ý hơn đến biến động dòng vốn đầu tư trong tháng này.",
        type: "warning",
      },
    ];
  }
}

function commentaryGeneratePropmt(input: ICommentaryInput): string {
  const {
    month, totalScore, trend,
    fundingScore, jobScore, newsScore, pollScore,
    rawData
  } = input

  const trendText = trend === null
    ? "không có dữ liệu tháng trước"
    : trend > 0
      ? `tăng ${trend} điểm so với tháng trước 📈`
      : trend < 0
        ? `giảm ${Math.abs(trend)} điểm so với tháng trước 📉`
        : "không đổi so với tháng trước"

  const rawDataText = rawData ? `
Dữ liệu thô:
- Số deals gọi vốn: ${rawData.fundingDeals ?? "N/A"}
- Tổng giá trị funding: $${rawData.fundingValueUsd ?? "N/A"}M
- Số tin tuyển dụng: ${rawData.jobPostings ?? "N/A"}
- Số bài báo: ${rawData.newsArticles ?? "N/A"}
- Poll trung bình: ${rawData.pollAvg ?? "N/A"}/5 (${rawData.pollCount ?? "N/A"} votes)` : ""

  return `Bạn là chuyên gia phân tích hệ sinh thái startup Việt Nam cho VN Startup Pulse.

Viết một đoạn commentary 200-250 chữ bằng tiếng Việt cho Index tháng ${month}.

=== DỮ LIỆU ===
Điểm tổng:   ${totalScore}/100 (${trendText})
Funding:     ${fundingScore}/100
Job Posting: ${jobScore}/100
News Volume: ${newsScore}/100
Poll:        ${pollScore}/100
${rawDataText}

=== YÊU CẦU ===
Cấu trúc bắt buộc:
1. Câu mở đầu: nhận xét tổng quan điểm ${totalScore}/100 và trend
2. Phân tích 2 điểm nổi bật nhất (component cao nhất và thấp nhất)
3. Nếu có raw data, đề cập số liệu cụ thể
4. Kết thúc: outlook ngắn 1-2 câu cho tháng tới

Phong cách:
- Tiếng Việt tự nhiên, chuyên nghiệp như bài LinkedIn
- Có số liệu cụ thể, không nói chung chung
- KHÔNG dùng markdown, bullet points, tiêu đề
- Chỉ trả về đoạn văn thuần túy`
}

export interface SectorSummaryInput {
  sector: string
  score: number
  trend: number | null
  month: string
  totalScore: number
}

export interface SectorSummaryOutput {
  summaryVi: string
  summaryEn: string
}

const SECTOR_DISPLAY: Record<string, string> = {
  fintech: "Fintech",
  ecommerce: "E-commerce",
  edtech: "EdTech",
  healthtech: "HealthTech",
  deeptech: "DeepTech",
}

export async function generateSectorSummary(input: SectorSummaryInput): Promise<SectorSummaryOutput> {
  const { sector, score, trend, month, totalScore } = input
  const sectorLabel = SECTOR_DISPLAY[sector] ?? sector
  const trendText = trend === null
    ? "không có dữ liệu tháng trước"
    : trend > 0 ? `tăng ${trend.toFixed(1)} điểm` : trend < 0 ? `giảm ${Math.abs(trend).toFixed(1)} điểm` : "không đổi"

  const result = await generateText({
    model: geminiFlash,
    output: Output.object({
      schema: z.object({
        summaryVi: z.string().describe("1-2 câu tiếng Việt, dưới 40 từ, mô tả hiệu suất ngành"),
        summaryEn: z.string().describe("1-2 sentences in English, under 40 words, describing sector performance"),
      }),
    }),
    prompt: `You are an analyst for VN Startup Pulse, a Vietnamese startup ecosystem tracker.

Sector: ${sectorLabel}
Month: ${month}
Sector score: ${score}/100 (${trendText} so với tháng trước)
Overall index: ${totalScore}/100

Write a brief AI summary for this sector in BOTH Vietnamese (summaryVi) and English (summaryEn).
Each summary must be 1-2 sentences, under 40 words, professional tone.
No markdown. Plain text only.`,
  })

  return result.output as SectorSummaryOutput
}

export function commentaryGenerate(input:ICommentaryInput) {
      const result = streamText({
        model: geminiFlash,
        maxOutputTokens: 800,
        prompt: commentaryGeneratePropmt(input),
      });

    return result.toTextStreamResponse()
}
