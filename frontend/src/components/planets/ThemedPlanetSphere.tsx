import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart, Crown, Sparkles, Plane, Music2, Star } from 'lucide-react';
import { SectionId } from '../../types';

interface ThemedPlanetSphereProps {
  planetId: SectionId;
  size?: number; // size in px, default 64
  isLocked?: boolean;
  isHovered?: boolean;
  className?: string;
}

export const ThemedPlanetSphere: React.FC<ThemedPlanetSphereProps> = ({
  planetId,
  size = 64,
  isLocked = false,
  isHovered = false,
  className = '',
}) => {
  const scaleMultiplier = size / 64;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* ========================================================================= */}
      {/* 1. ABOUT YOU: Cherry Blossom Planet                                       */}
      {/* ========================================================================= */}
      {planetId === 'about' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Atmospheric Bloom */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/40 via-rose-400/30 to-purple-400/20 blur-md"
            style={{ transform: `scale(${isHovered ? 1.4 : 1.2})`, transition: 'transform 0.4s ease' }}
          />

          {/* Planet Sphere */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-white/40"
            style={{
              background: 'radial-gradient(circle at 32% 28%, #fbcfe8 0%, #f472b6 45%, #db2777 75%, #831843 100%)',
              boxShadow: '0 0 25px rgba(244, 114, 182, 0.6), inset -6px -6px 14px rgba(76, 5, 25, 0.6), inset 4px 4px 10px rgba(255, 255, 255, 0.7)',
            }}
          >
            {/* Swirling Cherry Blossom Continents */}
            <div className="absolute inset-0 opacity-45 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-pink-200/20 to-transparent" />
            <div className="absolute -inset-1 opacity-35 bg-[radial-gradient(circle_at_70%_80%,_rgba(253,232,240,0.8),_transparent_50%)]" />
          </div>

          {/* 3 Floating Sakura Petals in Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-14px] pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-2 bg-pink-200/90 rounded-full rotate-45 shadow-sm shadow-pink-400 blur-[0.3px]" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-18px] pointer-events-none"
          >
            <div className="absolute bottom-1 right-1 w-2.5 h-1.5 bg-rose-200/90 rounded-full -rotate-12 shadow-sm shadow-rose-400 blur-[0.3px]" />
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-10px] pointer-events-none"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-1.5 bg-pink-100 rounded-full rotate-90 shadow-sm" />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MEMORY GALLERY: Crystal Blue Planet with Orbiting Photo Frame          */}
      {/* ========================================================================= */}
      {planetId === 'gallery' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Atmospheric Cyan Bloom */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/40 via-indigo-500/30 to-teal-400/20 blur-md"
            style={{ transform: `scale(${isHovered ? 1.4 : 1.2})`, transition: 'transform 0.4s ease' }}
          />

          {/* Planet Sphere */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-sky-200/50"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #bae6fd 0%, #38bdf8 38%, #0284c7 70%, #082f49 100%)',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.65), inset -6px -6px 14px rgba(3, 41, 67, 0.8), inset 4px 4px 10px rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Prismatic Crystal Diagonal Sheen */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/30 to-transparent rotate-45 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,_rgba(186,230,253,0.35),_transparent_60%)]" />
          </div>

          {/* Orbiting Polaroid Photo Frame */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-18px] pointer-events-none flex items-center justify-center"
          >
            <div
              className="absolute -top-1 bg-white/95 p-[2px] pb-[4px] rounded-[2px] shadow-lg border border-sky-300/40 transform -rotate-12 group-hover:scale-125 transition-transform"
              style={{ width: `${14 * scaleMultiplier}px` }}
            >
              <div className="w-full aspect-[4/3] bg-gradient-to-tr from-sky-400 via-rose-300 to-indigo-400 rounded-[1px] flex items-center justify-center">
                <Heart className="w-1.5 h-1.5 fill-white text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. OUR JOURNEY: Golden Clockwork & Milestone Timeline Planet              */}
      {/* ========================================================================= */}
      {planetId === 'journey' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Golden Solar Bloom */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/40 via-yellow-500/30 to-orange-400/20 blur-md"
            style={{ transform: `scale(${isHovered ? 1.4 : 1.2})`, transition: 'transform 0.4s ease' }}
          />

          {/* Planet Sphere */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-amber-200/50"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #fef08a 0%, #fbbf24 40%, #d97706 75%, #451a03 100%)',
              boxShadow: '0 0 25px rgba(251, 191, 36, 0.65), inset -6px -6px 14px rgba(69, 26, 3, 0.8), inset 4px 4px 10px rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Concentric Celestial Latitude Lines */}
            <div className="absolute inset-0 border border-white/25 rounded-full scale-75" />
            <div className="absolute inset-0 border border-amber-900/30 rounded-full scale-50" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/30" />
          </div>

          {/* Rotating Celestial Clockwork Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-12px] pointer-events-none border border-dashed border-amber-300/60 rounded-full"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-yellow-200 shadow-md shadow-amber-400" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </motion.div>

          {/* Golden Stardust Milestone Sparks */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-20px] pointer-events-none"
          >
            <Sparkles className="absolute top-0 right-2 w-3 h-3 text-amber-200 drop-shadow-[0_0_4px_#fde047]" />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SONGS: Cosmic Violet Planet with Saturn Vinyl Ring & Notes              */}
      {/* ========================================================================= */}
      {planetId === 'songs' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Violet Atmosphere */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/40 via-fuchsia-500/30 to-pink-500/20 blur-md"
            style={{ transform: `scale(${isHovered ? 1.4 : 1.2})`, transition: 'transform 0.4s ease' }}
          />

          {/* Vinyl Planetary Ring (Back Layer) */}
          <div
            className="absolute -inset-x-5 h-5 top-1/2 -translate-y-1/2 rounded-full border-2 border-purple-300/50 -rotate-[22deg] pointer-events-none bg-gradient-to-r from-purple-500/30 via-fuchsia-400/40 to-purple-500/30 shadow-md"
            style={{ width: `${size * 1.55}px` }}
          />

          {/* Planet Sphere */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl z-10 border border-purple-200/50"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #e9d5ff 0%, #a855f7 40%, #7e22ce 75%, #3b0764 100%)',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.7), inset -6px -6px 14px rgba(30, 7, 50, 0.8), inset 4px 4px 10px rgba(255, 255, 255, 0.8)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(244,114,182,0.4),_transparent_70%)]" />
          </div>

          {/* Vinyl Planetary Ring (Front Cut Layer) */}
          <div
            className="absolute -inset-x-5 h-5 top-1/2 -translate-y-1/2 rounded-full border-t-2 border-purple-200/90 -rotate-[22deg] pointer-events-none z-20"
            style={{ width: `${size * 1.55}px` }}
          />

          {/* Floating Musical Notes */}
          <motion.div
            animate={{ y: [-2, -8, -2], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 right-0 z-30 pointer-events-none"
          >
            <Music2 className="w-3.5 h-3.5 text-pink-200 drop-shadow-[0_0_6px_#f472b6]" />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. LOVE LETTERS: Parchment & Wax Seal Planet                              */}
      {/* ========================================================================= */}
      {planetId === 'letters' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Warm Rose-Gold Bloom */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/40 via-amber-400/25 to-pink-500/20 blur-md"
            style={{ transform: `scale(${isHovered ? 1.4 : 1.2})`, transition: 'transform 0.4s ease' }}
          />

          {/* Planet Sphere */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-amber-200/60"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #fef3c7 0%, #fed7aa 35%, #e11d48 80%, #4c0519 100%)',
              boxShadow: '0 0 25px rgba(225, 29, 72, 0.65), inset -6px -6px 14px rgba(76, 5, 25, 0.8), inset 4px 4px 10px rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Parchment Calligraphy Texture Lines */}
            <div className="absolute inset-0 opacity-30 space-y-1 p-2">
              <div className="h-[1px] bg-rose-900 w-3/4" />
              <div className="h-[1px] bg-rose-900 w-full" />
              <div className="h-[1px] bg-rose-900 w-1/2" />
            </div>

            {/* Central Crimson Wax Seal Emblem */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-rose-700 border border-amber-300/80 shadow-inner flex items-center justify-center">
              <Heart className="w-2.5 h-2.5 fill-amber-200 text-amber-200" />
            </div>
          </div>

          {/* Drifting Floating Letter Paper Fragments */}
          <motion.div
            animate={{ rotate: 360, y: [-2, 2, -2] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute inset-[-16px] pointer-events-none"
          >
            <div className="absolute top-0 right-1 w-3 h-2 bg-amber-100/90 rounded-[1px] shadow-md border border-rose-300/50 rotate-12" />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. FUTURE DREAMS: Emerald Planet with Clouds & Orbiting Airplane          */}
      {/* ========================================================================= */}
      {planetId === 'dreams' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Emerald Atmospheric Bloom */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/40 via-teal-500/30 to-cyan-400/20 blur-md"
            style={{ transform: `scale(${isHovered ? 1.4 : 1.2})`, transition: 'transform 0.4s ease' }}
          />

          {/* Planet Sphere */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-emerald-200/50"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #a7f3d0 0%, #34d399 38%, #059669 72%, #064e3b 100%)',
              boxShadow: '0 0 25px rgba(52, 211, 153, 0.65), inset -6px -6px 14px rgba(6, 78, 59, 0.8), inset 4px 4px 10px rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Swirling Translucent Clouds */}
            <motion.div
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.9),_transparent_70%)]"
            />

            {/* Glowing Cottage Night-Lights */}
            <div className="absolute bottom-3 right-4 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_4px_#fde047] animate-ping" />
            <div className="absolute bottom-4 right-6 w-1 h-1 rounded-full bg-amber-200 shadow-[0_0_3px_#fde047]" />
          </div>

          {/* Orbiting Miniature Airplane / Rocket */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-18px] pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 transform -rotate-45">
              <Plane className="w-3.5 h-3.5 text-white drop-shadow-[0_0_4px_#34d399]" />
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. PROPOSAL: Deep Crimson Heart Planet with Diamond Engagement Ring       */}
      {/* ========================================================================= */}
      {planetId === 'proposal' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Ruby Heartbeat Glow */}
          <motion.div
            animate={{ scale: [1.15, 1.35, 1.15] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-600/50 via-red-500/40 to-pink-500/30 blur-md"
          />

          {/* Planet Sphere */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-rose-300/60 z-10"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #fecdd3 0%, #f43f5e 38%, #be123c 72%, #4c0519 100%)',
              boxShadow: '0 0 30px rgba(244, 63, 94, 0.8), inset -6px -6px 14px rgba(76, 5, 25, 0.9), inset 4px 4px 10px rgba(255, 255, 255, 0.85)',
            }}
          >
            {/* Heart Silhouette Center */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <Heart className="w-8 h-8 fill-rose-200 text-rose-200" />
            </div>
          </motion.div>

          {/* Slowly Rotating 3D Diamond Engagement Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-14px] pointer-events-none z-20 flex items-center justify-center"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              {/* Sparkling Diamond Solitaire */}
              <div className="w-2.5 h-2.5 bg-white rotate-45 border border-amber-300 shadow-[0_0_8px_#ffffff] animate-pulse" />
              <div className="w-3.5 h-1.5 rounded-full border border-amber-300/90 -mt-1 bg-amber-400/40" />
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. FOREVER: Radiant Solar Crown (or Locked Obsidian Crystal Mist)         */}
      {/* ========================================================================= */}
      {planetId === 'forever' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {isLocked ? (
            /* Locked Obsidian Crystal Mist Planet */
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-slate-800/40 blur-sm" />
              <div
                className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-slate-700/60 flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 30% 25%, #475569 0%, #1e293b 45%, #0f172a 80%, #020617 100%)',
                  boxShadow: '0 0 20px rgba(15, 23, 42, 0.7), inset -4px -4px 10px rgba(0, 0, 0, 0.9)',
                }}
              >
                {/* Mystical Lavender Mist Rings */}
                <div className="absolute inset-0 border border-purple-500/30 rounded-full scale-90 animate-pulse" />
                <Lock className="w-5 h-5 text-amber-300/90 drop-shadow-[0_0_6px_#fde047]" />
              </div>
            </div>
          ) : (
            /* Unlocked Radiant Celestial Solar Crown Planet */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Solar Starlight Corona */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/50 via-rose-400/40 to-yellow-300/30 blur-lg animate-pulse"
                style={{ transform: `scale(${isHovered ? 1.5 : 1.3})`, transition: 'transform 0.4s ease' }}
              />

              {/* Planet Sphere */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-2 border-amber-100"
                style={{
                  background: 'radial-gradient(circle at 30% 25%, #ffffff 0%, #fef08a 30%, #fbbf24 60%, #e11d48 90%, #881337 100%)',
                  boxShadow: '0 0 35px rgba(251, 191, 36, 0.85), inset -6px -6px 14px rgba(136, 19, 55, 0.8), inset 4px 4px 12px rgba(255, 255, 255, 0.95)',
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7),_transparent_65%)]" />
              </div>

              {/* Glowing Celestial Crown Hovering Above */}
              <motion.div
                animate={{ y: [-2, -6, -2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 z-20 pointer-events-none"
              >
                <Crown className="w-5 h-5 text-amber-200 fill-amber-300 drop-shadow-[0_0_8px_#fde047]" />
              </motion.div>

              {/* Constellation Sparkles Orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-18px] pointer-events-none"
              >
                <Star className="absolute top-0 left-2 w-2.5 h-2.5 fill-amber-200 text-amber-200 drop-shadow-[0_0_4px_#ffffff]" />
                <Star className="absolute bottom-1 right-2 w-2 h-2 fill-yellow-200 text-yellow-200 drop-shadow-[0_0_4px_#ffffff]" />
              </motion.div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
