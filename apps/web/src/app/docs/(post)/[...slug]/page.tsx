import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";
import { useMDXComponents } from "@/mdx-components";
import { PageHeader } from "@/components/page-header";
import { DocsMenu, createDocsMenuGroup } from "@/components/docs/menu";
import { docs, type DocsMetadata } from "@/content";

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

  const allDocs = await docs.getAll();
  const docsMenu = createDocsMenuGroup(allDocs);
  const groupMenu = docsMenu.find(({ id }) => id === group);

  return (
    <>
      <article>
        <PageHeader title={title} px={{ base: 2, md: 4 }}>
          {groupMenu?.title}
        </PageHeader>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: {
              base: "1fr",
              lg: "1fr minmax(auto, {sizes.sidebar-width})",
            },
          })}
        >
          <section className={css({ px: { base: 2, sm: 4 } })}>
            {content}
          </section>
          <aside
            className={css({
              display: { base: "none", lg: "block" },
              position: "sticky",
              top: 0,
              maxWidth: "sidebar-width",
              maxHeight: "100vh",
            })}
          >
            <DocsMenu currentGroup={group} currentSlug={slug} menu={docsMenu} />
          </aside>
        </div>
      </article>
    </>
  );
}
