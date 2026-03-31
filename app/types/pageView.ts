export interface IPageView {
  id: string;
  page: string;
  referrer: string | null;
  country: string | null;
  createdAt: Date;
}