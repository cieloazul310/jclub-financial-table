// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.0 (commit: c8809a4c14c2008b2e0301bac7e5bf6f9df8f80f)
/**
 * source:
 * https://github.com/digital-go-jp/design-system-example-components-react/blob/main/src/components/HamburgerMenuButton/parts/HamburgerIcon.tsx
 */
import type { ComponentProps } from "react";

export type HamburgerIconProps = ComponentProps<"svg">;

export const HamburgerIcon = (props: HamburgerIconProps) => {
  const { className, ...rest } = props;
  return (
    <svg
      aria-hidden={true}
      className={className}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...rest}
    >
      <path
        clipRule="evenodd"
        d="M21 5.5H3V7H21V5.5ZM21 11.2998H3V12.7998H21V11.2998ZM3 17H21V18.5H3V17Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
