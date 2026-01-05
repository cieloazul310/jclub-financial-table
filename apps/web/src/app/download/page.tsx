import { Suspense } from "react";
import { getAllClubs } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { Loading } from "@/components/loading";
import { DownloadClient } from "@/components/download/client";
import { DownloadStoreProvider } from "@/providers/download-store-provider";
import type { Dataset } from "@/components/download/utils/types";

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

  return (
    <Suspense fallback={<Loading />}>
      <DownloadStoreProvider>
        <DownloadClient dataset={dataset} />
      </DownloadStoreProvider>
    </Suspense>
  );
}
