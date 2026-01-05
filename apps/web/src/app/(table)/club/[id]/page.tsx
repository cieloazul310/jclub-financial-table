import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllClubs, getClubById } from "@cieloazul310/jclub-financial";
import { getExtendedDataByClub } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { Figure } from "@/components/figure";
import { Loading } from "@/components/loading";
import { PrevNextLink } from "@/components/prev-next-link";
import { ClubSummary } from "@/components/club-summary";
import { Chart } from "@/components/chart";
import { Heading2 } from "@/components/article";

function getPrevNext(id: string) {
  const allClubs = getAllClubs();
  const index = allClubs.findIndex((club) => club.id === id);

  return {
    prev: allClubs[index - 1],
    next: allClubs[index + 1],
  };
}

export function generateStaticParams() {
  const clubs = getAllClubs();
  return clubs;
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const club = getClubById(id);

  return {
    title: `${club?.name}の経営情報`,
    description: `${club?.name}の経営情報`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const club = getClubById(id);

  if (!club) {
    return null;
  }
  const data = await getExtendedDataByClub(club.id);
  const { prev, next } = getPrevNext(id);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Figure data={data} mode="club" />
      </Suspense>
      <PrevNextLink
        leftSlot={{ href: `/club/${prev?.id}`, title: prev?.name }}
        rightSlot={{ href: `/club/${next?.id}`, title: next?.name }}
        mt={12}
      />
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
    </>
  );
}
