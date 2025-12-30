import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SortableKeys } from "@cieloazul310/jclub-financial";
import type { Tab, Category } from "@/utils/types";

export type TableState = {
  tab: Tab;
  sortKey: SortableKeys;
  sortAsc: boolean;
  filterCategories: Category[];
  filterYears: [number, number];
  cardMode: boolean;
};

export type TableActions = {
  setTab: (tab: Tab) => void;
  setSortKey: (sortKey: SortableKeys) => void;
  toggleSort: () => void;
  toggleFilterCategory: (category: Category) => void;
  setFilterYearFrom: (year: number) => void;
  setFilterYearTo: (year: number) => void;
  toggleCardMode: () => void;
};

export type TableStore = TableState & TableActions;

export const defaultInitState: TableState = {
  tab: "pl",
  sortKey: "revenue",
  sortAsc: false,
  filterCategories: ["J1", "J2", "J3", "others"],
  filterYears: [2005, 2024],
  cardMode: false,
};

export const createTableStore = (initState: TableState = defaultInitState) =>
  createStore<TableStore>()(
    persist(
      (set) => ({
        ...initState,
        setTab: (tab: Tab) => set(() => ({ tab })),
        setSortKey: (sortKey: SortableKeys) => set(() => ({ sortKey })),
        toggleSort: () => set((prevState) => ({ sortAsc: !prevState.sortAsc })),
        toggleFilterCategory: (category) =>
          set((prevState) => ({
            filterCategories: prevState.filterCategories.includes(category)
              ? prevState.filterCategories.filter(
                  (filterCategory) => filterCategory !== category,
                )
              : [...prevState.filterCategories, category],
          })),
        setFilterYearFrom: (year) =>
          set((prevState) => ({
            filterYears: [year, prevState.filterYears[1]],
          })),
        setFilterYearTo: (year) =>
          set((prevState) => ({
            filterYears: [prevState.filterYears[0], year],
          })),
        toggleCardMode: () =>
          set((prevState) => ({ cardMode: !prevState.cardMode })),
      }),
      {
        name: "table-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
