import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { Layout as BaseLayout } from "@/components/layout";
import { AdInPage } from "@/components/ads";
import { PageBottomNav } from "@/components/page-bottom-nav";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <article className={css({ mb: 12 })}>{children}</article>
      <div className={css({ mb: 12 })}>
        <AdInPage />
      </div>
      <PageBottomNav />
    </BaseLayout>
  );
}
