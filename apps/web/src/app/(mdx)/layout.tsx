import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { SelectLink } from "@/components/select-link";
import { title, description } from "@/data/site-metadata";

export default function Home({ children }: PropsWithChildren) {
  return (
    <Layout>
      <article>
        <PageHeader title={title}>{description}</PageHeader>
        <section className={css({ mb: 12 })}>
          <SelectLink />
        </section>
        <section>{children}</section>
      </article>
    </Layout>
  );
}
