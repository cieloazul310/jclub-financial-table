import { FileIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { type LinkProps as LinkBaseProps } from "@/components/ui/link";
import { ChipLabel } from "@/components/ui/chip-label";
import { isInternal } from "@/utils/is-internal";
import { PanelLinkBase } from "./base";
import { OGImage } from "./ogimage";
import { ImagePlaceholder } from "./image-placeholder";

export async function PanelLink({
  children,
  href,
  ...props
}: Pick<LinkBaseProps, "href"> & Card.RootProps) {
  if (!href) return null;
  const internal = isInternal(href);
  const image = (
    <OGImage
      href={href}
      fallback={<ImagePlaceholder href={href} internal={internal} />}
    />
  );
  const isPdf = /\.[pP][dD][fF]$/.test(href);
  const imageOverlay = isPdf && (
    <ChipLabel position="absolute" top={2} right={2} variant="ghost">
      <FileIcon />
      PDF
    </ChipLabel>
  );

  const footerText = !internal && new URL(href).hostname;

  return (
    <PanelLinkBase
      href={href}
      image={image}
      imageOverlay={imageOverlay}
      footerText={footerText}
      {...props}
    >
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
