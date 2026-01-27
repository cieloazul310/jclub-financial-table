import type { PropsWithChildren } from "react";
import { layout } from "styled-system/recipes";
import { Layout as BaseLayout } from "@/components/layout";
import { PageBottomNav } from "@/components/page-bottom-nav";
import { AdInLayout } from "@/components/ads";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <BaseLayout classes={layout()}>
      {children}
      <AdInLayout mb={4} />
      <PageBottomNav items={[{ title: "記事一覧", href: "/posts" }]} />
    </BaseLayout>
  );
}
