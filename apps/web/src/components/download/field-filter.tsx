import {
  AllGeneralFields,
  AllSeasonResultFields,
  AllPLFields,
  AllBSFields,
  AllRevenueFields,
  AllExpenseFields,
  AllAttdFields,
  getLabel,
  type FinancialDatumFields,
} from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Checkbox } from "@/components/ui/checkbox";
import { ActiveChip, InactiveChip } from "@/components/filter/chips";
import { useDownloadStore } from "@/providers/download-store-provider";

const fieldsByTab = [
  {
    id: "general",
    title: "一般",
    items: [...AllGeneralFields],
  },
  {
    id: "season-result",
    title: "競技成績",
    items: [...AllSeasonResultFields],
  },
  {
    id: "pl",
    title: "損益計算書(P/L)",
    items: [...AllPLFields],
  },
  {
    id: "bs",
    title: "貸借対照表(B/S)",
    items: [...AllBSFields].filter((field) => field !== "profit"),
  },
  {
    id: "revenue",
    title: "営業収入",
    items: [...AllRevenueFields].filter(
      (field) => field !== "revenue" && field !== "related_revenue",
    ),
  },
  {
    id: "expense",
    title: "営業費用",
    items: [...AllExpenseFields].filter((field) => field !== "expense"),
  },
  {
    id: "attd",
    title: "入場者数",
    items: [...AllAttdFields].filter((field) => field !== "ticket"),
  },
];

export function FieldFilter({
  display = "grid",
  gridTemplateColumns = "1fr",
  gap = 4,
  chipClassName = css({
    minHeight: "unset",
    py: 0.5,
    textStyle: "oln-14B-100",
  }),
  ...rest
}: HTMLStyledProps<"div"> & {
  chipClassName?: string;
}) {
  const props = { display, gridTemplateColumns, gap, ...rest };
  const { visibleFields, set, remove, toggle } = useDownloadStore(
    (store) => store,
  );
  const onItemClick = (item: FinancialDatumFields) => () => {
    toggle("visibleFields", item);
  };
  const selectedFields = (items: FinancialDatumFields[]) => {
    return items.filter((item) => visibleFields.includes(item));
  };
  const onCheckedChange = (items: FinancialDatumFields[]) => () => {
    const selected = selectedFields(items);
    if (selected.length === items.length) {
      remove("visibleFields", items);
    } else {
      set("visibleFields", items);
    }
  };

  return (
    <styled.div {...props}>
      {fieldsByTab.map(({ id, title, items }) => (
        <section key={id}>
          <Checkbox.Root
            checked={
              selectedFields(items).length === items.length
                ? true
                : selectedFields(items).length === 0
                  ? false
                  : "indeterminate"
            }
            onCheckedChange={onCheckedChange(items)}
          >
            <Checkbox.Control>
              <Checkbox.Indicator />
              <Checkbox.Indicator indeterminate />
            </Checkbox.Control>
            <Checkbox.HiddenInput />
            <Checkbox.Label>{title}</Checkbox.Label>
          </Checkbox.Root>
          <div
            className={css({
              display: "inline-flex",
              gap: 1,
              flexWrap: "wrap",
            })}
          >
            {items.map((item) =>
              visibleFields.includes(item) ? (
                <ActiveChip
                  key={item}
                  className={chipClassName}
                  onClick={onItemClick(item)}
                >
                  {getLabel(item)}
                </ActiveChip>
              ) : (
                <InactiveChip
                  key={item}
                  className={chipClassName}
                  onClick={onItemClick(item)}
                >
                  {getLabel(item)}
                </InactiveChip>
              ),
            )}
          </div>
        </section>
      ))}
    </styled.div>
  );
}
