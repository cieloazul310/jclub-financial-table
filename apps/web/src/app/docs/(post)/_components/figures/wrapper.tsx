import type { ReactNode } from "react";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";

export type FigureWrapperProps = HTMLStyledProps<"figure"> & {
  caption?: ReactNode;
};

export function FigureWrapper({
  children,
  caption,
  ...rest
}: FigureWrapperProps) {
  const props = { ...rest };
  return (
    <styled.figure {...props}>
      {caption && (
        <figcaption className={css({ textStyle: "dns-17B-130", mb: 2 })}>
          {caption}
        </figcaption>
      )}
      {children}
    </styled.figure>
  );
}
