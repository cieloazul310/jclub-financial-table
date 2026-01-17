import type { PropsWithChildren } from "react";
import { TablePageLayout } from "@/components/layout/table-page";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ year: string }> }>) {
  const { year } = await params;

  return (
    <TablePageLayout
      title={`${year}年度の経営情報`}
      currentPathname={`/year/${year}`}
    >
      {children}
    </TablePageLayout>
  );
}
