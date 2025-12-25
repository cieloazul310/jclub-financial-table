import { describe, it, expect } from "vitest";
import { getLabel, getLabelWithOptions } from "../dist/index.mjs";

describe("getLabel", () => {
  it("should return the correct label for a valid key", () => {
    const label = getLabel("revenue");
    expect(label).toBe("営業収入");
  });

  it("should return undefined for an invalid key", () => {
    const label = getLabel("invalid-key");
    expect(label).toBe("invalid-key");
  });
});

describe("getLabelWithOptions", () => {
  it("should return the correct label with options for a valid key", () => {
    const label = getLabelWithOptions("expense", { fallback: "ああ" });
    expect(label).toBe("営業費用");
  });

  it("should return undefined for an invalid key", () => {
    const label = getLabelWithOptions("invalid-key" as any);
    expect(label).toBe("invalid-key");
  });
});
