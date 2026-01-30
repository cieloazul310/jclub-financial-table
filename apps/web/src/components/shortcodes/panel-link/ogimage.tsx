import type { ReactNode } from "react";
import Image from "next/image";
import type { LinkProps } from "@/components/ui/link";
import { isInternal } from "@/utils/is-internal";
import { getOGImage } from "./get-ogimage";

export async function OGImage({
  href,
  fallback = null,
}: {
  href: NonNullable<LinkProps["href"]>;
  fallback?: ReactNode;
}) {
  const internal = isInternal(href);
  if (internal) return fallback;

  const image = await getOGImage(href);

  if (!image) return fallback;

  return (
    <Image
      src={image.url}
      alt={image.alt ?? href}
      width={image.width ?? 320}
      height={image.height ?? 180}
      unoptimized
    />
  );
}
