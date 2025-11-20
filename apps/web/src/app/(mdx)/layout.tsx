import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { BaseLayout } from "@/components/layout/base";
import { PageHeader } from "@/components/page-header";
import { SelectLink } from "@/components/select-link";
import { title, description } from "@/data/site-metadata";

export default function Home({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <article>
        <PageHeader title={title}>{description}</PageHeader>
        <section className={css({ mb: 12 })}>
          <SelectLink />
        </section>
        <section>{children}</section>
      </article>
    </BaseLayout>
  );
}
