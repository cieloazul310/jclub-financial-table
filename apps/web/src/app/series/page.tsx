import { Suspense } from "react";
import { getAllClubs, getAllYears } from "@cieloazul310/jclub-financial";
import { getDataByClub } from "@cieloazul310/jclub-financial/data";
import { SeriesClient } from "@/components/series/client";
import { Loading } from "@/components/loading";
import { SeriesStoreProvider } from "@/providers/series-store-provider";

export default async function Page() {
  const allClubs = getAllClubs();
  const allYears = getAllYears();
  const allDataset = allClubs.map(
    async ({ slug, category, name, short_name }) => {
      const data = await getDataByClub(slug);

      return {
        slug,
        category,
        name,
        short_name,
        data: allYears.map(({ year }) => {
          const datum = data.find((d) => d.year === year);
          return datum ?? null;
        }),
      };
    },
  );
  const dataset = await Promise.all(allDataset);

  return (
    <Suspense fallback={<Loading />}>
      <SeriesStoreProvider>
        <SeriesClient dataset={dataset} />
      </SeriesStoreProvider>
    </Suspense>
  );
}
