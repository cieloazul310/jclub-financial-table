import { styled } from "styled-system/jsx";
import type { HTMLStyledProps } from "styled-system/types";

export const LeadingText = (props: HTMLStyledProps<"p">) => (
  <styled.p
    textStyle={{ base: "std-18N-160", md: "std-20N-150" }}
    my={4}
    mb={{ md: 6 }}
    {...props}
  />
);
