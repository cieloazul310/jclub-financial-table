import { styled } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

export function PostList({
  display = "grid",
  gridTemplateColumns = { base: "1fr", md: "1fr 1fr" },
  gap = { base: 2, md: 4 },
  ...rest
}: ComponentProps<typeof styled.nav>) {
  const props = { display, gridTemplateColumns, gap, ...rest };
  return <styled.nav {...props} />;
}
