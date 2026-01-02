import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post/list";
import { PostListItemBase } from "@/components/post/list-item";
import { getAllPostYears } from "@/utils/post";

export default async function Page() {
  const allPostYears = await getAllPostYears();

  return (
    <>
      <PageHeader title="年別記事" />
      <PostList>
        {allPostYears.map((year) => (
          <PostListItemBase
            key={year.toString()}
            title={`${year}年の記事`}
            href={`/posts/archive/${year}`}
          />
        ))}
      </PostList>
    </>
  );
}
