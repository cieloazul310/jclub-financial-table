import type { PropsWithChildren } from "react";
import { Layout as BaseLayout } from "@/components/layout";
import { PageBottomNav } from "@/components/page-bottom-nav";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <article>{children}</article>
      <PageBottomNav mt={12} />
    </BaseLayout>
  );
}
