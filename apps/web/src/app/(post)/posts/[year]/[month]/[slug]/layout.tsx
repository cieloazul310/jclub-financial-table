import type { PropsWithChildren } from "react";
import { layout } from "styled-system/recipes";
import { Layout as BaseLayout } from "@/components/layout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <BaseLayout classes={layout({ contentWidth: "full" })}>
      {children}
    </BaseLayout>
  );
}
