// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.0 (commit: c8809a4c14c2008b2e0301bac7e5bf6f9df8f80f)
/**
 * source:
 * https://github.com/digital-go-jp/design-system-example-components-react/blob/main/src/components/HamburgerMenuButton/parts/CloseIcon.tsx
 */
import type { ComponentProps } from "react";

export type CloseIconProps = ComponentProps<"svg">;

export const CloseIcon = (props: CloseIconProps) => {
  const { className, ...rest } = props;
  return (
    <svg
      aria-hidden={true}
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...rest}
    >
      <path
        d="M6.39961 18.6496L5.34961 17.5996L10.9496 11.9996L5.34961 6.39961L6.39961 5.34961L11.9996 10.9496L17.5996 5.34961L18.6496 6.39961L13.0496 11.9996L18.6496 17.5996L17.5996 18.6496L11.9996 13.0496L6.39961 18.6496Z"
        fill="currentColor"
      />
    </svg>
  );
};
