"use client";

import type { PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { useTabs, Tabs } from "@/components/ui/tabs";
import { valueToTab } from "@/utils/tabs";
import type { Tab } from "@/utils/types";

const getInitialTab = (): Tab => {
  if (typeof window === "undefined") return "pl";

  const urlTab = new URLSearchParams(window.location.search).get("tab");
  if (urlTab && ["pl", "bs", "revenue", "expense", "attd"].includes(urlTab)) {
    return urlTab as Tab;
  }

  const storedTab = sessionStorage.getItem("tab");
  if (
    storedTab &&
    ["pl", "bs", "revenue", "expense", "attd"].includes(storedTab)
  ) {
    return storedTab as Tab;
  }

  return "pl";
};

export function TabsProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState<Tab>("pl");

  useEffect(() => {
    setValue(getInitialTab());
  }, []);

  const handleValueChange = (details: Tabs.ValueChangeDetails) => {
    const newValue = valueToTab(details.value);
    setValue(newValue);
    sessionStorage.setItem("tab", newValue);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(window.location.search);
      params.set("tab", newValue);

      url.search = params.toString();
      window.history.pushState(null, "", url.toString());
    }
  };

  const tabs = useTabs({ value, onValueChange: handleValueChange });

  return <Tabs.RootProvider value={tabs}>{children}</Tabs.RootProvider>;
}
