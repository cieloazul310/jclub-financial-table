// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/date-picker.tsx
 */

"use client";
import { DatePicker } from "@ark-ui/react/date-picker";
import { datePicker } from "styled-system/recipes";
import type { ComponentProps } from "styled-system/types";
import { createStyleContext } from "styled-system/jsx";

const { withProvider, withContext } = createStyleContext(datePicker);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(DatePicker.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(DatePicker.Root, "root", {
  defaultProps: {
    locale: "ja-JP",
    positioning: {
      placement: "bottom-start",
    },
  },
});

export const ClearTrigger = withContext(
  DatePicker.ClearTrigger,
  "clearTrigger",
  {
    defaultProps: {
      hidden: false,
    },
  },
);

export const Content = withContext(DatePicker.Content, "content");

export const Control = withContext(DatePicker.Control, "control");

export const Input = withContext(DatePicker.Input, "input");

export const Label = withContext(DatePicker.Label, "label");

export const MonthSelect = withContext(DatePicker.MonthSelect, "monthSelect");

export const NextTrigger = withContext(DatePicker.NextTrigger, "nextTrigger");

export const Positioner = withContext(DatePicker.Positioner, "positioner");

export const PresetTrigger = withContext(
  DatePicker.PresetTrigger,
  "presetTrigger",
);

export const PrevTrigger = withContext(DatePicker.PrevTrigger, "prevTrigger");

export const RangeText = withContext(DatePicker.RangeText, "rangeText");

export const TableBody = withContext(DatePicker.TableBody, "tableBody");

export const TableCell = withContext(DatePicker.TableCell, "tableCell");

export const TableCellTrigger = withContext(
  DatePicker.TableCellTrigger,
  "tableCellTrigger",
);

export const TableHead = withContext(DatePicker.TableHead, "tableHead");

export const TableHeader = withContext(DatePicker.TableHeader, "tableHeader");

export const Table = withContext(DatePicker.Table, "table");

export const TableRow = withContext(DatePicker.TableRow, "tableRow");

export const Trigger = withContext(DatePicker.Trigger, "trigger");

export const ViewControl = withContext(DatePicker.ViewControl, "viewControl");

export const View = withContext(DatePicker.View, "view");

export const ViewTrigger = withContext(DatePicker.ViewTrigger, "viewTrigger");

export const YearSelect = withContext(DatePicker.YearSelect, "yearSelect");

export { DatePickerContext as Context } from "@ark-ui/react/date-picker";
