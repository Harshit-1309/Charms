import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppreciationItem } from '../../types';
import {
  Heart,
  Sparkles,
  Lock,
  Crown,
  ChevronDown,
  ChevronUp,
  X,
  ZoomIn
} from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { triggerHeartConfetti } from '../../utils/confetti';

interface ScrapbookLoveCardProps {
  item: AppreciationItem;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
  openedCount: number;
  isTodayNote?: boolean;
  onHover?: (category: AppreciationItem['category'] | null) => void;
}

const DEFAULT_ROMANTIC_TITLES = [
  "The Way You Smile",
  "The Innocence in Your Eyes",
  "Your Captivating Hazel Eyes",
  "The Way You Are Around Me",
  "Choosing You in Every Lifetime",
  "The Grace & Elegance You Carry",
  "Your Kind & Tender Soul",
  "The Way You Slay in Traditional",
  "Your Short Hair & Baddie Energy",
  "Your Sweet Little Kisses",
  "✨ Golden Secret: How Beautifully You Maintain Yourself",
  "👑 Golden Vault: That Unmatched Hotness, Babe"
];

export const ScrapbookLoveCard: React.FC<ScrapbookLoveCardProps> = ({
  item,
  index,
  isOpen,
  onToggle,
  openedCount,
  isTodayNote = false,
  onHover
}) => {
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.photoUrl);

  useEffect(() => {
    setImgSrc(item.photoUrl);
  }, [item.photoUrl]);

  const handleImageError = () => {
    if (imgSrc && imgSrc.endsWith('.jpeg')) {
      setImgSrc(imgSrc.replace('.jpeg', '.jpg'));
    } else if (imgSrc && imgSrc.endsWith('.jpg')) {
      setImgSrc(imgSrc.replace('.jpg', '.jpeg'));
    }
  };

  const displayTitle = item.title?.trim() || DEFAULT_ROMANTIC_TITLES[index % DEFAULT_ROMANTIC_TITLES.length];

  const isLocked = Boolean(item.isGoldenCard && item.unlockThreshold && openedCount < item.unlockThreshold);
  const unlockRemaining = item.unlockThreshold ? Math.max(0, item.unlockThreshold - openedCount) : 0;

  // Handle opening / unfolding
  const handleCardClick = () => {
    if (isLocked) {
      romanticAudio.playPianoNote(330, 0.4);
      return;
    }

    if (!isOpen) {
      romanticAudio.playEnvelopeOpen();
      setTimeout(() => romanticAudio.playPianoNote(587.33, 1.8), 200);
      if (item.isGoldenCard) {
        triggerHeartConfetti();
      }
    }
    onToggle(item.id);
  };

  // Seal & hover styles
  const getCardStyles = () => {
    if (item.isGoldenCard) {
      return {
        seal: 'from-amber-400 to-yellow-600 border-amber-300',
        borderHover: 'hover:border-amber-400/60 shadow-amber-500/20'
      };
    }
    const palettes = [
      { seal: 'from-rose-500 to-pink-600 border-rose-300', borderHover: 'hover:border-rose-400/60 shadow-rose-500/20' },
      { seal: 'from-purple-600 to-indigo-700 border-purple-300', borderHover: 'hover:border-purple-400/60 shadow-purple-500/20' },
      { seal: 'from-amber-500 to-yellow-600 border-amber-300', borderHover: 'hover:border-amber-400/60 shadow-amber-500/20' },
      { seal: 'from-rose-600 to-amber-600 border-rose-300', borderHover: 'hover:border-rose-400/60 shadow-rose-500/20' },
    ];
    return palettes[index % palettes.length];
  };

  const style = getCardStyles();

  return (
    <div
      onMouseEnter={() => onHover && onHover(item.category)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`relative w-full transition-all duration-300 ${
        isOpen ? 'col-span-1 sm:col-span-2 lg:col-span-2 z-30' : 'col-span-1 z-10'
      }`}
    >
      {/* Golden Card Halo */}
      {item.isGoldenCard && !isLocked && (
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/40 via-yellow-200/40 to-amber-500/40 blur-md animate-pulse pointer-events-none" />
      )}

      {/* Main Scrapbook Container */}
      <motion.div
        layout
        onClick={handleCardClick}
        className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 border ${
          item.isGoldenCard
            ? 'bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-purple-950/80 border-amber-400/50 shadow-2xl shadow-amber-500/20'
            : 'glass-card-luxury bg-slate-900/80 border-white/15 hover:border-white/30 shadow-xl'
        } ${style.borderHover}`}
      >
        {/* Subtle Paper Texture Background Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '16px 16px'
          }}
        />

        {/* Locked Overlay for Milestone Golden Cards */}
        {isLocked ? (
          <div className="p-7 flex flex-col items-center justify-center text-center min-h-[200px] space-y-3.5 bg-slate-950/70 backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-lg animate-bounce">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 flex items-center justify-center gap-1">
                <Crown className="w-3.5 h-3.5" /> Secret Golden Scrapbook
              </span>
              <h4 className="font-serif-title font-bold text-white text-base">
                {displayTitle}
              </h4>
            </div>
            <p className="text-xs text-slate-400 max-w-xs font-sans-ui">
              Explore <strong className="text-amber-300 font-bold">{unlockRemaining} more</strong> {unlockRemaining === 1 ? 'memory' : 'memories'} to unlock this secret treasure!
            </p>
            <div className="w-full max-w-[160px] bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (openedCount / (item.unlockThreshold || 1)) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            {/* Header Ribbon Bar */}
            <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                {isTodayNote ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/25 text-amber-200 border border-amber-400/50 flex items-center gap-1 shadow-sm animate-pulse">
                    <Sparkles className="w-3 h-3 text-amber-300" /> Today's Daily Love Note
                  </span>
                ) : item.isGoldenCard ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-200 border border-amber-300/40 flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-300" /> Milestone Memory
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-rose-300/80 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-400/40 text-rose-400" />
                    <span>Love Note</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                <span className="text-[11px] font-sans-ui opacity-75">
                  {isOpen ? 'Fold' : 'Unfold'}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-rose-300" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {/* Closed Card State */}
            {!isOpen && (
              <div className="p-6 flex flex-col justify-between min-h-[160px] space-y-4">
                <div className="flex items-start gap-4">
                  {/* Wax Seal / Stamp Emblem */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${style.seal} border-2 flex items-center justify-center text-xl shrink-0 shadow-lg transform group-hover:scale-105 transition-transform`}>
                    {item.emoji || '💌'}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif-title font-bold text-lg text-white group-hover:text-rose-200 transition-colors">
                      {displayTitle}
                    </h4>
                    <p className="text-xs text-slate-300/80 line-clamp-2 font-sans-ui leading-relaxed">
                      "{item.text}"
                    </p>
                  </div>
                </div>

                {/* Footer hints */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-rose-300/90 font-medium">
                    <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                    <span>Tap to read letter</span>
                  </span>

                  {item.photoUrl && (
                    <span className="text-[10.5px] text-sky-300/80 flex items-center gap-1">
                      📷 Photo
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Opened Scrapbook Page State (Compact & Clean Unfolded Letter) */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="p-4 sm:p-5 space-y-3"
                >
                  {/* Unfolded Letter Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg">{item.emoji || '💌'}</span>
                      <h3 className="font-serif-title font-bold text-base sm:text-lg text-white tracking-wide truncate">
                        {displayTitle}
                      </h3>
                    </div>

                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500 shrink-0 animate-pulse" />
                  </div>

                  {/* Letter Body */}
                  <div className="relative p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 shadow-inner">
                    <p className="font-handwriting text-base sm:text-lg text-rose-100/95 leading-relaxed tracking-wide">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Optional Photo Frame (Clean Polaroid with natural portrait framing) */}
                  {item.photoUrl && (
                    <div className="flex justify-center pt-2 pb-1">
                      <motion.div
                        whileHover={{ scale: 1.02, rotate: 0 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPhotoExpanded(true);
                          romanticAudio.playPianoNote(523.25, 0.4);
                        }}
                        className="group/photo relative p-2.5 pb-4 bg-white text-slate-800 rounded-xl shadow-2xl transform rotate-[-1deg] transition-all duration-300 w-full max-w-[240px] sm:max-w-[280px] cursor-zoom-in border border-slate-200/80"
                      >
                        {/* Washi Tape at Top Center */}
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-200/90 backdrop-blur-sm border border-amber-300/80 rotate-1 shadow-sm rounded-xs z-10" />

                        {/* Photo Image Frame */}
                        <div className="overflow-hidden rounded-lg bg-slate-900/5 max-h-[260px] sm:max-h-[320px] flex items-center justify-center relative">
                          <img
                            src={imgSrc || item.photoUrl}
                            onError={handleImageError}
                            alt={displayTitle || 'Cherished Memory'}
                            className="w-full h-auto max-h-[260px] sm:max-h-[320px] object-cover object-top rounded-lg transition-transform duration-500 group-hover/photo:scale-105"
                            loading="lazy"
                          />

                          {/* Hover Zoom Hint */}
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-sans-ui flex items-center gap-1 backdrop-blur-sm shadow-md">
                              <ZoomIn className="w-3 h-3 text-amber-300" /> View full photo
                            </span>
                          </div>
                        </div>

                        {/* Polaroid Bottom Label */}
                        <div className="mt-2 text-center">
                          <span className="font-handwriting text-xs sm:text-sm text-slate-600 block truncate">
                            {displayTitle}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Unfold Footer Action */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-rose-300 font-handwriting text-sm">
                      Forever & Always ❤️
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(item.id);
                      }}
                      className="px-2.5 py-1 rounded-full glass-pill hover:bg-white/15 text-slate-300 hover:text-white transition-all text-[11px] font-medium cursor-pointer"
                    >
                      Fold Back ✉️
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Full-Screen Lightbox Modal for Photo */}
      <AnimatePresence>
        {isPhotoExpanded && item.photoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsPhotoExpanded(false);
            }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-900/95 border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col items-center cursor-default space-y-3"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPhotoExpanded(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="flex items-center gap-2 text-white font-serif-title font-bold text-base sm:text-lg pr-8">
                <span>{item.emoji || '💌'}</span>
                <span>{displayTitle}</span>
              </div>

              {/* Full Image */}
              <div className="w-full max-h-[70vh] overflow-hidden rounded-2xl bg-black/40 flex items-center justify-center border border-white/10">
                <img
                  src={imgSrc || item.photoUrl}
                  onError={handleImageError}
                  alt={displayTitle || 'Cherished Memory'}
                  className="w-auto h-auto max-h-[70vh] max-w-full object-contain rounded-2xl shadow-xl"
                />
              </div>

              {/* Caption / Quote */}
              <p className="font-handwriting text-rose-200 text-sm sm:text-base text-center px-2">
                "{item.text}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
