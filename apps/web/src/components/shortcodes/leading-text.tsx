import { styled } from "styled-system/jsx";
import type {
  ComponentProps,
  JsxHTMLProps,
  JsxStyleProps,
} from "styled-system/types";

export const LeadingText = (
  props: JsxHTMLProps<ComponentProps<"p">, JsxStyleProps>,
) => (
  <styled.p
    textStyle={{ base: "std-18N-160", md: "std-20N-150" }}
    my={4}
    mb={{ md: 6 }}
    {...props}
  />
);
