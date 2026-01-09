import { Suspense } from "react";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Loading } from "@/components/loading";

export function AdWrapper({ children, ...rest }: HTMLStyledProps<"div">) {
  const props = { ...rest };

  return (
    <styled.div {...props}>
      <Suspense fallback={<Loading minHeight="100px" />}>{children}</Suspense>
    </styled.div>
  );
}
