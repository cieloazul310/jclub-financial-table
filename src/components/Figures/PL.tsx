import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function AlphaCell({ children }: { children: React.ReactNode }) {
  return (
    <TableCell sx={{ fontFamily: "'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace'" }} align="center">
      <code>{children}</code>
    </TableCell>
  );
}

function CalcCell({ children }: { children: React.ReactNode }) {
  return (
    <TableCell sx={{ fontFamily: "'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace'" }}>
      <code>{children}</code>
    </TableCell>
  );
}

function PLFigure() {
  return (
    <Box my={4}>
      <Paper elevation={0} variant="outlined">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>項目</TableCell>
                <TableCell align="center">記号</TableCell>
                <TableCell>計算式</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>営業収入 (売上高)</TableCell>
                <AlphaCell>A</AlphaCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell>営業費用</TableCell>
                <AlphaCell>B</AlphaCell>
                <TableCell />
              </TableRow>
              <TableRow selected>
                <TableCell>営業利益</TableCell>
                <AlphaCell>C</AlphaCell>
                <CalcCell>A - B</CalcCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>営業外収益</TableCell>
                <AlphaCell>D</AlphaCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>営業外費用</TableCell>
                <AlphaCell>E</AlphaCell>
                <TableCell />
              </TableRow>
              <TableRow selected>
                <TableCell>経常利益</TableCell>
                <AlphaCell>F</AlphaCell>
                <CalcCell>C + (D - E)</CalcCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>特別利益</TableCell>
                <AlphaCell>G</AlphaCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>特別損失</TableCell>
                <AlphaCell>H</AlphaCell>
                <TableCell />
              </TableRow>
              <TableRow selected>
                <TableCell>税引前当期利益</TableCell>
                <AlphaCell>I</AlphaCell>
                <CalcCell>F + (G - H)</CalcCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>法人税および住民税等</TableCell>
                <AlphaCell>J</AlphaCell>
                <TableCell />
              </TableRow>
              <TableRow selected>
                <TableCell>
                  <strong>当期純利益</strong>
                </TableCell>
                <AlphaCell>K</AlphaCell>
                <CalcCell>I - J</CalcCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default PLFigure;
