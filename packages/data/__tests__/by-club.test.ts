import { describe, it, expect } from "vitest";
import { getData } from "../dist/mitohollyhock";
import { getData as getAlbirexData } from "../dist/albirex";

describe("Get all data", async () => {
  const data = await getData();

  it("check data length", () => {
    const length = 20;

    expect(data.length).toBe(length);
    expect(data.filter(({ slug }) => slug === "mitohollyhock").length).toBe(
      length,
    );
  });
});

describe("Get specific data", async () => {
  const data = await getData(2015, 2024);

  it("check data length", () => {
    const length = 10;

    expect(data.length).toBe(length);
    expect(data.filter(({ slug }) => slug === "mitohollyhock").length).toBe(
      length,
    );
  });
});

describe("Get all data albirex", async () => {
  const data = await getAlbirexData();

  it("check data length", () => {
    const length = 20;

    expect(data.length).toBe(length);
    expect(data.filter(({ slug }) => slug === "albirex").length).toBe(length);
    expect(data.filter(({ slug }) => slug === "mitohollyhock").length).toBe(0);
  });
});
