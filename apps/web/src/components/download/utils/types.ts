import type { ClubInfo, FinancialDatum } from "@cieloazul310/jclub-financial";

export type IntermediateDatum = { __clubId: string; __year: number } & Record<
  string,
  string | number
>;

export type Dataset<T extends object = FinancialDatum> = ClubInfo & {
  data: T[];
};

export type DatasetIntermediate = Dataset<IntermediateDatum>;

export type FieldAndLabel = {
  field: keyof FinancialDatum;
  label: string;
};
