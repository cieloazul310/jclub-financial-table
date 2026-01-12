import type { Metadata } from "next";
import { css } from "styled-system/css";
import { PageHeader } from "@/components/page-header";
import { Heading3, Paragraph } from "@/components/article";
import { PostList } from "@/components/post/list";
import { PostListItemBase } from "@/components/post/list-item";
import { AdInPage } from "@/components/ads";
import { docs, type DocsMetadata } from "@/content";
import { docsGroup } from "@/data/docs";

function getDocsGroup(allDocs: DocsMetadata[]) {
  return docsGroup.map(({ id, ...rest }) => ({
    id,
    ...rest,
    posts: allDocs.filter(({ frontmatter }) => frontmatter.group === id),
  }));
}

export function metadata(): Metadata {
  const title = "経営情報の見方";

  return {
    title,
    openGraph: { title },
    twitter: { title },
  };
}

export default async function Page() {
  const allDocs = await docs.getAll();
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
                // footerText={footerText}
              />
            ))}
          </PostList>
        </section>
      ))}
      <AdInPage />
    </>
  );
}
