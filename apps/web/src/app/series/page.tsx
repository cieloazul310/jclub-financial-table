import type { Metadata } from "next";
import { getAllClubs, getAllYears } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { SeriesClient } from "@/components/series/client";
import { siteUrl, title as siteName } from "@/data/site-metadata";

export const metadata: Metadata = {
  title: "項目別表示",
  openGraph: {
    title: "項目別表示",
    images: "/ogp.png",
    url: siteUrl,
    siteName,
  },
  twitter: {
    title: "項目別表示",
  },
};

export default async function Page() {
  const allClubs = getAllClubs();
  const allYears = getAllYears();
  const allDataset = allClubs.map(
    async ({ id, category, name, short_name }) => {
      const data = await getDataByClub(id);

      return {
        id,
        category,
        name,
        short_name,
        data: allYears.map(({ year }) => {
          const datum = data.find((d) => d.year === year) ?? null;
          return {
            year,
            datum,
          };
        }),
      };
    },
  );
  const dataset = await Promise.all(allDataset);

  return <SeriesClient dataset={dataset} />;
}
