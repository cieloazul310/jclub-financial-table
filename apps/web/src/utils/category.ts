import type { JsxStyleProps } from "styled-system/types";
import type { Category } from "./types";

export const AllCategories = ["J1", "J2", "J3", "others"] as const;

export function isJClub(
  category: string,
): category is Exclude<Category, "others"> {
  return ["J1", "J2", "J3"].includes(category);
}

export function normalizeCategory(category: string): Category {
  if (isJClub(category)) return category;
  return "others";
}

export const catgoryColorMap: {
  [key in Category]: JsxStyleProps["colorPalette"];
} = {
  J1: "red",
  J2: "green",
  J3: "blue",
  others: "solid-gray",
};

export function categoryToColor(category: string) {
  if (category === "J1") return "red";
  if (category === "J2") return "green";
  if (category === "J3") return "blue";
  return "solid-gray";
}
