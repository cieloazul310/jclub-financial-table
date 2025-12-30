import type {
  General,
  SeasonResult,
  PL,
  BS,
  Revenue,
  Expense,
  Attd,
  FinancialDatum,
  SortalbeKeys,
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

export const allSortableFields: SortalbeKeys[] = [
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

export function getGeneral(datum: FinancialDatum): General {
  const { id, name, slug, fullname, year, license, category } = datum;
  return { id, name, slug, fullname, year, license, category };
}

export function getSeasonResult(datum: FinancialDatum): SeasonResult {
  const { rank, points, ppg, elevation } = datum;
  return { rank, points, ppg, elevation };
}

export function getPL(datum: FinancialDatum): PL {
  const {
    revenue,
    expense,
    op_profit,
    no_rev,
    no_exp,
    ordinary_profit,
    sp_rev,
    sp_exp,
    profit_before_tax,
    tax,
    profit,
    related_revenue,
  } = datum;
  return {
    revenue,
    expense,
    op_profit,
    no_rev,
    no_exp,
    ordinary_profit,
    sp_rev,
    sp_exp,
    profit_before_tax,
    tax,
    profit,
    related_revenue,
  };
}

export function getBS(datum: FinancialDatum): BS {
  const {
    assets,
    curr_assets,
    fixed_assets,
    liabilities,
    curr_liabilities,
    fixed_liabilities,
    net_worth,
    capital_stock,
    capital_surplus,
    retained_earnings,
    profit,
  } = datum;
  return {
    assets,
    curr_assets,
    fixed_assets,
    liabilities,
    curr_liabilities,
    fixed_liabilities,
    net_worth,
    capital_stock,
    capital_surplus,
    retained_earnings,
    profit,
  };
}

export function getRevenue(datum: FinancialDatum): Revenue {
  const {
    revenue,
    sponsor,
    ticket,
    broadcast,
    academy_rev,
    women_rev,
    goods_rev,
    transfer_rev,
    transfer_int_rev,
    transfer_dom_rev,
    other_revs,
    related_revenue,
  } = datum;
  return {
    revenue,
    sponsor,
    ticket,
    broadcast,
    academy_rev,
    women_rev,
    goods_rev,
    transfer_rev,
    transfer_int_rev,
    transfer_dom_rev,
    other_revs,
    related_revenue,
  };
}

export function getExpense(datum: FinancialDatum): Expense {
  const {
    expense,
    general_exp,
    salary,
    transfer_exp,
    transfer_int_exp,
    transfer_dom_exp,
    game_exp,
    team_exp,
    academy_exp,
    women_exp,
    goods_exp,
    other_cost,
    manage_exp,
    sga,
  } = datum;
  return {
    expense,
    general_exp,
    salary,
    transfer_exp,
    transfer_int_exp,
    transfer_dom_exp,
    game_exp,
    team_exp,
    academy_exp,
    women_exp,
    goods_exp,
    other_cost,
    manage_exp,
    sga,
  };
}

export function getAttd(datum: FinancialDatum): Attd {
  const {
    all_attd,
    all_games,
    average_attd,
    unit_price,
    league_attd,
    league_games,
    leaguecup_attd,
    leaguecup_games,
    po_attd,
    po_games,
    acl_attd,
    acl_games,
    second_attd,
    second_games,
    ticket,
  } = datum;
  return {
    all_attd,
    all_games,
    average_attd,
    unit_price,
    league_attd,
    league_games,
    leaguecup_attd,
    leaguecup_games,
    po_attd,
    po_games,
    acl_attd,
    acl_games,
    second_attd,
    second_games,
    ticket,
  };
}
