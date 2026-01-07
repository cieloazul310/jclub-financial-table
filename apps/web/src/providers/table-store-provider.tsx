"use client";

import {
  createContext,
  useRef,
  useContext,
  type PropsWithChildren,
} from "react";
import { useStore, type StoreApi } from "zustand";

import {
  defaultInitState,
  createTableStore,
  type TableStore,
} from "@/stores/table-store";

export const TableStoreContext = createContext<StoreApi<TableStore> | null>(
  null,
);

export type TableStoreProviderProps = PropsWithChildren;

export function TableStoreProvider({ children }: TableStoreProviderProps) {
  const initialState = {
    ...defaultInitState,
    cardMode: true,
  };

  const storeRef = useRef<StoreApi<TableStore>>(createTableStore());
  /*
  const storeRef = useRef<StoreApi<TableStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createTableStore();
  }
  */

  return (
    <TableStoreContext.Provider value={storeRef.current}>
      {children}
    </TableStoreContext.Provider>
  );
}

export const useTableStore = <T,>(selector: (store: TableStore) => T): T => {
  const tableStoreContext = useContext(TableStoreContext);

  if (!tableStoreContext) {
    throw new Error(`useCounterStore must be use within TableStoreProvider`);
  }

  return useStore(tableStoreContext, selector);
};
