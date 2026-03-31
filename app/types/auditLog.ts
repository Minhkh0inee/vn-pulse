
import { IMonthlyIndex } from "./monthlyIndex";
import { IUser } from "./user";

export interface IAuditLog {
id: string;
  userId: string;
  user?: IUser;
  indexId: string | null;
  index?: IMonthlyIndex;
  action: "publish" | "update" | "unpublish" | string;
  details: IAuditLogDetails | null; 
  createdAt: Date;
}

export type IAuditLogDetails =
  | {
      action: "publish"
      month: string
      totalScore: number
      publishedAt: string
    }
  | {
      action: "update"
      month: string
      changedFields: string[]
      previousValues: Record<string, number>
      newValues: Record<string, number>
    }
  | {
      action: "unpublish"
      month: string
      reason?: string
    }
  | Record<string, unknown>