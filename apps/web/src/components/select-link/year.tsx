import { getAllYears } from "@cieloazul310/jclub-financial";
import { Field } from "@/components/ui/field";
import { YearLinkClient } from "./year-client";

export function YearLink() {
  const years = getAllYears().sort((a, b) => b.year - a.year);

  return (
    <Field.Root>
      <Field.Label>年度別経営情報</Field.Label>
      <YearLinkClient years={years} />
    </Field.Root>
  );
}
