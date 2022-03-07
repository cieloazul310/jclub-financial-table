import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { scaleLinear, ScaleLinear } from 'd3';
import Bars from './Bars';
import AverageLines from './AverageLines';
import useExtent from './useExtent';
import { DatumBrowser, Tab } from '../../../types';

type ChartPadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type AxisYProps = {
  scale: ScaleLinear<number, number>;
  chartHeight: number;
  padding: ChartPadding;
};

function AxisY({ scale, chartHeight, padding }: AxisYProps) {
  const height = chartHeight + padding.top + padding.bottom;
  const ticks = scale.ticks();
  const { palette, typography } = useTheme();
  const { fontSize, fontFamily } = typography.caption;
  return (
    <Box width={padding.left} height={height} flexShrink={0}>
      <svg width={padding.left} height={height} fontSize={fontSize} fontFamily={fontFamily}>
        <g transform={`translate(${padding.left}, ${padding.top})`} textAnchor="end">
          <line x1={0} x2={0} y1={0} y2={chartHeight} strokeWidth={1} stroke={palette.text.secondary} />
          {ticks.map((value) => (
            <text key={value.toString()} y={scale(value)} dx="-.5em" alignmentBaseline="middle">
              {value}
            </text>
          ))}
        </g>
      </svg>
    </Box>
  );
}

type ChartMainProps = {
  edges: {
    node: Omit<DatumBrowser, 'previousData'>;
  }[];
  height: number;
  itemWidth: number;
  padding: ChartPadding;
  scale: ScaleLinear<number, number>;
  tab: Tab;
};

function ChartMain({ edges, height, itemWidth, padding, scale, tab }: ChartMainProps) {
  const { palette, typography } = useTheme();
  const chartWidth = edges.length * itemWidth + padding.right;
  const chartHeight = height + padding.top + padding.bottom;
  const ticks = scale.ticks();
  const { fontSize, fontFamily } = typography.caption;

  return (
    <Box width={chartWidth} height={chartHeight}>
      <svg width={chartWidth} height={chartHeight} fontSize={fontSize} fontFamily={fontFamily} textAnchor="middle">
        <g transform={`translate(0, ${padding.top})`}>
          <g strokeWidth={1}>
            {ticks.map((value) =>
              value !== 0 ? (
                <line key={value.toString()} x1={0} x2={chartWidth} y1={scale(value)} y2={scale(value)} stroke={palette.divider} />
              ) : null
            )}
          </g>
          <Bars edges={edges} height={height} scale={scale} itemWidth={itemWidth} tab={tab} />
          <AverageLines edges={edges} itemWidth={itemWidth} tab={tab} scale={scale} />
          <line x1={0} x2={chartWidth} y1={scale(0)} y2={scale(0)} stroke={palette.text.secondary} />
        </g>
      </svg>
    </Box>
  );
}

type ChartContainerProps = {
  edges: {
    node: Omit<DatumBrowser, 'previousData'>;
  }[];
  tab: Tab;
};

function ChartContainer({ edges, tab }: ChartContainerProps) {
  const height = 320;
  const itemWidth = 40;
  const padding = { top: 32, right: 42, bottom: 40, left: 46 };
  const [min, max] = useExtent(edges, tab);
  const scale = scaleLinear().domain([min, max]).range([height, 0]).nice();

  return (
    <Box display="flex" width="min-content" maxWidth={1}>
      <Box display="flex" flexDirection="column" flexShrink={0} width={padding.left} height={height + padding.top + padding.bottom}>
        <AxisY scale={scale} padding={padding} chartHeight={height} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        overflow="auto"
        width={itemWidth * edges.length + padding.right}
        height={height + padding.top + padding.bottom}
      >
        <ChartMain edges={edges} itemWidth={itemWidth} height={height} padding={padding} scale={scale} tab={tab} />
      </Box>
    </Box>
  );
}

export default ChartContainer;
