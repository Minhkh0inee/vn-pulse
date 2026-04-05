import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { IMonthlyIndex } from "@/app/types/monthlyIndex";

const geminiFlash = google("gemini-2.5-flash");

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
    const { object } = await generateObject({
      model: geminiFlash,
      schema: z.object({
        insights: z.array(insightElement).length(3),
      }),
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

    return object.insights;
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