import ClubSource from "@/mdx/source-2025-club.mdx";
import KanpoSource from "@/mdx/source-2025-kanpo.mdx";
import { Details } from "./details";

export function Source2025Club() {
  return (
    <Details summary="クラブ発表によるソース（2026年5月31日現在）" my={8}>
      <ClubSource />
    </Details>
  );
}

export function Source2025Kanpo() {
  return (
    <Details summary="官報によるソース（2026年5月31日現在）" my={8}>
      <KanpoSource />
    </Details>
  );
}
