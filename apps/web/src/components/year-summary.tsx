// import { getStatsByYear } from "@cieloazul310/jclub-financial/statistics";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
// import { Table } from "@/components/ui/table";

async function createYearsStats(year: number) {
  /*
  const revenue = await getStatsByYear(year, "revenue");
  const net_worth = await getStatsByYear(year, "net_worth");
  const expense = await getStatsByYear(year, "expense");
  const salary = await getStatsByYear(year, "salary");
  */
}

export async function YearSummary({
  year,
  ...rest
}: { year: number } & HTMLStyledProps<"section">) {
  const props = { ...rest };

  return <styled.section {...props}></styled.section>;
}
