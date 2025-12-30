import type { Preview } from "@storybook/nextjs-vite";
import { Noto_Sans_JP, Noto_Sans_Mono } from "next/font/google";
import { css, cx } from "../styled-system/css";
import "../src/styles/globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-sans-jp",
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-sans-mono",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={cx(
          notoSansJp.variable,
          notoSansMono.variable,
          css({ textStyle: { base: "std-17N-170", md: "std-18N-160" } }),
        )}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
