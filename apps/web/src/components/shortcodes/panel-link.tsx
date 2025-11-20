import type { ReactNode } from "react";
import { cx, css } from "styled-system/css";
import { Card } from "@/components/ui/card";
import { type LinkProps as LinkBaseProps } from "@/components/ui/link";
import { isInternal } from "@/utils/is-internal";
import { getOgp } from "@/utils/get-ogp";
import { Link } from "../link";

export async function PanelLinkBase({
  children,
  href,
  image,
  footerText,
  ...props
}: Pick<LinkBaseProps, "href"> &
  Card.RootProps & { image: ReactNode; footerText?: ReactNode }) {
  return (
    <Card.Root
      className={cx(
        "group",
        css({
          gridTemplateAreas: {
            base: `"image" "main"`,
            sm: `"image main"`,
          },
          gridTemplateColumns: {
            base: "1fr",
            sm: "minmax(auto, 180px) 1fr",
            md: "minmax(auto, 260px) 1fr",
          },
        }),
      )}
      orientation={{ base: "vertical", sm: "horizontal" }}
      asLink
      {...props}
    >
      <Card.Image aspectRatio={{ base: 16 / 9, sm: 1, md: 16 / 9 }}>
        {image}
      </Card.Image>
      <Card.Main>
        <Card.Title
          textStyle={{ base: "std-17B-170", md: "std-18B-160" }}
          asChild
        >
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

export async function PanelLink({
  children,
  href,
  ...props
}: Pick<LinkBaseProps, "href"> & Card.RootProps) {
  if (!href) return null;
  const internal = isInternal(href);
  const ogp = !internal ? await getOgp(href) : null;
  const image =
    ogp?.ogImage && ogp.ogImage[0] ? (
      <img src={ogp.ogImage[0].url} alt={ogp?.ogImage[0].alt ?? "ogImage"} />
    ) : (
      <div
        className={css({
          aspectRatio: { base: 16 / 9, sm: 1, md: 16 / 9 },
          bgGradient: "to-tr",
          gradientFrom: "keyColor.200",
          gradientTo: "keyColor.400",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textStyle: "std-20B-150",
          overflow: "hidden",
          color: "white",
          whiteSpace: "nowrap",
        })}
      >
        {internal ? "Jクラブ経営情報ポータル" : new URL(href).hostname}
      </div>
    );
  const footerText = !internal && new URL(href).hostname;

  return (
    <PanelLinkBase href={href} image={image} footerText={footerText} {...props}>
      {children}
    </PanelLinkBase>
  );
}

export async function PanelLinkShorthand({
  title,
  url,
  date,
}: {
  title: string;
  url: string;
  date?: string;
}) {
  return (
    <PanelLink href={url} my={8}>
      {title}
      {date && ` (${date})`}
    </PanelLink>
  );
}
