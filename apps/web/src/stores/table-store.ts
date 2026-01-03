import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { getAllClubs, type SortableKeys } from "@cieloazul310/jclub-financial";
import { AllCategories } from "@/utils/category";
import type { Tab, Category } from "@/utils/types";

export type TableState = {
  tab: Tab;
  sortField: SortableKeys;
  sortAsc: boolean;
  visibleCategories: Category[];
  visibleClubs: string[];
  visibleYears: [number, number];
  cardMode: boolean;
};

export type TableActions = {
  setTab: (tab: Tab) => void;
  setSortKey: (sortField: SortableKeys) => void;
  toggleSort: () => void;
  toggleVisibleCategory: (category: Category) => void;
  toggleVisibleClub: (club: string) => void;
  setVisibleClubs: (clubs: string[]) => void;
  setInvisibleClubs: (clubs: string[]) => void;
  setVisibleYearFrom: (year: number) => void;
  setVisibleYearTo: (year: number) => void;
  toggleCardMode: () => void;
};

export type TableStore = TableState & TableActions;

export const defaultInitState: TableState = {
  tab: "pl",
  sortField: "revenue",
  sortAsc: false,
  visibleCategories: [...AllCategories],
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
        setSortKey: (sortField: SortableKeys) => set(() => ({ sortField })),
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
        setVisibleClubs: (clubs) =>
          set((prevState) => ({
            visibleClubs: Array.from(
              new Set([...prevState.visibleClubs, ...clubs]),
            ),
          })),
        setInvisibleClubs: (clubs) =>
          set((prevState) => ({
            visibleClubs: [...prevState.visibleClubs].filter(
              (club) => !clubs.includes(club),
            ),
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
