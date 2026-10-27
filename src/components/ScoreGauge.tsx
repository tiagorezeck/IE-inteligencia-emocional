import React from 'react';
import { DimensionScore } from '../types/assessment';
import { getBandMetadata } from '../utils/scoring';

interface ScoreGaugeProps {
  scoreItem: DimensionScore;
  showDetails?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ scoreItem, showDetails = true }) => {
  const { score, classification, name, metaphor } = scoreItem;
  const currentBand = getBandMetadata(classification);

  // Position on scale 8..40
  const normalizedPercent = Math.max(0, Math.min(100, ((score - 8) / 32) * 100));

  const segments = [
    { label: 'Muito baixo', width: '21.875%', color: 'bg-rose-500/20 text-rose-300', border: 'border-rose-500/30' },
    { label: 'Baixo', width: '18.75%', color: 'bg-amber-500/20 text-amber-300', border: 'border-amber-500/30' },
    { label: 'Em desenv.', width: '21.875%', color: 'bg-sky-500/20 text-sky-300', border: 'border-sky-500/30' },
    { label: 'Alto', width: '21.875%', color: 'bg-emerald-500/20 text-emerald-300', border: 'border-emerald-500/30' },
    { label: 'Muito alto', width: '18.75%', color: 'bg-orange-500/20 text-orange-300', border: 'border-orange-500/30' }
  ];

  return (
    <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 sm:p-5 shadow-xs dark:shadow-none transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{name}</h4>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">· {metaphor}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2.5 py-1 rounded-md border font-medium ${currentBand.badgeBg}`}>
            {classification}
          </span>
          <span className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
            {score} <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">/ 40 pts</span>
          </span>
        </div>
      </div>

      {/* Visual Ruler / Gauge Bar */}
      <div className="relative pt-6 pb-2">
        {/* Floating Indicator Marker */}
        <div
          className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 z-10"
          style={{ left: `${normalizedPercent}%` }}
        >
          <span className="text-[11px] font-mono font-bold text-orange-600 dark:text-orange-400 bg-white dark:bg-neutral-900 border border-orange-500/50 dark:border-orange-500/40 px-1.5 py-0.5 rounded shadow-xs tabular-nums whitespace-nowrap">
            {score} pts
          </span>
          <div className="w-0.5 h-2 bg-orange-500 mt-0.5"></div>
        </div>

        {/* 5-zone Track */}
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="w-[21.875%] h-full bg-rose-500/40 border-r border-neutral-300 dark:border-neutral-900" title="Muito baixo (8-14)" />
          <div className="w-[18.75%] h-full bg-amber-500/40 border-r border-neutral-300 dark:border-neutral-900" title="Baixo (15-20)" />
          <div className="w-[21.875%] h-full bg-sky-500/40 border-r border-neutral-300 dark:border-neutral-900" title="Em desenvolvimento (21-27)" />
          <div className="w-[21.875%] h-full bg-emerald-500/40 border-r border-neutral-300 dark:border-neutral-900" title="Alto (28-34)" />
          <div className="w-[18.75%] h-full bg-orange-500/40" title="Muito alto (35-40)" />
        </div>

        {/* Legend Scale Ticks */}
        <div className="flex justify-between items-center text-[10px] text-neutral-500 dark:text-neutral-400 font-mono mt-1.5 px-0.5">
          <span>8</span>
          <span className="translate-x-1">14</span>
          <span className="translate-x-0.5">20</span>
          <span>27</span>
          <span className="-translate-x-0.5">34</span>
          <span>40</span>
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-5 gap-1 pt-2 border-t border-neutral-200 dark:border-neutral-800/60 mt-2 text-center text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
          {segments.map((seg, i) => (
            <div
              key={i}
              className={`py-0.5 px-1 rounded transition-colors ${
                seg.label === classification || (classification === 'Em desenvolvimento' && seg.label === 'Em desenv.')
                  ? 'bg-orange-500/10 dark:bg-neutral-800 text-orange-600 dark:text-orange-300 font-semibold'
                  : ''
              }`}
            >
              {seg.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
