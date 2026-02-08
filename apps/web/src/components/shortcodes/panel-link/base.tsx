import type { ReactNode } from "react";
import { cx, css } from "styled-system/css";
import { Card } from "@/components/ui/card";
import { type LinkProps as LinkBaseProps } from "@/components/ui/link";
import { Link } from "@/components/link";

export async function PanelLinkBase({
  children,
  href,
  image,
  imageOverlay,
  footerText,
  className,
  ...props
}: Pick<LinkBaseProps, "href"> &
  Card.RootProps & {
    image: ReactNode;
    imageOverlay?: ReactNode;
    footerText?: ReactNode;
  }) {
  return (
    <Card.Root
      className={cx("group", className)}
      gridTemplateAreas={{
        base: `"image" "main"`,
        "@/md": `"image main"`,
      }}
      gridTemplateColumns={{
        base: "1fr",
        "@/md": "minmax(auto, 1fr) 1fr",
        "@/xl": "minmax(auto, 2fr) 3fr",
        "@/3xl": "minmax(auto, 1fr) 2fr",
      }}
      orientation={{ base: "vertical", "@/md": "horizontal" }}
      asLink
      {...props}
    >
      <Card.Image aspectRatio={{ base: 16 / 9, "@/md": 1, "@/lg": 16 / 9 }}>
        {image}
        {imageOverlay}
      </Card.Image>
      <Card.Main>
        <Card.Title textStyle={{ base: "std-17B-170", md: "std-18B-160" }}>
          <Link color="inherit" href={href}>
            {children}
          </Link>
        </Card.Title>
        {footerText && (
          <p
            className={css({
              color: "solid-gray.536",
              textStyle: { base: "oln-14N-100" },
            })}
          >
            {footerText}
          </p>
        )}
      </Card.Main>
    </Card.Root>
  );
}
