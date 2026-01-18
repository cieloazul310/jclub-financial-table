import type {
  FinancialDatum,
  PL,
  BS,
  Revenue,
  Expense,
  Attd,
} from "@cieloazul310/jclub-financial";

export type CardValue<T extends Partial<FinancialDatum>> = {
  id: keyof T;
  label?: string;
  inset?: boolean;
  emphasized?: boolean;
  strong?: boolean;
  redIfMinus?: boolean;
  separator?: boolean;
};

export const plCardValues: CardValue<PL>[] = [
  { id: "revenue", strong: true },
  { id: "expenses", strong: true },
  { id: "operating_profit", emphasized: true, strong: true },
  { id: "non_operating_income", inset: true },
  { id: "non_operating_expenses", inset: true },
  { id: "ordinary_profit", emphasized: true, strong: true },
  { id: "extraordinary_income", inset: true },
  { id: "extraordinary_loss", inset: true },
  { id: "profit_before_tax", emphasized: true, strong: true },
  { id: "tax", inset: true },
  { id: "net_profit", emphasized: true, strong: true },
  { id: "related_companies_revenue", label: "(関連する法人の営業収入)" },
];

export const bsCardValues: CardValue<BS>[] = [
  { id: "assets", emphasized: true, strong: true },
  { id: "current_assets", inset: true },
  { id: "non_current_assets", inset: true },
  { id: "liabilities", emphasized: true, strong: true },
  { id: "current_liabilities", inset: true },
  { id: "non_current_liabilities", inset: true },
  {
    id: "net_assets",
    emphasized: true,
    strong: true,
    redIfMinus: true,
  },
  { id: "share_capital", inset: true },
  { id: "capital_surplus", inset: true },
  { id: "retained_earnings", inset: true },
  { id: "net_profit", label: "(当期純利益)", inset: true },
];

export const revenueCardValues: CardValue<Revenue>[] = [
  { id: "revenue", emphasized: true, strong: true },
  { id: "sponsor_revenue" },
  { id: "ticket_revenue" },
  { id: "jleague_distribution" },
  { id: "academy_revenue" },
  { id: "womens_team_revenue" },
  { id: "retail_revenue" },
  { id: "transfer_revenue" },
  {
    id: "transfer_revenue_international",
    label: "国外クラブからの収入",
    inset: true,
  },
  {
    id: "transfer_revenue_domestic",
    label: "国内クラブからの収入",
    inset: true,
  },
  { id: "other_revenue" },
  { id: "related_companies_revenue", label: "(関連する法人の営業収入)" },
];

export const expenseCardValues: CardValue<Expense>[] = [
  { id: "expenses", emphasized: true, strong: true },
  { id: "team_wages" },
  { id: "manage_expenses" },
  { id: "match_expenses" },
  { id: "topteam_expenses" },
  { id: "academy_expenses" },
  { id: "womens_team_expenses" },
  { id: "retail_expenses" },
  { id: "transfer_expenses" },
  {
    id: "transfer_expenses_international",
    label: "国外クラブからの移籍",
    inset: true,
  },
  {
    id: "transfer_expenses_domestic",
    label: "国内クラブからの移籍",
    inset: true,
  },
  { id: "other_costs" },
  { id: "selling_general_admin_expenses" },
];

export const attdCardValues: CardValue<Attd>[] = [
  { id: "ticket_revenue", emphasized: true, strong: true },
  { id: "average_attendance", strong: true, separator: true },
  { id: "unit_price", strong: true },
  { id: "all_attendance", emphasized: true, strong: true, separator: true },
  { id: "league_attendance", label: "リーグ戦", separator: true, inset: true },
  {
    id: "leaguecup_attendance",
    label: "リーグカップ",
    separator: true,
    inset: true,
  },
  { id: "acl_attendance", label: "ACL", separator: true, inset: true },
  {
    id: "playoffs_attendance",
    label: "プレーオフ",
    separator: true,
    inset: true,
  },
  { id: "second_attendance", label: "U-23", separator: true, inset: true },
  { id: "all_games", emphasized: true, strong: true, separator: true },
  { id: "league_games", label: "リーグ戦", separator: true, inset: true },
  {
    id: "leaguecup_games",
    label: "リーグカップ",
    separator: true,
    inset: true,
  },
  { id: "acl_games", label: "ACL", separator: true, inset: true },
  { id: "playoffs_games", label: "プレーオフ", separator: true, inset: true },
  { id: "second_games", label: "U-23", separator: true, inset: true },
];

export const cardValues = {
  pl: plCardValues,
  bs: bsCardValues,
  revenue: revenueCardValues,
  expense: expenseCardValues,
  attd: attdCardValues,
};
