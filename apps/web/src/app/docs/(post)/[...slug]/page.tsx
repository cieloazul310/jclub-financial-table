import type { Metadata, ResolvingMetadata } from "next";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";
import { PageHeader } from "@/components/page-header";
import { ArticleGrid } from "@/components/article-grid";
import { PrevNextLink } from "@/components/prev-next-link";
import { PostFooterBase } from "@/components/post/footer";
import { AdInSide } from "@/components/ads";
import { DocsMenu, createDocsMenuGroup } from "@/components/docs/menu";
import { docsFigures } from "@/components/docs/figures";
import { useMDXComponents } from "@/mdx-components";
import { docs } from "@/content";
import { mergeOpenGraph } from "@/utils/merge-opengraph";
import { parseFrontmatterDate } from "@/utils/datestring";

export async function generateStaticParams() {
  const allDocs = await docs.getAll();

  return allDocs;
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const doc = await docs.get(slug);
  if (!doc) return {};
  const { title } = doc.frontmatter;
  const openGraph = await mergeOpenGraph(
    { title, pathname: `/docs/${slug.join("/")}/` },
    parent,
  );

  return {
    title,
    openGraph,
    twitter: { title },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents(docsFigures);

  const mdx = await docs.useMdx(slug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;

  const { frontmatter, context } = mdx;
  const { title, group } = frontmatter;
  const { older, newer } = context;
  const { lastmod } = parseFrontmatterDate(frontmatter);
  const allDocs = await docs.getAll();
  const docsMenu = createDocsMenuGroup(allDocs);
  const groupMenu = docsMenu.find(({ id }) => id === group);

  const { content } = mdx;

  return (
    <>
      <article className={css({ maxWidth: "60em", mx: "auto" })}>
        <PageHeader title={title} px={{ base: 2, md: 4 }}>
          {groupMenu?.title}
        </PageHeader>
        <ArticleGrid
          side={
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 8,
                pb: 4,
              })}
            >
              <DocsMenu
                currentGroup={group}
                currentSlug={slug}
                menu={docsMenu}
              />
              <AdInSide px={4} />
            </div>
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
        mb={4}
      />
    </>
  );
}
