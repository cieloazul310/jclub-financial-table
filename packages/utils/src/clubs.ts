import type { ClubInfo } from "./types";
import clubs from "./data/clubs.json";

/**
 * 利用可能なすべてのJクラブ情報を取得する関数。ソートはカテゴリ順(J1, J2, J3, その他)。
 *
 * @returns {Array<ClubInfo>} すべてのクラブの情報の配列を返します
 *
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts ClubInfo}
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
 * 指定した`clubId`のJクラブ情報を取得する関数
 *
 * @param {string} clubId - クラブID
 * @returns {ClubInfo | undefined} 指定したクラブの情報を返します。存在しない場合は`undefined`を返します。
 *
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts ClubInfo}
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/clubs.yml clubs.yml}
 */
export function getClubById(clubId: string) {
  const clubs = getAllClubs();
  return clubs.find((club) => club.id === clubId);
}

/**
 * 指定したカテゴリのすべてのJクラブ情報を取得する
 *
 * @param {string} category - カテゴリ(J1, J2, J3, JFL)
 *
 * @returns {Array<ClubInfo>} 指定したカテゴリのクラブの情報の配列を返します
 *
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts ClubInfo}
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
