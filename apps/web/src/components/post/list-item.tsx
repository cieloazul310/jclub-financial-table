import type { ReactNode } from "react";
import { cx, css } from "styled-system/css";
import { Link } from "@/components/link";
import { ResourceList } from "@/components/ui/resource-list";
import type { PostMetadata } from "@/content";
import { parseFrontmatterDate } from "@/utils/datestring";
import { getSpecifiedClub } from "@/utils/clubs";
import { getCurrentTag } from "@/utils/tags";
import { ClubChip } from "./club-chip";
import { TagChip } from "./tag-chip";

type PostListItemBaseProps = {
  title: string;
  href: string;
  headerText?: ReactNode;
  footerText?: ReactNode;
} & Omit<ResourceList.RootProps, "children">;

export function PostListItemBase({
  title,
  href,
  headerText,
  footerText,
  borderWidth = "1px",
  borderColor = "solid-gray.420",
  rounded = 4,
  ...rest
}: PostListItemBaseProps) {
  const props = { borderWidth, borderColor, rounded, ...rest };
  return (
    <ResourceList.Root key={title} asLink asChild {...props}>
      <article>
        <ResourceList.Main py={4}>
          <ResourceList.Content gap={2}>
            {headerText}
            <ResourceList.Title
              textStyle={{ base: "std-16B-170", md: "std-18B-160" }}
            >
              <Link href={href}>{title}</Link>
            </ResourceList.Title>
            {footerText}
          </ResourceList.Content>
        </ResourceList.Main>
      </article>
    </ResourceList.Root>
  );
}

export function PostListItem({ post }: { post: PostMetadata }) {
  const { frontmatter, href } = post;
  const { title, tag, draft } = frontmatter;
  const { date, lastmod, isModified } = parseFrontmatterDate(frontmatter);
  const club = getSpecifiedClub("short_name", frontmatter.club);
  const currentTag = getCurrentTag("title", tag);

  const headerText = (
    <span className={css({ display: "flex", gap: 2 })}>
      {club && <ClubChip club={club} zIndex={1} />}
      {currentTag && <TagChip tag={currentTag} zIndex={1} />}
    </span>
  );

  const footerText = (
    <span
      className={cx(
        css({
          display: "flex",
          flexDirection: { base: "column", sm: "row" },
          gap: { base: 0, sm: 2 },
          alignItems: { base: "start", sm: "baseline" },
          textStyle: "dns-16N-130",
        }),
        draft && css({ color: "error.2" }),
      )}
    >
      {draft && <span>下書き</span>}
      <time dateTime={date.datetime}>{date.datestring}</time>
      {isModified && (
        <small className={css({ color: "solid-gray.600" })}>
          最終更新日:
          <time dateTime={lastmod.datetime}>{lastmod.datestring}</time>
        </small>
      )}
    </span>
  );

  return (
    <PostListItemBase
      title={title}
      href={href}
      headerText={headerText}
      footerText={footerText}
    />
  );
}
