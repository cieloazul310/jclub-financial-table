import type { ReactNode } from "react";
import NextLink from "next/link";
import { HomeIcon } from "lucide-react";
import { css } from "styled-system/css";
import { Drawer } from "@/components/ui/drawer";
import {
  HamburgerMenuButton,
  HamburgerIcon,
  CloseIcon,
} from "@/components/ui/hamburger-menu-button";
import { siteMetadata } from "@/data/site-metadata";
import { Menu } from "./menu";

export function Header({
  title = <NextLink href="/">{siteMetadata.title}</NextLink>,
  drawerContent = <Menu />,
}: {
  title?: ReactNode;
  drawerContent?: ReactNode;
}) {
  return (
    <div
      className={css({
        /**
         * mx-auto flex w-full max-w-screen-1440 items-center justify-between
         * px-4 py-2.5 md:px-8
         */
        mx: "auto",
        display: "flex",
        width: "full",
        alignItems: "center",
        justifyContent: "space-between",
        px: { base: 4, md: 8 },
        py: 2.5,
      })}
    >
      <h1
        className={css({
          /**
           * w-40 lg:w-48 rounded-4 text-std-16B-170 lg:text-std-20B-150 leading-150
           * lg:mr-2 block
           */
          display: "block",
          textStyle: { base: "std-16B-170", lg: "std-20B-150" },
          rounded: 4,
          mr: { base: 0, lg: 2 },
          lineHeight: 150,
        })}
      >
        {title}
      </h1>
      {drawerContent && (
        <Drawer.Root placement="right">
          <Drawer.Trigger asChild>
            <HamburgerMenuButton>
              <HamburgerIcon />
              メニュー
            </HamburgerMenuButton>
          </Drawer.Trigger>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>
                  <NextLink href="/">
                    <HomeIcon />
                  </NextLink>
                </Drawer.Title>
                <Drawer.CloseTrigger
                  asChild
                  position="absolute"
                  top="3"
                  right={{ base: "6", md: "8" }}
                >
                  <HamburgerMenuButton>
                    <CloseIcon />
                    閉じる
                  </HamburgerMenuButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>{drawerContent}</Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      )}
    </div>
  );
}
