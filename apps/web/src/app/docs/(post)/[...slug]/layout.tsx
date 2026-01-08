import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { layout } from "styled-system/recipes";
import { Layout as BaseLayout } from "@/components/layout";
import { PageBottomNav } from "@/components/page-bottom-nav";
import { PageHeader } from "@/components/page-header";
import { ArticleGrid } from "@/components/article-grid";
import { PrevNextLink } from "@/components/prev-next-link";
import { PostFooterBase } from "@/components/post/footer";
import { DocsMenu, createDocsMenuGroup } from "@/components/docs/menu";
import { docs } from "@/content";
import { parseFrontmatterDate } from "@/utils/datestring";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ slug: string[] }> }>) {
  const { slug } = await params;
  const doc = await docs.get(slug);
  if (!doc) return children;

  const { frontmatter, context } = doc;
  const { title, group } = frontmatter;
  const { older, newer } = context;
  const { lastmod } = parseFrontmatterDate(frontmatter);
  const allDocs = await docs.getAll();
  const docsMenu = createDocsMenuGroup(allDocs);
  const groupMenu = docsMenu.find(({ id }) => id === group);

  return (
    <BaseLayout classes={layout({ contentWidth: "full" })}>
      <article className={css({ maxWidth: "60em", mx: "auto" })}>
        <PageHeader title={title} px={{ base: 2, md: 4 }}>
          {groupMenu?.title}
        </PageHeader>
        <ArticleGrid
          side={
            <DocsMenu currentGroup={group} currentSlug={slug} menu={docsMenu} />
          }
        >
          <section className={css({ mb: 12 })}>{children}</section>
          <PostFooterBase mb={12}>
            <hgroup>
              <h3
                className={css({
                  textStyle: { base: "std-20B-150", "@/md": "std-22B-150" },
                })}
              >
                {title}
              </h3>
              <p> {groupMenu?.title}</p>
            </hgroup>
            <span>
              最終更新日:{" "}
              <time dateTime={lastmod.datestring}>{lastmod.datestring}</time>
            </span>
          </PostFooterBase>
        </ArticleGrid>
      </article>
      <PrevNextLink
        leftSlot={{ href: older?.href, title: older?.frontmatter.title }}
        rightSlot={{ href: newer?.href, title: newer?.frontmatter.title }}
        mb={8}
      />
      <PageBottomNav items={[{ title: "経営情報の見方", href: "/docs" }]} />
    </BaseLayout>
  );
}
