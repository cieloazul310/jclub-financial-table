// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/progress.tsx
 */
"use client";
import { Progress } from "@ark-ui/react/progress";
import { progress } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(progress);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(Progress.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Progress.Root, "root");

export const Circle = withContext(Progress.Circle, "circle");

export const CircleRange = withContext(Progress.CircleRange, "circleRange");

export const CircleTrack = withContext(Progress.CircleTrack, "circleTrack");

export const Label = withContext(Progress.Label, "label");

export const Range = withContext(Progress.Range, "range");

export const Track = withContext(Progress.Track, "track");

export const ValueText = withContext(Progress.ValueText, "valueText");

export const View = withContext(Progress.View, "view");

export { ProgressContext as Context } from "@ark-ui/react/progress";

export type {
  ProgressValueChangeDetails as ValueChangeDetails,
  ProgressValueTranslationDetails as ValueTranslationDetails,
} from "@ark-ui/react/progress";
