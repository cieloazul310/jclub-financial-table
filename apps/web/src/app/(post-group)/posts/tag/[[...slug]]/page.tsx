import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
import { AdInPage, AdInLayout } from "@/components/ads";
import { post } from "@/content";
import { postsPerPage } from "@/data/site-metadata";
import { tags } from "@/data/tags";

export async function generateStaticParams() {
  const allPosts = await post.getAll();

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

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [tag] = slug;
  const currentTag = tags.find(({ id }) => tag === id);
  if (!currentTag) return {};
  const title = `タグ: ${currentTag.title}の記事一覧`;

  return { title, openGraph: { title }, twitter: { title } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [tag, page] = slug;

  const currentPage = page && page?.[0] ? parseInt(page[0], 10) : 1;
  const limit = postsPerPage;
  const skip = postsPerPage * (currentPage - 1);

  const currentTag = tags.find(({ id }) => tag === id);
  if (!currentTag) return null;
  const allPosts = await post.getAll();
  const tagPosts = allPosts
    .filter(({ frontmatter }) => frontmatter.tag === currentTag.title)
    .sort(
      (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
    );
  const numAllPostsPages = Math.ceil(tagPosts.length / postsPerPage);
  const postsInsAd = Math.ceil(postsPerPage / 2);
  const multiplePages = numAllPostsPages > 1;

  const prev =
    currentPage !== 1
      ? {
          title: `${currentTag.title} ${currentPage - 1}/${numAllPostsPages}`,
          href:
            currentPage > 2
              ? `/posts/tag/${currentTag.id}/${currentPage - 1}`
              : `/posts/tag/${currentTag.id}`,
        }
      : undefined;
  const next =
    currentPage !== numAllPostsPages
      ? {
          title: `${currentTag.title} ${currentPage + 1}/${numAllPostsPages}`,
          href: `/posts/tag/${currentTag.id}/${currentPage + 1}`,
        }
      : undefined;

  const posts = [...tagPosts].slice(skip, skip + limit);
  return (
    <>
      <PageHeader title={`タグ: ${currentTag.title}`}>
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
