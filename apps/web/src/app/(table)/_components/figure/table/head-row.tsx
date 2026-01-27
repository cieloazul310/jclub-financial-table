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
      <TableHeadCell mode={mode} sortableKey="expenses">
        営業費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="operating_profit">
        営業利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="non_operating_income">
        営業外収益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="non_operating_expenses">
        営業外費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="ordinary_profit">
        経常利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="extraordinary_income">
        特別利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="extraordinary_loss">
        特別損失
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="profit_before_tax">
        税引前
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="tax">
        法人税等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="net_profit">
        当期純利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="related_companies_revenue">
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
      <TableHeadCell mode={mode} sortableKey="current_assets">
        流動資産
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="non_current_assets">
        固定資産等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="liabilities">
        負債の部
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="current_liabilities">
        流動負債
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="non_current_liabilities">
        固定負債
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="net_assets">
        純資産の部
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="share_capital">
        資本金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="capital_surplus">
        資本剰余金等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="retained_earnings">
        利益剰余金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="net_profit">
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
      <TableHeadCell mode={mode} sortableKey="sponsor_revenue">
        スポンサー
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="ticket_revenue">
        入場料
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="jleague_distribution">
        配分金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="academy_revenue">
        アカデミー関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="retail_revenue">
        物販
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="womens_team_revenue">
        女子チーム
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_revenue_international">
        国際移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_revenue_domestic">
        国内移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="other_revenue">
        その他
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="related_companies_revenue">
        (関連法人)
      </TableHeadCell>
    </Table.Row>
  );
}

export function ExpenseTableHeadRow({ mode }: TableHeadRowProps) {
  return (
    <Table.Row>
      <TableHeadHeader mode={mode} />
      <TableHeadCell mode={mode} sortableKey="expenses">
        営業費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="team_wages">
        チーム
        <wbr />
        人件費
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_expenses_international">
        国際移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="transfer_expenses_domestic">
        国内移籍
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="match_expenses">
        試合関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="topteam_expenses">
        トップチーム
        <wbr />
        運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="academy_expenses">
        アカデミー
        <wbr />
        運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="womens_team_expenses">
        女子チーム
        <wbr />
        運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="retail_expenses">
        物販関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="other_costs">
        その他
        <wbr />
        売上原価
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="selling_general_admin_expenses">
        販管費
      </TableHeadCell>
    </Table.Row>
  );
}

export function AttdTableHeadRow({ mode }: TableHeadRowProps) {
  return (
    <Table.Row>
      <TableHeadHeader mode={mode} />
      <TableHeadCell mode={mode} sortableKey="ticket_revenue">
        入場料収入
      </TableHeadCell>
      <TableHeadCell mode={mode}>
        リーグ
        <wbr />
        ホーム数
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="average_attendance">
        リーグ戦
        <wbr />
        平均
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="league_attendance">
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
      <TableHeadCell mode={mode} sortableKey="all_attendance">
        年間入場者数
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="unit_price">
        客単価
      </TableHeadCell>
    </Table.Row>
  );
}
