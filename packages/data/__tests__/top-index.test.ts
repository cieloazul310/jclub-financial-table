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
    expect(data.filter(({ clubId }) => clubId === "mitohollyhock").length).toBe(
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
    expect(data.filter(({ clubId }) => clubId === "mitohollyhock").length).toBe(
      1,
    );
  });
});

describe("Get data by year (2023)", async () => {
  const data = await getDataByYear(2023);

  it("check data length", () => {
    const length = 60;

    expect(data.length).toBe(length);
    expect(data.filter(({ year }) => year === 2023).length).toBe(length);
    expect(data.filter(({ clubId }) => clubId === "mitohollyhock").length).toBe(
      1,
    );
  });
});

describe("Get datum", async () => {
  it("mito 2005", async () => {
    const datum = await getDatum("mitohollyhock", 2005);
    if (!datum) return;
    expect(datum.category).toBe("J2");
    expect(datum.revenue).toBe(310);
    expect(datum.ticket_revenue).toBe(50);
    expect(datum.all_attendance).toBe(73339);
  });

  it("kochi 2005", async () => {
    const datum = await getDatum("kochi", 2024);
    if (!datum) return;
    expect(datum.category).toBe("JFL");
    expect(datum.revenue).toBe(200);
    expect(datum.ticket_revenue).toBe(20);
    expect(datum.average_attendance).toBe(2272);
  });
});

describe("Get extended club data", async () => {
  it("mitohollyhock 2024", async () => {
    const data = await getExtendedDataByClub("mitohollyhock");
    const datum = data.find(({ year }) => year.value === 2024);
    expect(datum?.revenue.value).toBe(1224);
    expect(datum?.revenue.delta).toBe(120);
    expect(datum?.expenses.value).toBe(1224);
    expect(datum?.expenses.delta).toBe(125);

    expect(datum?.average_attendance.delta).toBe(680);
    expect(datum?.unit_price?.delta).toBe(232);
  });

  it("verdy 2020", async () => {
    const data = await getExtendedDataByClub("verdy");
    const datum = data.find(({ year }) => year.value === 2020);
    expect(datum?.assets?.value).toBe(480);
    expect(datum?.assets?.delta).toBe(-218);
    expect(datum?.net_assets?.value).toBe(-399);
    expect(datum?.net_assets?.delta).toBe(-439);

    expect(datum?.sponsor_revenue?.delta).toBe(-239);
    expect(datum?.all_attendance.delta).toBe(-61774);
  });
});

describe("Get extended year data", async () => {
  it("mitohollyhock 2024", async () => {
    const data = await getExtendedDataByYear(2024);
    const datum = data.find(({ clubId }) => clubId.value === "mitohollyhock");
    expect(datum?.revenue.value).toBe(1224);
    expect(datum?.revenue.delta).toBe(120);
    expect(datum?.expenses.value).toBe(1224);
    expect(datum?.expenses.delta).toBe(125);

    expect(datum?.average_attendance.delta).toBe(680);
    expect(datum?.unit_price?.delta).toBe(232);
  });

  it("verdy 2020", async () => {
    const data = await getExtendedDataByYear(2020);
    const datum = data.find(({ clubId }) => clubId.value === "verdy");
    expect(datum?.assets?.value).toBe(480);
    expect(datum?.assets?.delta).toBe(-218);
    expect(datum?.net_assets?.value).toBe(-399);
    expect(datum?.net_assets?.delta).toBe(-439);

    expect(datum?.sponsor_revenue?.delta).toBe(-239);
    expect(datum?.all_attendance.delta).toBe(-61774);
  });
});
