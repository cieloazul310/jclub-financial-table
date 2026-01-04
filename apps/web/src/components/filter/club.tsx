"use client";

import {
  getClubsByCategory,
  type ClubInfo,
} from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Checkbox } from "@/components/ui/checkbox";
import { ActiveChip, InactiveChip } from "./chips";

const clubsByCategories = [
  {
    id: "J1",
    title: "J1",
    clubs: getClubsByCategory("J1"),
  },
  {
    id: "J2",
    title: "J2",
    clubs: getClubsByCategory("J2"),
  },
  {
    id: "J3",
    title: "J3",
    clubs: getClubsByCategory("J3"),
  },
  {
    id: "others",
    title: "JFL",
    clubs: getClubsByCategory("JFL"),
  },
];

type ClubFilterProps = {
  visibleClubs: string[];
  toggleVisibleClubs: (slug: string) => void;
  setVisibleClubs: (clubs: string[]) => void;
  setInvisibleClubs: (clubs: string[]) => void;
  chipClassName?: string;
  chipLabel?: (slug: string) => string;
} & HTMLStyledProps<"div">;

export function ClubFilter({
  visibleClubs,
  toggleVisibleClubs,
  setVisibleClubs,
  setInvisibleClubs,
  display = "grid",
  gridTemplateColumns = {
    base: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
  },
  gap = 4,
  chipClassName = css({
    minHeight: "unset",
    py: 0.5,
    textStyle: "oln-14B-100",
  }),
  ...rest
}: ClubFilterProps) {
  const props = { display, gap, gridTemplateColumns, ...rest };
  const onClubClick = (slug: string) => () => {
    toggleVisibleClubs(slug);
  };
  const selectedClubs = (clubs: ClubInfo[]) => {
    return clubs.filter(({ slug }) => visibleClubs.includes(slug));
  };
  const onCheckedChange = (clubs: ClubInfo[]) => () => {
    const selected = selectedClubs(clubs);
    if (selected.length === clubs.length) {
      setInvisibleClubs(clubs.map(({ slug }) => slug));
    } else {
      setVisibleClubs(clubs.map(({ slug }) => slug));
    }
  };

  return (
    <styled.div {...props}>
      {clubsByCategories.map(({ id, title, clubs }) => (
        <section key={id}>
          <Checkbox.Root
            checked={
              selectedClubs(clubs).length === clubs.length
                ? true
                : selectedClubs(clubs).length === 0
                  ? false
                  : "indeterminate"
            }
            onCheckedChange={onCheckedChange(clubs)}
          >
            <Checkbox.Control>
              <Checkbox.Indicator />
              <Checkbox.Indicator indeterminate />
            </Checkbox.Control>
            <Checkbox.HiddenInput />
            <Checkbox.Label>{title}</Checkbox.Label>
          </Checkbox.Root>
          <div
            className={css({
              display: "inline-flex",
              gap: 1,
              flexWrap: "wrap",
            })}
          >
            {clubs.map(({ slug, short_name }) =>
              visibleClubs.includes(slug) ? (
                <ActiveChip
                  key={slug}
                  className={chipClassName}
                  onClick={onClubClick(slug)}
                >
                  {short_name}
                </ActiveChip>
              ) : (
                <InactiveChip
                  key={slug}
                  className={chipClassName}
                  onClick={onClubClick(slug)}
                >
                  {short_name}
                </InactiveChip>
              ),
            )}
          </div>
        </section>
      ))}
    </styled.div>
  );
}
