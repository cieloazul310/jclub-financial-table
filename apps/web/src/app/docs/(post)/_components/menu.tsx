import NextLink from "next/link";
import { cx, css } from "styled-system/css";
import { menuItem } from "styled-system/recipes";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { docsGroup } from "@/data/docs";
import type { DocsMetadata } from "@/content";

type DocsMenuGroup = {
  id: string;
  title: string;
  description: string;
  headingPost?: DocsMetadata;
  children: DocsMetadata[];
};

export function createDocsMenuGroup(allDocs: DocsMetadata[]) {
  return docsGroup.map(({ id, ...rest }) => {
    const headingPost = allDocs.find(({ href }) => href === `/docs/${id}`);
    return {
      id,
      headingPost,
      ...rest,
      children: allDocs.filter(
        ({ href, frontmatter }) =>
          frontmatter.group === id && href !== headingPost?.href,
      ),
    };
  }) satisfies DocsMenuGroup[];
}

export function DocsMenu({
  menu,
  currentGroup,
  currentSlug,
  ...rest
}: HTMLStyledProps<"nav"> & {
  menu: DocsMenuGroup[];
  currentGroup: string;
  currentSlug: string[];
}) {
  const props = { ...rest };

  return (
    <styled.nav {...props}>
      <ul>
        {menu.map(({ id, headingPost, children, ...groupItem }) => (
          <li key={id}>
            {headingPost && (
              <NextLink
                className={menuItem({ variant: "boxed" })}
                href={headingPost.href}
                data-open={id === currentGroup || undefined}
                data-selected={
                  currentSlug.join("/") === headingPost.slug.join("/") ||
                  undefined
                }
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  {id === currentGroup ? (
                    <path
                      d="M12 19L5 12L12 5L19 12L12 19ZM12 16.15L16.15 12L12 7.85L7.85 12L12 16.15Z"
                      fill="currentColor"
                    />
                  ) : (
                    <path
                      d="M12 19L5 12L12 5L19 12L12 19Z"
                      fill="currentColor"
                    />
                  )}
                </svg>
                {groupItem.title}
              </NextLink>
            )}
            <ul
              className={css({
                pl: 8,
                display: { base: "none", _open: "block" },
              })}
              data-open={id === currentGroup || undefined}
            >
              {children.map(({ href, frontmatter, ...post }) => (
                <li key={href}>
                  <NextLink
                    className={cx(
                      menuItem({ variant: "boxed" }),
                      css({ pl: 4 }),
                    )}
                    href={href}
                    data-selected={
                      currentSlug.join("/") === post.slug.join("/")
                        ? true
                        : undefined
                    }
                  >
                    {frontmatter.title}
                  </NextLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </styled.nav>
  );
}
