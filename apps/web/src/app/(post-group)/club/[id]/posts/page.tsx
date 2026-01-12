import type { Metadata, ResolvingMetadata } from "next";
import { getAllClubs, getClubById } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
import { AdInLayout } from "@/components/ads";
import { post } from "@/content";
import { getPrevNext } from "@/utils/clubs";

export async function generateStaticParams() {
  const allClubs = getAllClubs();

  return allClubs;
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const club = getClubById(id);

  if (!club) return {};
  const title = `${club.name}の記事一覧`;

  return {
    title,
    openGraph: {
      title,
    },
    twitter: {
      title,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const club = getClubById(id);
  if (!club) return null;

  const allPosts = await post.getAll();
  const posts = allPosts
    .filter(({ frontmatter }) =>
      frontmatter.club?.some((clubTag) => clubTag === club.short_name),
    )
    .sort(
      (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
    );

  const { prev, next } = getPrevNext(id);

  return (
    <>
      <PageHeader title={`${club.name}の記事一覧`} />
      {posts.length ? (
        <PostList mb={4}>
          {posts.map((post) => (
            <PostListItem key={post.href} post={post} />
          ))}
        </PostList>
      ) : (
        <div className={css({ mb: 4 })}>{club.name}の記事はありません</div>
      )}
      <AdInLayout mb={4} />
      <PrevNextLink
        leftSlot={
          prev && {
            href: `/club/${prev.id}/posts`,
            title: `${prev.name}の記事一覧`,
          }
        }
        rightSlot={
          next && {
            href: `/club/${next.id}/posts`,
            title: `${next.name}の記事一覧`,
          }
        }
      />
    </>
  );
}
