import {
  Blockquote as DigitalGoBlockquote,
  type BlockquoteProps as DigitalGoBlockquoteProps,
} from "@/components/ui/blockquote";
import { Link } from "@/components/link";
import { css } from "styled-system/css";

export function Blockquote({
  children,
  url,
  title,
  mx = { base: 4, sm: 8 },
  ...rest
}: DigitalGoBlockquoteProps & {
  url?: string;
  title?: string;
}) {
  const props = { mx, ...rest };
  return (
    <DigitalGoBlockquote {...props} asChild>
      <div>
        <span className={css({ srOnly: true })}>引用始まり</span>
        <blockquote>{children}</blockquote>
        <span className={css({ srOnly: true })}>引用終わり</span>
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
    </DigitalGoBlockquote>
  );
}
