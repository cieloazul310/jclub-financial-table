import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import { Section, SectionDivider, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import AppBarInner from './AppBarInner';
import DrawerInner from './DrawerInner';
import Footer from './Footer';

const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  headerTitle?: string;
  previous?: { to: string; title: string } | null;
  next?: { to: string; title: string } | null;
};

function Layout({ children, title, headerTitle, previous, next }: LayoutProps) {
  const trigger = useScrollTrigger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const setDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingTop: { xs: '56px', sm: '64px' },
      }}
    >
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <AppBarInner title={headerTitle || title} onLeftButtonClick={toggleDrawer} previous={previous} next={next} />
        </AppBar>
      </Slide>
      <main>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</Box>
      </main>
      <Box>
        <SectionDivider />
        <Section>
          <Container maxWidth="md" disableGutters>
            <PanelLink to="/" disableBorder disableMargin>
              トップページへ
            </PanelLink>
          </Container>
        </Section>
        <SectionDivider />
        <Footer />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
          zIndex: (theme) => theme.zIndex.appBar - 1,
          opacity: 0.4,
          transition: (theme) => theme.transitions.create('opacity'),
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Tooltip title="メニュー">
          <Fab color="secondary" onClick={toggleDrawer}>
            <MenuIcon />
          </Fab>
        </Tooltip>
      </Box>
      <SwipeableDrawer
        open={drawerOpen}
        onClose={setDrawer(false)}
        onOpen={setDrawer(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <DrawerInner onCloseIconClick={setDrawer(false)} title={title} previous={previous} next={next} />
      </SwipeableDrawer>
    </Box>
  );
}

Layout.defaultProps = {
  title: undefined,
  headerTitle: undefined,
  previous: undefined,
  next: undefined,
};

export default Layout;
