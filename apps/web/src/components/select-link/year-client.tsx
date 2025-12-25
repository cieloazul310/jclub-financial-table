"use client";

import { useRouter } from "next/navigation";
import type { YearInfo } from "@cieloazul310/jclub-financial/types";
import { Field } from "@/components/ui/field";

export function YearLinkClient({ years }: { years: YearInfo[] }) {
  const { push } = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      push(`/year/${value}`);
    }
  };

  return (
    <Field.Select asChild>
      <select onChange={onChange}>
        <option value="">年度を選択</option>
        {years.map(({ year }) => (
          <option key={year} value={year.toString()}>
            {year}年度
          </option>
        ))}
      </select>
    </Field.Select>
  );
}
