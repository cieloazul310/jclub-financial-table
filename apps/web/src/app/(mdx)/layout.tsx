import type { PropsWithChildren } from "react";
import { Layout as BaseLayout } from "@/components/layout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <article>{children}</article>
    </BaseLayout>
  );
}
