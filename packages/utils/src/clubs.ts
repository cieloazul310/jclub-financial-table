import type { ClubInfo } from "./types";
import clubs from "./data/clubs.json";

export function getAllClubs() {
  const allClubs = clubs;
  return [...allClubs] as ClubInfo[];
}
/**
 * @deprecated
 * use `getClubById`
 */
export function getClubBySlug(slug: string) {
  const clubs = getAllClubs();
  return clubs.find((club) => club.id === slug);
}

export function getClubById(id: string) {
  const clubs = getAllClubs();
  return clubs.find((club) => club.id === id);
}

export function getClubsByCategory(category: string) {
  const clubs = getAllClubs();
  return clubs.filter((club) =>
    ["J1", "J2", "J3"].includes(category)
      ? club.category === category
      : ["JFL"].includes(club.category),
  );
}
