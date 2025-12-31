import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { getAllClubs, type SortableKeys } from "@cieloazul310/jclub-financial";
import type { Tab, Category } from "@/utils/types";

export type TableState = {
  tab: Tab;
  sortKey: SortableKeys;
  sortAsc: boolean;
  visibleCategories: Category[];
  visibleClubs: string[];
  visibleYears: [number, number];
  cardMode: boolean;
};

export type TableActions = {
  setTab: (tab: Tab) => void;
  setSortKey: (sortKey: SortableKeys) => void;
  toggleSort: () => void;
  toggleVisibleCategory: (category: Category) => void;
  toggleVisibleClub: (club: string) => void;
  setVisibleYearFrom: (year: number) => void;
  setVisibleYearTo: (year: number) => void;
  toggleCardMode: () => void;
};

export type TableStore = TableState & TableActions;

export const defaultInitState: TableState = {
  tab: "pl",
  sortKey: "revenue",
  sortAsc: false,
  visibleCategories: ["J1", "J2", "J3", "others"],
  visibleClubs: getAllClubs().map(({ slug }) => slug),
  visibleYears: [2005, 2024],
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
        toggleVisibleCategory: (category) =>
          set((prevState) => ({
            visibleCategories: prevState.visibleCategories.includes(category)
              ? prevState.visibleCategories.filter(
                  (prevCategory) => prevCategory !== category,
                )
              : [...prevState.visibleCategories, category],
          })),
        toggleVisibleClub: (club) =>
          set((prevState) => ({
            visibleClubs: prevState.visibleClubs.includes(club)
              ? prevState.visibleClubs.filter((prevClub) => prevClub !== club)
              : [...prevState.visibleClubs, club],
          })),
        setVisibleYearFrom: (year) =>
          set((prevState) => ({
            visibleYears: [year, prevState.visibleYears[1]],
          })),
        setVisibleYearTo: (year) =>
          set((prevState) => ({
            visibleYears: [prevState.visibleYears[0], year],
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
