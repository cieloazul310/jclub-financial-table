import { cx, css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { HTMLStyledProps } from "styled-system/types";
import { withArticle } from "@/styles/with-article";

export const Paragraph = ({
  className,
  my = 4,
  mb = { md: 6 },
  ...props
}: HTMLStyledProps<"p">) => (
  <styled.p my={my} mb={mb} className={cx(className, withArticle)} {...props} />
);

/**
 * text-std-24B-150 md:text-std-32B-150 mt-10 mb-6 md:mt-16
 */
export const Heading2 = ({
  className,
  mt = { base: 10, md: 16 },
  mb = 6,
  textStyle = { base: "std-22B-150", md: "std-28B-150" },
  ...props
}: HTMLStyledProps<"h2">) => (
  <styled.h2
    className={cx(className, withArticle)}
    mt={mt}
    mb={mb}
    textStyle={textStyle}
    {...props}
  />
);

/**
 *
 * text-std-22B-150 md:text-std-24B-150 mt-8 mb-4 md:mt-12 md:mb-6
 */
export const Heading3 = ({
  className,
  mt = { base: 8, md: 12 },
  mb = { base: 4, md: 6 },
  textStyle = { base: "std-22B-150", md: "std-24B-150" },
  ...props
}: HTMLStyledProps<"h3">) => (
  <styled.h3
    mt={mt}
    mb={mb}
    textStyle={textStyle}
    className={cx(className, withArticle)}
    {...props}
  />
);

/**
 * text-std-18B-160 md:text-std-20B-150 mb-4 mt-6 md:mt-10
 */
export const Heading4 = ({
  className,
  mt = { base: 6, md: 10 },
  mb = 4,
  textStyle = { base: "std-18B-160", md: "std-20B-150" },
  ...props
}: HTMLStyledProps<"h4">) => (
  <styled.h4
    className={cx(className, withArticle)}
    textStyle={textStyle}
    mt={mt}
    mb={mb}
    {...props}
  />
);

/**
 *
 * text-std-18B-160 mt-4
 */
export const Heading5 = ({
  className,
  mt = 4,
  textStyle = "std-18B-160",
  ...props
}: HTMLStyledProps<"h5">) => (
  <styled.h5
    className={cx(className, withArticle)}
    mt={mt}
    textStyle={textStyle}
    {...props}
  />
);

export const Pre = ({
  className,
  bg = "solid-gray.100",
  my = 8,
  p = 8,
  rounded = 8,
  overflowX = "auto",
  textStyle = "mono-16N-150",
  ...props
}: HTMLStyledProps<"pre">) => {
  return (
    <styled.pre
      className={cx(className, withArticle)}
      bg={bg}
      my={my}
      p={p}
      rounded={rounded}
      overflowX={overflowX}
      textStyle={textStyle}
      {...props}
    />
  );
};

export const Code = ({ className, ...props }: HTMLStyledProps<"code">) => (
  <styled.code
    className={cx(
      className,
      css({
        ":not(pre) > &": {
          color: "keyColor.1200",
          bg: "keyColor.50",
          px: 1,
          rounded: 2,
        },
      }),
      withArticle,
    )}
    {...props}
  />
);
