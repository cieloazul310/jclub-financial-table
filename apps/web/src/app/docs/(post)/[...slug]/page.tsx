import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";
import { useMDXComponents } from "@/mdx-components";
import { PageHeader } from "@/components/page-header";
import { ArticleGrid } from "@/components/article-grid";
import { PrevNextLink } from "@/components/prev-next-link";
import { PostFooterBase } from "@/components/post/footer";
import { DocsMenu, createDocsMenuGroup } from "@/components/docs/menu";
import { docs } from "@/content";
import { parseFrontmatterDate } from "@/utils/datestring";

export async function generateStaticParams() {
  const allDocs = await docs.getAll();

  return allDocs;
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents();

  const mdx = await docs.useMdx(slug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;

  const { content, frontmatter, context } = mdx;
  const { title, group } = frontmatter;
  const { older, newer } = context;
  const { lastmod } = parseFrontmatterDate(frontmatter);

  const allDocs = await docs.getAll();
  const docsMenu = createDocsMenuGroup(allDocs);
  const groupMenu = docsMenu.find(({ id }) => id === group);

  return (
    <>
      <article>
        <PageHeader title={title} px={{ base: 2, md: 4 }}>
          {groupMenu?.title}
        </PageHeader>
        <ArticleGrid
          side={
            <DocsMenu currentGroup={group} currentSlug={slug} menu={docsMenu} />
          }
        >
          <section className={css({ mb: 12 })}>{content}</section>
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
    </>
  );
}
