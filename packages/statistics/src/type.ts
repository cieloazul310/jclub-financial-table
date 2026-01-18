export const CATEGORIES = ["J1", "J2", "J3"] as const;
export type StatsCategory = (typeof CATEGORIES)[number];

export const Fields = [
  "revenue",
  "expenses",
  "net_assets",
  "sponsor_revenue",
  "ticket_revenue",
  "jleague_distribution",
  "team_wages",
  "average_attendance",
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
  category: StatsCategory;
  stats: Record<string, CreateStatsResult>;
};
