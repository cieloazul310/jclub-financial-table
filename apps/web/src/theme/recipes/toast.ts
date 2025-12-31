import { defineSlotRecipe } from "@pandacss/dev";
import { toastAnatomy } from "@ark-ui/react/anatomy";

export const toast = defineSlotRecipe({
  className: "toast",
  slots: toastAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      height: "var(--height)",
      minWidth: "sm",
      opacity: "var(--opacity)",
      overflowWrap: "anywhere",
      position: "relative",
      scale: "var(--scale)",
      translate: "var(--x) var(--y)",
      width: "full",
      willChange: "translate, opacity, scale",
      transition:
        "translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms",
      transitionTimingFunction: "cubic-bezier(0.21, 1.02, 0.73, 1)",
      _closed: {
        transition: "translate 400ms, scale 400ms, opacity 200ms",
        transitionTimingFunction: "cubic-bezier(0.06, 0.71, 0.55, 1)",
      },
      p: 4,
      rounded: 8,
      bg: "white",
      borderWidth: "1px",
      borderColor: "solid-gray.100",
      shadow: "1",
      textStyle: "std-16N-170",
      zIndex: "toast",
    },
    title: {
      textStyle: "std-17B-170",
    },
    actionTrigger: {
      color: "keyColor.primary",
      cursor: "pointer",
    },
  },
});
