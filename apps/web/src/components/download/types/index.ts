import type { ClubInfo, FinancialDatum } from "@cieloazul310/jclub-financial";

export type DownloadDataset = ClubInfo & { data: FinancialDatum[] };

export const RequiredFields = [
  "clubId",
  "name",
  "year",
  "category",
] satisfies (keyof FinancialDatum)[];
