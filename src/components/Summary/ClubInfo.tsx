import * as React from 'react';
import { AppLink, ArticleTitle, Ul, Li } from '@cieloazul310/gatsby-theme-aoi';
import Chart from '../Chart';
import type { Club, Datum } from '../../../types';

type ClubInfoProps = {
  club: Omit<Club, 'data' | 'posts'>;
  nodes: {
    node: Datum;
  }[];
};

function ClubInfo({ club, nodes }: ClubInfoProps) {
  return (
    <>
      <ArticleTitle>{club.name}</ArticleTitle>
      {nodes.length > 2 ? <Chart nodes={nodes} /> : null}
      <Ul>
        <Li>正式名称: {club.fullname}</Li>
        <Li>法人名: {club.company}</Li>
        <Li>所属カテゴリ: {club.category}</Li>
        <Li>ホームタウン: {club.hometown}</Li>
        {club.settlement ? (
          <Li>
            経営情報: <AppLink href={club.settlement}>{decodeURIComponent(club.settlement)}</AppLink>
          </Li>
        ) : null}
        {club.relatedCompanies ? <Li>関連する法人: {club.relatedCompanies.join(', ')}</Li> : null}
      </Ul>
    </>
  );
}

export default ClubInfo;
