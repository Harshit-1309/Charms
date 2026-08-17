import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { SectionId } from '../../types';
import { ThemedPlanetSphere } from './ThemedPlanetSphere';

export interface PlanetItemData {
  id: SectionId;
  title: string;
  subtitle: string;
  poeticQuote: string;
  description: string;
  isLocked?: boolean;
  lockReason?: string;
  glowColor: string;
  themeColor: string;
}

interface PlanetCardPreviewProps {
  planet: PlanetItemData;
  index: number;
  isVisited: boolean;
  onClick: () => void;
}

export const PlanetCardPreview: React.FC<PlanetCardPreviewProps> = ({
  planet,
  index,
  isVisited,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="glass-card-luxury glass-card-hover p-6 sm:p-7 rounded-3xl cursor-pointer flex flex-col items-center text-center group relative overflow-hidden transition-all duration-300 border border-white/15 hover:border-rose-400/50 shadow-xl"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: planet.themeColor }}
      />

      {/* Top Status Badges (Discovered vs Unexplored vs Locked) */}
      <div className="w-full flex items-center justify-between mb-4 z-10">
        {planet.isLocked ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-400/30">
            <Lock className="w-2.5 h-2.5" />
            <span>Locked Vault</span>
          </span>
        ) : isVisited ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Discovered</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10">
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            <span>Unexplored</span>
          </span>
        )}

        <span className="text-[10px] text-slate-500 font-mono">
          Realm #{index + 1}
        </span>
      </div>

      {/* 3D Animated Themed Planet Sphere */}
      <div className="my-3 py-2 flex items-center justify-center">
        <motion.div
          animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? 4 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ThemedPlanetSphere
            planetId={planet.id}
            size={76}
            isLocked={planet.isLocked}
            isHovered={isHovered}
          />
        </motion.div>
      </div>

      {/* Planet Title & Subtitle */}
      <h3 className="font-serif-title font-bold text-xl text-white group-hover:text-rose-200 transition-colors mt-2">
        {planet.title}
      </h3>
      <span className="text-xs text-rose-300/90 font-medium font-sans-ui mt-0.5">
        {planet.subtitle}
      </span>

      {/* Poetic Quote Hook */}
      <p className="text-xs font-handwriting text-rose-200/90 mt-2.5 px-2 line-clamp-2 italic">
        "{planet.poeticQuote}"
      </p>

      {/* Description */}
      <p className="text-xs text-slate-400 mt-2 font-sans-ui leading-relaxed line-clamp-2">
        {planet.description}
      </p>

      {/* Footer Action */}
      <div className="w-full pt-5 mt-auto flex items-center justify-center border-t border-white/10">
        {planet.isLocked ? (
          <p className="text-[11px] text-amber-200 font-serif-title font-medium flex items-center gap-1.5 animate-pulse">
            <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{planet.lockReason || 'Awaits a special answer ❤️'}</span>
          </p>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 group-hover:text-white transition-colors">
            <span>Enter Realm</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </span>
        )}
      </div>
    </motion.div>
  );
};
