import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoveLetter } from '../../types';
import {
  Mail,
  Heart,
  Plus,
  X,
  Sparkles,
  Check,
  Calendar,
  User,
  Stamp
} from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { triggerHeartConfetti } from '../../utils/confetti';

interface LettersSectionProps {
  letters: LoveLetter[];
  onReadLetter: (id: string) => void;
  onAddLetter: (letter: LoveLetter) => void;
}

export const LettersSection: React.FC<LettersSectionProps> = React.memo(({
  letters,
  onReadLetter,
  onAddLetter,
}) => {
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [isOpenWhen, setIsOpenWhen] = useState('Open when you need a smile');
  const [sender, setSender] = useState('Harshit');
  const [content, setContent] = useState('');
  const [waxSealColor, setWaxSealColor] = useState<LoveLetter['waxSealColor']>('rose');

  const handleOpenEnvelope = (letter: LoveLetter) => {
    romanticAudio.playEnvelopeOpen();
    onReadLetter(letter.id);
    setActiveLetter(letter);
  };

  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newLetter: LoveLetter = {
      id: 'letter_' + Date.now(),
      title: title.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      sender: sender.trim() || 'Your Love',
      isOpenWhen: isOpenWhen.trim() || 'Open whenever you wish',
      content: content.trim(),
      waxSealColor: waxSealColor,
      isRead: false,
      customWritten: true,
    };

    onAddLetter(newLetter);
    triggerHeartConfetti();
    setIsWriteModalOpen(false);
    setTitle('');
    setContent('');
  };

  const getWaxSealClass = (color: LoveLetter['waxSealColor']) => {
    switch (color) {
      case 'rose':
        return 'from-rose-500 via-pink-600 to-rose-700 shadow-rose-500/60 ring-rose-300/40';
      case 'gold':
        return 'from-amber-400 via-amber-500 to-yellow-600 shadow-amber-500/60 ring-amber-300/40';
      case 'emerald':
        return 'from-emerald-400 via-emerald-600 to-teal-700 shadow-emerald-500/60 ring-emerald-300/40';
      case 'violet':
        return 'from-purple-500 via-violet-600 to-indigo-700 shadow-purple-500/60 ring-purple-300/40';
      case 'ruby':
        return 'from-red-500 via-rose-700 to-red-900 shadow-red-500/60 ring-red-300/40';
      default:
        return 'from-rose-500 via-pink-600 to-rose-700 shadow-rose-500/60 ring-rose-300/40';
    }
  };

  return (
    <>
      <section className="min-h-screen pt-28 pb-24 px-4 max-w-6xl mx-auto z-10 relative space-y-12">

        {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury text-xs text-rose-300 font-medium mb-3 shadow-lg">
            <Mail className="w-3.5 h-3.5" />
            <span>Sealed With Eternal Love</span>
          </div>
          <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white tracking-wide text-glow">
            Love Letters
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/85 mt-2 font-sans-ui max-w-lg leading-relaxed">
            Handwritten notes, whispers, and secret thoughts sealed under wax for every emotional weather.
          </p>
        </div>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {letters.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => handleOpenEnvelope(letter)}
            className="glass-card-luxury rounded-2xl border border-white/10 cursor-pointer group relative overflow-hidden h-72 shadow-2xl hover:shadow-[0_15px_40px_-10px_rgba(225,29,72,0.3)] hover:-translate-y-1 transition-all duration-500 select-none"
          >
            {/* Realistic Envelope Flaps using Clip Path */}
            <div 
              className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/15 to-transparent z-0 group-hover:from-white/20 transition-colors duration-500 pointer-events-none"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white/5 to-transparent z-0 pointer-events-none"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
            />

            {/* Card Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-6">
              {/* Top Tag */}
              <div className="flex items-center justify-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-rose-200/90 bg-black/30 px-4 py-1.5 rounded-full border border-rose-500/20 backdrop-blur-md shadow-inner">
                  {letter.isOpenWhen}
                </span>
              </div>

              {/* Letter Title */}
              <div className="text-center my-auto px-2">
                <h3 className="font-serif-title font-bold text-2xl text-white/95 group-hover:text-rose-200 transition-colors duration-300 drop-shadow-md">
                  {letter.title}
                </h3>
              </div>

              {/* Wax Seal */}
              <div className="flex items-center justify-center mt-auto">
                <div className="relative">
                  {/* Glowing aura */}
                  <div className={`absolute inset-0 blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500 ${getWaxSealClass(letter.waxSealColor)} rounded-full`} />
                  
                  {/* Seal body */}
                  <div
                    className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${getWaxSealClass(
                      letter.waxSealColor
                    )} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500 border border-white/20 ring-4 ring-black/30`}
                  >
                    <Heart className="w-6 h-6 fill-white drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </section>

      {/* Unfolded Letter Modal (Parchment Paper Theme) */}
      {createPortal(
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[98vw] max-w-7xl px-2 sm:px-6 md:px-10 py-4 my-2 sm:my-6 z-10 flex flex-col items-center"
              style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.8))' }}
            >
              {/* Middle Paper Wrapper */}
              <div className="relative w-full z-10 flex flex-col min-h-[40vh]">
                {/* SVG for highly torn edges */}
                <svg width="0" height="0" className="absolute">
                  <filter id="heavy-torn-edges">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </svg>

                {/* The Torn & Burnt Paper Background */}
                <div 
                  className="absolute inset-0 -z-10"
                  style={{
                    backgroundColor: '#dcc59a',
                    boxShadow: 'inset 0 0 120px rgba(90, 40, 10, 0.9), inset 0 0 50px rgba(60, 25, 0, 0.95)',
                    backgroundImage: `
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E"),
                      radial-gradient(circle at 50% 50%, rgba(255, 235, 190, 0.4) 0%, rgba(200, 140, 80, 0.3) 60%, rgba(90, 40, 10, 0.9) 100%)
                    `,
                    filter: 'url(#heavy-torn-edges) sepia(50%) contrast(1.2)',
                  }}
                >
                  {/* Heavy Edge Burning on all 4 sides */}
                  <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-black/50 to-transparent mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-black/50 to-transparent mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-black/50 to-transparent mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-black/50 to-transparent mix-blend-overlay pointer-events-none" />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveLetter(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-amber-900/10 hover:bg-red-800 hover:text-white transition-all text-amber-950 cursor-pointer shadow-md z-50"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Letter Body Content */}
                <div className="px-8 sm:px-14 md:px-20 pt-12 sm:pt-16 pb-10 z-10 relative flex-1 flex flex-col justify-center">
                  <div 
                    className="font-handwriting text-[15px] sm:text-lg md:text-xl lg:text-[1.35rem] text-amber-950/95 leading-[1.6] whitespace-pre-line py-2 selection:bg-amber-800/30"
                    style={{
                      textShadow: '0.5px 0.5px 1px rgba(60, 30, 10, 0.4), -0.5px -0.5px 1px rgba(60, 30, 10, 0.1)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {activeLetter.content}
                  </div>

                  {/* Signature Footer */}
                  <div className="pt-6 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="font-signature text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-950/95" style={{ textShadow: '1px 1px 3px rgba(90,40,10,0.5)' }}>
                      Forever & Always, with all my heart
                    </span>
                    
                    <div className="relative flex justify-center items-center">
                      {/* Ribbon behind seal */}
                      <div className="absolute w-20 sm:w-24 h-4 bg-red-900/80 -rotate-6 transform -translate-x-1 border-y border-black/30 shadow-sm" />
                      <div className="absolute w-20 sm:w-24 h-4 bg-red-900/80 rotate-6 transform translate-x-1 border-y border-black/30 shadow-sm" />
                      
                      {/* Wax Seal */}
                      <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${getWaxSealClass(activeLetter.waxSealColor)} flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.7),inset_0_0_15px_rgba(0,0,0,0.9)] border border-red-950 ring-2 ring-black/40`}>
                        <Heart className="w-4 h-4 sm:w-6 sm:h-6 fill-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* Write Letter Modal */}
      {createPortal(
      <AnimatePresence>
        {isWriteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsWriteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full glass-card-luxury p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif-title font-bold text-xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                  Write A Love Letter
                </h3>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleWriteSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Letter Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Open when you feel stressed"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Open When Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Open on your birthday"
                      value={isOpenWhen}
                      onChange={(e) => setIsOpenWhen(e.target.value)}
                      className="w-full glass-input rounded-xl px-3 py-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Wax Seal Color</label>
                    <select
                      value={waxSealColor}
                      onChange={(e) => setWaxSealColor(e.target.value as LoveLetter['waxSealColor'])}
                      className="w-full glass-input rounded-xl px-3 py-2.5"
                    >
                      <option value="rose">Rose Pink</option>
                      <option value="gold">Warm Gold</option>
                      <option value="emerald">Emerald</option>
                      <option value="violet">Violet</option>
                      <option value="ruby">Ruby Red</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Sender Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Harshit"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Letter Content</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your heartfelt message here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 font-handwriting text-lg text-rose-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-xs"
                >
                  Seal With Love 💌
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

    </>
  );
});
