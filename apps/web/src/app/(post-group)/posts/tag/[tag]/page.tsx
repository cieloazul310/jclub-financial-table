import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItem } from "@/components/post/list-item";
import { PrevNextLink } from "@/components/prev-next-link";
import { post } from "@/content";
import { tags } from "@/data/tags";

export async function generateStaticParams() {
  return tags.map(({ id }) => ({ tag: id }));
}

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;

  return {};
}

export default async function Page({ params }: Props) {
  const { tag } = await params;
  const currentTag = tags.find(({ id }) => tag === id);
  if (!currentTag) return null;
  const allPosts = await post.getAll();
  const tagPosts = allPosts
    .filter(({ frontmatter }) => frontmatter.tag === currentTag.title)
    .sort(
      (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
    );

  return (
    <>
      <PageHeader title={`タグ: ${currentTag.title}`} />
      <PostList>
        {tagPosts.map((post) => (
          <PostListItem key={post.href} post={post} />
        ))}
      </PostList>
    </>
  );
}
