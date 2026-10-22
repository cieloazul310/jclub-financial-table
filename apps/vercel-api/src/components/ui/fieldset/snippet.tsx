// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
"use client";
import { Fieldset } from "@ark-ui/react/fieldset";
import { fieldset } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withRootProvider, withContext } = createSlotRecipeContext(fieldset);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider(Fieldset.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(Fieldset.Root);

export const ErrorText = withContext(Fieldset.ErrorText, "errorText");

export const SupportText = withContext(Fieldset.HelperText, "supportText");

export const Legend = withContext(Fieldset.Legend, "legend");

export { FieldsetContext as Context } from "@ark-ui/react/fieldset";
