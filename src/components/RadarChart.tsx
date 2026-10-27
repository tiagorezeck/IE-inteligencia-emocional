import React from 'react';
import { DimensionScore, DimensionId } from '../types/assessment';
import { DIMENSIONS_LIST } from '../data/questions';

interface RadarChartProps {
  scores: Record<DimensionId, DimensionScore>;
  size?: number;
  theme?: 'dark' | 'light';
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 380, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const center = size / 2;
  const radius = (size / 2) - 52;
  const totalAxes = DIMENSIONS_LIST.length; // 5

  // Scale: 8 is innermost boundary, 40 is outermost boundary
  // Normalized fraction: (score - 8) / (40 - 8)
  const getCoordinates = (index: number, score: number) => {
    // start at top (-PI / 2)
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    // ensure value maps nicely from inner hub to outer rim
    // score 8 maps to 18% radius, score 40 maps to 100% radius
    const normalized = Math.max(0, Math.min(1, (score - 8) / 32));
    const r = radius * (0.2 + normalized * 0.8);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric guideline rings corresponding to the 5 score bands
  const guidelineLevels = [
    { score: 14, label: '14' },
    { score: 20, label: '20' },
    { score: 27, label: '27' },
    { score: 34, label: '34' },
    { score: 40, label: '40' }
  ];

  // User polygon points
  const points = DIMENSIONS_LIST.map((dim, i) => {
    const s = scores[dim.id]?.score ?? 8;
    const { x, y } = getCoordinates(i, s);
    return `${x},${y}`;
  }).join(' ');

  const gridStroke = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  const gridFill = isLight ? 'rgba(0, 0, 0, 0.015)' : 'rgba(255, 255, 255, 0.015)';
  const spokeStroke = isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
  const labelFill = isLight ? '#1F2937' : '#E5E7EB';
  const tickFill = isLight ? 'rgba(75, 85, 99, 0.75)' : 'rgba(156, 163, 175, 0.6)';
  const vertexStroke = isLight ? '#FFFFFF' : '#121316';

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible select-none"
      >
        {/* Concentric pentagonal grid lines */}
        {guidelineLevels.map((lvl, levelIdx) => {
          const ringPoints = DIMENSIONS_LIST.map((_, i) => {
            const { x, y } = getCoordinates(i, lvl.score);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={levelIdx}>
              <polygon
                points={ringPoints}
                fill={levelIdx % 2 === 0 ? gridFill : 'transparent'}
                stroke={gridStroke}
                strokeWidth="1"
                strokeDasharray={levelIdx === 4 ? 'none' : '3,3'}
              />
              {/* Level indicator tick on the top vertical axis */}
              <text
                x={center + 5}
                y={center - radius * (0.2 + ((lvl.score - 8) / 32) * 0.8) - 2}
                fill={tickFill}
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                className="tabular-nums font-mono"
              >
                {lvl.label}
              </text>
            </g>
          );
        })}

        {/* 5 Axis spoke lines */}
        {DIMENSIONS_LIST.map((dim, i) => {
          const { x, y, angle } = getCoordinates(i, 40);
          const labelDist = radius + 26;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          const currentScore = scores[dim.id]?.score ?? 8;

          return (
            <g key={dim.id}>
              {/* Spoke line */}
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={spokeStroke}
                strokeWidth="1"
              />

              {/* Label & Score */}
              <text
                x={lx}
                y={ly}
                textAnchor={Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs font-semibold"
                fill={labelFill}
              >
                {dim.shortName}
                <tspan
                  x={lx}
                  dy="14"
                  textAnchor={Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'}
                  fill="#EA580C"
                  className="font-mono tabular-nums text-xs font-bold"
                >
                  {currentScore} pts
                </tspan>
              </text>
            </g>
          );
        })}

        {/* User Data Polygon */}
        <polygon
          points={points}
          fill="rgba(249, 115, 22, 0.22)"
          stroke="#F97316"
          strokeWidth="2.5"
          className="transition-all duration-300"
        />

        {/* Vertex Markers */}
        {DIMENSIONS_LIST.map((dim, i) => {
          const s = scores[dim.id]?.score ?? 8;
          const { x, y } = getCoordinates(i, s);
          return (
            <g key={`vertex-${dim.id}`}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#F97316"
                stroke={vertexStroke}
                strokeWidth="2"
                className="transition-all duration-300 shadow-sm"
              />
            </g>
          );
        })}
      </svg>
      <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 font-mono flex items-center gap-3">
        <span>Escala: 8 a 40 pts</span>
        <span>·</span>
        <span className="text-orange-600 dark:text-orange-400 font-medium">Polígono Real COMET</span>
      </div>
    </div>
  );
};
