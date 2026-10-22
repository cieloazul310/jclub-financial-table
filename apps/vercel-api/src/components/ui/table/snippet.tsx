// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/table.tsx
 */
"use client";
import { ark } from "@ark-ui/react/factory";
import { table } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createSlotRecipeContext(table);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.table, "root");

export const Head = withContext(ark.thead, "head");

export const Body = withContext(ark.tbody, "body");

export const Foot = withContext(ark.tfoot, "foot");

export const Row = withContext(ark.tr, "row");

export const Header = withContext(ark.th, "header");

export const Cell = withContext(ark.td, "cell");

export const Caption = withContext(ark.caption, "caption");
