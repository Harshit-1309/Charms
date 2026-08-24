import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Orbit, ChevronLeft, ChevronRight, Volume2, Flower2 } from 'lucide-react';
import { CoupleConfig } from '../types';
import { romanticAudio } from '../utils/audio';
import { triggerHeartConfetti, triggerStardustBurst } from '../utils/confetti';

interface LandingHeroProps {
  coupleConfig: CoupleConfig;
  onBegin: () => void;
  onExplorePlanets: () => void;
  onMoonClickNotice: () => void;
}

// Single Animated Digit Box for Countdown
const AnimatedDigitCard: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formatted = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative glass-card-luxury px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-rose-400/30 shadow-xl overflow-hidden min-w-[50px] sm:min-w-[60px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-title font-bold text-base sm:text-xl md:text-2xl text-white tracking-wider drop-shadow-[0_2px_8px_rgba(244,114,182,0.4)]"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-widest text-rose-300/80 font-medium mt-1">
        {label}
      </span>
    </div>
  );
};

export const LandingHero: React.FC<LandingHeroProps> = React.memo(({
  coupleConfig,
  onBegin,
  onExplorePlanets,
  onMoonClickNotice,
}) => {
  // Live Duration Timer
  const [liveDuration, setLiveDuration] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateDuration = () => {
      const start = new Date(coupleConfig.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setLiveDuration({ days, hours, minutes, seconds });
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);
    return () => clearInterval(interval);
  }, [coupleConfig.startDate]);

  // Storytelling Prologue Cycling
  const prologues = [
    "This little universe has always been waiting for you.",
    "Welcome home, my love."
  ];
  const [prologueIndex, setPrologueIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrologueIndex((prev) => (prev + 1) % prologues.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [prologues.length]);

  // Rotating Love Quotes Cycling
  const quoteList = coupleConfig.rotatingQuotes && coupleConfig.rotatingQuotes.length > 0
    ? coupleConfig.rotatingQuotes
    : [
      "Some stories are written in books. Ours was written among the stars.",
      "Every path I walked somehow led me to you.",
      "Home stopped being a place. It became a person.",
      "You are my favorite notification.",
      "Ordinary days became extraordinary because of you.",
      "Thank you for making life softer.",
      coupleConfig.customQuote
    ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quoteList.length);
    }, 45000); // Rotates every 45s as requested
    return () => clearInterval(interval);
  }, [quoteList.length]);

  // Primary Button with 500ms delay & Floating Heart Shower
  const [isTransitioning, setIsTransitioning] = useState(false);
  const handlePrimaryClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    triggerHeartConfetti();
    romanticAudio.playHeartbeat();
    setTimeout(() => {
      setIsTransitioning(false);
      onBegin();
    }, 500);
  };

  const handleHeartbeat = () => {
    romanticAudio.playHeartbeat();
    triggerStardustBurst();
  };

  const portraitUrl = coupleConfig.partner2PhotoUrl || "/charmi/1.jpg";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 sm:pt-32 pb-16 z-10 overflow-hidden">

      {/* Soft Center Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-rose-500/15 via-purple-600/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto relative z-10 space-y-4 sm:space-y-5 mt-1 sm:mt-2"
      >

        {/* Small Pill Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill-luxury text-rose-200 text-xs tracking-widest uppercase font-medium shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>A Universe Created Just For Us</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
        </motion.div>

        {/* Storytelling Prologue Fade Transition */}
        <div className="min-h-[44px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={prologueIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-signature text-2xl sm:text-3xl md:text-4xl text-rose-200 leading-tight drop-shadow-[0_2px_12px_rgba(244,114,182,0.4)]"
            >
              "{prologues[prologueIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Crisp Shimmering Luxury Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative select-none py-1"
        >
          <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-shimmer-luxury">
              Our Little Universe
            </span>
          </h1>

          {/* Micro-sparkles floating around title */}
          <div className="absolute -top-2 left-1/4 pointer-events-none animate-bounce text-amber-300 text-xs">✨</div>
          <div className="absolute -bottom-1 right-1/4 pointer-events-none animate-pulse text-pink-300 text-xs">💫</div>
        </motion.div>

        {/* Hero Portrait: Girlfriend's Circular Floating Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="flex flex-col items-center justify-center pt-0.5 pb-1"
        >
          <div className="relative group cursor-pointer" data-cursor="sparkle">
            {/* Ambient Breathing Pink & Rose Gold Halo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-700 animate-pulse-glow" />

            {/* Blooming flower petals ring on hover */}
            <div className="absolute -inset-3.5 rounded-full border border-pink-400/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none flex items-center justify-center">
              <Flower2 className="w-3.5 h-3.5 text-pink-300 absolute -top-2 animate-bounce" />
              <Flower2 className="w-3.5 h-3.5 text-pink-300 absolute -bottom-2 animate-bounce" />
              <Flower2 className="w-3.5 h-3.5 text-pink-300 absolute -left-2 animate-bounce" />
              <Flower2 className="w-3.5 h-3.5 text-pink-300 absolute -right-2 animate-bounce" />
            </div>

            {/* Portrait Image Container */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/40 shadow-2xl p-0.5 bg-white/10 backdrop-blur-md"
            >
              <img
                src={portraitUrl}
                alt={coupleConfig.partner2Name}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>

            {/* Sparkle badge on portrait */}
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg border border-white/50 group-hover:rotate-12 transition-transform">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          {/* Handwritten Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="font-handwriting text-base sm:text-lg text-rose-200/90 mt-1.5 drop-shadow-[0_2px_8px_rgba(244,114,182,0.4)]"
          >
            "My favorite person."
          </motion.p>
        </motion.div>

        {/* Elegant Animated Digit Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col items-center gap-1.5 pt-0.5"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-rose-300 font-medium tracking-wider">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
            <span>TOGETHER FOR</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-3">
            <AnimatedDigitCard value={liveDuration.days} label="Days" />
            <span className="font-serif-title text-base sm:text-lg text-rose-300/60 pb-4">:</span>
            <AnimatedDigitCard value={liveDuration.hours} label="Hours" />
            <span className="font-serif-title text-base sm:text-lg text-rose-300/60 pb-4">:</span>
            <AnimatedDigitCard value={liveDuration.minutes} label="Minutes" />
            <span className="font-serif-title text-base sm:text-lg text-rose-300/60 pb-4">:</span>
            <AnimatedDigitCard value={liveDuration.seconds} label="Seconds" />
          </div>
        </motion.div>

        {/* Rotating Love Quotes (Cycles every 45s) */}
        <div className="relative max-w-xl mx-auto min-h-[70px] flex items-center justify-center px-4 pt-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-0.5"
            >
              <p className="font-handwriting text-xl sm:text-2xl text-rose-100 font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(244,114,182,0.4)]">
                "{quoteList[quoteIndex]}"
              </p>
              <p className="text-[10.5px] text-rose-300/70 font-sans-ui">
                — Forever yours, {coupleConfig.partner1Name}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Quick Quote Navigation Controls */}
          <div className="absolute -bottom-4 flex items-center gap-2">
            <button
              onClick={() => setQuoteIndex((prev) => (prev - 1 + quoteList.length) % quoteList.length)}
              className="p-1 rounded-full text-slate-400 hover:text-rose-200 transition-colors cursor-pointer"
              title="Previous quote"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <div className="flex gap-1">
              {quoteList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${i === quoteIndex ? 'bg-rose-400 w-3' : 'bg-white/20 hover:bg-white/40'
                    }`}
                />
              ))}
            </div>
            <button
              onClick={() => setQuoteIndex((prev) => (prev + 1) % quoteList.length)}
              className="p-1 rounded-full text-slate-400 hover:text-rose-200 transition-colors cursor-pointer"
              title="Next quote"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {/* Primary Button: Walk Through Our Story */}
          <button
            onClick={handlePrimaryClick}
            data-cursor="heart"
            disabled={isTransitioning}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium text-sm tracking-wide shadow-xl shadow-rose-500/35 hover:shadow-rose-500/55 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer border border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Heart className="w-4 h-4 fill-white animate-pulse group-hover:scale-125 transition-transform" />
            <span className="relative z-10 font-semibold">
              {isTransitioning ? 'Entering Story...' : '❤️ Walk Through Our Story'}
            </span>
          </button>

          {/* Secondary Button: Explore Our Universe */}
          <button
            onClick={onExplorePlanets}
            data-cursor="sparkle"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-card hover:bg-white/10 text-rose-100 font-medium text-sm border border-white/20 hover:border-rose-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
          >
            <Orbit className="w-4 h-4 text-purple-300 group-hover:rotate-45 transition-transform" />
            <span className="font-semibold">🌌 Explore Our Universe</span>
          </button>
        </motion.div>

        {/* Interactive Heartbeat Trigger & Moon Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="pt-4 flex flex-col items-center gap-2.5 text-xs text-slate-400"
        >
          <button
            onClick={handleHeartbeat}
            data-cursor="heart"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill hover:bg-rose-500/20 text-rose-300/90 transition-all cursor-pointer border border-rose-500/25 hover:border-rose-400/50 shadow-md text-[11.5px]"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Click to hear my heart beat for you 💓</span>
          </button>


        </motion.div>

      </motion.div>
    </section>
  );
});
