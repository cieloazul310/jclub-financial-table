import { describe, it, expect } from "vitest";
import {
  getDataByClub,
  getDataByYear,
  getDatum,
  getExtendedDataByClub,
  getExtendedDataByYear,
} from "../dist";

describe("Get data by club", async () => {
  const data = await getDataByClub("mitohollyhock");

  it("check data length", () => {
    const length = 20;

    expect(data.length).toBe(length);
    expect(data.filter(({ slug }) => slug === "mitohollyhock").length).toBe(
      length,
    );
  });
});

describe("Get data by year (2024)", async () => {
  const data = await getDataByYear(2024);

  it("check data length", () => {
    const length = 62;

    expect(data.length).toBe(length);
    expect(data.filter(({ year }) => year === 2024).length).toBe(length);
    expect(data.filter(({ slug }) => slug === "mitohollyhock").length).toBe(1);
  });
});

describe("Get data by year (2023)", async () => {
  const data = await getDataByYear(2023);

  it("check data length", () => {
    const length = 60;

    expect(data.length).toBe(length);
    expect(data.filter(({ year }) => year === 2023).length).toBe(length);
    expect(data.filter(({ slug }) => slug === "mitohollyhock").length).toBe(1);
  });
});

describe("Get datum", async () => {
  it("mito 2005", async () => {
    const datum = await getDatum("mitohollyhock", 2005);
    if (!datum) return;
    expect(datum.category).toBe("J2");
    expect(datum.revenue).toBe(310);
    expect(datum.ticket).toBe(50);
    expect(datum.all_attd).toBe(73339);
  });

  it("kochi 2005", async () => {
    const datum = await getDatum("kochi", 2024);
    if (!datum) return;
    expect(datum.category).toBe("JFL");
    expect(datum.revenue).toBe(200);
    expect(datum.ticket).toBe(20);
    expect(datum.average_attd).toBe(2272);
  });
});

describe("Get extended club data", async () => {
  it("mitohollyhock 2024", async () => {
    const data = await getExtendedDataByClub("mitohollyhock");
    const datum = data.find(({ year }) => year === 2024);
    expect(datum?.revenue.value).toBe(1224);
    expect(datum?.revenue.growth).toBe(120);
    expect(datum?.expense.value).toBe(1224);
    expect(datum?.expense.growth).toBe(125);

    expect(datum?.average_attd.growth).toBe(680);
    expect(datum?.unit_price.growth).toBe(232);
  });

  it("verdy 2020", async () => {
    const data = await getExtendedDataByClub("verdy");
    const datum = data.find(({ year }) => year === 2020);
    expect(datum?.assets.value).toBe(480);
    expect(datum?.assets.growth).toBe(-218);
    expect(datum?.net_worth.value).toBe(-399);
    expect(datum?.net_worth.growth).toBe(-439);

    expect(datum?.sponsor.growth).toBe(-239);
    expect(datum?.all_attd.growth).toBe(-61774);
  });
});

describe("Get extended year data", async () => {
  it("mitohollyhock 2024", async () => {
    const data = await getExtendedDataByYear(2024);
    const datum = data.find(({ slug }) => slug === "mitohollyhock");
    expect(datum?.revenue.value).toBe(1224);
    expect(datum?.revenue.growth).toBe(120);
    expect(datum?.expense.value).toBe(1224);
    expect(datum?.expense.growth).toBe(125);

    expect(datum?.average_attd.growth).toBe(680);
    expect(datum?.unit_price.growth).toBe(232);
  });

  it("verdy 2020", async () => {
    const data = await getExtendedDataByYear(2020);
    const datum = data.find(({ slug }) => slug === "verdy");
    expect(datum?.assets.value).toBe(480);
    expect(datum?.assets.growth).toBe(-218);
    expect(datum?.net_worth.value).toBe(-399);
    expect(datum?.net_worth.growth).toBe(-439);

    expect(datum?.sponsor.growth).toBe(-239);
    expect(datum?.all_attd.growth).toBe(-61774);
  });
});
