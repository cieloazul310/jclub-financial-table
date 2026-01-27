import type { Metadata } from "next";
import { getAllClubs } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { siteUrl, title as siteName } from "@/data/site-metadata";
import { DownloadClient } from "./_components/client";
import type { Dataset } from "./_components/utils/types";

export const metadata: Metadata = {
  title: "データダウンロード",
  openGraph: {
    title: "データダウンロード",
    images: "/ogp.png",
    url: siteUrl,
    siteName,
  },
  twitter: {
    title: "データダウンロード",
  },
};

export default async function Page() {
  const allClubs = getAllClubs();
  const allDataset = allClubs.map(async ({ id, ...clubInfo }) => {
    const data = await getDataByClub(id);

    return {
      id,
      ...clubInfo,
      data,
    };
  });
  const dataset = (await Promise.all(allDataset)) satisfies Dataset[];

  return <DownloadClient dataset={dataset} />;
}
