"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { Portal } from "@ark-ui/react";
import { Drawer } from "@/components/ui/drawer";
import {
  HamburgerMenuButton,
  CloseIcon,
} from "@/components/ui/hamburger-menu-button";
import { Tooltip } from "@/components/tooltip";

export function DrawerBottom({
  children,
  title,
  content,
  label,
}: PropsWithChildren<{
  title?: ReactNode;
  content: ReactNode;
  label?: string;
}>) {
  return (
    <>
      <Drawer.Root>
        {label ? (
          <Tooltip content={label}>
            <Drawer.Trigger asChild>{children}</Drawer.Trigger>
          </Tooltip>
        ) : (
          <Drawer.Trigger asChild>{children}</Drawer.Trigger>
        )}
        <Drawer.Backdrop />
        <Portal>
          <Drawer.Positioner
            top="unset"
            left="50%"
            bottom={0}
            transform="translateX(-50%)"
            width="6xl"
            maxWidth="full"
            height="full"
            maxHeight="85vh"
          >
            <Drawer.Content roundedTop={16}>
              <Drawer.Header>
                {title && <Drawer.Title>{title}</Drawer.Title>}
                <Drawer.CloseTrigger
                  asChild
                  position="absolute"
                  top="3"
                  right="4"
                >
                  <HamburgerMenuButton>
                    <CloseIcon />
                    閉じる
                  </HamburgerMenuButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>{content}</Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
