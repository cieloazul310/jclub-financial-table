import NextLink from "next/link";
import { cx, css } from "styled-system/css";
import { menuItem } from "styled-system/recipes";
import { Accordion } from "@/components/ui/accordion";
import { menuWithSelection, postMenu, contentMenu } from "@/data/menu";

type MenuProps = {
  currentPathname?: string;
};

export function Menu({ currentPathname = "/" }: MenuProps) {
  const menuCollection = menuWithSelection(currentPathname);
  const defaultValue = menuCollection
    .filter(({ selected }) => selected)
    .map(({ id }) => id);

  return (
    <nav className={css({ p: 1 })}>
      <h3
        className={css({
          textStyle: "oln-16N-100",
          px: { base: 0, md: 2 },
          mb: 2,
        })}
      >
        経営情報
      </h3>
      <ul className={css({ mb: 12 })}>
        <Accordion.Root multiple defaultValue={defaultValue}>
          {menuCollection.map((menuGroup) => (
            <Accordion.Item value={menuGroup.id} key={menuGroup.id}>
              <Accordion.ItemTrigger>
                <h4>{menuGroup.title}</h4>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent
                pt={0}
                pr={0}
                pb={4}
                pl={{ base: 4, md: 6 }}
              >
                <ul>
                  {menuGroup.items.map((item) => (
                    <li key={item.href}>
                      <NextLink
                        className={menuItem({ variant: "boxed" })}
                        href={item.href}
                        data-selected={item.selected || undefined}
                      >
                        {item.title}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </ul>
      <h3
        className={css({
          textStyle: "oln-16N-100",
          px: { base: 0, md: 2 },
          mb: 2,
        })}
      >
        コンテンツ
      </h3>
      <ul>
        {[...postMenu, ...contentMenu].map(({ id, title, href }) => (
          <li key={id}>
            <NextLink
              className={cx(
                menuItem({ variant: "boxed" }),
                css({ pl: { base: 4, md: 6 } }),
              )}
              href={href}
              data-selected={
                currentPathname !== "/" &&
                new RegExp(currentPathname).test(href)
                  ? true
                  : undefined
              }
            >
              {title}
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
