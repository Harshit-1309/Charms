import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Heart, Star, Compass } from 'lucide-react';
import { defaultConstellations } from '../../data/staticData';

interface ConstellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretQuote: string;
}

export const ConstellationModal: React.FC<ConstellationModalProps> = React.memo(({
  isOpen,
  onClose,
  secretQuote,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="max-w-xl w-full glass-card-luxury p-8 rounded-3xl border border-rose-500/30 shadow-2xl text-center space-y-6 relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full glass-pill text-slate-300 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-300 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-amber-500/50 mx-auto animate-pulse ring-4 ring-white/20">
          <Sparkles className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Lunar Secret Unlocked!
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white text-glow">
            Celestial Constellations
          </h2>
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-200 leading-relaxed">
            "{secretQuote}"
          </p>
        </div>

        {/* Display Constellation Cards */}
        <div className="space-y-3.5 text-left max-h-64 overflow-y-auto pr-1">
          {defaultConstellations.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl glass-card border border-white/10 space-y-1.5 hover:border-amber-400/40 transition-all shadow-md"
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span className="flex items-center gap-1.5 font-sans-ui">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  {c.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Night Sky Chart</span>
              </div>
              <p className="text-xs text-white font-serif-title font-semibold">
                "{c.quote}"
              </p>
              <p className="text-[11px] text-slate-300/85 font-sans-ui leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium text-xs shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-white/20"
        >
          Keep Stargazing ✨
        </button>

      </motion.div>
    </div>
  );
});
