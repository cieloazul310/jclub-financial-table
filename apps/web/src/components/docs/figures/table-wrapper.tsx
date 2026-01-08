import { styled, type HTMLStyledProps } from "styled-system/jsx";

export function TableWrapper({
  position = "relative",
  maxWidth = "full",
  overflowX = "auto",
  ...rest
}: HTMLStyledProps<"div">) {
  const props = { position, maxWidth, overflowX, ...rest };
  return <styled.div {...props} />;
}
