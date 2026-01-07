/**
 * @see
 * https://zenn.dev/ncdc/articles/react_window_size_subscription
 */

"use client";

import { useSyncExternalStore } from "react";

type WindowSize = {
  windowWidth?: number;
  windowHeight?: number;
};

const getWindowWidth = () => {
  return typeof window !== "object" ? undefined : window.innerWidth;
};
const getWindowHeight = () => {
  return typeof window !== "object" ? undefined : window.innerHeight;
};

const subscribeWindowSizeChange = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export const useWindowSize = (): WindowSize => {
  const width = useSyncExternalStore(
    subscribeWindowSizeChange,
    getWindowWidth,
    () => undefined,
  );
  const height = useSyncExternalStore(
    subscribeWindowSizeChange,
    getWindowHeight,
    () => undefined,
  );
  return { windowWidth: width, windowHeight: height };
};
