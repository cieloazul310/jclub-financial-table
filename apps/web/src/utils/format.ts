export function format(
  value: number | undefined | null,
  {
    separator = false,
    decimal = 0,
  }: {
    separator?: boolean;
    decimal?: number;
  } = { separator: false, decimal: 0 },
) {
  if (typeof value !== "number") return "";
  const v = value.toFixed(decimal);
  if (!separator) return v;
  return parseFloat(v).toLocaleString("en-US");
}
