import { cache } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
import { AdInPage, AdInLayout } from "@/components/ads";
import { postsPerPage, siteUrl } from "@/data/site-metadata";
import { tags } from "@/data/tags";
import { getAllPosts } from "@/utils/with-cache";

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return tags
    .map(({ id, title }) => {
      const posts = allPosts.filter(
        ({ frontmatter }) => frontmatter.tag === title,
      );
      const numAllPostsPages = Math.ceil(posts.length / postsPerPage);

      return Array.from({ length: numAllPostsPages }, (_, index) => ({
        slug: index === 0 ? [id] : [id, (index + 1).toString()],
      }));
    })
    .flat();
}

const getPageDetails = cache(async (slug: string[]) => {
  const [tag, page] = slug;
  const currentTag = tags.find(({ id }) => tag === id);
  const currentPage = page && page?.[0] ? parseInt(page[0], 10) : 1;
  const limit = postsPerPage;
  const skip = postsPerPage * (currentPage - 1);

  return { tag: currentTag, currentPage, limit, skip };
});

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const { openGraph } = await parent;
  const { tag } = await getPageDetails(slug);

  if (!tag) return {};
  const title = `タグ: ${tag.title}の記事一覧`;

  return {
    title,
    openGraph: {
      ...openGraph,
      title,
      url: `${siteUrl}/posts/tag/${slug.join("/")}/`,
    },
    twitter: { title },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // const [tag, page] = slug;
  const { tag, currentPage, limit, skip } = await getPageDetails(slug);

  if (!tag) return null;
  const allPosts = await getAllPosts();
  const tagPosts = allPosts
    .filter(({ frontmatter }) => frontmatter.tag === tag.title)
    .sort(
      (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
    );
  const numAllPostsPages = Math.ceil(tagPosts.length / postsPerPage);
  const postsInsAd = Math.ceil(postsPerPage / 2);
  const multiplePages = numAllPostsPages > 1;

  const prev =
    currentPage !== 1
      ? {
          title: `${tag.title} ${currentPage - 1}/${numAllPostsPages}`,
          href:
            currentPage > 2
              ? `/posts/tag/${tag.id}/${currentPage - 1}`
              : `/posts/tag/${tag.id}`,
        }
      : undefined;
  const next =
    currentPage !== numAllPostsPages
      ? {
          title: `${tag.title} ${currentPage + 1}/${numAllPostsPages}`,
          href: `/posts/tag/${tag.id}/${currentPage + 1}`,
        }
      : undefined;

  const posts = [...tagPosts].slice(skip, skip + limit);
  return (
    <>
      <PageHeader title={`タグ: ${tag.title}`}>
        {multiplePages && `${currentPage}/${numAllPostsPages}`}
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
