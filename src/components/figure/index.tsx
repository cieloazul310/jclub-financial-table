import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FigureToolbar from './Toolbar';
import FinancialTable from '../Table';
import FinancialCard from '../Card';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { Mode, DatumBrowser } from '../../../types';

type FigureProps = {
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
};

function Figure({ edges, mode }: FigureProps) {
  const { listMode } = useAppState();
  const isYearTable = !listMode && mode === 'year';

  return (
    <section>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          overflowY: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'column' },
          height: isYearTable ? { xs: 'calc(100vh - 104px)', sm: 'calc(100vh - 112px)' } : undefined,
        }}
      >
        <FigureToolbar mode={mode} />
        <Box flexGrow={1} overflow="auto" display="flex">
          {listMode ? <FinancialCard edges={edges} mode={mode} /> : <FinancialTable edges={edges} mode={mode} />}
        </Box>
      </Container>
    </section>
  );
}

export default Figure;
