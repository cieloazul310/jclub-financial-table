/**
 * reference:
 * https://zenn.dev/kiwichan101kg/articles/5023bb8288f720
 */
import ogs from "open-graph-scraper";

export async function getOgp(url: string) {
  try {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.DISABLE_OGP_FETCH === "true"
    )
      return null;

    const { result } = await ogs({ url });
    return result;
  } catch (error) {
    console.warn("Error fetching OGP:", url);
    return null;
  }
}
