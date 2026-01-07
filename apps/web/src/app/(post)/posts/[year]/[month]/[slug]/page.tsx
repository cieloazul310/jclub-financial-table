import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";
import { PageHeader } from "@/components/page-header";
import { ArticleGrid } from "@/components/article-grid";
import { PrevNextLink } from "@/components/prev-next-link";
import { ClubChip } from "@/components/post/club-chip";
import { TagChip } from "@/components/post/tag-chip";
import { PostListItemBase } from "@/components/post/list-item";
import { PostFooter } from "@/components/post/footer";
import { useMDXComponents } from "@/mdx-components";
import { post } from "@/content";
import { parseFrontmatterDate } from "@/utils/datestring";
import { getSpecifiedClub, getClubsFromArray } from "@/utils/clubs";
import { getCurrentTag } from "@/utils/tags";

export async function generateStaticParams() {
  const allPost = await post.getAll();
  return allPost.map((post) => {
    const [year, month, slug] = post.slug;
    return { year, month, slug };
  });
}

type Props = {
  year: string;
  month: string;
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Props>;
}): Promise<Metadata> {
  const { year, month, slug } = await params;
  const joinedSlug = [year, month, slug];
  const postMetadata = await post.get(joinedSlug);
  if (!postMetadata) return {};
  const { frontmatter } = postMetadata;

  return {
    title: frontmatter.title,
  };
}

export default async function Page({ params }: { params: Promise<Props> }) {
  const { year, month, slug } = await params;
  const joinedSlug = [year, month, slug];
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents();
  const mdx = await post.useMdx(joinedSlug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;
  const { content, frontmatter, context } = mdx;
  const { title, club, tag } = frontmatter;
  const { older, newer } = context;
  const { date, lastmod, isModified } = parseFrontmatterDate(frontmatter);
  const clubs = getClubsFromArray("short_name", club);
  const specifiedClub = getSpecifiedClub("short_name", club);
  const currentTag = getCurrentTag("title", tag);

  return (
    <>
      <article>
        <PageHeader title={title} px={{ base: 2, md: 4 }}>
          <>
            <span
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mb: 2,
              })}
            >
              <time dateTime={date.datetime}>{date.datestring}</time>
              {isModified && (
                <span
                  className={css({
                    textStyle: "oln-16N-100",
                    color: "solid-gray.536",
                  })}
                >
                  最終更新日:
                  <time dateTime={lastmod.datetime}>{lastmod.datestring}</time>
                </span>
              )}
            </span>
            <span className={css({ display: "flex", gap: 2 })}>
              {specifiedClub && <ClubChip club={specifiedClub} />}
              {currentTag && <TagChip tag={currentTag} />}
            </span>
          </>
        </PageHeader>
        <ArticleGrid
          side={
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 8,
              })}
            >
              <PostFooter
                px={6}
                title={title}
                date={date}
                lastmod={lastmod}
                isModified={isModified}
                clubs={clubs}
                tag={currentTag}
              />
              <nav
                className={css({ display: "grid", gridTemplateColumns: "1fr" })}
              >
                {newer && (
                  <PostListItemBase
                    borderWidth="0"
                    title={newer.frontmatter.title}
                    href={newer.href}
                    headerText={<span>次の記事</span>}
                  />
                )}
                {older && (
                  <PostListItemBase
                    borderWidth="0"
                    title={older.frontmatter.title}
                    href={older.href}
                    headerText={<span>前の記事</span>}
                  />
                )}
              </nav>
            </div>
          }
        >
          <section className={css({ mb: 12 })}>{content}</section>
          <PostFooter
            mb={12}
            title={title}
            date={date}
            lastmod={lastmod}
            isModified={isModified}
            clubs={clubs}
            specifiedClub={specifiedClub}
            tag={currentTag}
          />
        </ArticleGrid>
      </article>
      <PrevNextLink
        leftSlot={{ href: newer?.href, title: newer?.frontmatter.title }}
        rightSlot={{ href: older?.href, title: older?.frontmatter.title }}
        mb={8}
      />
    </>
  );
}
