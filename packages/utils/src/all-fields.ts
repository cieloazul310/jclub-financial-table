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
  const {
    id,
    clubId,
    name,
    short_name,
    year,
    license,
    category,
    reporting_period_months,
  } = datum;
  return {
    id,
    clubId,
    name,
    short_name,
    year,
    license,
    category,
    reporting_period_months,
  };
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
    expenses,
    operating_profit,
    non_operating_income,
    non_operating_expenses,
    ordinary_profit,
    extraordinary_income,
    extraordinary_loss,
    profit_before_tax,
    tax,
    net_profit,
    related_companies_revenue,
  } = datum;
  return {
    revenue,
    expenses,
    operating_profit,
    non_operating_income,
    non_operating_expenses,
    ordinary_profit,
    extraordinary_income,
    extraordinary_loss,
    profit_before_tax,
    tax,
    net_profit,
    related_companies_revenue,
  };
}

export function getBS<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in BSFields]: T[key];
} {
  const {
    assets,
    current_assets,
    non_current_assets,
    liabilities,
    current_liabilities,
    non_current_liabilities,
    net_assets,
    share_capital,
    capital_surplus,
    retained_earnings,
    net_profit,
  } = datum;
  return {
    assets,
    current_assets,
    non_current_assets,
    liabilities,
    current_liabilities,
    non_current_liabilities,
    net_assets,
    share_capital,
    capital_surplus,
    retained_earnings,
    net_profit,
  };
}

export function getRevenue<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in RevenueFields]: T[key];
} {
  const {
    revenue,
    sponsor_revenue,
    ticket_revenue,
    jleague_distribution,
    academy_revenue,
    womens_team_revenue,
    retail_revenue,
    transfer_revenue,
    transfer_revenue_international,
    transfer_revenue_domestic,
    other_revenue,
    related_companies_revenue,
  } = datum;
  return {
    revenue,
    sponsor_revenue,
    ticket_revenue,
    jleague_distribution,
    academy_revenue,
    womens_team_revenue,
    retail_revenue,
    transfer_revenue,
    transfer_revenue_international,
    transfer_revenue_domestic,
    other_revenue,
    related_companies_revenue,
  };
}

export function getExpense<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in ExpenseFields]: T[key];
} {
  const {
    expenses,
    general_expenses,
    team_wages,
    transfer_expenses,
    transfer_expenses_international,
    transfer_expenses_domestic,
    match_expenses,
    topteam_expenses,
    academy_expenses,
    womens_team_expenses,
    retail_expenses,
    other_costs,
    manage_expenses,
    selling_general_admin_expenses,
  } = datum;
  return {
    expenses,
    general_expenses,
    team_wages,
    transfer_expenses,
    transfer_expenses_international,
    transfer_expenses_domestic,
    match_expenses,
    topteam_expenses,
    academy_expenses,
    womens_team_expenses,
    retail_expenses,
    other_costs,
    manage_expenses,
    selling_general_admin_expenses,
  };
}

export function getAttd<T extends FinancialDatum | ExtendedFinancialDatum>(
  datum: T,
): {
  [key in AttdFields]: T[key];
} {
  const {
    all_attendance,
    all_games,
    average_attendance,
    unit_price,
    league_attendance,
    league_games,
    leaguecup_attendance,
    leaguecup_games,
    playoffs_attendance,
    playoffs_games,
    acl_attendance,
    acl_games,
    second_attendance,
    second_games,
    ticket_revenue,
  } = datum;
  return {
    all_attendance,
    all_games,
    average_attendance,
    unit_price,
    league_attendance,
    league_games,
    leaguecup_attendance,
    leaguecup_games,
    playoffs_attendance,
    playoffs_games,
    acl_attendance,
    acl_games,
    second_attendance,
    second_games,
    ticket_revenue,
  };
}
