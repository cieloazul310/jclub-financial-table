import { getAllClubs, type ClubInfo } from "@cieloazul310/jclub-financial";

export function getClubInfo(value: any, key: keyof ClubInfo) {
  const allClubs = getAllClubs();
  return allClubs.find((club) => club[key] === value);
}

export function getClubsFromArray(
  array: any[] | undefined | null,
  key: keyof ClubInfo,
) {
  if (!array) return [];
  return array
    .map((item) => getClubInfo(item[key], key))
    .filter((club): club is ClubInfo => Boolean(club));
}

export function getSpecificClub(
  array: any[] | undefined | null,
  key: keyof ClubInfo,
) {
  if (!array || array.length !== 1) return null;
  const specificClub = getClubInfo(array[0], key);
  if (!specificClub) return null;
  return specificClub;
}
