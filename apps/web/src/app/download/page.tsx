import { Suspense } from "react";
import { getAllClubs } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { Loading } from "@/components/loading";
import { DownloadClient } from "@/components/download/client";

export default async function Page() {
  const allClubs = getAllClubs();
  const allDataset = allClubs.map(async ({ slug, ...clubInfo }) => {
    const data = await getDataByClub(slug);

    return {
      slug,
      ...clubInfo,
      data,
    };
  });
  const dataset = await Promise.all(allDataset);

  return (
    <Suspense fallback={<Loading />}>
      <DownloadClient dataset={dataset} />
    </Suspense>
  );
}
