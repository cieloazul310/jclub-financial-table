import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { getAllClubs, type SortableKeys } from "@cieloazul310/jclub-financial";
import type { Category } from "@/utils/types";

export type SeriesState = {
  currentField: SortableKeys;
  sortYear: number;
  sortAsc: boolean;
  visibleCategories: Category[];
  visibleClubs: string[];
  visibleYears: [number, number];
};

export type SeriesActions = {
  setField: (field: SortableKeys) => void;
  setSortYear: (year: number) => void;
  toggleSort: () => void;
  toggleVisibleCategory: (category: Category) => void;
  toggleVisibleClub: (club: string) => void;
  setVisibleYearFrom: (year: number) => void;
  setVisibleYearTo: (year: number) => void;
};

export type SeriesStore = SeriesState & SeriesActions;

export const defaultInitState: SeriesState = {
  currentField: "revenue",
  sortYear: 2024,
  sortAsc: false,
  visibleCategories: ["J1", "J2", "J3", "others"],
  visibleClubs: getAllClubs().map(({ slug }) => slug),
  visibleYears: [2005, 2024],
};

export const createSeriesStore = (initState: SeriesState = defaultInitState) =>
  createStore<SeriesStore>()(
    persist(
      (set) => ({
        ...initState,
        setField: (field: SortableKeys) => set(() => ({ currentField: field })),
        setSortYear: (year: number) => set(() => ({ sortYear: year })),
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
      }),
      {
        name: "series-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
