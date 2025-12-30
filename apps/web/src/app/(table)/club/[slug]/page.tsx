import { getAllClubs, getClubBySlug } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { FullWidthLayout } from "@/components/layout/full-width";
import { Figure } from "@/components/figure";
import { ClubSummary } from "@/components/club-summary";
import { Chart } from "@/components/chart";
import { Heading2 } from "@/components/article";

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
      <Figure data={data} mode="club" />
      <article className={container({ maxWidth: "common-main-width", mt: 12 })}>
        <Heading2>{club.name}</Heading2>
        {data.length >= 2 && (
          <div className={css({ mb: 8 })}>
            <Chart data={data} />
          </div>
        )}
        <div className={css()}>
          <ClubSummary club={club} />
        </div>
      </article>
    </FullWidthLayout>
  );
}
