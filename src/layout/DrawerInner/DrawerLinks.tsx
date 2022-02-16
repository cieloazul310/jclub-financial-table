import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useJ1Clubs, useJ2Clubs, useJ3Clubs, useAllYears, Clubs } from '../../utils/graphql-hooks';

type CategoryLinksProps = {
  title: string;
  clubs: Clubs;
};

export function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  const storaged = typeof window === 'object' ? sessionStorage.getItem(`${title}Open`) : null;
  const initialOpen = storaged ? (JSON.parse(storaged) as boolean) : false;
  const [open, setOpen] = React.useState(initialOpen);
  const toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    sessionStorage.setItem(`${title}Open`, JSON.stringify(open));
  }, [title, open]);

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {clubs.map(({ node }, index) => (
            <ListItem key={node.short_name ?? index} button dense component={GatsbyLink} to={`/club/${node.slug}`}>
              <ListItemText primary={node.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export function YearsLinks() {
  const years = useAllYears();
  const storaged = typeof window === 'object' ? sessionStorage.getItem('yearsOpen') : null;
  const initialOpen = storaged ? (JSON.parse(storaged) as boolean) : false;
  const [open, setOpen] = React.useState(initialOpen);
  const toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    sessionStorage.setItem('yearsOpen', JSON.stringify(open));
  }, [open]);

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemText primary="年度別" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {years.map(({ year, id }, index) => (
            <ListItem key={id ?? index} button dense component={GatsbyLink} to={`/year/${year}`}>
              <ListItemText primary={year} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function DrawerLinks() {
  const j1clubs = useJ1Clubs();
  const j2clubs = useJ2Clubs();
  const j3clubs = useJ3Clubs();
  return (
    <List subheader={<ListSubheader>経営情報</ListSubheader>}>
      <CategoryLinks title="J1" clubs={j1clubs} />
      <CategoryLinks title="J2" clubs={j2clubs} />
      <CategoryLinks title="J3" clubs={j3clubs} />
      <YearsLinks />
    </List>
  );
}

export default DrawerLinks;
