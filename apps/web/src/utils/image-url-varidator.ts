/**
 * @see
 * https://github.com/BhanukaUOM/Image-URL-Validator/blob/master/index.js
 */

export async function isImageURL(url: string | URL | null): Promise<boolean> {
  if (!url) return false;

  try {
    // Check for URL Pathname Exists
    const parsedURL = new URL(url);
    const { pathname } = parsedURL;
    if (!pathname) return false;

    const request = new Request(parsedURL, {
      method: "HEAD",
    });

    return fetch(request)
      .then((response) => {
        if (!response.ok) return false;

        if (!(response.status >= 200 && response.status < 300)) return false;
        const { headers } = response;
        const contentType = headers.get("content-type");
        return contentType?.search(/^image\//) !== -1;
      })
      .catch((err) => {
        return false;
      });
  } catch (e) {
    return false;
  }
}
