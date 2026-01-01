import { css } from "styled-system/css";
import type { ComponentProps } from "styled-system/types";
import { Link } from "@/components/link";
import { title } from "@/data/site-metadata";

export function SidebarTitle({
  href = "/",
  children = title,
  ...rest
}: ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={css({
        alignSelf: "center",
        width: 48,
        color: "inherit",
        textStyle: "std-20B-150",
        my: 2,
        textDecoration: "none",
      })}
      {...rest}
    >
      {children}
    </Link>
  );
}
