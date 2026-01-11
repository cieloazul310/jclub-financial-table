import { styled, type HTMLStyledProps } from "styled-system/jsx";

export type TableWrapperProps = HTMLStyledProps<"div">;

export function TableWrapper({
  position = "relative",
  maxWidth = "full",
  overflowX = "auto",
  ...rest
}: TableWrapperProps) {
  const props = { position, maxWidth, overflowX, ...rest };
  return <styled.div {...props} />;
}
