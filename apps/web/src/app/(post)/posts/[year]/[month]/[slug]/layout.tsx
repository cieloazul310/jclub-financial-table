import type { PropsWithChildren } from "react";
import { layout } from "styled-system/recipes";
import { Layout as BaseLayout } from "@/components/layout";
import { PageBottomNav } from "@/components/page-bottom-nav";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <BaseLayout classes={layout({ contentWidth: "full" })}>
      {children}
      <PageBottomNav items={[{ title: "記事一覧", href: "/posts" }]} />
    </BaseLayout>
  );
}
