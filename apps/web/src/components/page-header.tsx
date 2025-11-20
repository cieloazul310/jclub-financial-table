import type { ReactNode } from "react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { ComponentProps, StyledComponent } from "styled-system/types";

export function PageHeader({
  title,
  children,
  ...props
}: ComponentProps<StyledComponent<"header">> & {
  title: string;
}) {
  return (
    <styled.header {...props}>
      <hgroup
        className={css({
          mt: { base: 4, md: 6, lg: 0 },
          mb: { base: 8, md: 12, lg: 16 },
        })}
      >
        <h1
          className={css({
            textStyle: { base: "std-28B-150", md: "std-45B-140" },
            ml: -0.5,
          })}
        >
          {title}
        </h1>
        {children && (
          <span
            className={css({
              textStyle: { base: "std-18N-160", md: "std-22N-150" },
              my: 4,
            })}
          >
            {children}
          </span>
        )}
      </hgroup>
    </styled.header>
  );
}
