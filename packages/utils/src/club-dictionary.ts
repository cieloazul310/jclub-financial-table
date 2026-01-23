import type { ClubInfo } from "./types";

export const clubInfoDictionary: Record<keyof ClubInfo, string> = {
  id: "id",
  code: "code",
  name: "呼称",
  fullname: "正式名称",
  short_name: "略称",
  company: "法人名",
  category: "所属カテゴリ",
  hometown: "ホームタウン",
  area: "活動エリア",
  period: "決算期",
  website: "公式サイト",
  settlement: "決算情報",
  relatedCompanies: "関連する法人",
  annotation: "注記",
};

const has = Object.prototype.hasOwnProperty;

function isDirectoryKey(key: string): key is keyof ClubInfo {
  return has.call(clubInfoDictionary, key);
}

/**
 * プロパティ名から日本語ラベルを取得する
 *
 * @param {string} key - `ClubInfo` のプロパティ名 {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts ClubInfo}
 * @returns {string} - 日本語ラベル。未定義のキーの場合はキー名をそのまま返す
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/club-dictionary.ts club-dictionary.ts}
 */
export function getClubInfoLabel(key: string): string {
  if (isDirectoryKey(key)) return clubInfoDictionary[key];
  return key;
}

/**
 * プロパティ名から日本語ラベルを取得する（オプションつき）
 *
 * @param {string} key - `ClubInfo` のプロパティ名 {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts ClubInfo}
 * @param {Object} [options] - fallback や後処理のオプション
 * @param {string} [options.fallback] - キーが未定義の場合のフォールバック。省略時はキー名を返す
 * @param {(label: string) => string} [options.transform] - ラベルに対する後処理
 * @returns {string} - 日本語ラベル
 */
export function getClubInfoLabelWithOptions(
  key: keyof ClubInfo,
  options?: {
    /** キーが未定義の場合のフォールバック。省略時はキー名を返す */
    fallback?: string;
    /** ラベルに対する後処理 */
    transform?: (label: string) => string;
  },
): string {
  const label = clubInfoDictionary[key] ?? options?.fallback ?? key;
  return options?.transform ? options.transform(label) : label;
}
