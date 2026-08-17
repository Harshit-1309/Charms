import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface WelcomeSequenceProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const WelcomeSequence: React.FC<WelcomeSequenceProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (forceShow) return true;
    try {
      return !localStorage.getItem('our_universe_welcomed');
    } catch {
      return true;
    }
  });

  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!isVisible) return;

    // Step 0: Fade in dark nebula
    const t1 = setTimeout(() => {
      setStep(1);
      try {
        romanticAudio.playStardustChime();
      } catch {}
    }, 600);

    // Step 1: Show handwritten message for ~3.2 seconds
    const t2 = setTimeout(() => {
      setStep(2);
    }, 3800);

    // Step 2: Complete sequence and reveal universe
    const t3 = setTimeout(() => {
      setIsVisible(false);
      try {
        localStorage.setItem('our_universe_welcomed', 'true');
      } catch {}
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isVisible, onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('our_universe_welcomed', 'true');
    } catch {}
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center px-6 select-none cursor-pointer overflow-hidden"
        onClick={handleSkip}
      >
        {/* Deep ambient cosmic glow */}
        <div className="absolute inset-0 bg-radial from-rose-950/25 via-purple-950/15 to-transparent pointer-events-none" />

        {/* Ambient floating stardust */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                scale: Math.random() * 0.8 + 0.3,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [`${Math.random() * 100}vh`, `${Math.random() * 100 - 30}vh`],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-pink-200 blur-[0.5px]"
            />
          ))}
        </div>

        {/* Center Handwritten Monologue */}
        <div className="relative z-10 text-center max-w-xl space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-rose-500/30 to-purple-600/30 border border-rose-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(244,114,182,0.4)]"
          >
            <Heart className="w-5 h-5 text-rose-300 fill-rose-400/80 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 15 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-rose-100 text-glow leading-relaxed tracking-wide">
              "Made with more love than code."
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-sans-ui tracking-widest uppercase">
              Entering the sanctuary of our memories...
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 0.6 : 0 }}
            transition={{ delay: 1.5 }}
            className="text-[11px] text-slate-500 pt-4"
          >
            Tap anywhere to enter immediately ✨
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
