import { useTabsContext } from "@/components/ui/tabs";
import { allTabs } from "@/data/tab";
import type { Tab } from "./types";

export function valueIsTab(value: string): value is Tab {
  return allTabs.some((item) => item === value);
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
