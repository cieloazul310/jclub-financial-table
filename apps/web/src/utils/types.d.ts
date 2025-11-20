import type { FinancialDatum, General, SeasonResult } from "@cieloazul310/jclub-financial";

export type Tab = "pl" | "bs" | "revenue" | "expense" | "attd";

export type Mode = "club" | "year";

export type Category = "J1" | "J2" | "J3" | "others";

export type ClubInfo = {
  slug: string;
  name: string;
  fullname: string;
  short_name: string;
  company: string;
  category: Category;
  hometown: string;
  period: number;
  website: string | null;
  settlement: string | null;
  relatedCompanies: string[] | null;
  annotation: string[] | null;
};

export type YearInfo = {
  year: number;
  categories: Category[];
};

export type SortableKey = Exclude<keyof FinancialDatum, keyof General | "elevation">;
