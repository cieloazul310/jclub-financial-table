// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.0 (commit: c8809a4c14c2008b2e0301bac7e5bf6f9df8f80f)
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
