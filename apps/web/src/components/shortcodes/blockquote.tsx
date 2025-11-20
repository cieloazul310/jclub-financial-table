import type { ComponentProps } from "react";
import { Link } from "@/components/link";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { StyledComponent } from "styled-system/types";

export function Blockquote({
  children,
  /** border-l-8 border-solid-gray-536 py-2 pl-6 */
  pl = 6,
  py = 4,
  mr = "1em",
  borderColor = "solid-gray.536",
  borderLeftWidth = "8px",
  url,
  title,
  ...rest
}: ComponentProps<StyledComponent<"div">> & {
  url?: string;
  title?: string;
}) {
  const props = { pl, py, mr, borderColor, borderLeftWidth };

  return (
    <styled.div {...props} {...rest}>
      <span className={css({ srOnly: true })}>引用始まり</span>
      <styled.blockquote>{children}</styled.blockquote>
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
    </styled.div>
  );
}
