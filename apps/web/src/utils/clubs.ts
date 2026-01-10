import { getAllClubs, type ClubInfo } from "@cieloazul310/jclub-financial";

export function getClubInfo<T extends keyof ClubInfo>(
  key: T,
  value: ClubInfo[T],
) {
  const allClubs = getAllClubs();
  return allClubs.find((club) => club[key] === value);
}

export function getClubsFromArray<T extends keyof ClubInfo>(
  key: T,
  array: ClubInfo[T][] | undefined | null,
) {
  if (!array) return [];
  return array
    .map((item) => getClubInfo(key, item))
    .filter((clubInfo): clubInfo is ClubInfo => Boolean(clubInfo));
}

export function getSpecifiedClub<T extends keyof ClubInfo>(
  key: T,
  array: ClubInfo[T][] | undefined | null,
) {
  if (!array || array.length !== 1) return null;
  if (!array[0]) return null;
  const specificClub = getClubInfo(key, array[0]);
  return specificClub;
}

export function getPrevNext(clubId: string) {
  const allClubs = getAllClubs();
  const index = allClubs.findIndex((club) => club.id === clubId);

  return {
    prev: allClubs[index - 1],
    next: allClubs[index + 1],
  };
}
