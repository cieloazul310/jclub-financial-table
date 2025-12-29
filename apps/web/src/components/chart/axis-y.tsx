import type { ScaleLinear } from "d3";
import { css } from "styled-system/css";

type AxisYProps = {
  scale: ScaleLinear<number, number>;
  chartHeight: number;
  padding: { top: number; left: number; right: number; bottom: number };
};

export function AxisY({ scale, chartHeight, padding }: AxisYProps) {
  const height = chartHeight + padding.top + padding.bottom;
  const ticks = scale.ticks();
  return (
    <div className={css({ height, width: padding.left, flexShrink: 0 })}>
      <svg
        className={css({ color: "solid-gray.800" })}
        width={padding.left}
        height={height}
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
            stroke="currentColor"
          />
          {ticks.map((value) => (
            <text
              key={value.toString()}
              y={scale(value)}
              dx="-.5em"
              alignmentBaseline="middle"
              fill="currentColor"
            >
              {value}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
