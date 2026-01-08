import { ChipTag } from "@/components/ui/chip-tag";

export function ActiveChip({
  children,
  textStyle = { base: "oln-16B-100", sm: "oln-14B-100" },
  ...rest
}: ChipTag.RootProps) {
  const props = { textStyle, ...rest };
  return (
    <ChipTag.Root {...props}>
      <ChipTag.Label>{children}</ChipTag.Label>
      <ChipTag.RemoveButton transform="scale(0.9)" />
    </ChipTag.Root>
  );
}

export function InactiveChip({
  children,
  textStyle = { base: "oln-16B-100", sm: "oln-14B-100" },
  ...rest
}: ChipTag.RootProps) {
  const props = { textStyle, ...rest };
  return (
    <ChipTag.Root colorPalette="solid-gray" {...props}>
      <ChipTag.Label>{children}</ChipTag.Label>
      <ChipTag.AddButton transform="scale(0.9)" />
    </ChipTag.Root>
  );
}
