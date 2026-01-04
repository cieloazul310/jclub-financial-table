import { ChipTag } from "@/components/ui/chip-tag";

export function ActiveChip({ children, ...props }: ChipTag.RootProps) {
  return (
    <ChipTag.Root {...props}>
      <ChipTag.Label>{children}</ChipTag.Label>
      <ChipTag.RemoveButton transform="scale(0.9)" />
    </ChipTag.Root>
  );
}

export function InactiveChip({ children, ...props }: ChipTag.RootProps) {
  return (
    <ChipTag.Root colorPalette="solid-gray" {...props}>
      <ChipTag.Label>{children}</ChipTag.Label>
      <ChipTag.AddButton transform="scale(0.9)" />
    </ChipTag.Root>
  );
}
