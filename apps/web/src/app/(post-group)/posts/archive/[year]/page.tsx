import type { Metadata } from "next";
import { css } from "styled-system/css";
import { Heading3 } from "@/components/article";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
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
  const allYears = await getAllPostYears();

  return allYears.map((year) => ({ year: year.toString() }));
}

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;

  return {};
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
      {postsByMonth.map(({ month, posts }) => (
        <section key={month.toString()} className={css({ mb: 12 })}>
          <Heading3>{month}月の記事</Heading3>
          <PostList>
            {posts.map((post) => (
              <PostListItem key={post.href} post={post} />
            ))}
          </PostList>
        </section>
      ))}
      <PrevNextLink leftSlot={next} rightSlot={prev} />
    </>
  );
}
