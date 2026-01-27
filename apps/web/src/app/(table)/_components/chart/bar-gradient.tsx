import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";

export function BarGradient() {
  const commonGray = css({ stopColor: "{colors.solid-gray.300}" });
  return (
    <defs>
      <linearGradient id="j1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" className={commonGray} />
        <stop offset="70%" className={commonGray} />
        <stop
          offset="100%"
          className={css({ stopColor: "{colors.red.500}" })}
        />
      </linearGradient>
      <linearGradient id="j2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" className={commonGray} />
        <stop offset="70%" className={commonGray} />
        <stop
          offset="100%"
          className={css({ stopColor: "{colors.green.500}" })}
        />
      </linearGradient>
      <linearGradient id="j3" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" className={commonGray} />
        <stop offset="70%" className={commonGray} />
        <stop
          offset="100%"
          className={css({ stopColor: "{colors.blue.500}" })}
        />
      </linearGradient>
    </defs>
  );
}

export function categoryBarFill({
  category,
}: Pick<FinancialDatum, "category">) {
  if (category === "J1") return "url(#j1)";
  if (category === "J2") return "url(#j2)";
  if (category === "J3") return "url(#j3)";
  return "currentColor";
}
