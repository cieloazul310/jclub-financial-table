import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getAllClubs,
  AllPLFields,
  type FinancialDatumFields,
} from "@cieloazul310/jclub-financial";
import { AllCategories } from "@/utils/category";
import type { Category } from "@/utils/types";

export type DownloadState = {
  visibleFields: FinancialDatumFields[];
  visibleCategories: Category[];
  visibleClubs: string[];
  visibleYears: number[];

  dataFormat: "json" | "csv";
  groupBy: "none" | "club" | "year";

  convertFieldLabel: boolean;
};

export type DownloadFilterState = Pick<
  DownloadState,
  "visibleCategories" | "visibleClubs" | "visibleFields" | "visibleYears"
>;

export type DownloadFormatState = Pick<DownloadState, "dataFormat" | "groupBy">;

export type DownloadActions = {
  set: <K extends keyof DownloadFilterState>(
    key: K,
    values: DownloadFilterState[K],
  ) => void;
  remove: <K extends keyof DownloadFilterState>(
    key: K,
    values: DownloadFilterState[K],
  ) => void;
  toggle: <K extends keyof DownloadFilterState>(
    key: K,
    value: DownloadFilterState[K][number],
  ) => void;

  setFormat: <K extends keyof DownloadFormatState>(
    key: K,
    value: DownloadFormatState[K],
  ) => void;

  toggleConvertFieldLabel: () => void;
};

export type DownloadStore = DownloadState & DownloadActions;

export const defaultInitState: DownloadState = {
  visibleFields: ["name", "slug", "year", "category", ...AllPLFields],
  visibleCategories: [...AllCategories],
  visibleClubs: getAllClubs().map(({ slug }) => slug),
  visibleYears: [2024],

  dataFormat: "json",
  groupBy: "none",

  convertFieldLabel: true,
};

export const createDownloadStore = (
  initState: DownloadState = defaultInitState,
) =>
  createStore<DownloadStore>()(
    persist(
      (set) => ({
        ...initState,
        set: (key, values) =>
          set((prevState) => ({
            [key]: Array.from(new Set([...prevState[key], ...values])),
          })),
        remove: (key, values) =>
          set((prevState) => ({
            [key]: prevState[key].filter(
              (prevItem) => !values.some((value) => value === prevItem),
            ),
          })),
        toggle: (key, value) =>
          set((prevState) => {
            if (prevState[key].some((item) => item === value)) {
              return {
                [key]: prevState[key].filter((item) => item !== value),
              };
            }
            return {
              [key]: [...prevState[key], value],
            };
          }),

        setFormat: (key, value) =>
          set(() => ({
            [key]: value,
          })),

        toggleConvertFieldLabel: () =>
          set((prevState) => ({
            convertFieldLabel: !prevState.convertFieldLabel,
          })),
      }),
      {
        name: "download-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
