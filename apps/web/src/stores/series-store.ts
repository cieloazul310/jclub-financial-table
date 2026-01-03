import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { getAllClubs, type SortableKeys } from "@cieloazul310/jclub-financial";

export type SeriesState = {
  currentField: SortableKeys;
  sortField: SortableKeys;
  sortYear: number;
  sortAsc: boolean;
  visibleClubs: string[];
  visibleYears: [number, number];
};

export type SeriesActions = {
  setField: (field: SortableKeys) => void;
  setSortField: (field: SortableKeys) => void;
  setSortYear: (year: number) => void;
  toggleSort: () => void;
  toggleVisibleClub: (club: string) => void;
  setVisibleClubs: (clubs: string[]) => void;
  setInvisibleClubs: (clubs: string[]) => void;
  setVisibleYearFrom: (year: number) => void;
  setVisibleYearTo: (year: number) => void;
};

export type SeriesStore = SeriesState & SeriesActions;

export const defaultInitState: SeriesState = {
  currentField: "revenue",
  sortField: "revenue",
  sortYear: 2024,
  sortAsc: false,
  visibleClubs: getAllClubs().map(({ slug }) => slug),
  visibleYears: [2015, 2024],
};

export const createSeriesStore = (initState: SeriesState = defaultInitState) =>
  createStore<SeriesStore>()(
    persist(
      (set) => ({
        ...initState,
        setField: (field: SortableKeys) => set(() => ({ currentField: field })),
        setSortField: (field: SortableKeys) =>
          set(() => ({ sortField: field })),
        setSortYear: (year: number) => set(() => ({ sortYear: year })),
        toggleSort: () => set((prevState) => ({ sortAsc: !prevState.sortAsc })),
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
      }),
      {
        name: "series-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
