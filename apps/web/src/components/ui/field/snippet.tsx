// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
"use client";
import { Field } from "@ark-ui/react/field";
import { field } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(field);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(Field.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Field.Root, "root");

export const ErrorText = withContext(Field.ErrorText, "errorText");

export const SupportText = withContext(Field.HelperText, "supportText");

export const Label = withContext(Field.Label, "label");

export const RequirementBadge = withContext(
  Field.RequiredIndicator,
  "requirementBadge",
);

export const Select = withContext(Field.Select, "select");

export const Input = withContext(Field.Input, "input");

export const Textarea = withContext(Field.Textarea, "textarea");

export { FieldContext as Context } from "@ark-ui/react/field";
