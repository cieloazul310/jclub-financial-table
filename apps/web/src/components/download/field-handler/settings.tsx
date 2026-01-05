import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Checkbox } from "@/components/ui/checkbox";
import { useDownloadStore } from "@/providers/download-store-provider";

export function Settings({ ...rest }: HTMLStyledProps<"section">) {
  const props = { ...rest };
  const { convertFieldLabel, toggleConvertFieldLabel } = useDownloadStore(
    (store) => store,
  );
  const onCheckedChange = () => {
    toggleConvertFieldLabel();
  };

  return (
    <styled.section {...props}>
      <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>設定</h3>
      <Checkbox.Root
        checked={convertFieldLabel}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.HiddenInput />
        <Checkbox.Label>ラベルを日本語に変換</Checkbox.Label>
      </Checkbox.Root>
    </styled.section>
  );
}
