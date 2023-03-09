import * as React from 'react';
import { AppLinkButton } from '@cieloazul310/gatsby-theme-aoi';
import { useClubsByCategory } from '../../utils/graphql-hooks';
import type { Club, Category } from '../../../types';

type CategoryLinkCoreProps = {
  clubs: Pick<Club, 'id' | 'short_name' | 'href'>[];
};

export function CategoryLinkCore({ clubs }: CategoryLinkCoreProps) {
  return (
    <>
      {clubs.map((node, index) => (
        <AppLinkButton key={node.id ?? index} href={node.href} color="inherit">
          {node.short_name}
        </AppLinkButton>
      ))}
    </>
  );
}

export function J1Link() {
  const { j1 } = useClubsByCategory();
  return <CategoryLinkCore clubs={j1.nodes} />;
}

export function J2Link() {
  const { j2 } = useClubsByCategory();
  return <CategoryLinkCore clubs={j2.nodes} />;
}

export function J3Link() {
  const { j3 } = useClubsByCategory();
  return <CategoryLinkCore clubs={j3.nodes} />;
}

export function CategoryLink({ category }: { category: Category }) {
  if (category === 'J1') return <J1Link />;
  if (category === 'J2') return <J2Link />;
  if (category === 'J3') return <J3Link />;
  return null;
}
