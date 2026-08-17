import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoupleConfig } from '../types';
import { Heart, Sparkles, X } from 'lucide-react';

interface HeartbeatHugOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  coupleConfig: CoupleConfig;
}

export const HeartbeatHugOverlay: React.FC<HeartbeatHugOverlayProps> = React.memo(({
  isVisible,
  onClose,
  coupleConfig,
}) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
        
        {/* Full-Screen Romantic Heartbeat Vignette Pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.75, 0.25, 0.85, 0.15, 0],
            scale: [1, 1.02, 1, 1.02, 1, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: 1,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-radial-vignette pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 35%, rgba(244, 63, 94, 0.28) 80%, rgba(225, 29, 72, 0.5) 100%)',
          }}
        />

        {/* Floating Glowing Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 50,
                x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 150),
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: -220 - Math.random() * 100,
                x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 220),
                scale: [0.5, 1.2, 0.8],
              }}
              transition={{
                duration: 2.8 + Math.random() * 1.2,
                delay: i * 0.18,
                ease: "easeOut",
              }}
              className="absolute left-1/2 top-1/2 text-2xl filter drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]"
            >
              {i % 3 === 0 ? '💖' : i % 3 === 1 ? '🤗' : '✨'}
            </motion.div>
          ))}
        </div>

        {/* Central Romantic Warm Hug Glass Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="relative pointer-events-auto max-w-md w-full glass-card-luxury p-7 sm:p-8 rounded-3xl border border-rose-400/40 shadow-[0_0_60px_rgba(244,63,94,0.35)] text-center space-y-5 backdrop-blur-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="Dismiss Hug"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Animated Heartbeat & Hug Icon */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.25, 1.05, 1.35, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/40 via-pink-500/30 to-purple-600/40 border border-rose-400/50 flex items-center justify-center shadow-xl shadow-rose-500/30 text-4xl"
            >
              🤗
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.4, 1.1, 1.5, 1],
                opacity: [0.6, 0, 0.4, 0, 0.6],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-rose-400/60"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>Real-Time Heartbeat & Hug Enchantment</span>
            </div>
            <h3 className="font-serif-title font-bold text-2xl text-white tracking-wide">
              Sending A Warm, Tight Hug
            </h3>
            <p className="text-sm font-signature text-rose-300 text-lg mt-0.5">
              From {coupleConfig.partner1Name} to {coupleConfig.partner2Name}
            </p>
          </div>

          <p className="font-handwriting text-xl text-rose-100/90 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
            "Wrapping my arms around you tightly across every star and second. Feel my heart beating just for you... lub-dub, lub-dub." 💖
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-300/80 font-sans-ui">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/20 text-rose-300 font-mono font-bold text-[10px]">H</kbd> anytime to embrace again</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
