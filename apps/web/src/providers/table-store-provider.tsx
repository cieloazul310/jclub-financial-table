"use client";

import {
  createContext,
  useRef,
  useContext,
  useLayoutEffect,
  type PropsWithChildren,
} from "react";
import { useStore, type StoreApi } from "zustand";

import {
  defaultInitState,
  createTableStore,
  type TableStore,
} from "@/stores/table-store";
import { useWindowSize } from "@/utils/use-window-resize";

export const TableStoreContext = createContext<StoreApi<TableStore> | null>(
  null,
);

export type TableStoreProviderProps = PropsWithChildren;

export function TableStoreProvider({ children }: TableStoreProviderProps) {
  const { windowWidth } = useWindowSize();

  // SSR時はモバイルファースト（cardMode: true）でレンダリング
  // ハイドレーション後、useLayoutEffect で正確な値に更新
  const storeRef = useRef<StoreApi<TableStore>>(
    createTableStore({
      ...defaultInitState,
      cardMode: windowWidth === undefined ? true : windowWidth < 600,
    }),
  );

  // ペイント前に state を同期更新（ユーザーに見えない）
  useLayoutEffect(() => {
    if (windowWidth !== undefined) {
      storeRef.current.setState({ cardMode: windowWidth < 600 });
    }
  }, [windowWidth]);

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
