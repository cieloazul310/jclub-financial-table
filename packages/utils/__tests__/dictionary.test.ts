import { describe, it, expect } from "vitest";
import { getLabel, getLabelWithOptions } from "../dist/index.mjs";

describe("getLabel", () => {
  it("should return the correct label for a valid key", () => {
    const label = getLabel("revenue");
    expect(label).toBe("営業収入");
  });

  it("should return input value for an invalid key", () => {
    const label = getLabel("invalid-key");
    expect(label).toBe("invalid-key");
  });
});

describe("getLabelWithOptions", () => {
  it("should return the correct label with options for a valid key", () => {
    const label = getLabelWithOptions("expenses", { fallback: "ああ" });
    expect(label).toBe("営業費用");
  });

  it("should return input value for an invalid key", () => {
    const label = getLabelWithOptions("invalid-key");
    expect(label).toBe("invalid-key");
  });

  it("with fallback", () => {
    const label = getLabelWithOptions("invalid-key", { fallback: "prepared" });
    expect(label).toBe("prepared");
  });

  it("with transform", () => {
    const label = getLabelWithOptions("team_wages", {
      transform: (label) => `${label}(移籍関連費用を含む)`,
    });
    expect(label).toBe("チーム人件費(移籍関連費用を含む)");
  });
});
