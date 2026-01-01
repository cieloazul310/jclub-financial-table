import type { JsxStyleProps } from "styled-system/types";
import type { Category } from "./types";

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
