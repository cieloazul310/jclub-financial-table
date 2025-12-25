import { css } from "styled-system/css";
import { title } from "@/data/site-metadata";
import { Link } from "../link";

export function Footer() {
  return (
    <footer
      className={css({
        /**
         * [grid-area:footer] [&>div]:max-w-[--home-main-width] mb-6 mt-16 md:mb-10 md:mt-20
         */
        gridArea: "footer",
        mb: { base: 6, md: 10 },
        mt: { base: 16, md: 20 },
        "& > div": {
          maxWidth: "common-main-width",
        },
      })}
    >
      <div
        className={css({
          /**
           * mx-auto box-content md:px-[--content-padding]
           */
          mx: "auto",
          px: { base: 4, md: 8 },
          boxSizing: "content-box",
        })}
      >
        <div
          className={css({
            /**
             * flex flex-col gap-8 md:flex-row md:items-center md:gap-20 lg:gap-16 xl:gap-24
             */
            display: "flex",
            flexDirection: { base: "column", md: "row" },
            alignItems: { base: "initial", md: "center" },
            gap: { base: 8, md: 20, lg: 16, xl: 24 },
          })}
        >
          <Link
            href="/"
            className={css({
              /**
               * w-fit text-std-20B-150 md:p-1.5
               */
              color: "inherit",
              width: "fit-content",
              textStyle: "std-20B-150",
              p: { base: 0, md: 1.5 },
            })}
          >
            {title}
          </Link>
          <ul
            className={css({
              /**
               * flex flex-col gap-4 md:flex-row md:gap-8
               */
              display: "flex",
              flexDirection: { base: "column", md: "row" },
              gap: { base: 4, md: 8 },
              textStyle: "dns-16N-130",
              color: "solid-gray.800",
            })}
          >
            <li>
              <Link
                href="https://github.com/cieloazul310/digital-go-design-system-with-panda"
                color="inherit"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="https://cieloazul310.github.io/digital-go-design-system-with-panda"
                color="inherit"
              >
                Storybook
              </Link>
            </li>
          </ul>
        </div>
        <p
          className={css({
            /**
             * mt-8 text-oln-16N-100 text-solid-gray-600 md:px-1.5
             */
            textStyle: "oln-16N-100",
            color: "solid-gray.600",
            mt: 8,
            px: { base: 0, md: 1.5 },
          })}
        >
          © cieloazul310 All rights reserved.
        </p>
      </div>
    </footer>
  );
}
