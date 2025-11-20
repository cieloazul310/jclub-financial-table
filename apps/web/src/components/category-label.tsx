import { ChipLabel, type ChipLabelProps } from "@/components/ui/chip-label";

export function J1Label(props: ChipLabelProps) {
  return (
    <ChipLabel
      colorPalette="red"
      {...props}
    >
      J1
    </ChipLabel>
  );
}

export function J2Label(props: ChipLabelProps) {
  return (
    <ChipLabel
      colorPalette="green"
      {...props}
    >
      J2
    </ChipLabel>
  );
}

export function J3Label(props: ChipLabelProps) {
  return (
    <ChipLabel
      colorPalette="blue"
      {...props}
    >
      J3
    </ChipLabel>
  );
}

export function CategoryLabel({
  variant = "ghost",
  textStyle = "oln-14B-100",
  category,
  ...rest
}: { category: string } & ChipLabelProps) {
  const props = { variant, textStyle, ...rest };

  if (category === "J1") {
    return <J1Label {...props} />;
  }
  if (category === "J2") {
    return <J2Label {...props} />;
  }
  if (category === "J3") {
    return <J3Label {...props} />;
  }

  return (
    <ChipLabel
      colorPalette="solid-gray"
      {...props}
    >
      {category}
    </ChipLabel>
  );
}
