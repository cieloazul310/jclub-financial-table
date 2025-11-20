import type { FinancialDatum } from "@cieloazul310/jclub-financial-utils/types";

export async function getData(
  from: number = -Infinity,
  to: number = Infinity,
): Promise<FinancialDatum[]> {
  const years: number[] = [2020];
  const selected = years.filter((year) => year >= from && year <= to);
  const imports = selected.map((year) =>
    import("./" + year + ".json").then(
      (m) => (m.default ?? m) as FinancialDatum,
    ),
  );
  return Promise.all(imports);
}

export const years: number[] = [2020];

export default getData;
