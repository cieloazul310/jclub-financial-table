import type { ReactNode } from "react";
import Image from "next/image";
import type { LinkProps } from "@/components/ui/link";
import { isInternal } from "@/utils/is-internal";
import { getOgp } from "@/utils/get-ogp";
import { isImageURL } from "@/utils/image-url-varidator";

export async function OGImage({
  href,
  fallback = null,
}: {
  href: NonNullable<LinkProps["href"]>;
  fallback?: ReactNode;
}) {
  const internal = isInternal(href);
  if (internal) return fallback;

  const ogp = await getOgp(href);
  if (!ogp?.ogImage) return fallback;
  const promises = ogp.ogImage.map(async (imageObject) =>
    (await isImageURL(imageObject.url)) ? imageObject : null,
  );
  const results = await Promise.all(promises);
  const image = results.find((imageObject) => imageObject !== null);
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
