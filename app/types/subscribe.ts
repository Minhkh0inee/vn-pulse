export type SubscriberSource = "homepage" | "archive" | "share_card";

export interface ISubscriber {
  id: string;
  email: string;
  isVerified: boolean;
  verifyToken: string | null;
  source: SubscriberSource | string | null;
  unsubscribedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}