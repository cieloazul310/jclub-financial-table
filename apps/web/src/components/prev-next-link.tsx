import type { ReactNode } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";
import { Button } from "@/components/ui/button";

export function PrevNextLink({
  left,
  right,
  display = "grid",
  gridTemplateColumns = { base: "1fr", sm: "repeat(2, 1fr)" },
  gap = { base: 2, sm: 4 },
  ...rest
}: {
  left?: {
    title?: ReactNode;
    href?: NextLinkProps["href"];
  };
  right?: {
    title?: ReactNode;
    href?: NextLinkProps["href"];
  };
} & Omit<ComponentProps<typeof styled.nav>, "children" | "left" | "right">) {
  const props = { display, gridTemplateColumns, gap, ...rest };

  return (
    <styled.nav {...props}>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "start",
        })}
      >
        {left?.title && left?.href && (
          <Button
            size="lg"
            variant="outline"
            width="full"
            justifyContent="start"
            alignItems="center"
            textAlign="left"
            asChild
          >
            <NextLink href={left.href}>
              <ChevronLeft />
              {left.title}
            </NextLink>
          </Button>
        )}
      </div>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "end",
        })}
      >
        {right?.title && right?.href && (
          <Button
            size="lg"
            variant="outline"
            width="full"
            justifyContent="end"
            alignItems="center"
            textAlign="left"
            asChild
          >
            <NextLink href={right.href}>
              {right.title}
              <ChevronRight />
            </NextLink>
          </Button>
        )}
      </div>
    </styled.nav>
  );
}
