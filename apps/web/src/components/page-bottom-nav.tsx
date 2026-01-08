import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Link } from "@/components/link";

export function PageBottomNav({
  items = [],
  buttonProps = {
    variant: "outline",
    width: "full",
  },
  disableTopPageLink = false,
  display = "grid",
  gridTemplateColumns = "1fr",
  gap = 2,
  ...rest
}: HTMLStyledProps<"nav"> & {
  items?: { title: string; href: string }[];
  buttonProps?: ButtonProps;
  disableTopPageLink?: boolean;
}) {
  const props = { display, gridTemplateColumns, gap, ...rest };

  return (
    <styled.nav {...props}>
      {[
        ...items,
        !disableTopPageLink ? { title: "トップページ", href: "/" } : undefined,
      ].map(
        (item) =>
          item && (
            <Button key={item.href} {...buttonProps} asChild>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ),
      )}
    </styled.nav>
  );
}
