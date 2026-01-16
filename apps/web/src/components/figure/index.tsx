import { Suspense } from "react";
import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial/types";
import { css } from "styled-system/css";
import { Loading } from "@/components/loading";
import type { Mode } from "@/utils/types";
import { FigureMain } from "./main";
import { Toolbar } from "./toolbar";

export function Figure({
  data,
  mode,
}: {
  data: ExtendedFinancialDatum[];
  mode: Mode;
}) {
  return (
    <div
      className={css({
        mx: "auto",
        maxWidth: "breakpoint-2xl",
        width: "full",
        px: { base: 4, md: 8 },
      })}
    >
      <Toolbar mode={mode} />
      <Suspense fallback={<Loading />}>
        <FigureMain mode={mode} data={data} />
      </Suspense>
    </div>
  );
}
