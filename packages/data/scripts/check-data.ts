import { z } from "zod";
import type { FinancialDatum } from "@cieloazul310/jclub-financial-utils";

/**
 * 客単価を計算
 */
function calcUnitPrice({
  ticket_revenue,
  all_attendance,
}: Pick<FinancialDatum, "ticket_revenue" | "all_attendance">) {
  if (
    typeof ticket_revenue === "number" &&
    Number.isFinite(all_attendance) &&
    all_attendance > 0
  ) {
    return Math.round((ticket_revenue * 1_000_000) / all_attendance);
  } else {
    return null;
  }
}

function periodMonths({
  reporting_period_months,
}: {
  reporting_period_months?: number | undefined | null;
}) {
  if (!reporting_period_months) return 12;
  return reporting_period_months;
}

/**
 * 原データをZodで型チェック
 */
export function checkData(input: any) {
  const RequiredSchema = z.object({
    id: z.string(),
    clubId: z.string(),
    name: z.string(),
    short_name: z.string(),
    year: z.int().gte(2005).lte(2024),
    category: z.string(),

    rank: z.int().positive(),
    points: z.int().nonnegative(),
    ppg: z.number().nonnegative().lte(3),

    revenue: z.int().nonnegative(),
    expenses: z.int().nonnegative(),
    operating_profit: z.int(),
    ordinary_profit: z.int(),
    net_profit: z.int(),

    league_attendance: z.int().nonnegative(),
    league_games: z.int().nonnegative(),
    all_attendance: z.int().nonnegative(),
    all_games: z.int().nonnegative(),
  });
  const OptionalSchema = z.object({
    reporting_period_months: z.int().nullish(),
    license: z.string().nullish(),
    elevation: z.enum(["昇格", "降格"]).nullish(),

    non_operating_income: z.int().nonnegative().nullish(),
    /** 本来 .nonnegative()であるべきだが、G大阪がマイナスの値を持つ */
    non_operating_expenses: z.int().nullish(),
    extraordinary_income: z.int().nonnegative().nullish(),
    extraordinary_loss: z.int().nonnegative().nullish(),
    profit_before_tax: z.int().nullish(),
    tax: z.int().nullish(),
    related_companies_revenue: z.int().nonnegative().nullish(),

    current_assets: z.int().nonnegative().nullish(),
    non_current_assets: z.int().nonnegative().nullish(),
    assets: z.int().nonnegative().nullish(),

    current_liabilities: z.int().nonnegative().nullish(),
    non_current_liabilities: z.int().nonnegative().nullish(),
    liabilities: z.int().nonnegative().nullish(),

    net_assets: z.int().nullish(),
    share_capital: z.int().nonnegative().nullish(),
    /** 本来 .nonnegative()であるべきだが、愛媛がマイナスの値を持つ */
    capital_surplus: z.int().nullish(),
    retained_earnings: z.int().nullish(),

    sponsor_revenue: z.int().nonnegative().nullish(),
    ticket_revenue: z.int().nonnegative().nullish(),
    jleague_distribution: z.int().nonnegative().nullish(),
    academy_revenue: z.int().nonnegative().nullish(),
    womens_team_revenue: z.int().nonnegative().nullish(),
    retail_revenue: z.int().nonnegative().nullish(),
    transfer_revenue: z.int().nonnegative().nullish(),
    transfer_revenue_international: z.int().nonnegative().nullish(),
    transfer_revenue_domestic: z.int().nonnegative().nullish(),
    other_revenue: z.int().nonnegative().nullish(),

    team_wages: z.int().nonnegative().nullish(),
    transfer_expenses: z.int().nonnegative().nullish(),
    transfer_expenses_international: z.int().nonnegative().nullish(),
    transfer_expenses_domestic: z.int().nonnegative().nullish(),
    manage_expenses: z.int().nonnegative().nullish(),
    general_expenses: z.int().nonnegative().nullish(),
    match_expenses: z.int().nonnegative().nullish(),
    topteam_expenses: z.int().nonnegative().nullish(),
    academy_expenses: z.int().nonnegative().nullish(),
    womens_team_expenses: z.int().nonnegative().nullish(),
    retail_expenses: z.int().nonnegative().nullish(),
    /** 本来 .nonnegative()であるべきだが、山口がマイナスの値を持つ */
    other_costs: z.int().nullish(),
    selling_general_admin_expenses: z.int().nonnegative().nullish(),

    leaguecup_attendance: z.int().nonnegative().nullish(),
    leaguecup_games: z.int().nonnegative().nullish(),
    playoffs_attendance: z.int().nonnegative().nullish(),
    playoffs_games: z.int().nonnegative().nullish(),
    acl_attendance: z.int().nonnegative().nullish(),
    acl_games: z.int().nonnegative().nullish(),
    second_attendance: z.int().nonnegative().nullish(),
    second_games: z.int().nonnegative().nullish(),
  });
  const DatumSchema = z
    .looseObject({})
    .extend(RequiredSchema.shape)
    .extend(OptionalSchema.shape);

  const data = DatumSchema.parse(input);
  const { ticket_revenue, all_attendance, league_attendance, league_games } =
    data;
  const unit_price = calcUnitPrice({ ticket_revenue, all_attendance });
  const average_attendance = Math.round(league_attendance / league_games);
  const reporting_period_months = periodMonths(data);

  return {
    ...data,
    reporting_period_months,
    unit_price,
    average_attendance,
  } satisfies FinancialDatum;
}
