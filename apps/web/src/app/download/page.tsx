import { getAllClubs } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { DownloadClient } from "@/components/download/client";
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

  return <DownloadClient dataset={dataset} />;
}
