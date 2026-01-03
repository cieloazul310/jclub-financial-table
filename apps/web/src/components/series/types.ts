import type { FinancialDatum } from "@cieloazul310/jclub-financial";

export type SeriesData = {
  slug: string;
  category: string;
  name: string;
  short_name: string;
  data: { year: number; datum: FinancialDatum | null }[];
};
