import { defineSlotRecipe } from "@pandacss/dev";
import { tooltipAnatomy } from "@ark-ui/react/anatomy";

export const tooltip = defineSlotRecipe({
  className: "tooltip",
  slots: tooltipAnatomy.keys(),
  base: {
    content: {
      p: 2,
      rounded: 4,
      bg: "white",
      borderWidth: "1px",
      borderColor: "solid-gray.100",
      shadow: "1",
      textStyle: "oln-14B-100",
      maxWidth: "sm",
      zIndex: "tooltip",
    },
  },
});
