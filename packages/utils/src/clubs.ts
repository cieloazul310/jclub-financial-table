import type { ClubInfo } from "./types";
import clubs from "./data/clubs.json";

/**
 * 利用可能なすべてのJクラブ情報を取得する。ソートはカテゴリ順(J1, J2, J3, その他)。
 * @returns ClubInfo[]
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/clubs.yml clubs.yml}
 */
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

/**
 * @description
 * 指定されたclubIdのJクラブ情報を取得する
 * @param clubId クラブID
 * @returns ClubInfo | undefined
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/clubs.yml clubs.yml}
 */
export function getClubById(clubId: string) {
  const clubs = getAllClubs();
  return clubs.find((club) => club.id === clubId);
}

/**
 * 指定されたカテゴリのすべてのJクラブ情報を取得する
 * @param category カテゴリ(J1, J2, J3, JFL)
 * @returns ClubInfo[]
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/clubs.yml clubs.yml}
 */
export function getClubsByCategory(category: string) {
  const clubs = getAllClubs();
  return clubs.filter((club) =>
    ["J1", "J2", "J3"].includes(category)
      ? club.category === category
      : ["JFL"].includes(club.category),
  );
}
