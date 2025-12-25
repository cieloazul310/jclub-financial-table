import { getAllClubs, getClubBySlug } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { FullWidthLayout } from "@/components/layout/full-width";
import { FinancialTable } from "@/components/table";
import { ClubSummary } from "@/components/club-summary";

export function generateStaticParams() {
  const clubs = getAllClubs();
  return clubs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = getClubBySlug(slug);

  if (!club) {
    return null;
  }
  const data = await getDataByClub(club.slug);

  return (
    <FullWidthLayout slug={["club", club.slug]} title={club.name}>
      <FinancialTable data={data} mode="club" />
      <ClubSummary club={club} />
    </FullWidthLayout>
  );
}
