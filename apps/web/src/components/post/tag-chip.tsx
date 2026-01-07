import { ChipLabel, type ChipLabelProps } from "@/components/ui/chip-label";
import { Link } from "@/components/link";

export function TagChip({
  tag,
  variant = "ghost",
  colorPalette = "solid-gray",
  textStyle = "oln-14B-100",
  ...rest
}: { tag: { id: string; title: string } } & Omit<ChipLabelProps, "children">) {
  const props = { variant, colorPalette, textStyle, ...rest };
  return (
    <ChipLabel {...props} asChild>
      <Link href={`/posts/tag/${tag.id}`}>{tag.title}</Link>
    </ChipLabel>
  );
}
