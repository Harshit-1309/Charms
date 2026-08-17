import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Stars, Award } from 'lucide-react';
import { CoupleConfig } from '../../types';

interface LoveConstellationTrackerProps {
  totalCards: number;
  openedCount: number;
  coupleConfig: CoupleConfig;
}

export const LoveConstellationTracker: React.FC<LoveConstellationTrackerProps> = ({
  totalCards,
  openedCount,
  coupleConfig
}) => {
  const percentage = Math.round((openedCount / Math.max(1, totalCards)) * 100);
  const isComplete = openedCount >= totalCards;

  // Star node coordinates along an organic heart-like constellation arc
  const starPoints = Array.from({ length: Math.min(12, totalCards) }, (_, idx) => {
    const angle = (idx / (Math.min(12, totalCards) - 1)) * Math.PI;
    const x = 50 - Math.cos(angle) * 44;
    const y = 30 + Math.sin(angle) * 22;
    return { x, y, isLit: idx < openedCount };
  });

  return (
    <div className="relative p-5 sm:p-6 rounded-3xl glass-card-luxury border border-purple-400/30 shadow-2xl overflow-hidden max-w-3xl mx-auto">
      {/* Radiant Completion Glow */}
      {isComplete && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/15 to-purple-500/10 animate-pulse pointer-events-none" />
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300">
              Constellation of Our Love
            </span>
          </div>
          <h4 className="font-serif-title font-bold text-lg text-white">
            {isComplete ? (
              <span className="text-amber-200 flex items-center gap-1.5 justify-center sm:justify-start">
                <Award className="w-4 h-4 text-amber-300" /> Constellation Completed!
              </span>
            ) : (
              <span>{coupleConfig.partner1Name} & {coupleConfig.partner2Name}'s Celestial Map</span>
            )}
          </h4>
          <p className="text-xs text-slate-300/80 font-sans-ui">
            {isComplete
              ? "Every star in our sky is now glowing with eternal love."
              : `${openedCount} of ${totalCards} love letters unfolded (${percentage}%)`}
          </p>
        </div>

        {/* Mini SVG Constellation Map */}
        <div className="relative w-48 h-16 shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 55">
            {/* Connecting lines between lit stars */}
            {starPoints.map((pt, i) => {
              if (i === 0) return null;
              const prev = starPoints[i - 1];
              const isLineActive = pt.isLit && prev.isLit;
              return (
                <line
                  key={i}
                  x1={prev.x}
                  y1={prev.y}
                  x2={pt.x}
                  y2={pt.y}
                  stroke={isLineActive ? '#f472b6' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isLineActive ? 1.5 : 1}
                  strokeDasharray={isLineActive ? 'none' : '2 2'}
                />
              );
            })}

            {/* Star Nodes */}
            {starPoints.map((pt, i) => (
              <g key={i}>
                {pt.isLit && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={4}
                    fill="none"
                    stroke="#fbcfe8"
                    strokeWidth={0.8}
                    className="animate-ping opacity-60"
                  />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.isLit ? 2.5 : 1.5}
                  fill={pt.isLit ? (i >= 10 ? '#facc15' : '#fda4af') : '#64748b'}
                  className={pt.isLit ? 'shadow-lg' : ''}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3.5 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400 h-full rounded-full"
        />
      </div>
    </div>
  );
};
