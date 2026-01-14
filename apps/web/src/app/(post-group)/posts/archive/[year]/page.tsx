import { Fragment } from "react";
import type { Metadata } from "next";
import { css } from "styled-system/css";
import { Heading3 } from "@/components/article";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
import { PageBottomNav } from "@/components/page-bottom-nav";
import { AdInLayout, AdInPage } from "@/components/ads";
import { post, type PostMetadata } from "@/content";
import { getAllPostYears } from "@/utils/post";

function getPostsByMonths(posts: PostMetadata[]) {
  const allMonths = Array.from(
    new Set(posts.map(({ frontmatter }) => frontmatter.date.getMonth() + 1)),
  ).sort((a, b) => a - b);

  return allMonths.map((month) => ({
    month,
    posts: posts.filter(
      ({ frontmatter }) => frontmatter.date.getMonth() + 1 === month,
    ),
  }));
}

export async function generateStaticParams() {
  const allPostYears = await getAllPostYears();

  return allPostYears.map((year) => ({ year: year.toString() }));
}

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const title = `${year}年の記事一覧`;

  return { title, openGraph: { title }, twitter: { title } };
}

export default async function Page({ params }: Props) {
  const year = parseInt((await params).year, 10);

  const allPosts = await post.getAll();
  const postsByYear = allPosts.filter(
    ({ frontmatter }) => frontmatter.date.getFullYear() === year,
  );
  const allYears = await getAllPostYears();
  const prev =
    allYears.findIndex((value) => value === year) !== allYears.length - 1
      ? { title: `${year - 1}年の記事一覧`, href: `/posts/archive/${year - 1}` }
      : undefined;
  const next =
    allYears.findIndex((value) => value === year) !== 0
      ? { title: `${year + 1}年の記事一覧`, href: `/posts/archive/${year + 1}` }
      : undefined;
  const postsByMonth = getPostsByMonths(postsByYear);

  return (
    <>
      <PageHeader title={`${year}年の記事一覧`} />
      {postsByMonth.map(({ month, posts }, index) => (
        <Fragment key={month.toString()}>
          <section className={css({ mb: 12 })}>
            <Heading3>{month}月の記事</Heading3>
            <PostList>
              {posts.map((post) => (
                <PostListItem key={post.href} post={post} />
              ))}
            </PostList>
            {index + 1 === Math.ceil(postsByMonth.length / 2) && (
              <AdInPage mt={4} />
            )}
          </section>
        </Fragment>
      ))}
      {!postsByMonth.length && (
        <div className={css({ mb: 12 })}>この年の記事はありません</div>
      )}
      <AdInLayout mb={8} />
      <PrevNextLink leftSlot={next} rightSlot={prev} mb={4} />
      <PageBottomNav
        items={[{ title: "年別記事一覧", href: "/posts/archive" }]}
        disableTopPageLink
      />
    </>
  );
}
