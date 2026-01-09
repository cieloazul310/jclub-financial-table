import { defineSlotRecipe } from "@pandacss/dev";

function createBeakpointStyle(breakpoint: "sm" | "md" | "lg" | "xl" | "2xl") {
  return {
    root: {
      pt: { base: "{sizes.header-height}", [breakpoint]: 0 },
    },
    header: {
      display: { base: "block", [breakpoint]: "none" },
    },
    grid: {
      gridTemplateAreas: `
            "sidebar main"
            "sidebar footer"
          `,
      gridTemplateColumns: {
        base: "0 1fr",
        [breakpoint]: "{sizes.sidebar-width} minmax(0, 1fr)",
      },
    },
    sidebar: {
      display: { base: "none", [breakpoint]: "flex" },
      borderRightWidth: { base: 0, [breakpoint]: "1px" },
    },
  };
}

export const layout = defineSlotRecipe({
  className: "layout",
  slots: ["root", "header", "grid", "sidebar", "main", "content", "footer"],
  base: {
    root: {
      minHeight: "screen",
    },
    header: {
      /**
       * fixed top-0 z-10 w-full bg-white/85 lg:hidden
       */
      position: "fixed",
      top: 0,
      zIndex: "docked",
      width: "full",
      height: "header-height",
      bg: "white/85",
      backdropFilter: "blur(4px)",
      borderBottomWidth: "1px",
      borderColor: "solid-gray.420",
    },
    grid: {
      display: "grid",
      gridTemplateRows: "1fr auto",
      minHeight: "calc(100vh - {sizes.header-height})",
    },
    sidebar: {
      gridArea: "sidebar",
      flexDirection: "column",
      pt: 10,
      position: "fixed",
      borderRightColor: "solid-gray.420",
      overflowY: "auto",
      overscrollBehaviorY: "contain",
      gap: 10,
      height: "full",
      width: "sidebar-width",
      pb: 16,
    },
    main: {
      gridArea: "main",
      minWidth: "0",
    },
    content: {
      mx: "auto",
      px: { base: 4, md: 8 },
      textStyle: { base: "std-17N-170", md: "std-18N-160" },
      boxSizing: "content-box",
    },
    footer: {
      /**
       * [grid-area:footer] [&>div]:max-w-[--home-main-width] mb-6 mt-16 md:mb-10 md:mt-20
       */
      gridArea: "footer",
      mb: { base: 6, md: 10 },
      mt: { base: 16, md: 20 },
      "& > div": {
        maxWidth: "common-main-width",
      },
    },
  },
  variants: {
    breakpoint: {
      md: createBeakpointStyle("md"),
      lg: createBeakpointStyle("lg"),
      xl: createBeakpointStyle("xl"),
      "2xl": createBeakpointStyle("2xl"),
      none: {
        grid: {
          gridTemplateAreas: `
            "main"
            "footer"
          `,
          gridTemplateColumns: "1fr",
        },
        sidebar: {
          display: "none",
          borderRightWidth: 0,
        },
        main: {
          pt: "{sizes.header-height}",
        },
      },
    },
    headerAlways: {
      false: {
        sidebar: {
          top: 0,
        },
      },
      true: {
        sidebar: {
          top: "{sizes.header-height}",
        },
      },
    },
    contentWidth: {
      auto: {
        content: {
          maxWidth: "common-main-width",
        },
      },
      full: {
        content: {
          maxWidth: "full",
        },
      },
    },
    disableContentGutter: {
      false: {
        content: {
          px: { base: 4, md: 8 },
        },
      },
      true: {
        content: {
          px: 0,
        },
      },
    },
  },
  compoundVariants: [
    {
      breakpoint: ["md", "lg", "xl", "2xl"],
      headerAlways: true,
      css: {
        root: {
          pt: "{sizes.header-height}",
        },
        header: {
          display: "block",
        },
      },
    },
  ],
  defaultVariants: {
    breakpoint: "lg",
    headerAlways: false,
    contentWidth: "auto",
    disableContentGutter: false,
  },
});
