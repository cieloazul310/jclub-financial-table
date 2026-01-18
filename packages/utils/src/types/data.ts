export const AllGeneralFields = [
  "id",
  "clubId",
  "name",
  "short_name",
  "year",
  "category",
  "license",
  "reporting_period_months",
] as const;
export type GeneralFields = (typeof AllGeneralFields)[number];
export type General = {
  id: string;
  clubId: string;
  /**
   * 略称
   * name => short_name
   */
  short_name: string;
  /**
   * 呼称
   * fullname => name
   */
  name: string;
  year: number;
  category: string;
  license?: string | null;
  reporting_period_months?: number;
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
  "expenses",
  "operating_profit",
  "non_operating_income",
  "non_operating_expenses",
  "ordinary_profit",
  "extraordinary_income",
  "extraordinary_loss",
  "profit_before_tax",
  "tax",
  "net_profit",
  "related_companies_revenue",
] as const;
export type PLFields = (typeof AllPLFields)[number];
export type PL = {
  /** 営業収入 */
  revenue: number;
  /** 営業費用 */
  expenses: number;
  /** 営業利益 */
  operating_profit: number;
  /** 営業外収入 */
  non_operating_income?: number | null;
  /** 営業外費用 */
  non_operating_expenses?: number | null;
  /** 経常利益 */
  ordinary_profit: number;
  /** 特別利益 */
  extraordinary_income?: number | null;
  /** 特別損失 */
  extraordinary_loss?: number | null;
  /** 税引前当期利益 */
  profit_before_tax?: number | null;
  /** 法人税および住民税等 */
  tax?: number | null;
  /** 当期純利益 */
  net_profit: number;
  /** 関連する法人の営業収入 */
  related_companies_revenue?: number | null;
};

export const AllBSFields = [
  "assets",
  "current_assets",
  "non_current_assets",
  "liabilities",
  "current_liabilities",
  "non_current_liabilities",
  "net_assets",
  "share_capital",
  "capital_surplus",
  "retained_earnings",
  "net_profit",
] as const;
export type BSFields = (typeof AllBSFields)[number];
export type BS = {
  /** 流動資産 */
  current_assets?: number | null;
  /** 固定資産等 */
  non_current_assets?: number | null;
  /** 総資産 */
  assets?: number | null;
  /** 流動負債 */
  current_liabilities?: number | null;
  /** 固定負債 */
  non_current_liabilities?: number | null;
  /** 総負債 */
  liabilities?: number | null;
  /** 純資産 */
  net_assets?: number | null;
  /** 資本金 */
  share_capital?: number | null;
  /** 資本剰余金 */
  capital_surplus?: number | null;
  /** 利益剰余金 */
  retained_earnings?: number | null;
  /** 当期純利益 */
  net_profit: number;
};

export const AllRevenueFields = [
  "revenue",
  "sponsor_revenue",
  "ticket_revenue",
  "jleague_distribution",
  "academy_revenue",
  "womens_team_revenue",
  "retail_revenue",
  "transfer_revenue",
  "transfer_revenue_international",
  "transfer_revenue_domestic",
  "other_revenue",
  "related_companies_revenue",
] as const;
export type RevenueFields = (typeof AllRevenueFields)[number];
export type Revenue = {
  /** 営業収入 */
  revenue: number;
  /** 広告料収入 */
  sponsor_revenue?: number | null;
  /** 入場料収入 */
  ticket_revenue?: number | null;
  /** Jリーグ配分金 */
  jleague_distribution?: number | null;
  /** アカデミー関連収入 */
  academy_revenue?: number | null;
  /** 女子チーム関連収入 */
  womens_team_revenue?: number | null;
  /** 物販収入 */
  retail_revenue?: number | null;
  /** 移籍補償金等収入 */
  transfer_revenue?: number | null;
  /** 国外クラブからの収入 */
  transfer_revenue_international?: number | null;
  /** 国内クラブからの収入 */
  transfer_revenue_domestic?: number | null;
  /** その他収入 */
  other_revenue?: number | null;
  /** 関連する法人の営業収入 */
  related_companies_revenue?: number | null;
};

export const AllExpenseFields = [
  "expenses",
  "team_wages",
  "transfer_expenses",
  "transfer_expenses_international",
  "transfer_expenses_domestic",
  "manage_expenses",
  "general_expenses",
  "match_expenses",
  "topteam_expenses",
  "academy_expenses",
  "womens_team_expenses",
  "retail_expenses",
  "other_costs",
  "selling_general_admin_expenses",
] as const;
export type ExpenseFields = (typeof AllExpenseFields)[number];
export type Expense = {
  /** 営業費用 */
  expenses: number;
  /** チーム人件費 */
  team_wages?: number | null;
  /** 移籍関連費用 */
  transfer_expenses?: number | null;
  /** 国外クラブからの移籍に関する費用 */
  transfer_expenses_international?: number | null;
  /** 国内クラブからの移籍に関する費用 */
  transfer_expenses_domestic?: number | null;
  /** 事業費 */
  manage_expenses?: number | null;
  /** 総事業費 */
  general_expenses?: number | null;
  /** 試合関連経費 */
  match_expenses?: number | null;
  /** トップチーム運営経費 */
  topteam_expenses?: number | null;
  /** アカデミー関連経費 */
  academy_expenses?: number | null;
  /** 女子チーム運営経費 */
  womens_team_expenses?: number | null;
  /** 物販関連費 */
  retail_expenses?: number | null;
  /** その他売上原価 */
  other_costs?: number | null;
  /** 販売費および一般管理費 */
  selling_general_admin_expenses?: number | null;
};

export const AllAttdFields = [
  "ticket_revenue",
  "all_attendance",
  "all_games",
  "average_attendance",
  "unit_price",
  "league_attendance",
  "league_games",
  "leaguecup_attendance",
  "leaguecup_games",
  "playoffs_attendance",
  "playoffs_games",
  "acl_attendance",
  "acl_games",
  "second_attendance",
  "second_games",
] as const;
export type AttdFields = (typeof AllAttdFields)[number];
export type Attd = {
  /** 入場料収入 */
  ticket_revenue?: number | null;
  /** リーグ戦入場者数 */
  league_attendance: number;
  /** リーグ戦ホーム試合数 */
  league_games: number;
  /** リーグカップ入場者数 */
  leaguecup_attendance?: number | null;
  /** リーグカップホーム試合数 */
  leaguecup_games?: number | null;
  /** PO入場者数 */
  playoffs_attendance?: number | null;
  /** POホーム試合数 */
  playoffs_games?: number | null;
  /** ACL入場者数 */
  acl_attendance?: number | null;
  /** ACLホーム試合数 */
  acl_games?: number | null;
  /** セカンドチーム入場者数 */
  second_attendance?: number | null;
  /** セカンドチームホーム試合数 */
  second_games?: number | null;
  /** 総入場者数 */
  all_attendance: number;
  /** ホーム総試合数 */
  all_games: number;
  /** リーグ戦平均入場者数 */
  average_attendance: number;
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
