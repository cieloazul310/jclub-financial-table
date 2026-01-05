import { describe, it, expect } from "vitest";
import { getData, getExtendedData } from "../dist/mitohollyhock";
import { getData as getAlbirexData } from "../dist/albirex";
import { getExtendedData as getExtendedTegevaData } from "../dist/tegevajaro";

describe("Get all data", async () => {
  const data = await getData();

  it("check data length", () => {
    const length = 20;

    expect(data.length).toBe(length);
    expect(data.filter(({ clubId }) => clubId === "mitohollyhock").length).toBe(
      length,
    );
  });
});

describe("Get specific data", async () => {
  const data = await getData(2015, 2024);

  it("check data length", () => {
    const length = 10;

    expect(data.length).toBe(length);
    expect(data.filter(({ clubId }) => clubId === "mitohollyhock").length).toBe(
      length,
    );
  });
});

describe("Get specific extended data", async () => {
  const data = await getExtendedData(2015, 2024);

  it("check data length", () => {
    const length = 10;

    expect(data.length).toBe(length);
    expect(
      data.filter(({ clubId }) => clubId.value === "mitohollyhock").length,
    ).toBe(length);
  });

  it("check datum", () => {
    const datum = data[0];
    if (!datum) return;
    expect(datum.year.value).toBe(2015);
    expect(datum.revenue.value).toBe(561);
    expect(datum.revenue.delta).toBe(43);
    expect(datum.all_attd.value).toBe(101132);
    expect(datum.net_worth?.delta).toBe(3);
  });
});

describe("Get all data albirex", async () => {
  const data = await getAlbirexData();

  it("check data length", () => {
    const length = 20;

    expect(data.length).toBe(length);
    expect(data.filter(({ clubId }) => clubId === "albirex").length).toBe(
      length,
    );
    expect(data.filter(({ clubId }) => clubId === "mitohollyhock").length).toBe(
      0,
    );
  });
});

describe("Get specific tegevajaro extended data", async () => {
  const data = await getExtendedTegevaData();

  it("check data length", () => {
    const length = 5;
    expect(data.length).toBe(length);
    expect(
      data.filter(({ clubId }) => clubId.value === "tegevajaro").length,
    ).toBe(length);
    expect(
      data.filter(({ clubId }) => clubId.value === "mitohollyhock").length,
    ).toBe(0);
  });

  it("check datum", () => {
    const datum = data[data.length - 1];
    if (!datum) return;
    expect(datum.year.value).toBe(2024);
    expect(datum.revenue.value).toBe(510);
    expect(datum.revenue.delta).toBe(292);
    expect(datum.all_attd.value).toBe(22837);
    expect(datum.transfer_exp?.value).toBe(3);
  });
});
