import type { FinancialDatum } from "@cieloazul310/jclub-financial-utils/types";
export declare const clubs: string[];
export declare function getDataByClub(club: string): Promise<FinancialDatum[]>;
export declare function getDataByYear(year: number): Promise<FinancialDatum[]>;
export declare function getDatum(club: string, year: number): Promise<FinancialDatum | null>;
