import { z } from "zod";
import type { FinancialDatum } from "@cieloazul310/jclub-financial-utils";

/**
 * 客単価を計算
 */
function calcUnitPrice({
  ticket,
  all_attd,
}: Pick<FinancialDatum, "ticket" | "all_attd">) {
  if (typeof ticket === "number" && Number.isFinite(all_attd) && all_attd > 0) {
    return Math.round((ticket * 1_000_000) / all_attd);
  } else {
    return null;
  }
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
    expense: z.int().nonnegative(),
    op_profit: z.int(),
    ordinary_profit: z.int(),
    profit: z.int(),

    league_attd: z.int().nonnegative(),
    league_games: z.int().nonnegative(),
    all_attd: z.int().nonnegative(),
    all_games: z.int().nonnegative(),
  });
  const OptionalSchema = z.object({
    license: z.string().nullish(),
    elevation: z.enum(["昇格", "降格"]).nullish(),

    no_rev: z.int().nonnegative().nullish(),
    /** 本来 .nonnegative()であるべきだが、G大阪がマイナスの値を持つ */
    no_exp: z.int().nullish(),
    sp_rev: z.int().nonnegative().nullish(),
    sp_exp: z.int().nonnegative().nullish(),
    profit_before_tax: z.int().nullish(),
    tax: z.int().nullish(),
    related_revenue: z.int().nonnegative().nullish(),

    curr_assets: z.int().nonnegative().nullish(),
    fixed_assets: z.int().nonnegative().nullish(),
    assets: z.int().nonnegative().nullish(),

    curr_liabilities: z.int().nonnegative().nullish(),
    fixed_liabilities: z.int().nonnegative().nullish(),
    liabilities: z.int().nonnegative().nullish(),

    net_worth: z.int().nullish(),
    capital_stock: z.int().nonnegative().nullish(),
    /** 本来 .nonnegative()であるべきだが、愛媛がマイナスの値を持つ */
    capital_surplus: z.int().nullish(),
    retained_earnings: z.int().nullish(),

    sponsor: z.int().nonnegative().nullish(),
    ticket: z.int().nonnegative().nullish(),
    broadcast: z.int().nonnegative().nullish(),
    academy_rev: z.int().nonnegative().nullish(),
    women_rev: z.int().nonnegative().nullish(),
    goods_rev: z.int().nonnegative().nullish(),
    transfer_rev: z.int().nonnegative().nullish(),
    transfer_int_rev: z.int().nonnegative().nullish(),
    transfer_dom_rev: z.int().nonnegative().nullish(),
    other_revs: z.int().nonnegative().nullish(),

    salary: z.int().nonnegative().nullish(),
    transfer_exp: z.int().nonnegative().nullish(),
    transfer_int_exp: z.int().nonnegative().nullish(),
    transfer_dom_exp: z.int().nonnegative().nullish(),
    manage_exp: z.int().nonnegative().nullish(),
    general_exp: z.int().nonnegative().nullish(),
    game_exp: z.int().nonnegative().nullish(),
    team_exp: z.int().nonnegative().nullish(),
    academy_exp: z.int().nonnegative().nullish(),
    women_exp: z.int().nonnegative().nullish(),
    goods_exp: z.int().nonnegative().nullish(),
    /** 本来 .nonnegative()であるべきだが、山口がマイナスの値を持つ */
    other_cost: z.int().nullish(),
    sga: z.int().nonnegative().nullish(),

    leaguecup_attd: z.int().nonnegative().nullish(),
    leaguecup_games: z.int().nonnegative().nullish(),
    po_attd: z.int().nonnegative().nullish(),
    po_games: z.int().nonnegative().nullish(),
    acl_attd: z.int().nonnegative().nullish(),
    acl_games: z.int().nonnegative().nullish(),
    second_attd: z.int().nonnegative().nullish(),
    second_games: z.int().nonnegative().nullish(),
  });
  const DatumSchema = z
    .looseObject({})
    .extend(RequiredSchema.shape)
    .extend(OptionalSchema.shape);

  const data = DatumSchema.parse(input);
  const { ticket, all_attd, league_attd, league_games } = data;
  const unit_price = calcUnitPrice({ ticket, all_attd });
  const average_attd = Math.round(league_attd / league_games);

  return {
    ...data,
    unit_price,
    average_attd,
  } satisfies FinancialDatum;
}
