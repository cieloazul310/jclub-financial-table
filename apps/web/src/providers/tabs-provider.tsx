"use client";

import { useEffect, useSyncExternalStore, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useTabs, Tabs } from "@/components/ui/tabs";
import { valueToTab, valueIsTab } from "@/utils/tabs";
import type { Tab } from "@/utils/types";

const getInitialTab = (isServer: boolean = false): Tab => {
  if (isServer) return "pl";
  const urlTab = new URLSearchParams(window.location.search).get("tab");
  if (urlTab && valueIsTab(urlTab)) {
    return urlTab;
  }

  const storedTab = sessionStorage.getItem("tab");
  if (storedTab && valueIsTab(storedTab)) {
    return storedTab;
  }

  return "pl";
};

function useInitialTab() {
  const initialTab = useSyncExternalStore(
    () => () => {},
    () => getInitialTab(),
    () => getInitialTab(true),
  );
  return initialTab;
}

export function TabsProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const initialTab = useInitialTab();

  const tabs = useTabs({
    defaultValue: "pl",
    onValueChange: (details: Tabs.ValueChangeDetails) => {
      const newValue = valueToTab(details.value);
      sessionStorage.setItem("tab", newValue);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(window.location.search);
        params.set("tab", newValue);

        url.search = params.toString();
        window.history.pushState(null, "", url.toString());
      }
    },
  });

  useEffect(() => {
    console.log("useEffect");
    if (tabs.value !== initialTab) {
      console.log("useEffect setValue");
      tabs.setValue(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (typeof window !== "undefined" && initialTab !== "pl") {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(window.location.search);
      params.set("tab", initialTab);

      url.search = params.toString();
      window.history.pushState(null, "", url.toString());
    }
  }, [pathname]);

  return <Tabs.RootProvider value={tabs}>{children}</Tabs.RootProvider>;
}
