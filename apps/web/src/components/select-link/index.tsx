import { css } from "styled-system/css";
import { ClubLink } from "./club";
import { YearLink } from "./year";

export function SelectLink() {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
        gap: 4,
      })}
    >
      <ClubLink />
      <YearLink />
    </div>
  );
}
