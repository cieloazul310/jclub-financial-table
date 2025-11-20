import { readFile } from "fs/promises";
import { resolve } from "path";
import * as yaml from "yaml";
import { __dirname } from "./dirname";
import type { YearInfo } from "./types";

export async function getAllYears(): Promise<YearInfo[]> {
  let file: string = "";
  try {
    file = await readFile(resolve(__dirname, "../data/years.yml"), "utf8");
  } catch (error) {
    console.error(
      `Error reading ${resolve(__dirname, "../data/years.yml")}:`,
      error,
    );
    file = "[]";
  }
  const data = yaml.parse(file) as YearInfo[];
  return data;
}
