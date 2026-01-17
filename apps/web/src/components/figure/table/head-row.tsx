import { Table } from "@/components/ui/table";
import type { Mode } from "@/utils/types";
import { TableHeadLabel } from "./label";
import { TableHeadCell } from "./head-cell";

function TableHeadHeader({ mode }: { mode: Mode }) {
  return (
    <>
      <TableHeadLabel mode={mode} />
      <TableHeadCell mode={mode}>所属</TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="rank">
        順位
      </TableHeadCell>
    </>
  );
}

type TableHeadRowProps = {
  mode: Mode;
};

export function PLTableHeadRow({ mode }: TableHeadRowProps) {
  return (
    <Table.Row>
      <TableHeadHeader mode={mode} />
      <TableHeadCell mode={mode} sortableKey="revenue">
        営業収入
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="expense">
        営業費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="op_profit">
        営業利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="no_rev">
        営業外収益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="no_exp">
        営業外費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="ordinary_profit">
        経常利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="sp_rev">
        特別利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="sp_exp">
        特別損失
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="profit_before_tax">
        税引前
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="tax">
        法人税等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="profit">
        当期純利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="related_revenue">
        (関連法人)
      </TableHeadCell>
    </Table.Row>
  );
}

export function BSTableHeadRow({ mode }: TableHeadRowProps) {
  return (
    <Table.Row>
      <TableHeadHeader mode={mode} />
      <TableHeadCell mode={mode} sortableKey="assets">
        資産の部
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="curr_assets">
        流動資産
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="fixed_assets">
        固定資産等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="liabilities">
        負債の部
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="curr_liabilities">
        流動負債
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="fixed_liabilities">
        固定負債
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="net_worth">
        純資産の部
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="capital_stock">
        資本金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="capital_surplus">
        資本剰余金等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="retained_earnings">
        利益剰余金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="profit">
        (当期純利益)
      </TableHeadCell>
    </Table.Row>
  );
}

export function RevenueTableHeadRow({ mode }: TableHeadRowProps) {
  return (
    <Table.Row>
      <TableHeadHeader mode={mode} />
      <TableHeadCell mode={mode} sortableKey="revenue">
        営業収入
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="sponsor">
        スポンサー
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="ticket">
        入場料
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="broadcast">
        配分金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="academy_rev">
        アカデミー関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="goods_rev">
        物販
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="women_rev">
        女子チーム
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_int_rev">
        国際移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_dom_rev">
        国内移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="other_revs">
        その他
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="related_revenue">
        (関連法人)
      </TableHeadCell>
    </Table.Row>
  );
}

export function ExpenseTableHeadRow({ mode }: TableHeadRowProps) {
  return (
    <Table.Row>
      <TableHeadHeader mode={mode} />
      <TableHeadCell mode={mode} sortableKey="expense">
        営業費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="salary">
        チーム
        <wbr />
        人件費
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_int_exp">
        国際移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_dom_exp">
        国内移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="game_exp">
        試合関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="team_exp">
        トップチーム
        <wbr />
        運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="academy_exp">
        アカデミー
        <wbr />
        運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="women_exp">
        女子チーム
        <wbr />
        運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="goods_exp">
        物販関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="other_cost">
        その他
        <wbr />
        売上原価
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="sga">
        販管費
      </TableHeadCell>
    </Table.Row>
  );
}

export function AttdTableHeadRow({ mode }: TableHeadRowProps) {
  return (
    <Table.Row>
      <TableHeadHeader mode={mode} />
      <TableHeadCell mode={mode} sortableKey="ticket">
        入場料収入
      </TableHeadCell>
      <TableHeadCell mode={mode}>
        リーグ
        <wbr />
        ホーム数
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="average_attd">
        リーグ戦
        <wbr />
        平均
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="league_attd">
        リーグ戦
        <wbr />
        入場者数
      </TableHeadCell>
      {/*
        displayFullAttd && (
        <>
          <TableHeadCell mode={mode}>リーグカップ入場者数</TableHeadCell>
          <TableHeadCell mode={mode}>ACL入場者数</TableHeadCell>
          <TableHeadCell mode={mode}>PO入場者数</TableHeadCell>
          <TableHeadCell mode={mode}>セカンド入場者数</TableHeadCell>
        </>
      )*/}
      <TableHeadCell mode={mode}>ホーム試合数</TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="all_attd">
        年間入場者数
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="unit_price">
        客単価
      </TableHeadCell>
    </Table.Row>
  );
}
