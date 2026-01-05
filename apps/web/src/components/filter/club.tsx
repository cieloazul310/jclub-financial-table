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
  toggleVisibleClubs: (id: string) => void;
  setVisibleClubs: (clubIds: string[]) => void;
  setInvisibleClubs: (clubIds: string[]) => void;
  chipClassName?: string;
  chipLabel?: (id: string) => string;
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
  const onClubClick = (id: string) => () => {
    toggleVisibleClubs(id);
  };
  const selectedClubs = (clubs: ClubInfo[]) => {
    return clubs.filter(({ id }) => visibleClubs.includes(id));
  };
  const onCheckedChange = (clubs: ClubInfo[]) => () => {
    const selected = selectedClubs(clubs);
    if (selected.length === clubs.length) {
      setInvisibleClubs(clubs.map(({ id }) => id));
    } else {
      setVisibleClubs(clubs.map(({ id }) => id));
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
            {clubs.map(({ id, short_name }) =>
              visibleClubs.includes(id) ? (
                <ActiveChip
                  key={id}
                  className={chipClassName}
                  onClick={onClubClick(id)}
                >
                  {short_name}
                </ActiveChip>
              ) : (
                <InactiveChip
                  key={id}
                  className={chipClassName}
                  onClick={onClubClick(id)}
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
