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
  { id: "expense", strong: true },
  { id: "op_profit", emphasized: true, strong: true },
  { id: "no_rev", inset: true },
  { id: "no_exp", inset: true },
  { id: "ordinary_profit", emphasized: true, strong: true },
  { id: "sp_rev", inset: true },
  { id: "sp_exp", inset: true },
  { id: "profit_before_tax", emphasized: true, strong: true },
  { id: "tax", inset: true },
  { id: "profit", emphasized: true, strong: true },
  { id: "related_revenue", label: "(関連する法人の営業収入)" },
];

export const bsCardValues: CardValue<BS>[] = [
  { id: "assets", emphasized: true, strong: true },
  { id: "curr_assets", inset: true },
  { id: "fixed_assets", inset: true },
  { id: "liabilities", emphasized: true, strong: true },
  { id: "curr_liabilities", inset: true },
  { id: "fixed_liabilities", inset: true },
  {
    id: "net_worth",
    emphasized: true,
    strong: true,
    redIfMinus: true,
  },
  { id: "capital_stock", inset: true },
  { id: "capital_surplus", inset: true },
  { id: "retained_earnings", inset: true },
  { id: "profit", label: "(当期純利益)", inset: true },
];

export const revenueCardValues: CardValue<Revenue>[] = [
  { id: "revenue", emphasized: true, strong: true },
  { id: "sponsor" },
  { id: "ticket" },
  { id: "broadcast" },
  { id: "academy_rev" },
  { id: "women_rev" },
  { id: "goods_rev" },
  { id: "transfer_rev" },
  { id: "transfer_int_rev", label: "国外クラブからの収入", inset: true },
  { id: "transfer_dom_rev", label: "国内クラブからの収入", inset: true },
  { id: "other_revs" },
  { id: "related_revenue", label: "(関連する法人の営業収入)" },
];

export const expenseCardValues: CardValue<Expense>[] = [
  { id: "expense", emphasized: true, strong: true },
  { id: "salary" },
  { id: "manage_exp" },
  { id: "game_exp" },
  { id: "team_exp" },
  { id: "academy_exp" },
  { id: "women_exp" },
  { id: "goods_exp" },
  { id: "transfer_exp" },
  { id: "transfer_int_exp", label: "国外クラブからの移籍", inset: true },
  { id: "transfer_dom_exp", label: "国内クラブからの移籍", inset: true },
  { id: "other_cost" },
  { id: "sga" },
];

export const attdCardValues: CardValue<Attd>[] = [
  { id: "ticket", emphasized: true, strong: true },
  { id: "average_attd", strong: true, separator: true },
  { id: "unit_price", strong: true },
  { id: "all_attd", emphasized: true, strong: true, separator: true },
  { id: "league_attd", label: "リーグ戦", separator: true, inset: true },
  { id: "leaguecup_attd", label: "リーグカップ", separator: true, inset: true },
  { id: "acl_attd", label: "ACL", separator: true, inset: true },
  { id: "po_attd", label: "プレーオフ", separator: true, inset: true },
  { id: "second_attd", label: "U-23", separator: true, inset: true },
  { id: "all_games", emphasized: true, strong: true, separator: true },
  { id: "league_games", label: "リーグ戦", separator: true, inset: true },
  {
    id: "leaguecup_games",
    label: "リーグカップ",
    separator: true,
    inset: true,
  },
  { id: "acl_games", label: "ACL", separator: true, inset: true },
  { id: "po_games", label: "プレーオフ", separator: true, inset: true },
  { id: "second_games", label: "U-23", separator: true, inset: true },
];

export const cardValues = {
  pl: plCardValues,
  bs: bsCardValues,
  revenue: revenueCardValues,
  expense: expenseCardValues,
  attd: attdCardValues,
};
