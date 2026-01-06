import { getAllClubs } from "@cieloazul310/jclub-financial";

export function getPrevNext(clubId: string) {
  const allClubs = getAllClubs();
  const index = allClubs.findIndex((club) => club.id === clubId);

  return {
    prev: allClubs[index - 1],
    next: allClubs[index + 1],
  };
}
