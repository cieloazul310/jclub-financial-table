"use client";

import {
  createContext,
  useRef,
  useContext,
  type PropsWithChildren,
} from "react";
import { useStore, type StoreApi } from "zustand";

import { createSeriesStore, type SeriesStore } from "@/stores/series-store";

export const SeriesStoreContext = createContext<StoreApi<SeriesStore> | null>(
  null,
);

export type SeriesStoreProviderProps = PropsWithChildren;

export function SeriesStoreProvider({ children }: SeriesStoreProviderProps) {
  const storeRef = useRef<StoreApi<SeriesStore>>(createSeriesStore());
  /*
  const storeRef = useRef<StoreApi<SeriesStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createSeriesStore();
  }
  */

  return (
    <SeriesStoreContext.Provider value={storeRef.current}>
      {children}
    </SeriesStoreContext.Provider>
  );
}

export const useSeriesStore = <T,>(selector: (store: SeriesStore) => T): T => {
  const seriesStoreContext = useContext(SeriesStoreContext);

  if (!seriesStoreContext) {
    throw new Error(`useCounterStore must be use within SeriesStoreProvider`);
  }

  return useStore(seriesStoreContext, selector);
};
