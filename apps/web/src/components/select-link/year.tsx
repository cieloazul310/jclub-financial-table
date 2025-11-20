import { Field } from "@/components/ui/field";
import { getAllYears } from "@/utils/all-years";
import { YearLinkClient } from "./year-client";

export async function YearLink() {
  const years = await getAllYears();

  return (
    <Field.Root>
      <Field.Label>年度別経営情報</Field.Label>
      <YearLinkClient years={years} />
    </Field.Root>
  );
}
