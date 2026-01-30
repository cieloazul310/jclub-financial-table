import type { ImageObject } from "open-graph-scraper/types";
import { getOgp } from "./get-ogp";
import { isImageURL } from "./image-url-validator";

const cache = new Map<string, ImageObject | null>();

function normalizeKey(href: string): string {
  try {
    return new URL(href).href;
  } catch (e) {
    return href;
  }
}

export async function getOGImage(
  href: string,
): Promise<ImageObject | null | undefined> {
  const key = normalizeKey(href);

  if (cache.has(key)) {
    return cache.get(key);
  }

  let ogp = await getOgp(href);

  // ogImageが取得できず、hrefがoriginと異なる場合、originで再度fetch
  let originKey: string | null = null;
  try {
    const origin = new URL(href).origin;
    originKey = origin;
    if (!ogp?.ogImage && key !== origin) {
      ogp = await getOgp(origin);
    }
  } catch (e) {
    originKey = null;
  }

  if (!ogp?.ogImage) {
    // 元のキーと origin があれば両方に null をキャッシュして再試行を防止
    cache.set(key, null);
    if (originKey) cache.set(originKey, null);
    return null;
  }

  let image: ImageObject | null = null;
  for (const imageObject of ogp.ogImage) {
    if (await isImageURL(imageObject.url)) {
      image = imageObject;
      break;
    }
  }

  // 有効な画像が見つかったら元キーと origin をキャッシュする
  cache.set(key, image);
  if (originKey) cache.set(originKey, image);
  return image;
}
