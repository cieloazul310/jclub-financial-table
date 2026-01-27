import type { Metadata } from "next";
import { css } from "styled-system/css";
import { PageHeader } from "@/components/page-header";
import { Heading3, Paragraph } from "@/components/article";
import { PostList } from "@/components/post/list";
import { PostListItemBase } from "@/components/post/list-item";
import { AdInPage } from "@/components/ads";
import type { DocsMetadata } from "@/content";
import { docsGroup } from "@/data/docs";
import { siteUrl } from "@/data/site-metadata";
import { getAllDocs } from "@/utils/with-cache";

function getDocsGroup(allDocs: DocsMetadata[]) {
  return docsGroup.map(({ id, ...rest }) => ({
    id,
    ...rest,
    posts: allDocs.filter(({ frontmatter }) => frontmatter.group === id),
  }));
}

export const metadata: Metadata = {
  title: "経営情報の見方",
  openGraph: {
    title: "経営情報の見方",
    images: "/ogp.png",
    url: `${siteUrl}/docs/`,
  },
  twitter: { title: "経営情報の見方" },
};

export default async function Page() {
  const allDocs = await getAllDocs();
  const group = getDocsGroup(allDocs);

  return (
    <>
      <PageHeader title="経営情報の見方"></PageHeader>
      {group.map((groupItem) => (
        <section key={groupItem.id} className={css({ mb: 12 })}>
          <Heading3>{groupItem.title}</Heading3>
          <Paragraph>{groupItem.description}</Paragraph>
          <PostList>
            {groupItem.posts.map((doc) => (
              <PostListItemBase
                key={doc.href}
                title={doc.frontmatter.title}
                href={doc.href}
              />
            ))}
          </PostList>
        </section>
      ))}
      <AdInPage />
    </>
  );
}
