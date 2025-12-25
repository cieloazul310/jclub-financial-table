import type { ClubInfo } from "./types";
import clubs from "./data/clubs.json";

export function getAllClubs() {
  return clubs as ClubInfo[];
}

export function getClubBySlug(slug: string) {
  const clubs = getAllClubs();
  return clubs.find((club) => club.slug === slug);
}

export function getClubsByCategory(
  category: string,
) {
  const clubs = getAllClubs();
  return clubs.filter((club) =>
    ["J1", "J2", "J3"].includes(category)
      ? club.category === category
      : ["JFL"].includes(club.category),
  );
}
