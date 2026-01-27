"use client";

import {
  AllPLFields,
  AllBSFields,
  AllRevenueFields,
  AllExpenseFields,
  AllAttdFields,
  getLabel,
  type SortableFields,
} from "@cieloazul310/jclub-financial";
import { Field } from "@/components/ui/field";
import { useSeriesStore } from "@/providers/series-store-provider";

const optionGroup = [
  {
    id: "pl",
    label: "損益計算書",
    fields: AllPLFields,
  },
  {
    id: "bs",
    label: "貸借対照表",
    fields: AllBSFields,
  },
  {
    id: "revenue",
    label: "営業収入",
    fields: AllRevenueFields,
  },
  {
    id: "expense",
    label: "営業費用",
    fields: AllExpenseFields,
  },
  {
    id: "attd",
    label: "入場者数",
    fields: AllAttdFields,
  },
];

export function SeriesSelect({ ...props }: Field.RootProps) {
  const { currentField, setField } = useSeriesStore((store) => store);
  const onFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setField(value as SortableFields);
    }
  };

  return (
    <Field.Root {...props}>
      <Field.Label>表示中の項目</Field.Label>
      <Field.Select asChild>
        <select defaultValue={currentField} onChange={onFieldChange}>
          <option value="">項目を選択</option>
          {optionGroup.map(({ id, label, fields }) => (
            <optgroup key={id} label={label}>
              {fields.map((field) => (
                <option key={field} value={field}>
                  {getLabel(field)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field.Select>
    </Field.Root>
  );
}
