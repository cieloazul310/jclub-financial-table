import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllClubs, getClubById } from "@cieloazul310/jclub-financial";
import { getExtendedDataByClub } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { Link } from "@/components/link";
import { Loading } from "@/components/loading";
import { Figure } from "@/components/figure";
import { PrevNextLink } from "@/components/prev-next-link";
import { ClubSummary } from "@/components/club-summary";
import { Chart } from "@/components/chart";
import { Heading2, Heading3 } from "@/components/article";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { SelectLink } from "@/components/select-link";
import { post } from "@/content";
import { getPrevNext } from "@/utils/clubs";

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

  if (!club) return null;

  const data = await getExtendedDataByClub(club.id);
  const { prev, next } = getPrevNext(id);

  const allPosts = await post.getAll();
  const posts = allPosts
    .filter(({ frontmatter }) =>
      frontmatter.club?.some((clubTag) => clubTag === club.short_name),
    )
    .sort(
      (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
    );

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
      {posts.length && (
        <section
          className={container({ maxWidth: "common-main-width", mt: 16 })}
        >
          <Heading3>{club.name}の最新記事</Heading3>
          <PostList mb={8}>
            {posts.slice(0, 4).map((post) => (
              <PostListItem key={post.href} post={post} />
            ))}
          </PostList>
          {posts.length > 4 && (
            <div className={css({ textAlign: "right" })}>
              <Link href={`/club/${club.id}/posts`}>
                {club.name}の記事一覧へ
              </Link>
            </div>
          )}
        </section>
      )}
      <section className={container({ maxWidth: "common-main-width", mt: 16 })}>
        <SelectLink />
        <PrevNextLink
          leftSlot={{ href: `/club/${prev?.id}`, title: prev?.name }}
          rightSlot={{ href: `/club/${next?.id}`, title: next?.name }}
          mt={12}
        />
      </section>
    </>
  );
}
