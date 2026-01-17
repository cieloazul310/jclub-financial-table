import type { PropsWithChildren } from "react";
import { getClubById } from "@cieloazul310/jclub-financial";
import { TablePageLayout } from "@/components/layout/table-page";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const club = getClubById(id);

  return (
    <TablePageLayout title={club?.name || ""} currentPathname={`/club/${id}`}>
      {children}
    </TablePageLayout>
  );
}
