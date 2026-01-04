import type {
  FinancialDatum,
  ExtendedFinancialDatum,
  GeneralFields,
  SeasonResultFields,
  PLFields,
  BSFields,
  RevenueFields,
  ExpenseFields,
  AttdFields,
} from "./types/data";

export function getGeneral<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in GeneralFields]: T[key];
} {
  const { id, slug, name, short_name, year, license, category } = datum;
  return { id, name, slug, short_name, year, license, category };
}

export function getSeasonResult<
  T extends FinancialDatum | ExtendedFinancialDatum,
>(
  datum: T,
): {
  [key in SeasonResultFields]: T[key];
} {
  const { rank, points, ppg, elevation } = datum;
  return { rank, points, ppg, elevation };
}

export function getPL<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in PLFields]: T[key];
} {
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

export function getBS<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in BSFields]: T[key];
} {
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

export function getRevenue<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in RevenueFields]: T[key];
} {
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

export function getExpense<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in ExpenseFields]: T[key];
} {
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

export function getAttd<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in AttdFields]: T[key];
} {
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
