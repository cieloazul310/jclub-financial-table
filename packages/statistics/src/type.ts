export const CATEGORIES = ["J1", "J2", "J3"] as const;
export type Category = (typeof CATEGORIES)[number];

export const Fields = [
  "revenue",
  "expense",
  "net_worth",
  "sponsor",
  "ticket",
  "broadcast",
  "salary",
  "average_attd",
  "unit_price",
] as const;
export type Fields = (typeof Fields)[number];

export type ValueItem = { name: string; value: number };

export type StatsSummary = {
  sum: number;
  average: number | null;
  min: number | null;
  max: number | null;
  median?: number | null;
  deviation?: number | null;
  variance?: number | null;
};

export type CreateStatsResult = {
  values: ValueItem[];
  totalCount: number;
  stats: StatsSummary;
};

export type DatasetFile = {
  year: number;
  category: Category;
  stats: Record<string, CreateStatsResult>;
};
