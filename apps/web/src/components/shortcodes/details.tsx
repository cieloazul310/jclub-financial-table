import { css } from "styled-system/css";
import { Link } from "@/components/link";
import { Disclosure } from "@/components/ui/disclosure";

export const Details = ({
  children,
  summary,
  url,
  title,
  defaultOpen,
  ...props
}: {
  summary: string;
  url?: string;
  title?: string;
} & Disclosure.RootProps) => (
  <Disclosure.Root textStyle="std-17N-170" {...props} asChild>
    <details open={defaultOpen}>
      <Disclosure.Summary textStyle="std-18B-160" asChild>
        <summary>
          <Disclosure.Indicator />
          {summary}
        </summary>
      </Disclosure.Summary>
      <div className={css({ pl: 6, py: 4 })}>
        {children}
        {title && (
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
        )}
      </div>
    </details>
  </Disclosure.Root>
);
