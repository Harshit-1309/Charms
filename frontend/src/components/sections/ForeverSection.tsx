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
import { useActivityLogger } from '../../hooks/useActivityLogger';

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

  const { logActivity } = useActivityLogger();

  const carouselRow1 = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', 'aa.jpeg', 'ad.jpeg', 'ag.jpg', 'ai.jpg', 'ak.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'dress.jpeg', 'her.jpeg', 'xa.png', 'xb.jpg', 'xc.jpg'];
  const carouselRow2 = ['j.jpeg', 'k.jpeg', 'l.jpeg', 'm.jpeg', 'n.jpeg', 'o.jpeg', 'p.jpeg', 'q.jpeg', 'r.jpeg', 's.jpeg', 't.jpeg', 'u.jpeg', 'y.jpeg', 'z.jpeg', 'xd.jpg', 'xe.jpg'];

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
    logActivity('SPUN_DATE_GENERATOR', {});
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

      {/* Infinite Photo Carousels */}
      <div 
        className="w-full overflow-hidden space-y-4 py-4 relative z-0 opacity-90 hover:opacity-100 transition-opacity"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
        }}
      >
        
        {/* Row 1 (Right to Left) */}
        <div className="carousel-track animate-scroll-left flex gap-4">
          {[...carouselRow1, ...carouselRow1].map((img, i) => (
            <div key={`row1-${i}`} className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/10 hover:border-rose-400/50 transition-colors">
              <img src={`/infinity/${img}`} alt="Our Memory" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Row 2 (Left to Right) */}
        <div className="carousel-track animate-scroll-right flex gap-4">
          {[...carouselRow2, ...carouselRow2].map((img, i) => (
            <div key={`row2-${i}`} className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/10 hover:border-amber-400/50 transition-colors">
              <img src={`/infinity/${img}`} alt="Our Memory" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Live Time Together Clock */}
      <div className="glass-card-luxury p-8 sm:p-10 rounded-3xl border border-amber-400/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent pointer-events-none" />

        <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Time Since You Became Mine</span>
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
              Spin For Our First Date Idea
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
      <div className="glass-card-luxury p-8 sm:p-10 rounded-3xl border border-amber-400/40 max-w-xl mx-auto text-center space-y-5 shadow-2xl bg-gradient-to-br from-slate-900/90 via-purple-950/70 to-slate-900/90 relative overflow-hidden">
        
        {/* Photo & Crown Badge */}
        <div className="relative w-28 h-28 mx-auto">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            <img 
              src="/charmi/8.jpg" 
              alt="Our Love" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center shadow-lg border-2 border-slate-900">
            <Crown className="w-5 h-5 fill-slate-950" />
          </div>
        </div>

        <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white text-glow pt-2">
          Certificate of Infinite Love
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-300 font-sans-ui leading-relaxed px-4">
          Officially certified that <strong className="text-white font-bold text-glow">{coupleConfig.partner1Name}</strong> & <strong className="text-white font-bold text-glow">{coupleConfig.partner2Name}</strong> belong together across all stars and dimensions.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 inline-block mt-2">
          <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-amber-200 font-medium">
            <div className="flex items-center gap-1.5 text-amber-300">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="uppercase tracking-widest font-bold text-[10px]">Eternity Sealed</span>
            </div>
            {coupleConfig.proposalAcceptedAt && (
              <span className="text-slate-300 font-mono mt-1 text-[11px]">
                Accepted on {new Date(coupleConfig.proposalAcceptedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(coupleConfig.proposalAcceptedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
      </div>

    </section>
  );
});
