import type { ReactNode } from "react";
import NextLink from "next/link";
import { css } from "styled-system/css";
import { Link } from "@/components/link";
import { ChipLabel } from "@/components/ui/chip-label";
import { ResourceList } from "@/components/ui/resource-list";
import type { PostMetadata } from "@/content";
import { parseFrontmatterDate } from "@/utils/datestring";
import { getSpecificClub } from "@/utils/get-clubinfo";

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
  ...rest
}: PostListItemBaseProps) {
  const props = { borderWidth, borderColor, ...rest };
  return (
    <ResourceList.Root key={title} asLink {...props}>
      <ResourceList.Main py={4}>
        <ResourceList.Content gap={2}>
          {headerText}
          <ResourceList.Title
            textStyle={{ base: "std-16B-170", md: "std-18B-160" }}
            asChild
          >
            <Link href={href}>{title}</Link>
          </ResourceList.Title>
          {footerText}
        </ResourceList.Content>
      </ResourceList.Main>
    </ResourceList.Root>
  );
}

export function PostListItem({ post }: { post: PostMetadata }) {
  const { frontmatter, href } = post;
  const { title, tag } = frontmatter;
  const { date, lastmod, isModified } = parseFrontmatterDate(frontmatter);
  const club = getSpecificClub(frontmatter.club, "short_name");

  const headerText = (
    <span
      className={css({ display: "flex", gap: 2, textStyle: "dns-16N-130" })}
    >
      {club && (
        <ChipLabel
          variant="solid-fill"
          colorPalette="solid-gray"
          zIndex={1}
          textStyle="dns-14B-130"
          asChild
        >
          <NextLink href={`/club/${club.slug}`}>{club.short_name}</NextLink>
        </ChipLabel>
      )}
      {tag && (
        <ChipLabel
          variant="ghost"
          colorPalette="solid-gray"
          zIndex={1}
          textStyle="dns-14B-130"
        >
          {tag}
        </ChipLabel>
      )}
    </span>
  );

  const footerText = (
    <span
      className={css({
        display: "flex",
        flexDirection: { base: "column", sm: "row" },
        gap: { base: 0, sm: 2 },
        alignItems: { base: "start", sm: "baseline" },
        textStyle: "dns-16N-130",
      })}
    >
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
