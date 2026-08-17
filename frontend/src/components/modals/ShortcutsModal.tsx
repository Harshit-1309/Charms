import React from 'react';
import { motion } from 'framer-motion';
import { X, HelpCircle, Heart, Sparkles, Music, Smile, Play } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHeartRainMode?: boolean;
  isStargazingMode?: boolean;
  isPlayingMusic?: boolean;
  onToggleHeartRain?: () => void;
  onToggleStargazing?: () => void;
  onToggleMusic?: () => void;
  onTriggerHug?: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = React.memo(({
  isOpen,
  onClose,
  isHeartRainMode = false,
  isStargazingMode = false,
  isPlayingMusic = false,
  onToggleHeartRain,
  onToggleStargazing,
  onToggleMusic,
  onTriggerHug,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      key: 'L',
      label: 'Toggle Heart Rain Shower',
      desc: 'Cascading floating glowing hearts & blossoms',
      icon: <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />,
      active: isHeartRainMode,
      isToggle: true,
      onClick: onToggleHeartRain,
    },
    {
      key: 'S',
      label: 'Toggle Deep Stargazing Mode',
      desc: '400+ stars, constellation lines & shooting stars',
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      active: isStargazingMode,
      isToggle: true,
      onClick: onToggleStargazing,
    },
    {
      key: 'M',
      label: 'Toggle Romantic Soundtrack',
      desc: 'Play or pause ambient piano soundtrack',
      icon: <Music className="w-4 h-4 text-purple-400" />,
      active: isPlayingMusic,
      isToggle: true,
      onClick: onToggleMusic,
    },
    {
      key: 'H',
      label: 'Trigger Heartbeat & Hug',
      desc: 'Screen heartbeat pulse & warm cuddle message',
      icon: <Smile className="w-4 h-4 text-sky-400" />,
      active: false,
      isToggle: false,
      onClick: onTriggerHug,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-lg w-full glass-card-luxury p-6 sm:p-7 rounded-3xl border border-white/20 shadow-2xl space-y-5"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-white font-serif-title font-bold text-lg">
            <HelpCircle className="w-5 h-5 text-rose-400" />
            <span>Secret Ambient Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300/85 font-sans-ui leading-relaxed">
          Press any of these magic keys on your keyboard anywhere in Our Little Universe, or click below to trigger/test each enchantment:
        </p>

        <div className="space-y-3">
          {shortcuts.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                if (s.onClick) s.onClick();
              }}
              className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
                s.active
                  ? 'bg-rose-500/15 border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                  : 'glass-card border-white/10 hover:border-white/25 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-900/80 border border-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs font-semibold">{s.label}</span>
                    {s.isToggle && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                          s.active
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-white/10'
                        }`}
                      >
                        {s.active ? 'ON' : 'OFF'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans-ui truncate">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                  {s.isToggle ? (s.active ? 'Disable' : 'Enable') : 'Trigger'}
                </span>
                <kbd className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/20 text-rose-300 font-mono font-bold text-xs shadow-inner">
                  {s.key}
                </kbd>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium text-xs rounded-xl shadow-lg shadow-rose-500/30 transition-all cursor-pointer border border-white/20"
        >
          Done Exploring Shortcuts
        </button>
      </motion.div>
    </div>
  );
});
