import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { FigureWrapper, FigureWrapperProps } from "./wrapper";

function BSItem({
  p = 4,
  bg = { base: "colorPalette.50/25", _hover: "colorPalette.50" },
  borderColor = "colorPalette.400",
  borderLeftWidth = "6px",
  ...rest
}: HTMLStyledProps<"div">) {
  const props = {
    bg,
    p,
    borderColor,
    borderLeftWidth,
    ...rest,
  };
  return <styled.div {...props} />;
}

function BSItemHeading({
  color = "colorPalette.1200",
  textStyle = "std-18B-160",
  ...rest
}: HTMLStyledProps<"h3">) {
  const props = { color, textStyle, ...rest };
  return <styled.h3 {...props} />;
}

export function BSFigureRaw() {
  return (
    <div
      className={css({
        "--height": "360px",
        "--capital-ratio": 0.55,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "fit-content",
        maxWidth: "full",
        minWidth: "var(--height)",
        textStyle: "std-16N-170",
      })}
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr",
        })}
      >
        <h3>借方</h3>
        <BSItem colorPalette="blue" height="var(--height)">
          <BSItemHeading>資産の部</BSItemHeading>
          <section
            className={css({ display: "flex", flexDirection: "column" })}
          >
            <span>流動資産</span>
            <span>固定資産等</span>
          </section>
        </BSItem>
      </div>
      <div className={css({ display: "grid", gridTemplateColumns: "1fr" })}>
        <h3>貸方</h3>
        <BSItem
          colorPalette="red"
          borderBottomColor="solid-gray.420"
          borderBottomWidth="1px"
          height="calc(var(--height) * var(--capital-ratio))"
        >
          <BSItemHeading>負債の部</BSItemHeading>
          <section
            className={css({ display: "flex", flexDirection: "column" })}
          >
            <span>流動負債</span>
            <span>固定負債</span>
          </section>
        </BSItem>
        <BSItem
          colorPalette="lime"
          height="calc(var(--height) * (1 - var(--capital-ratio)))"
        >
          <BSItemHeading>純資産の部</BSItemHeading>
          <section
            className={css({ display: "flex", flexDirection: "column" })}
          >
            <span>資本金</span>
            <span>資本剰余金等</span>
            <span>利益剰余金等</span>
          </section>
        </BSItem>
      </div>
    </div>
  );
}

export function BSFigure({ ...props }: FigureWrapperProps) {
  return (
    <FigureWrapper {...props}>
      <BSFigureRaw />
    </FigureWrapper>
  );
}
