import { getDataByYear } from "@cieloazul310/jclub-financial/data";
import { FullWidthLayout } from "@/components/layout/full-width";
import { FinancialTable } from "@/components/table";
import { getAllYears } from "@/utils/all-years";

export async function generateStaticParams() {
  const years = await getAllYears();
  return years.map(({ year }) => ({ year: year.toString()}));
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const data = await getDataByYear(parseInt(year, 10));

  return (
    <FullWidthLayout slug={["year", year]} title={`${year}年度`}>
      <FinancialTable data={data} mode="year" />
    </FullWidthLayout>
  );
}
