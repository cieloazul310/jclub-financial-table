import { Field } from "@/components/ui/field";
import { getAllClubsByCategory } from "@/utils/all-clubs";
import { ClubLinkClient } from "./club-client";

export async function ClubLink() {
  const j1 = await getAllClubsByCategory("J1");
  const j2 = await getAllClubsByCategory("J2");
  const j3 = await getAllClubsByCategory("J3");
  const others = await getAllClubsByCategory("others");

  return (
    <Field.Root>
      <Field.Label>クラブ別経営情報</Field.Label>
      <ClubLinkClient j1={j1} j2={j2} j3={j3} others={others} />
    </Field.Root>
  );
}
