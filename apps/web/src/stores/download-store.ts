/*
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getAllClubs,
  getAllYears,
  AllFields,
  type SortableKeys,
} from "@cieloazul310/jclub-financial";
import { AllCategories } from "@/utils/category";
import type { Category } from "@/utils/types";

export type DownloadState = {
  visibleFields: (typeof AllFields[number])[];
  visibleCategories: Category[];
  visibleClubs: string[];
  visibleYears: number[];
};

export type DownloadActions = {
  setField: (field: SortableKeys) => void;
  setSortField: (field: SortableKeys) => void;
  setSortYear: (year: number) => void;
  toggleVisibleClub: (club: string) => void;
  setVisibleClubs: (clubs: string[]) => void;
  setInvisibleClubs: (clubs: string[]) => void;
  setVisibleYearFrom: (year: number) => void;
  setVisibleYearTo: (year: number) => void;
};

export type DownloadStore = DownloadState & DownloadActions;

export const defaultInitState: DownloadState = {
  visibleFields: [...AllFields],
  visibleCategories: [...AllCategories],
  visibleClubs: getAllClubs().map(({ slug }) => slug),
  visibleYears: getAllYears().map(({ year }) => year),
};

export const createDownloadStore = (initState: DownloadState = defaultInitState) =>
  createStore<DownloadStore>()(
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
        name: "download-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
*/
