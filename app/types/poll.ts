export interface IPoll {
  id: string;
  month: string;
  question: string;
  isOpen: boolean;
  closedAt: Date | null;

  responses?: IPollResponse[];

  createdAt: Date;
}

export interface IPollResponse {
  id: string;
  pollId: string;
  poll?: IPoll;
  rating: number; // 1-5
  ipHash: string;
  userAgent: string | null;
  createdAt: Date;
}
