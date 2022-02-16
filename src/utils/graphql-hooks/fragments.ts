import { useStaticQuery, graphql } from 'gatsby';

export default function useFragments() {
  useStaticQuery<Record<string, unknown>>(graphql`
    fragment generalFields on Data {
      id
      name
      slug
      fullname
      year
      category
      license
    }
    fragment seasonResultFields on Data {
      rank
      points
      ppg
      elevation
    }
    fragment plFields on Data {
      revenue
      expense
      op_profit
      no_rev
      no_exp
      ordinary_profit
      sp_rev
      sp_exp
      profit_before_tax
      tax
      profit
      related_revenue
    }
    fragment bsFields on Data {
      curr_assets
      fixed_assets
      assets
      curr_liabilities
      fixed_liabilities
      liabilities
      net_worth
      capital_stock
      capital_surplus
      retained_earnings
      profit
    }
    fragment revenueFields on Data {
      revenue
      sponsor
      ticket
      broadcast
      academy_rev
      goods_rev
      other_revs
      related_revenue
    }
    fragment expenseFields on Data {
      expense
      salary
      manage_exp
      general_exp
      game_exp
      team_exp
      academy_exp
      women_exp
      goods_exp
      sga
    }
    fragment attdFields on Data {
      league_attd
      league_games
      leaguecup_attd
      leaguecup_games
      po_attd
      po_games
      acl_attd
      acl_games
      second_attd
      second_games
      all_attd
      all_games
      average_attd
      unit_price
    }
  `);
}
