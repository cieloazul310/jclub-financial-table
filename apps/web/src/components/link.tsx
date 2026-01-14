import NextLink from "next/link";
import { forwardRef } from "react";
import {
  Link as LinkBase,
  type LinkProps as LinkBaseProps,
} from "@/components/ui/link";
import { ExternalLinkIcon } from "lucide-react";
import { css } from "styled-system/css";
import { isInternal } from "@/utils/is-internal";

export const Link = forwardRef<HTMLAnchorElement, LinkBaseProps>(function Link(
  { children, href, ...props },
  ref,
) {
  if (!href) return null;
  const internal = isInternal(href);

  if (internal) {
    return (
      <LinkBase ref={ref} asChild {...props}>
        <NextLink href={href}>{children}</NextLink>
      </LinkBase>
    );
  }

  return (
    <LinkBase
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferer"
      {...props}
    >
      {children}
      <span className={css({ srOnly: true })}>新規タブで開きます</span>
      <ExternalLinkIcon />
    </LinkBase>
  );
});
