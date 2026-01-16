import type { Metadata } from "next";
import { getAllClubs, getClubById } from "@cieloazul310/jclub-financial";
import { getExtendedDataByClub } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { Link } from "@/components/link";
import { Figure } from "@/components/figure";
import { TabList } from "@/components/figure/tab-list";
import { PrevNextLink } from "@/components/prev-next-link";
import { ClubSummary } from "@/components/club-summary";
import { Chart } from "@/components/chart";
import { Heading3 } from "@/components/article";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { SelectLink } from "@/components/select-link";
import { AdInPage } from "@/components/ads";
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
  if (!club) return {};

  const title = `${club.name}の経営情報`;
  const description = `${club?.name}の経営情報を損益計算書、貸借対照表、営業収入、営業費用、入場者数に分類して表示`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
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
      <TabList />
      <Figure data={data} mode="club" />
      <PrevNextLink
        leftSlot={{ href: `/club/${prev?.id}`, title: prev?.name }}
        rightSlot={{ href: `/club/${next?.id}`, title: next?.name }}
        mt={12}
        px={{ base: 4, md: 8 }}
      />
      <div className={container({ maxWidth: "common-main-width", mt: 12 })}>
        <article className={css({ mb: 12 })}>
          {data.length >= 2 && (
            <div className={css({ mb: 8 })}>
              <Chart data={data} />
            </div>
          )}
          <ClubSummary club={club} />
        </article>
        {posts.length > 0 && (
          <section className={css({ mb: 12 })}>
            <Heading3>{club.name}の最新記事</Heading3>
            <PostList mb={4}>
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
        <AdInPage mb={8} />
        <section className={css({ mb: 12 })}>
          <SelectLink />
          <PrevNextLink
            leftSlot={{ href: `/club/${prev?.id}`, title: prev?.name }}
            rightSlot={{ href: `/club/${next?.id}`, title: next?.name }}
            mt={8}
          />
        </section>
      </div>
    </>
  );
}
