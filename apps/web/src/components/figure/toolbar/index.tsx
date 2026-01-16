import { css } from "styled-system/css";
import type { Mode } from "@/utils/types";
import { ModeHandler } from "./mode-handler";
import { CopyButton } from "./copy-button";
import { Filter } from "./filter";
import { Unit } from "./unit";

export function Toolbar({ mode }: { mode: Mode }) {
  return (
    <div
      className={css({
        py: 1,
        display: "flex",
        alignItems: "center",
        height: "48px",
        gap: 2,
      })}
    >
      <div className={css({ display: "flex", gap: 2, flexGrow: 1 })}>
        <ModeHandler />
        <CopyButton />
        <Filter mode={mode} />
      </div>
      <Unit mode={mode} />
    </div>
  );
}
