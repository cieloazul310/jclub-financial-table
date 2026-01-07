import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Link } from "@/components/link";

export function PageBottomNav({
  items = [],
  display = "grid",
  gridTemplateColumns = "1fr",
  gap = 2,
  buttonProps = {
    variant: "outline",
    width: "full",
  },
  ...rest
}: HTMLStyledProps<"nav"> & {
  items?: { title: string; href: string }[];
  buttonProps?: ButtonProps;
}) {
  const props = { display, gridTemplateColumns, gap, ...rest };

  return (
    <styled.nav {...props}>
      {[...items, { title: "トップページ", href: "/" }].map(
        ({ title, href }) => (
          <Button key={href} {...buttonProps} asChild>
            <Link href={href}>{title}</Link>
          </Button>
        ),
      )}
    </styled.nav>
  );
}
