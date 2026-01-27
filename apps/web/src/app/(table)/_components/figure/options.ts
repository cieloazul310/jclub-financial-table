import type { Tab } from "@/utils/types";

export const options: { id: Tab; label: string }[] = [
  { id: "pl", label: "損益計算書" },
  { id: "bs", label: "貸借対照表" },
  { id: "revenue", label: "営業収入" },
  { id: "expense", label: "営業費用" },
  { id: "attd", label: "入場者数" },
];
