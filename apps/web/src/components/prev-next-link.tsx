import type { ReactNode } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { HTMLStyledProps } from "styled-system/types";
import { Button } from "@/components/ui/button";

export function PrevNextLink({
  leftSlot,
  rightSlot,
  display = "grid",
  gridTemplateColumns = { base: "1fr", sm: "repeat(2, 1fr)" },
  gap = { base: 2, sm: 4 },
  ...rest
}: {
  leftSlot?: {
    title?: ReactNode;
    href?: NextLinkProps["href"];
  } | null;
  rightSlot?: {
    title?: ReactNode;
    href?: NextLinkProps["href"];
  } | null;
} & Omit<HTMLStyledProps<"nav">, "children">) {
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
        {leftSlot?.title && leftSlot?.href && (
          <Button
            size="lg"
            variant="outline"
            width="full"
            justifyContent="start"
            alignItems="center"
            textAlign="left"
            asChild
          >
            <NextLink href={leftSlot.href}>
              <ChevronLeft />
              {leftSlot.title}
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
        {rightSlot?.title && rightSlot?.href && (
          <Button
            size="lg"
            variant="outline"
            width="full"
            justifyContent="end"
            alignItems="center"
            textAlign="left"
            asChild
          >
            <NextLink href={rightSlot.href}>
              {rightSlot.title}
              <ChevronRight />
            </NextLink>
          </Button>
        )}
      </div>
    </styled.nav>
  );
}
