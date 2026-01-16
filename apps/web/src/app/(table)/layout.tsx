import type { PropsWithChildren } from "react";
import { TableStoreProvider } from "@/providers/table-store-provider";
import { TabsProvider } from "@/providers/tabs-provider";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <TabsProvider>
      <TableStoreProvider>{children}</TableStoreProvider>
    </TabsProvider>
  );
}
