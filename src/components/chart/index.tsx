import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { scaleLinear, type ScaleLinear } from "d3";
import type { AllDataFieldsFragment } from "types";
import ChartTitle from "./chart-title";
import Bars from "./bars";
import AverageLines from "./average-lines";
import BarGradient from "./bar-gradient";
import useExtent from "./useExtent";

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
      <svg
        width={padding.left}
        height={height}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        <g
          transform={`translate(${padding.left}, ${padding.top})`}
          textAnchor="end"
        >
          <line
            x1={0}
            x2={0}
            y1={0}
            y2={chartHeight}
            strokeWidth={1}
            stroke={palette.text.secondary}
          />
          {ticks.map((value) => (
            <text
              key={value.toString()}
              y={scale(value)}
              dx="-.5em"
              alignmentBaseline="middle"
              fill={palette.text.primary}
            >
              {value}
            </text>
          ))}
        </g>
      </svg>
    </Box>
  );
}

type ChartMainProps = {
  nodes: AllDataFieldsFragment[];
  height: number;
  itemWidth: number;
  padding: ChartPadding;
  scale: ScaleLinear<number, number>;
};

function ChartMain({
  nodes,
  height,
  itemWidth,
  padding,
  scale,
}: ChartMainProps) {
  const { palette, typography } = useTheme();
  const chartWidth = nodes.length * itemWidth + padding.right;
  const chartHeight = height + padding.top + padding.bottom;
  const ticks = scale.ticks();
  const { fontSize, fontFamily } = typography.caption;

  return (
    <Box width={chartWidth} height={chartHeight}>
      <svg
        width={chartWidth}
        height={chartHeight}
        fontSize={fontSize}
        fontFamily={fontFamily}
        textAnchor="middle"
      >
        <BarGradient />
        <g transform={`translate(0, ${padding.top})`}>
          <Bars
            nodes={nodes}
            height={height}
            scale={scale}
            itemWidth={itemWidth}
          />
          <g strokeWidth={1}>
            {ticks.map(
              (value) =>
                value !== 0 && (
                  <line
                    key={value.toString()}
                    x1={0}
                    x2={chartWidth}
                    y1={scale(value)}
                    y2={scale(value)}
                    stroke={palette.divider}
                  />
                ),
            )}
          </g>
          <AverageLines nodes={nodes} itemWidth={itemWidth} scale={scale} />
          <line
            x1={0}
            x2={chartWidth}
            y1={scale(0)}
            y2={scale(0)}
            stroke={palette.text.secondary}
          />
        </g>
      </svg>
    </Box>
  );
}

type ChartProps = {
  nodes: AllDataFieldsFragment[];
};

function Chart({ nodes }: ChartProps) {
  const height = 320;
  const itemWidth = 40;
  const padding = { top: 20, right: 42, bottom: 40, left: 46 };
  const [min, max] = useExtent(nodes);
  const scale = scaleLinear().domain([min, max]).range([height, 0]).nice();

  return (
    <div>
      <ChartTitle />
      <Box display="flex" justifyContent="center">
        <Box display="flex" width="min-content" maxWidth={1}>
          <Box
            display="flex"
            flexDirection="column"
            flexShrink={0}
            width={padding.left}
            height={height + padding.top + padding.bottom}
          >
            <AxisY scale={scale} padding={padding} chartHeight={height} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={itemWidth * nodes.length + padding.right}
            height={height + padding.top + padding.bottom}
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <ChartMain
              nodes={nodes}
              itemWidth={itemWidth}
              height={height}
              padding={padding}
              scale={scale}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Chart;
