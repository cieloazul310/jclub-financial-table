import type {
  General,
  SeasonResult,
  PL,
  BS,
  Revenue,
  Expense,
  Attd,
  FinancialDatum,
} from "./types/data";

export const generalFields: (keyof General | keyof SeasonResult)[] = [
  "fullname",
  "license",
  "rank",
  "points",
  "ppg",
  "elevation",
];

export const plFields: (keyof PL)[] = [
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
];
export const bsFields: (keyof BS)[] = [
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
];
export const revenueFields: (keyof Revenue)[] = [
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
];
export const expenseFields: (keyof Expense)[] = [
  "salary",
  "transfer_exp",
  "transfer_int_exp",
  "transfer_dom_exp",
  "game_exp",
  "team_exp",
  "academy_exp",
  "women_exp",
  "goods_exp",
  "other_cost",
  "manage_exp",
  "sga",
];
export const attdFields: (keyof Attd)[] = [
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
];

export const allSortableFields = [
  ...plFields,
  ...bsFields,
  ...revenueFields,
  ...expenseFields,
  ...attdFields,
];
export const allFields: (keyof FinancialDatum)[] = [
  ...generalFields,
  ...allSortableFields,
];
