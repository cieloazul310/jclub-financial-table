import type { ClubInfo } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/link";
import type { PostTag } from "@/utils/types";
import { ClubChip } from "./club-chip";
import { TagChip } from "./tag-chip";

type PostFooterBaseProps = HTMLStyledProps<"footer">;

export function PostFooterBase({
  children,
  display = "grid",
  gridTemplateColumns = "1fr",
  gap = 4,
  ...rest
}: PostFooterBaseProps) {
  const props = { display, gridTemplateColumns, gap, ...rest };
  return <styled.footer {...props}>{children}</styled.footer>;
}

export function PostFooter({
  title,
  date,
  lastmod,
  isModified,
  specifiedClub,
  clubs,
  tag,
  ...rest
}: Omit<PostFooterBaseProps, "children"> & {
  date: { datestring: string; datetime: string };
  lastmod: { datestring: string; datetime: string };
  isModified: boolean;
  specifiedClub?: ClubInfo | undefined | null;
  clubs?: ClubInfo[] | undefined | null;
  tag?: PostTag;
}) {
  return (
    <PostFooterBase title={title} {...rest}>
      <div
        className={css({ display: "grid", gridTemplateColumns: "1fr", gap: 2 })}
      >
        <h3
          className={css({
            textStyle: { base: "std-20B-150", "@/md": "std-22B-150" },
          })}
        >
          {title}
        </h3>
        <div
          className={css({
            display: "flex",
            flexDirection: { base: "column", "@/md": "row" },
            gap: { base: 0, "@/md": 1 },
            alignItems: { base: "start", "@/md": "end" },
          })}
        >
          <time dateTime={date.datestring}>{date.datestring}</time>
          {isModified && (
            <small className={css({ color: "solid-gray.536" })}>
              最終更新日:{" "}
              <time dateTime={lastmod.datestring}>{lastmod.datestring}</time>
            </small>
          )}
        </div>
        {clubs && (
          <nav
            className={css({
              display: "inline-flex",
              gap: 1,
              flexWrap: "wrap",
            })}
          >
            {clubs.map((clubInfo) => (
              <ClubChip key={clubInfo.id} club={clubInfo} />
            ))}
            {tag && <TagChip tag={tag} />}
          </nav>
        )}
      </div>
      {specifiedClub && (
        <div
          className={css({
            display: "flex",
            flexDirection: { base: "column", sm: "row" },
            gap: { base: 0, sm: 2 },
            alignItems: { base: "stretch", sm: "center" },
          })}
        >
          <span
            className={css({
              textStyle: "std-17B-170",
              display: { base: "none", sm: "block" },
              px: { base: 4, sm: 0 },
            })}
          >
            {specifiedClub.name}
          </span>
          <nav
            className={css({
              display: "flex",
              flexDirection: { base: "column", sm: "row" },
              gap: 2,
            })}
          >
            <Button
              variant="text"
              width={{ base: "full", sm: "inherit" }}
              asChild
            >
              <Link href={`/club/${specifiedClub.id}/posts`}>
                <span className={css({ display: { sm: "none" } })}>
                  {specifiedClub.name}の
                </span>
                記事一覧
              </Link>
            </Button>
            <Button
              variant="text"
              width={{ base: "full", sm: "inherit" }}
              asChild
            >
              <Link href={`/club/${specifiedClub.id}`}>
                <span className={css({ display: { sm: "none" } })}>
                  {specifiedClub.name}の
                </span>
                経営情報
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </PostFooterBase>
  );
}
