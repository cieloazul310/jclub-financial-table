"use client";

import type { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";
import { Loading } from "@/components/loading";

export function InView({ children }: PropsWithChildren) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <div ref={ref}>{inView ? children : <Loading minHeight="100px" />}</div>
  );
}
