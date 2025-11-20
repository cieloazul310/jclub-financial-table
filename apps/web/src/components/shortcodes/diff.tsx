import { ArrowDownIcon, ArrowUpIcon, ArrowRightIcon } from "lucide-react";
import { css } from "styled-system/css";

export function createDiff(input: string | number): {
  value: string | number;
  type: "up" | "down" | "even";
} {
  if (typeof input === "number") {
    const value = Math.abs(input);
    const type = input > 0 ? "up" : input < 0 ? "down" : "even";
    return { value, type };
  }

  if (input === "0") return { type: "even", value: 0 };
  const first = input.slice(0, 1);
  const rest = input.slice(1);
  const type = first === "-" ? "down" : "up";
  const value = first === "+" || first === "-" ? rest : input;
  return { type, value };
}

export function Diff({ children }: { children: string | number }) {
  const { value, type } = createDiff(children);

  const DiffIcon = () => {
    if (type === "up")
      return (
        <>
          <ArrowUpIcon className={css({ color: "lime.700" })} />
          <span className={css({ srOnly: true })}>プラス</span>
        </>
      );
    if (type === "down")
      return (
        <>
          <ArrowDownIcon className={css({ color: "red.900" })} />
          <span className={css({ srOnly: true })}>マイナス</span>
        </>
      );

    return <ArrowRightIcon className={css({ color: "solid-gray.536" })} />;
  };

  return (
    <span
      className={css({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-end",
        whiteSpace: "nowrap",
        verticalAlign: "bottom",
      })}
    >
      <DiffIcon />
      {value}
    </span>
  );
}
