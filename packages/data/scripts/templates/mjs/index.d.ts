import type { FinancialDatum } from "@cieloazul310/jclub-financial-utils/types";
export declare function getData(from?: number, to?: number): Promise<FinancialDatum[]>;
export declare const years: number[];
export default getData;
