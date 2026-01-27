import { cx, css } from "styled-system/css";
import { blockquote } from "styled-system/recipes";
import { Link } from "@/components/link";
import { Disclosure } from "@/components/ui/disclosure";

export const Details = ({
  children,
  summary,
  url,
  title,
  asBlockquote = false,
  defaultOpen,
  ...props
}: {
  summary: string;
  url?: string;
  title?: string;
  asBlockquote?: boolean;
} & Disclosure.RootProps) => {
  const cite = title && (
    <cite
      className={css({
        display: "block",
        textAlign: "right",
        textStyle: "std-16N-170",
        mt: 2,
      })}
    >
      <span className={css({ srOnly: true })}>出典</span>
      {url ? (
        <Link color="inherit" href={url}>
          {title}
        </Link>
      ) : (
        title
      )}
    </cite>
  );

  const main = asBlockquote ? (
    <div className={cx(blockquote(), css({ mx: 0 }))}>
      <blockquote>{children}</blockquote>
      {cite}
    </div>
  ) : (
    <>
      {children}
      {cite}
    </>
  );

  return (
    <Disclosure.Root textStyle="std-17N-170" {...props} asChild>
      <details open={defaultOpen}>
        <Disclosure.Summary textStyle="std-18B-160" asChild>
          <summary>
            <Disclosure.Indicator />
            {summary}
          </summary>
        </Disclosure.Summary>
        <div
          className={cx(
            css({ py: 4 }),
            asBlockquote ? css({ pl: 2 }) : css({ pl: 6 }),
          )}
        >
          {main}
        </div>
      </details>
    </Disclosure.Root>
  );
};
