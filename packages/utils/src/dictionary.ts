import type { FinancialDatum } from "./types";
import dictionary from "./data/dictionary.json";

const has = Object.prototype.hasOwnProperty;

function isDirectoryKey(
  key: string,
): key is keyof Omit<FinancialDatum, "slug"> {
  return has.call(dictionary, key);
}

/**
 * プロパティ名から日本語ラベルを取得する
 * @param key FinancialDatum のプロパティ名
 * @returns 日本語ラベル。未定義のキーの場合はキー名をそのまま返す
 */
export function getLabel(key: string): string {
  if (isDirectoryKey(key)) return dictionary[key];
  return key;
}

/**
 * プロパティ名から日本語ラベルを取得する（オプションつき）
 * @param key FinancialDatum のプロパティ名
 * @param options fallback や後処理のオプション
 * @returns 日本語ラベル
 */
export function getLabelWithOptions(
  key: keyof Omit<FinancialDatum, "slug">,
  options?: {
    /** キーが未定義の場合のフォールバック。省略時はキー名を返す */
    fallback?: string;
    /** ラベルに対する後処理 */
    transform?: (label: string) => string;
  },
): string {
  const label = dictionary[key] ?? options?.fallback ?? key;
  return options?.transform ? options.transform(label) : label;
}
