import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId, CoupleConfig } from '../types';
import {
  Sparkles,
  Grid,
  Orbit,
  ArrowRight,
  Heart,
  Lock,
  Compass,
  Star,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { triggerStardustBurst, triggerHeartConfetti } from '../utils/confetti';
import { ThemedPlanetSphere } from './planets/ThemedPlanetSphere';
import { OrbitParticleField } from './planets/OrbitParticleField';
import { PlanetCardPreview, PlanetItemData } from './planets/PlanetCardPreview';

interface PlanetNavigationProps {
  onSelectSection: (section: SectionId) => void;
  coupleConfig: CoupleConfig;
  visitedSections?: SectionId[];
}

export const PlanetNavigation: React.FC<PlanetNavigationProps> = React.memo(({
  onSelectSection,
  coupleConfig,
  visitedSections = ['landing', 'planets'],
}) => {
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const [zoomingPlanetId, setZoomingPlanetId] = useState<string | null>(null);

  // Parallax Tilt state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Orbit rotation angle
  const [orbitAngle, setOrbitAngle] = useState(0);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = !!hoveredPlanetId || !!zoomingPlanetId;

  // Responsive window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous smooth 60fps orbital rotation
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current) {
        // Ultra-slow, meditative celestial orbit (~4.5 to 5 minutes per full revolution)
        setOrbitAngle((prev) => (prev + (delta * 0.000022)) % (Math.PI * 2));
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Parallax Mouse Tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  // 8 Relationship Chapters Data
  const planetsData: PlanetItemData[] = [
    {
      id: 'about',
      title: 'About You',
      subtitle: 'Why You Are My Entire World',
      poeticQuote: 'In your laughter, I found every melody I had ever searched for.',
      description: '3D love cards, quirks, personality traits, and deep heartfelt appreciations.',
      glowColor: 'rgba(244, 114, 182, 0.75)',
      themeColor: '#f472b6',
    },
    {
      id: 'gallery',
      title: 'Memory Gallery',
      subtitle: 'Moments Captured in Stardust',
      poeticQuote: 'Photographs of every time you made the universe stand still.',
      description: 'Filterable photo memories with audio notes, story clips, and favorite hearts.',
      glowColor: 'rgba(56, 189, 248, 0.75)',
      themeColor: '#38bdf8',
    },
    {
      id: 'journey',
      title: 'Our Journey',
      subtitle: 'The Sacred Timeline of Us',
      poeticQuote: 'From our very first spark to the constellation we built together.',
      description: 'From our very first meeting to our greatest milestones and adventures.',
      glowColor: 'rgba(251, 191, 36, 0.75)',
      themeColor: '#fbbf24',
    },
    {
      id: 'songs',
      title: 'Our Songs',
      subtitle: 'Vinyl Player & Soundscapes',
      poeticQuote: 'Every chord carries the heartbeat of our fondest memories.',
      description: 'Spinning turntable with live waveform visualizer and synced love lyrics.',
      glowColor: 'rgba(168, 85, 247, 0.75)',
      themeColor: '#a855f7',
    },
    {
      id: 'letters',
      title: 'Love Letters',
      subtitle: 'Wax-Sealed Heartfelt Notes',
      poeticQuote: 'Words written in quiet hours when missing you felt like poetry.',
      description: 'Open handwritten parchment letters sealed with customized wax stamps.',
      glowColor: 'rgba(225, 29, 72, 0.75)',
      themeColor: '#e11d48',
    },
    {
      id: 'pieces',
      title: 'Pieces of You',
      subtitle: 'The Chaaru Aesthetic',
      poeticQuote: 'A chaotic, beautiful, and perfect collection of the little things that make up your universe.',
      description: 'The little beautiful fragments and random chaotic moments that make up the unique universe of you.',
      glowColor: 'rgba(52, 211, 153, 0.75)',
      themeColor: '#34d399',
    },
    {
      id: 'proposal',
      title: 'Vault',
      subtitle: 'The Eternal Question',
      poeticQuote: 'The moment where forever ceases to be a dream and becomes our truth.',
      description: 'A locked 4-stage celestial progression leading to infinite love.',
      glowColor: 'rgba(244, 63, 94, 0.9)',
      themeColor: '#f43f5e',
    },
    {
      id: 'forever',
      title: 'Afterlife',
      subtitle: coupleConfig.isProposalAccepted ? 'Unlocked Sanctuary' : 'Locked Celestial Realm',
      poeticQuote: coupleConfig.isProposalAccepted
        ? 'Two souls, one destiny, endlessly intertwined across space and time.'
        : 'A golden sanctuary sealed until the eternal question is answered.',
      description: 'Real-time love clock ticker, date night wheel, and daily appreciations.',
      glowColor: coupleConfig.isProposalAccepted ? 'rgba(251, 191, 36, 0.85)' : 'rgba(71, 85, 105, 0.3)',
      themeColor: coupleConfig.isProposalAccepted ? '#fde047' : '#475569',
      isLocked: !coupleConfig.isProposalAccepted,
      lockReason: 'This world awaits a very special answer ❤️',
    },
  ];

  // Count discovered sections
  const coreSectionIds: SectionId[] = ['about', 'gallery', 'journey', 'songs', 'letters', 'pieces', 'proposal', 'forever'];
  const exploredCount = coreSectionIds.filter((id) => visitedSections.includes(id)).length;

  // Orbital Radius Configuration
  const orbitRadius = windowWidth < 640 ? 145 : windowWidth < 1024 ? 195 : 240;

  // Cinematic Warp Zoom & Click Handler
  const handlePlanetSelect = (planet: PlanetItemData) => {
    romanticAudio.playHeartbeat();

    if (planet.isLocked) {
      // Guide to proposal
      onSelectSection('proposal');
      return;
    }

    // Play cinematic warp zoom
    setZoomingPlanetId(planet.id);
    romanticAudio.playStardustChime();
    triggerStardustBurst();

    setTimeout(() => {
      onSelectSection(planet.id as SectionId);
      setZoomingPlanetId(null);
    }, 550);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-24 px-4 z-10 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Soft Center Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 75%)',
        }}
      />

      {/* Cinematic Full-Screen Warp Zoom Transition Overlay */}
      <AnimatePresence>
        {zoomingPlanetId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-gradient-to-tr from-rose-950/80 via-slate-950/90 to-purple-950/80 backdrop-blur-md"
          >
            <div className="w-48 h-48 rounded-full bg-white/20 blur-2xl animate-ping" />
            <motion.div
              animate={{ scale: [1, 8] }}
              transition={{ duration: 0.55, ease: 'easeIn' }}
              className="text-white text-center"
            >
              <Sparkles className="w-16 h-16 text-amber-200 animate-spin mx-auto drop-shadow-[0_0_20px_#ffffff]" />
              <p className="font-serif-title text-2xl text-white font-bold mt-4 tracking-widest uppercase">
                Entering Realm...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Galaxy Evolution Progress */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury text-xs text-rose-200 font-medium shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Living Planetary Universe</span>
          <span className="text-rose-400">•</span>
          <span className="text-amber-200 font-semibold">{exploredCount} / 8 Realms Discovered</span>
        </motion.div>

        <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white tracking-wide text-glow">
          Planetary Realms
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/85 font-sans-ui max-w-lg mx-auto">
          Hover over each living celestial body to reveal its poetic soul, or tap to warp into that chapter of{' '}
          <strong className="text-white">{coupleConfig.partner1Name}</strong> &{' '}
          <strong className="text-white">{coupleConfig.partner2Name}</strong>'s story.
        </p>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center gap-2.5 pt-2">
          <button
            onClick={() => setViewMode('orbit')}
            className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'orbit'
                ? 'bg-rose-500/30 text-rose-200 border border-rose-400/60 shadow-lg shadow-rose-500/20 scale-105'
                : 'glass-pill text-slate-400 hover:text-white'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>Solar Orbit View</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-rose-500/30 text-rose-200 border border-rose-400/60 shadow-lg shadow-rose-500/20 scale-105'
                : 'glass-pill text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Chapter Cards</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. GRID CARD VIEW                                                         */}
      {/* ========================================================================= */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full z-20">
          {planetsData.map((planet, index) => (
            <PlanetCardPreview
              key={planet.id}
              planet={planet}
              index={index}
              isVisited={visitedSections.includes(planet.id as SectionId)}
              onClick={() => handlePlanetSelect(planet)}
            />
          ))}
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. LIVING SOLAR SYSTEM ORBIT VIEW                                         */
        /* ========================================================================= */
        <div
          className="relative w-full max-w-5xl h-[530px] sm:h-[620px] flex items-center justify-center my-2 select-none"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Ambient Orbital Dust & Shooting Comet Canvas */}
          <OrbitParticleField
            completionCount={exploredCount}
            orbitRadius={orbitRadius}
          />

          {/* Central Radiant Sun Core (Harshit & Chaaru Heart Core) */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 50px rgba(244, 114, 182, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.5)',
                '0 0 75px rgba(251, 191, 36, 0.7), inset 0 0 30px rgba(255, 255, 255, 0.8)',
                '0 0 50px rgba(244, 114, 182, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.5)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-300 flex flex-col items-center justify-center text-white z-20 border-2 border-white/40 cursor-default shadow-2xl relative"
          >
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white drop-shadow-[0_2px_8px_rgba(244,63,94,0.8)] animate-pulse" />
            <span className="font-signature text-base sm:text-xl font-bold mt-1 tracking-wider drop-shadow-md text-amber-100">
              {coupleConfig.partner1Name[0]} & {coupleConfig.partner2Name[0]}
            </span>
            <span className="text-[9px] uppercase tracking-widest font-mono text-white/90">
              Center of Us
            </span>
          </motion.div>

          {/* Concentric Celestial Orbit Rings */}
          <div
            className="absolute rounded-full border border-white/15 pointer-events-none"
            style={{ width: `${orbitRadius * 2}px`, height: `${orbitRadius * 2 * 0.9}px` }}
          />
          <div
            className="absolute rounded-full border border-rose-400/20 pointer-events-none"
            style={{ width: `${orbitRadius * 2 - 50}px`, height: `${(orbitRadius * 2 - 50) * 0.9}px` }}
          />
          <div
            className="absolute rounded-full border border-purple-400/20 pointer-events-none hidden sm:block"
            style={{ width: `${orbitRadius * 2 + 60}px`, height: `${(orbitRadius * 2 + 60) * 0.9}px` }}
          />

          {/* Orbiting Planets System */}
          {planetsData.map((planet, index) => {
            // Calculate dynamic angle with continuous rotation
            const totalPlanets = planetsData.length;
            const baseAngle = (index / totalPlanets) * (2 * Math.PI) - Math.PI / 2;
            const currentAngle = baseAngle + orbitAngle;

            // Flat perspective elliptical orbit
            const x = Math.cos(currentAngle) * orbitRadius;
            const y = Math.sin(currentAngle) * (orbitRadius * 0.88);

            const isHovered = hoveredPlanetId === planet.id;
            const isVisited = visitedSections.includes(planet.id as SectionId);

            return (
              <div
                key={planet.id}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className="absolute z-30 flex flex-col items-center pointer-events-auto"
                onMouseEnter={() => setHoveredPlanetId(planet.id)}
                onMouseLeave={() => setHoveredPlanetId(null)}
              >
                {/* Clickable Planet Sphere Button */}
                <motion.button
                  onClick={() => handlePlanetSelect(planet)}
                  animate={{
                    scale: isHovered ? 1.28 : 1,
                    y: isHovered ? -8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative group focus:outline-none cursor-pointer p-2 rounded-full"
                >
                  <ThemedPlanetSphere
                    planetId={planet.id}
                    size={windowWidth < 640 ? 54 : 66}
                    isLocked={planet.isLocked}
                    isHovered={isHovered}
                  />

                  {/* Discovered Star Pin */}
                  {isVisited && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.button>

                {/* Hover Poetic Detail Card */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-full mt-2 w-64 p-4 rounded-2xl glass-card-luxury border border-rose-400/40 shadow-2xl z-40 text-center pointer-events-none backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-[10.5px] uppercase tracking-wider font-bold text-rose-300">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>{planet.title}</span>
                      </div>
                      <p className="text-[11px] font-sans-ui text-slate-300 font-medium mt-0.5">
                        {planet.subtitle}
                      </p>
                      <p className="text-xs font-handwriting text-rose-200 mt-2 italic leading-relaxed">
                        "{planet.poeticQuote}"
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-center gap-1 text-[10px] text-amber-200/90 font-medium">
                        {planet.isLocked ? (
                          <span className="text-rose-300">{planet.lockReason}</span>
                        ) : (
                          <span>Click planet to warp in ✨</span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Default Mini Title Label (When not hovered) */}
                {!isHovered && (
                  <div className="mt-1 glass-card px-2.5 py-0.5 rounded-full text-center pointer-events-none shadow-md border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="font-serif-title text-[10.5px] sm:text-[11.5px] text-white font-medium block whitespace-nowrap">
                      {planet.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
});
