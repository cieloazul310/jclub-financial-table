import type { FinancialDatum } from "./types";
import dictionary from "./data/dictionary.json";

const has = Object.prototype.hasOwnProperty;

function isDirectoryKey(
  key: string,
): key is keyof Omit<FinancialDatum, "clubId"> {
  return has.call(dictionary, key);
}

/**
 * プロパティ名から日本語ラベルを取得する
 *
 * @param {string} key - `FinancialDatum` のプロパティ名 {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/data.ts FinancialDatum}
 * @returns {string} - 日本語ラベル。未定義のキーの場合はキー名をそのまま返す
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/dictionary.yml dictionary.yml}
 */
export function getLabel(key: string): string {
  if (isDirectoryKey(key)) return dictionary[key].label_ja;
  return key;
}

/**
 * プロパティ名から日本語ラベルを取得する（オプションつき）
 *
 * @param {string} key - `FinancialDatum` のプロパティ名 {@link https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/data.ts FinancialDatum}
 * @param {Object} [options] - fallback や後処理のオプション
 * @param {string} [options.fallback] - キーが未定義の場合のフォールバック。省略時はキー名を返す
 * @returns {string} - 日本語ラベル
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/dictionary.yml dictionary.yml}
 */
export function getLabelWithOptions(
  key: string,
  options?: {
    /** キーが未定義の場合のフォールバック。省略時はキー名を返す */
    fallback?: string;
    /** ラベルに対する後処理 */
    transform?: (label: string) => string;
  },
): string {
  if (!isDirectoryKey(key)) return options?.fallback ?? key;
  const label = dictionary[key].label_ja ?? options?.fallback ?? key;
  return options?.transform ? options.transform(label) : label;
}
