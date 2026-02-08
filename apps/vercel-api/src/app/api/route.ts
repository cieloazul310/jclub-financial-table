import * as path from "path";
import { NextResponse } from "next/server";
import {
  getAllClubs,
  getAllYears,
  AllFinancialDatumFields,
  AllGeneralFields,
  AllSeasonResultFields,
  AllPLFields,
  AllBSFields,
  AllRevenueFields,
  AllExpenseFields,
  AllAttdFields,
  type FinancialDatum,
} from "@cieloazul310/jclub-financial";
import { siteUrl } from "@/data/site-metadata";

const has = Object.prototype.hasOwnProperty;
/**
 * year: number[] | string (ex.2005-2024) | "all"
 */
function parseVisibleYears(url: URL) {
  const allYears = getAllYears().map(({ year }) => year);
  const params = url.searchParams.get("year");
  if (!params) return [];
  if (params === "all") return allYears;
  if (params.split("-").length === 2) {
    const [from, to] = params.split("-");
    if (!from || !to) return [];

    return allYears.filter(
      (year) => year >= parseInt(from, 10) && year <= parseInt(to, 10),
    );
  }

  const paramsArray = params.split(",").map((v) => parseInt(v, 10));

  return allYears.filter((year) => paramsArray.includes(year));
}

function parseVisibleCategories(url: URL) {
  const allCategories = ["J1", "J2", "J3", "others"];
  const params = url.searchParams.get("category");
  if (!params) return allCategories;
  if (params === "all") return allCategories;
  const paramsArray = params.split(",");

  return allCategories.filter((cat) => paramsArray.includes(cat));
}

function parseVisibleClubs(url: URL) {
  const allClubs = getAllClubs().map(({ id }) => id);
  const params = url.searchParams.get("club");
  if (!params) return [];
  if (params === "all") return allClubs;
  const paramsArray = params.split(",");

  return allClubs.filter((id) => paramsArray.includes(id));
}

function parseGroupBy(url: URL) {
  const params = url.searchParams.get("groupBy");
  if (!params) return null;
  if (params === "club" || params === "year") return params;
  return null;
}

const requredFields = [
  "clubId",
  "name",
  "year",
  "category",
] satisfies (keyof FinancialDatum)[];

const fieldGroupMap = {
  generalGroup: AllGeneralFields,
  seasonResult: AllSeasonResultFields,
  plGroup: AllPLFields,
  bsGroup: AllBSFields,
  revenueGroup: AllRevenueFields,
  expenseGroup: AllExpenseFields,
  attendanceGroup: AllAttdFields,
};

function isFieldGroup(key: string): key is keyof typeof fieldGroupMap {
  return has.call(fieldGroupMap, key);
}

function isDatumField(key: string): key is keyof FinancialDatum {
  return AllFinancialDatumFields.some((field) => field === key);
}

/**
 * fields: ((keyof FinancialDatum) | "plGroup" | "bsGroup" | "revenueGroup" | "expensesGroup" | "attendanceGroup")[] | "all"
 */
function parseFields(url: URL): (keyof FinancialDatum)[] {
  const params = url.searchParams.get("fields");
  if (!params) return AllFinancialDatumFields;
  if (params === "all") return AllFinancialDatumFields;

  const fields: (keyof FinancialDatum)[] = [...requredFields];
  const args = params.split(",");
  args.forEach((arg) => {
    if (isFieldGroup(arg)) {
      const fieldGroup = fieldGroupMap[arg];
      fields.push(...fieldGroup);
    }
    if (isDatumField(arg)) fields.push(arg);
  });
  return Array.from(new Set(fields)).sort(
    (a, b) =>
      AllFinancialDatumFields.indexOf(a) - AllFinancialDatumFields.indexOf(b),
  );
}

function createDataFieldsFilter(fields: (keyof FinancialDatum)[]) {
  return (datum: FinancialDatum) => {
    const converted: Record<string, any> = {};
    fields.forEach((key) => {
      const value = datum[key];
      if (typeof value === "string" || typeof value === "number") {
        converted[key] = value;
      }
    });
    return converted;
  };
}

const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : siteUrl;

async function fetchData(url: string) {
  return fetch(url)
    .then((res) => res.json())
    .catch(() => null) as Promise<FinancialDatum | null>;
}

async function getData({
  year,
  club,
  groupBy,
}: {
  year: number[];
  club: string[];
  groupBy: "club" | "year" | null;
}) {
  const urls = club
    .map((clubId) =>
      year.map((val) =>
        fetchData(path.join(baseUrl, "dataset", clubId, `${val}.json`)),
      ),
    )
    .flat();
  const data = await Promise.all(urls)
    .then((arr) => arr.filter((datum) => datum !== null))
    .catch((err) => {
      console.warn(err);
      return [];
    });

  return data;
}

/**
 * reference:
 * https://zenn.dev/kikiki_kiki/articles/f6bef96f84ed6c
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const year = parseVisibleYears(url);
  const category = parseVisibleCategories(url);
  const club = parseVisibleClubs(url);
  const groupBy = parseGroupBy(url);
  const fields = parseFields(url);
  const dataFieldsFilter = createDataFieldsFilter(fields);

  const query = { year, category, club, groupBy, fields };
  const raw = await getData({ year, club, groupBy });
  const data = raw.map(dataFieldsFilter);

  return NextResponse.json({ query, data }, { status: 200 });
}
