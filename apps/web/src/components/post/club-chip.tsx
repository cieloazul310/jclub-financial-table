import type { ClubInfo } from "@cieloazul310/jclub-financial";
import { ChipLabel, type ChipLabelProps } from "@/components/ui/chip-label";
import { Link } from "@/components/link";

export function ClubChip({
  club,
  variant = "solid-fill",
  colorPalette = "solid-gray",
  textStyle = "oln-14B-100",
  ...rest
}: { club: Pick<ClubInfo, "id" | "short_name"> } & Omit<
  ChipLabelProps,
  "children"
>) {
  const props = { variant, colorPalette, textStyle, ...rest };
  return (
    <ChipLabel {...props} asChild>
      <Link href={`/club/${club.id}/posts`}>{club.short_name}</Link>
    </ChipLabel>
  );
}
