import { cx, css } from "styled-system/css";

export const valueStyle = (
  {
    strong,
    emphasized,
    red,
  }: {
    strong?: boolean;
    emphasized?: boolean;
    centerize?: boolean;
    red?: boolean;
  } = {
    strong: false,
    emphasized: false,
    centerize: false,
    red: false,
  },
) =>
  cx(
    css({
      borderRightWidth: "1px",
      borderColor: "solid-gray.200",
    }),
    strong && css({ fontWeight: "bold" }),
    emphasized && css({ bg: "solid-gray.50/80", fontWeight: "bold" }),
    red ? css({ color: "red.900" }) : undefined,
  );

export const stickyStyle = css({
  position: "sticky",
  left: 0,
  zIndex: 1,
});
