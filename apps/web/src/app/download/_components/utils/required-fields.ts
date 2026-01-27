import type { FinancialDatum } from "@cieloazul310/jclub-financial";

export const RequiredFields = [
  "clubId",
  "name",
  "year",
  "category",
] satisfies (keyof FinancialDatum)[];
