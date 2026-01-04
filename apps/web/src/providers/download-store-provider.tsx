"use client";

import {
  createContext,
  useRef,
  useContext,
  type PropsWithChildren,
} from "react";
import { useStore, type StoreApi } from "zustand";

import {
  createDownloadStore,
  type DownloadStore,
} from "@/stores/download-store";

export const DownloadStoreContext =
  createContext<StoreApi<DownloadStore> | null>(null);

export type DownloadStoreProviderProps = PropsWithChildren;

export function DownloadStoreProvider({
  children,
}: DownloadStoreProviderProps) {
  const storeRef = useRef<StoreApi<DownloadStore>>(createDownloadStore());
  /*
  const storeRef = useRef<StoreApi<DownloadStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createDownloadStore();
  }
  */

  return (
    <DownloadStoreContext.Provider value={storeRef.current}>
      {children}
    </DownloadStoreContext.Provider>
  );
}

export const useDownloadStore = <T,>(
  selector: (store: DownloadStore) => T,
): T => {
  const downloadStoreContext = useContext(DownloadStoreContext);

  if (!downloadStoreContext) {
    throw new Error(`useCounterStore must be use within DownloadStoreProvider`);
  }

  return useStore(downloadStoreContext, selector);
};
