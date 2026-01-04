export const AllGeneralFields = [
  "id",
  "slug",
  "name",
  "fullname",
  "year",
  "category",
  "license",
] as const;
export type GeneralFields = (typeof AllGeneralFields)[number];
export type General = {
  id: string;
  slug: string;
  name: string;
  fullname: string;
  year: number;
  category: string;
  license?: string | null;
};

export const AllSeasonResultFields = [
  "rank",
  "points",
  "ppg",
  "elevation",
] as const;
export type SeasonResultFields = (typeof AllSeasonResultFields)[number];
export type SeasonResult = {
  rank: number;
  points: number;
  ppg: number;
  elevation?: "昇格" | "降格" | null;
};

export const AllPLFields = [
  "revenue",
  "expense",
  "op_profit",
  "no_rev",
  "no_exp",
  "ordinary_profit",
  "sp_rev",
  "sp_exp",
  "profit_before_tax",
  "tax",
  "profit",
  "related_revenue",
] as const;
export type PLFields = (typeof AllPLFields)[number];
export type PL = {
  /** 営業収入 */
  revenue: number;
  /** 営業費用 */
  expense: number;
  /** 営業利益 */
  op_profit: number;
  /** 営業外収入 */
  no_rev?: number | null;
  /** 営業外費用 */
  no_exp?: number | null;
  /** 経常利益 */
  ordinary_profit: number;
  /** 特別利益 */
  sp_rev?: number | null;
  /** 特別損失 */
  sp_exp?: number | null;
  /** 税引前当期利益 */
  profit_before_tax?: number | null;
  /** 法人税および住民税等 */
  tax?: number | null;
  /** 当期純利益 */
  profit: number;
  /** 関連する法人の営業収入 */
  related_revenue?: number | null;
};

export const AllBSFields = [
  "assets",
  "curr_assets",
  "fixed_assets",
  "liabilities",
  "curr_liabilities",
  "fixed_liabilities",
  "net_worth",
  "capital_stock",
  "capital_surplus",
  "retained_earnings",
  "profit",
] as const;
export type BSFields = (typeof AllBSFields)[number];
export type BS = {
  /** 流動資産 */
  curr_assets?: number | null;
  /** 固定資産等 */
  fixed_assets?: number | null;
  /** 総資産 */
  assets?: number | null;
  /** 流動負債 */
  curr_liabilities?: number | null;
  /** 固定負債 */
  fixed_liabilities?: number | null;
  /** 総負債 */
  liabilities?: number | null;
  /** 純資産 */
  net_worth?: number | null;
  /** 資本金 */
  capital_stock?: number | null;
  /** 資本剰余金 */
  capital_surplus?: number | null;
  /** 利益剰余金 */
  retained_earnings?: number | null;
  /** 当期純利益 */
  profit: number;
};

export const AllRevenueFields = [
  "revenue",
  "sponsor",
  "ticket",
  "broadcast",
  "academy_rev",
  "women_rev",
  "goods_rev",
  "transfer_rev",
  "transfer_int_rev",
  "transfer_dom_rev",
  "other_revs",
  "related_revenue",
] as const;
export type RevenueFields = (typeof AllRevenueFields)[number];
export type Revenue = {
  /** 営業収入 */
  revenue: number;
  /** 広告料収入 */
  sponsor?: number | null;
  /** 入場料収入 */
  ticket?: number | null;
  /** Jリーグ配分金 */
  broadcast?: number | null;
  /** アカデミー関連収入 */
  academy_rev?: number | null;
  /** 女子チーム関連収入 */
  women_rev?: number | null;
  /** 物販収入 */
  goods_rev?: number | null;
  /** 移籍補償金等収入 */
  transfer_rev?: number | null;
  /** 国外クラブからの収入 */
  transfer_int_rev?: number | null;
  /** 国内クラブからの収入 */
  transfer_dom_rev?: number | null;
  /** その他収入 */
  other_revs?: number | null;
  /** 関連する法人の営業収入 */
  related_revenue?: number | null;
};

export const AllExpenseFields = [
  "expense",
  "salary",
  "transfer_exp",
  "transfer_int_exp",
  "transfer_dom_exp",
  "manage_exp",
  "general_exp",
  "game_exp",
  "team_exp",
  "academy_exp",
  "women_exp",
  "goods_exp",
  "other_cost",
  "sga",
] as const;
export type ExpenseFields = (typeof AllExpenseFields)[number];
export type Expense = {
  /** 営業費用 */
  expense: number;
  /** チーム人件費 */
  salary?: number | null;
  /** 移籍関連費用 */
  transfer_exp?: number | null;
  /** 国外クラブからの移籍に関する費用 */
  transfer_int_exp?: number | null;
  /** 国内クラブからの移籍に関する費用 */
  transfer_dom_exp?: number | null;
  /** 事業費 */
  manage_exp?: number | null;
  /** 総事業費 */
  general_exp?: number | null;
  /** 試合関連経費 */
  game_exp?: number | null;
  /** トップチーム運営経費 */
  team_exp?: number | null;
  /** アカデミー関連経費 */
  academy_exp?: number | null;
  /** 女子チーム運営経費 */
  women_exp?: number | null;
  /** 物販関連費 */
  goods_exp?: number | null;
  /** その他売上原価 */
  other_cost?: number | null;
  /** 販売費および一般管理費 */
  sga?: number | null;
};

export const AllAttdFields = [
  "ticket",
  "all_attd",
  "all_games",
  "average_attd",
  "unit_price",
  "league_attd",
  "league_games",
  "leaguecup_attd",
  "leaguecup_games",
  "po_attd",
  "po_games",
  "acl_attd",
  "acl_games",
  "second_attd",
  "second_games",
] as const;
export type AttdFields = (typeof AllAttdFields)[number];
export type Attd = {
  /** 入場料収入 */
  ticket: number | null;
  /** リーグ戦入場者数 */
  league_attd: number;
  /** リーグ戦ホーム試合数 */
  league_games: number;
  /** リーグカップ入場者数 */
  leaguecup_attd?: number | null;
  /** リーグカップホーム試合数 */
  leaguecup_games?: number | null;
  /** PO入場者数 */
  po_attd?: number | null;
  /** POホーム試合数 */
  po_games?: number | null;
  /** ACL入場者数 */
  acl_attd?: number | null;
  /** ACLホーム試合数 */
  acl_games?: number | null;
  /** セカンドチーム入場者数 */
  second_attd?: number | null;
  /** セカンドチームホーム試合数 */
  second_games?: number | null;
  /** 総入場者数 */
  all_attd: number;
  /** ホーム総試合数 */
  all_games: number;
  /** リーグ戦平均入場者数 */
  average_attd: number;
  /** 客単価 */
  unit_price?: number | null;
};

export const AllFinancialDatumFields = Array.from(
  new Set([
    ...AllGeneralFields,
    ...AllSeasonResultFields,
    ...AllPLFields,
    ...AllBSFields,
    ...AllRevenueFields,
    ...AllExpenseFields,
    ...AllAttdFields,
  ]),
);

export type FinancialDatum = General &
  SeasonResult &
  PL &
  BS &
  Revenue &
  Expense &
  Attd;
export type FinancialDatumFields = keyof FinancialDatum;

/**
 * @deprecated
 * use `SortableFields`
 */
export type SortableKeys =
  | "rank"
  | PLFields
  | BSFields
  | RevenueFields
  | ExpenseFields
  | AttdFields;

export type SortableFields =
  | "rank"
  | PLFields
  | BSFields
  | RevenueFields
  | ExpenseFields
  | AttdFields;

export type ExtendedDataLike<T = number | string | undefined | null> =
  T extends undefined
    ? undefined
    : {
        value: T;
        delta?: number | null;
      };

export type Extended<T extends Partial<FinancialDatum>> = {
  [key in keyof T]: ExtendedDataLike<T[key]>;
};

export type ExtendedFinancialDatum = Extended<FinancialDatum>;
