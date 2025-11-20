// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
"use client";
import { Fieldset } from "@ark-ui/react/fieldset";
import { fieldset } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withRootProvider, withContext } = createStyleContext(fieldset);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider(Fieldset.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(Fieldset.Root);

export const ErrorText = withContext(Fieldset.ErrorText, "errorText");

export const SupportText = withContext(Fieldset.HelperText, "supportText");

export const Legend = withContext(Fieldset.Legend, "legend");

export { FieldsetContext as Context } from "@ark-ui/react/fieldset";
