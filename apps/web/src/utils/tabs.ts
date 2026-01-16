import { useTabsContext } from "@/components/ui/tabs";
import type { Tab } from "./types";

export function valueIsTab(value: string): value is Tab {
  return ["pl", "bs", "revenue", "expense", "attd"].some(
    (item) => item === value,
  );
}

export function valueToTab(value: string | null): Tab {
  if (!value) return "pl";
  if (valueIsTab(value)) return value;
  return "pl";
}

export function useTab() {
  const { value } = useTabsContext();
  return valueToTab(value);
}
