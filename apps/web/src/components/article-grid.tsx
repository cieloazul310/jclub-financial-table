import type { ReactNode } from "react";
import { cx, css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";

export function ArticleGrid({
  children,
  side,
  classes,
  display = "grid",
  gridTemplateColumns = {
    base: "1fr",
    lg: "1fr minmax(auto, {sizes.sidebar-width})",
  },
  ...rest
}: HTMLStyledProps<"div"> & {
  side?: ReactNode;
  classes?: Partial<{
    content: string;
    side: string;
  }>;
}) {
  const props = { display, gridTemplateColumns, ...rest };

  return (
    <styled.div {...props}>
      <div
        className={cx(
          css({
            px: { base: 2, sm: 4 },
            overflowX: "hidden",
            containerName: "article-content",
            containerType: "inline-size",
          }),
          classes?.content,
        )}
      >
        {children}
      </div>
      {side && (
        <div
          className={cx(
            css({
              display: { base: "none", lg: "block" },
              position: "sticky",
              top: 8,
              maxWidth: "sidebar-width",
              maxHeight: "calc(100vh - {spacing.8})",
              containerName: "article-sidebar",
              containerType: "inline-size",
              overflowY: "auto",
            }),
            classes?.side,
          )}
        >
          {side}
        </div>
      )}
    </styled.div>
  );
}
