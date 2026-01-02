import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
import { postsPerPage } from "@/data/site-metadata";
import { post } from "@/content";

export async function generateStaticParams() {
  const allPosts = await post.getAll();
  const numAllPostsPages = Math.ceil(allPosts.length / postsPerPage);

  return Array.from({ length: numAllPostsPages }, (_, index) => ({
    page: index === 0 ? undefined : [(index + 1).toString()],
  }));
}

type Props = {
  params: Promise<{ page?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;

  return {};
}

export default async function Page({ params }: Props) {
  const { page } = await params;
  const currentPage = page && page?.[0] ? parseInt(page[0], 10) : 1;
  const limit = postsPerPage;
  const skip = postsPerPage * (currentPage - 1);
  const allPosts = (await post.getAll()).sort(
    (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
  );
  const numAllPostsPages = Math.ceil(allPosts.length / postsPerPage);

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
      <PostList mb={12}>
        {posts.map((post) => (
          <PostListItem key={post.href} post={post} />
        ))}
      </PostList>
      <PrevNextLink leftSlot={prev} rightSlot={next} />
    </>
  );
}
