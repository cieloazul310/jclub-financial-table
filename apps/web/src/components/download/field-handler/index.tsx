import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";

import { FieldFilter } from "./filter";
import { Settings } from "./settings";

export function FieldHandler({
  display = "flex",
  flexDirection = "column",
  gap = 8,
  ...rest
}: HTMLStyledProps<"div">) {
  const props = { display, flexDirection, gap, ...rest };

  return (
    <styled.div {...props}>
      <section>
        <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>表示項目</h3>
        <FieldFilter />
      </section>
      <Settings />
    </styled.div>
  );
}
