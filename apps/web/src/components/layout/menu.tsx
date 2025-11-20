import NextLink from "next/link";
import { css } from "styled-system/css";
import { menuItem } from "styled-system/recipes";
import { Accordion } from "@/components/ui/accordion";
import { getAllClubsByCategory } from "@/utils/all-clubs";
import { getAllYears } from "@/utils/all-years";
import type { Category } from "@/utils/types";

type MenuProps = {
  slug?: string[];
};

export async function Menu({ slug = [] }: MenuProps) {
  const categories: Category[] = ["J1", "J2", "J3", "others"];
  const menuCollectionAsync = categories.map(async (category) => {
    const children = (await getAllClubsByCategory(category)).map((club) => ({
      title: club.name,
      href: `/club/${club.slug}`,
      selected: slug.join("/") === club.slug,
    }));

    return {
      title: category === "others" ? "JFL・地域" : category,
      children,
      open: slug.includes(category),
      selected: slug.join("/") === category,
    };
  });
  const menuCollection = await Promise.all(menuCollectionAsync);

  return (
    <nav className={css({ p: 1 })}>
      <ul>
        <Accordion.Root multiple>
          {menuCollection.map((menuGroup) => (
            <Accordion.Item value={menuGroup.title} key={menuGroup.title}>
              <Accordion.ItemTrigger>
                <h3>{menuGroup.title}</h3>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent
                pt={0}
                pr={0}
                pb={4}
                pl={{ base: 4, md: 6 }}
              >
                <ul>
                  {menuGroup.children.map((item) => (
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
          <Accordion.Item value="year">
            <Accordion.ItemTrigger>
              <h3>年度別</h3>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pt={0} pr={0} pb={4} pl={{ base: 4, md: 6 }}>
              <ul>
                {(await getAllYears()).map((item) => (
                  <li key={item.year.toString()}>
                    <NextLink
                      className={menuItem({ variant: "boxed" })}
                      href={`/year/${item.year}`}
                      data-selected={
                        slug.join("/") === `/year/${item.year.toString()}` ||
                        undefined
                      }
                    >
                      {item.year}年
                    </NextLink>
                  </li>
                ))}
              </ul>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </ul>
    </nav>
  );
}
