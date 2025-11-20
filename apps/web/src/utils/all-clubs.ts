import { readFile } from "fs/promises";
import { resolve } from "path";
import * as yaml from "yaml";
import { __dirname } from "./dirname";
import type { Category, ClubInfo } from "./types";

export async function getAllClubs(): Promise<ClubInfo[]> {
  let file: string = "";
  try {
    file = await readFile(resolve(__dirname, "../data/clubs.yml"), "utf8");
  } catch (error) {
    console.error(
      `Error reading ${resolve(__dirname, "../data/clubs.yml")}:`,
      error,
    );
    file = "[]";
  }
  const data = yaml.parse(file) as ClubInfo[];
  return data;
}

export async function getAllClubsByCategory(
  category: Category,
): Promise<ClubInfo[]> {
  const allClubs = await getAllClubs();
  return allClubs.filter((club) =>
    ["J1", "J2", "J3"].includes(category)
      ? club.category === category
      : ["JFL"].includes(club.category),
  );
}

export async function getClubBySlug(
  slug: string,
): Promise<ClubInfo | undefined> {
  const allClubs = await getAllClubs();
  return allClubs.find((club) => club.slug === slug);
}
