import Script from "next/script";

/**
 * @see
 * https://mucca-design.com/nextjs-adsense
 */
export function AdScript() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
