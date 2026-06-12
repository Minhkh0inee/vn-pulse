export type InsightType = "positive" | "warning" | "neutral"

export interface IInsightCard {
  id: string
  indexId: string
  icon: string
  text: string
  type: InsightType
  createdAt: Date
}
