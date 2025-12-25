// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.0 (commit: c8809a4c14c2008b2e0301bac7e5bf6f9df8f80f)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/table.tsx
 */
"use client";
import { ark } from "@ark-ui/react/factory";
import { table } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(table);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.table, "root");

export const Head = withContext(ark.thead, "head");

export const Body = withContext(ark.tbody, "body");

export const Foot = withContext(ark.tfoot, "foot");

export const Row = withContext(ark.tr, "row");

export const Header = withContext(ark.th, "header");

export const Cell = withContext(ark.td, "cell");

export const Caption = withContext(ark.caption, "caption");
