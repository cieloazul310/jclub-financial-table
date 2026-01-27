import { cache } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
import { AdInLayout, AdInPage } from "@/components/ads";
import { postsPerPage } from "@/data/site-metadata";
import { mergeOpenGraph } from "@/utils/merge-opengraph";
import { getAllPosts } from "@/utils/with-cache";

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const numAllPostsPages = Math.ceil(allPosts.length / postsPerPage);

  return Array.from({ length: numAllPostsPages }, (_, index) => ({
    page: index === 0 ? undefined : [(index + 1).toString()],
  }));
}

const getPageDetails = cache(async (page?: string[]) => {
  const currentPage = page && page?.[0] ? parseInt(page[0], 10) : 1;
  const limit = postsPerPage;
  const skip = postsPerPage * (currentPage - 1);
  const allPosts = (await getAllPosts()).sort(
    (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
  );
  const numAllPostsPages = Math.ceil(allPosts.length / postsPerPage);

  return { currentPage, limit, skip, numAllPostsPages, allPosts };
});

type Props = {
  params: Promise<{ page?: string[] }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { page } = await params;
  const { currentPage, numAllPostsPages } = await getPageDetails(page);

  const title = `記事一覧 (${currentPage} / ${numAllPostsPages})`;
  const openGraph = await mergeOpenGraph(
    { title, pathname: `/posts/${page?.join("/") ?? ""}` },
    parent,
  );

  return {
    title,
    openGraph,
    twitter: { title },
  };
}

export default async function Page({ params }: Props) {
  const { page } = await params;
  const { currentPage, limit, skip, numAllPostsPages, allPosts } =
    await getPageDetails(page);
  const postsInsAd = Math.ceil(postsPerPage / 2);

  const prev =
    currentPage !== 1
      ? {
          title: `${currentPage - 1}/${numAllPostsPages}`,
          href: currentPage > 2 ? `/posts/${currentPage - 1}` : `/posts`,
        }
      : undefined;
  const next =
    currentPage !== numAllPostsPages
      ? {
          title: `${currentPage + 1}/${numAllPostsPages}`,
          href: `/posts/${currentPage + 1}`,
        }
      : undefined;

  const posts = [...allPosts].slice(skip, skip + limit);
  return (
    <>
      <PageHeader title="記事一覧">
        {currentPage}/{numAllPostsPages}
      </PageHeader>
      <PostList mb={4}>
        {posts.slice(0, postsInsAd).map((post) => (
          <PostListItem key={post.href} post={post} />
        ))}
        {posts.length > postsInsAd && (
          <AdInPage gridColumn={{ base: "1", md: "1 / 3" }} />
        )}
        {posts.slice(postsInsAd).map((post) => (
          <PostListItem key={post.href} post={post} />
        ))}
      </PostList>
      <AdInLayout mb={4} />
      <PrevNextLink leftSlot={prev} rightSlot={next} />
    </>
  );
}
