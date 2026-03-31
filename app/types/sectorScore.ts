import { IMonthlyIndex } from "./monthlyIndex";

export type Sector = "fintech" | "ecommerce" | "edtech" | "healthtech" | "deeptech";

export interface ISectorScore {
  id: string;
  indexId: string;
  index?: IMonthlyIndex; // Relation field
  sector: Sector;
  score: number;
  trend: number | null;
  createdAt: Date;
}