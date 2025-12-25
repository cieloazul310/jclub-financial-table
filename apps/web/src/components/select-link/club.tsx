import { getClubsByCategory } from "@cieloazul310/jclub-financial";
import { Field } from "@/components/ui/field";
import { ClubLinkClient } from "./club-client";

export function ClubLink() {
  const j1 = getClubsByCategory("J1");
  const j2 = getClubsByCategory("J2");
  const j3 = getClubsByCategory("J3");
  const others = getClubsByCategory("others");

  return (
    <Field.Root>
      <Field.Label>クラブ別経営情報</Field.Label>
      <ClubLinkClient j1={j1} j2={j2} j3={j3} others={others} />
    </Field.Root>
  );
}
