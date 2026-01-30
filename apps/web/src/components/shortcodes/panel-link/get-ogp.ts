/**
 * reference:
 * https://zenn.dev/kiwichan101kg/articles/5023bb8288f720
 */
import ogs from "open-graph-scraper";

export async function getOgp(url: string) {
  try {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.FAST_BUILD === "true"
    )
      return null;

    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36";
    const { result } = await ogs({
      url,
      fetchOptions: { mode: "cors", headers: { "User-Agent": userAgent } },
    });

    return result;
  } catch (error) {
    console.warn("Error fetching OGP:", url);
    return null;
  }
}
