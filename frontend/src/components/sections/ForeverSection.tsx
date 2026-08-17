import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoupleConfig, AppreciationItem, DateNightIdea } from '../../types';
import {
  Sparkles,
  Heart,
  Clock,
  Compass,
  Smile,
  RefreshCw,
  Gift,
  Award,
  Calendar,
  Check,
  Crown,
  Stars
} from 'lucide-react';
import { dateNightIdeas } from '../../data/staticData';
import { romanticAudio } from '../../utils/audio';
import { triggerHeartConfetti, triggerStardustBurst } from '../../utils/confetti';

interface ForeverSectionProps {
  coupleConfig: CoupleConfig;
  appreciationList: AppreciationItem[];
}

export const ForeverSection: React.FC<ForeverSectionProps> = React.memo(({
  coupleConfig,
  appreciationList,
}) => {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [activeDateIdea, setActiveDateIdea] = useState<DateNightIdea | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [dailyAppreciation, setDailyAppreciation] = useState<string>(
    appreciationList[0]?.text || 'You make every moment magical.'
  );

  // Live Timer Ticker
  useEffect(() => {
    const calculateTime = () => {
      const startString = coupleConfig.proposalAcceptedAt || new Date().toISOString();
      const start = new Date(startString).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

      const years = Math.floor(daysTotal / 365);
      const months = Math.floor((daysTotal % 365) / 30);
      const days = Math.floor((daysTotal % 365) % 30);

      setTimeTogether({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [coupleConfig.proposalAcceptedAt]);

  const handleSpinDateWheel = () => {
    romanticAudio.playHeartbeat();
    setIsSpinning(true);
    setTimeout(() => {
      const random = dateNightIdeas[Math.floor(Math.random() * dateNightIdeas.length)];
      setActiveDateIdea(random);
      setIsSpinning(false);
      triggerStardustBurst();
    }, 600);
  };

  const handleGenerateAppreciation = () => {
    romanticAudio.playCelebrationChime();
    const random = appreciationList[Math.floor(Math.random() * appreciationList.length)];
    if (random) setDailyAppreciation(random.text);
    triggerHeartConfetti();
  };

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 max-w-6xl mx-auto z-10 relative space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury text-xs text-amber-300 font-medium shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Unlocked Sanctuary of Infinity</span>
        </div>
        <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white tracking-wide text-glow">
          Afterlife
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/85 font-sans-ui max-w-lg mx-auto leading-relaxed">
          Our living clock counting every eternal breath, daily love notes, and spontaneous romantic adventures.
        </p>
      </div>

      {/* Live Time Together Clock */}
      <div className="glass-card-luxury p-8 sm:p-10 rounded-3xl border border-amber-400/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent pointer-events-none" />

        <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Time Spent Falling In Love</span>
        </div>

        <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white">
          Since {coupleConfig.proposalAcceptedAt ? new Date(coupleConfig.proposalAcceptedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Today'}
        </h3>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl glass-card-luxury border border-white/10 text-center shadow-lg">
            <span className="font-serif-title text-3xl sm:text-4xl font-bold text-rose-300 block">
              {timeTogether.years}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-sans-ui">Years</span>
          </div>

          <div className="p-4 rounded-2xl glass-card-luxury border border-white/10 text-center shadow-lg">
            <span className="font-serif-title text-3xl sm:text-4xl font-bold text-purple-300 block">
              {timeTogether.months}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-sans-ui">Months</span>
          </div>

          <div className="p-4 rounded-2xl glass-card-luxury border border-white/10 text-center shadow-lg">
            <span className="font-serif-title text-3xl sm:text-4xl font-bold text-amber-300 block">
              {timeTogether.days}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-sans-ui">Days</span>
          </div>

          <div className="p-4 rounded-2xl glass-card-luxury border border-white/10 text-center shadow-lg">
            <span className="font-serif-title text-3xl sm:text-4xl font-bold text-sky-300 block">
              {timeTogether.hours}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-sans-ui">Hours</span>
          </div>

          <div className="p-4 rounded-2xl glass-card-luxury border border-white/10 text-center shadow-lg">
            <span className="font-serif-title text-3xl sm:text-4xl font-bold text-emerald-300 block">
              {timeTogether.minutes}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-sans-ui">Minutes</span>
          </div>

          <div className="p-4 rounded-2xl glass-card-luxury border border-white/10 text-center shadow-lg">
            <span className="font-serif-title text-3xl sm:text-4xl font-bold text-pink-300 block">
              {timeTogether.seconds}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-sans-ui">Seconds</span>
          </div>
        </div>
      </div>

      {/* Interactive Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Date Night Generator */}
        <div className="glass-card-luxury p-6 sm:p-8 rounded-3xl border border-white/15 space-y-5 flex flex-col justify-between shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-rose-400" />
              Spin For Tonight's Date Idea
            </span>
            <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-white">
              Spontaneous Date Generator
            </h3>
            <p className="text-xs text-slate-300/80 font-sans-ui">
              Can't decide what to do tonight? Spin the celestial wheel of romance!
            </p>
          </div>

          <AnimatePresence mode="wait">
            {activeDateIdea ? (
              <motion.div
                key={activeDateIdea.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-rose-500/15 border border-rose-400/30 space-y-2 text-left shadow-inner"
              >
                <span className="text-[10px] uppercase font-bold text-rose-300">
                  {activeDateIdea.category} • Setup: {activeDateIdea.setupTime}
                </span>
                <h4 className="font-serif-title font-bold text-lg text-white">
                  {activeDateIdea.title}
                </h4>
                <p className="text-xs text-slate-200 font-sans-ui leading-relaxed">
                  {activeDateIdea.description}
                </p>
              </motion.div>
            ) : (
              <div className="p-6 rounded-2xl glass-pill border border-white/10 text-center text-xs text-slate-400">
                Tap the spin button below to reveal a romantic date idea ✨
              </div>
            )}
          </AnimatePresence>

          <button
            onClick={handleSpinDateWheel}
            disabled={isSpinning}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium text-xs shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Selecting Date...' : 'Spin For Date Night'}</span>
          </button>
        </div>

        {/* Daily Appreciation Generator */}
        <div className="glass-card-luxury p-6 sm:p-8 rounded-3xl border border-white/15 space-y-5 flex flex-col justify-between shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-amber-400" />
              Daily Love Note
            </span>
            <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-white">
              Daily Appreciation Generator
            </h3>
            <p className="text-xs text-slate-300/80 font-sans-ui">
              A daily reminder of why you make every second on Earth feel like heaven.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-amber-400/30 text-center shadow-inner">
            <p className="font-handwriting text-2xl sm:text-3xl text-amber-100/95 leading-relaxed">
              "{dailyAppreciation}"
            </p>
          </div>

          <button
            onClick={handleGenerateAppreciation}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-medium text-xs shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Today's Note</span>
          </button>
        </div>

      </div>

      {/* Official Love Certificate Card */}
      <div className="glass-card-luxury p-8 sm:p-10 rounded-3xl border border-amber-400/40 max-w-xl mx-auto text-center space-y-4 shadow-2xl bg-gradient-to-br from-slate-900/90 via-purple-950/70 to-slate-900/90">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center mx-auto shadow-xl ring-4 ring-amber-400/30">
          <Crown className="w-8 h-8 fill-slate-950" />
        </div>
        <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white text-glow">
          Certificate of Infinite Love
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-sans-ui leading-relaxed">
          Officially certified that <strong className="text-white font-bold">{coupleConfig.partner1Name}</strong> & <strong className="text-white font-bold">{coupleConfig.partner2Name}</strong> belong together across all stars and dimensions.
        </p>
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-amber-300 font-medium">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Accepted with all my heart • Sealed into our universe</span>
        </div>
      </div>

    </section>
  );
});
