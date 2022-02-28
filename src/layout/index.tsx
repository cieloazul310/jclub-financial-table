import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import { SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import SEO from './SEO';
import AppBarInner from './AppBarInner';
import DrawerInner from './DrawerInner';
import Footer from './Footer';

const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

type Props = {
  children: React.ReactNode;
  drawerContents?: React.ReactNode;
  title?: string;
  description?: string;
  headerTitle?: string;
};

function Layout({ children, drawerContents, title, description, headerTitle }: Props) {
  const trigger = useScrollTrigger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const setDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <SEO title={title} description={description} />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <AppBarInner title={headerTitle || title} onLeftButtonClick={toggleDrawer} />
        </AppBar>
      </Slide>
      <Box
        sx={{
          paddingTop: { xs: '56px', sm: '64px' },
        }}
      >
        <main>{children}</main>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <SectionDivider />
        <Footer />
      </Box>
      <SwipeableDrawer
        open={drawerOpen}
        onClose={setDrawer(false)}
        onOpen={setDrawer(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <DrawerInner onCloseIconClick={setDrawer(false)} drawerContents={drawerContents} />
      </SwipeableDrawer>
      <Box
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        <Tooltip title="メニュー">
          <Fab color="secondary" onClick={toggleDrawer}>
            <MenuIcon />
          </Fab>
        </Tooltip>
      </Box>
    </div>
  );
}

Layout.defaultProps = {
  drawerContents: undefined,
  title: undefined,
  description: undefined,
  headerTitle: undefined,
};

export default Layout;
