import { css } from "styled-system/css";
import type { LinkProps } from "@/components/ui/link";
import { title } from "@/data/site-metadata";

export function ImagePlaceholder({
  href,
  internal,
}: {
  href: NonNullable<LinkProps["href"]>;
  internal: boolean;
}) {
  return (
    <div
      className={css({
        aspectRatio: { base: 16 / 9, "@/md": 1, "@/lg": 16 / 9 },
        minWidth: "full",
        minHeight: "full",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textStyle: "std-20B-150",
        overflow: "hidden",
        bg: "keyColor.400",
        color: "keyColor.bg",
        whiteSpace: "nowrap",
        transition: "transform",
        _groupHover: { transform: "scale(1.05)" },
      })}
    >
      {internal ? title : new URL(href).hostname}
    </div>
  );
}
