import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoupleConfig, AppreciationItem } from '../../types';
import {
  Sparkles,
  Heart,
  Smile,
  Plus,
  Stars
} from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { triggerHeartConfetti } from '../../utils/confetti';
import { ScrapbookLoveCard } from '../scrapbook/ScrapbookLoveCard';
import { ScrapbookAmbientField } from '../scrapbook/ScrapbookAmbientField';
import { WriteMemoryModal } from '../scrapbook/WriteMemoryModal';

interface AboutYouSectionProps {
  coupleConfig: CoupleConfig;
  appreciationList: AppreciationItem[];
  onAddAppreciation: (item: AppreciationItem) => void;
}

export const AboutYouSection: React.FC<AboutYouSectionProps> = React.memo(({
  coupleConfig,
  appreciationList,
  onAddAppreciation,
}) => {
  const [activeTab, setActiveTab] = useState<'reasons' | 'quirks' | 'traits'>('reasons');
  const [openedCards, setOpenedCards] = useState<Record<string, boolean>>({});
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Toggle open/close of scrapbook card
  const toggleCard = (id: string) => {
    setOpenedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Count of unfolded/opened cards
  const openedCount = useMemo(() => {
    return Object.values(openedCards).filter(Boolean).length;
  }, [openedCards]);

  // Reason of the Day: stable per day
  const todayNoteIndex = useMemo(() => {
    if (appreciationList.length === 0) return 0;
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return dayOfYear % appreciationList.length;
  }, [appreciationList.length]);

  const todayNoteId = appreciationList[todayNoteIndex]?.id;

  // "✨ Surprise Me" feature: randomly unfolds a card with stardust chime
  const handleSurpriseMe = () => {
    romanticAudio.playPianoNote(523.25, 1.2);
    setTimeout(() => romanticAudio.playPianoNote(659.25, 1.5), 150);
    setTimeout(() => romanticAudio.playPianoNote(783.99, 2.0), 300);

    // Pick an unopened card first
    const available = appreciationList.filter((item) => {
      return !openedCards[item.id];
    });

    const target = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : appreciationList[Math.floor(Math.random() * appreciationList.length)];

    if (target) {
      setOpenedCards((prev) => ({ ...prev, [target.id]: true }));
      triggerHeartConfetti();

      // Smoothly scroll towards the scrapbook container
      const el = document.getElementById(`scrapbook-card-${target.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const quirks = [
    {
      title: "Your Carefree, Peaceful Sleep",
      desc: `How you sleep so deeply and peacefully without a worry in the world.`
    },
    {
      title: "Your Bold No-Sugar Coffee Ritual",
      desc: "How you love your coffee strong and completely sugar-free—bold, unapologetic, and so uniquely you. Watching you take that first satisfied sip makes me fall for you all over again."
    },
    {
      title: "Your Unstoppable Full-Body Laugh",
      desc: "When something is genuinely hilarious and you can't hold back—your eyes crinkle into happy little crescent moons, your whole body shakes, and your pure joy lights up the entire room."
    },
    {
      title: "Your Playful & Feisty Little Threats",
      desc: "The adorable way you try to act tough and threaten me with your fiercest pout and glare, completely unaware of how irresistibly cute you look and how much it makes me want to hold you."
    },
    {
      title: "Your Never-Ending Rivalry with Tissues",
      desc: "Always keeping a stash of tissues close by for your hyperhidrosis and sweaty hands—and how I never care and love holding those sweet, warm hands anyway."
    },
    {
      title: "Your Cute Video Call Tantrums",
      desc: "All the playful drama, excuses, and adorable little tantrums you throw before answering my video calls, only to give me the brightest, sweetest smile the moment your camera turns on."
    }
  ];

  const traits = [
    { trait: "Limitless Kindness", desc: "The tender way you care for animals, children, and everyone in need.", icon: "🕊️", color: "from-sky-500/20 to-indigo-500/20 border-sky-400/30" },
    { trait: "Fierce Passion", desc: "The sparkling fire in your eyes when you talk about your dreams.", icon: "🔥", color: "from-amber-500/20 to-rose-500/20 border-amber-400/30" },
    { trait: "Gentle Patience", desc: "How you always listen deeply, calm my storms, and give me a safe home in your heart.", icon: "🌸", color: "from-pink-500/20 to-purple-500/20 border-pink-400/30" },
    { trait: "Radiant Light", desc: "Walking into any room and effortlessly making it feel warmer and happier.", icon: "✨", color: "from-purple-500/20 to-rose-500/20 border-purple-400/30" },
  ];

  return (
    <section className="min-h-screen pt-28 pb-28 px-4 max-w-6xl mx-auto z-10 relative space-y-12">
      {/* Ambient Emotion Particle Field Canvas */}
      <ScrapbookAmbientField />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury text-xs text-rose-300 font-medium shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>A Handcrafted Scrapbook of Love</span>
        </div>

        <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white tracking-wide text-glow">
          Why I Love You
        </h2>

        <p className="text-xs sm:text-sm text-slate-300/85 font-sans-ui leading-relaxed">
          An interactive sanctuary celebrating everything that makes{' '}
          <strong className="text-white font-bold underline decoration-rose-400 underline-offset-4">
            {coupleConfig.partner2Name}
          </strong>{' '}
          my favorite miracle in the universe. Unfold each letter to discover our memories.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 pt-3 flex-wrap">
          <button
            onClick={() => setActiveTab('reasons')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'reasons'
              ? 'bg-rose-500/25 text-rose-200 border border-rose-400/50 shadow-lg shadow-rose-500/20'
              : 'glass-pill text-slate-400 hover:text-white'
              }`}
          >
            Love Scrapbook ({appreciationList.length})
          </button>
          <button
            onClick={() => setActiveTab('quirks')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'quirks'
              ? 'bg-rose-500/25 text-rose-200 border border-rose-400/50 shadow-lg shadow-rose-500/20'
              : 'glass-pill text-slate-400 hover:text-white'
              }`}
          >
            Cute Quirks
          </button>
          <button
            onClick={() => setActiveTab('traits')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'traits'
              ? 'bg-rose-500/25 text-rose-200 border border-rose-400/50 shadow-lg shadow-rose-500/20'
              : 'glass-pill text-slate-400 hover:text-white'
              }`}
          >
            Personality Traits
          </button>
        </div>
      </div>

      {/* Tab 1: Scrapbook Reasons */}
      {activeTab === 'reasons' && (
        <div className="space-y-8 relative z-10">
          {/* Action Bar: Surprise Me & Write Memory */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 flex items-center justify-center sm:justify-start gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
                Tap Any Letter To Unfold
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-white">
                Letters Written From My Heart
              </h3>
            </div>


          </div>

          {/* Scrapbook Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {appreciationList.map((item, idx) => (
              <div key={item.id} id={`scrapbook-card-${item.id}`}>
                <ScrapbookLoveCard
                  item={item}
                  index={idx}
                  isOpen={Boolean(openedCards[item.id])}
                  onToggle={toggleCard}
                  openedCount={openedCount}
                  isTodayNote={item.id === todayNoteId}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Cute Quirks */}
      {activeTab === 'quirks' && (
        <div className="glass-card-luxury p-8 rounded-3xl shadow-2xl space-y-6 border border-white/15 max-w-4xl mx-auto relative z-10">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-amber-400" />
              Little Moments I Adore
            </span>
            <h3 className="font-serif-title font-bold text-2xl text-white">
              {coupleConfig.partner2Name}'s Most Endearing Quirks & Habits
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quirks.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl glass-pill hover:border-amber-400/40 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif-title font-bold text-sm text-white group-hover:text-amber-200 transition-colors">
                    {q.title}
                  </h4>
                  <p className="text-xs text-slate-300/80 font-sans-ui leading-relaxed">
                    {q.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Personality Traits */}
      {activeTab === 'traits' && (
        <div className="space-y-6 max-w-5xl mx-auto relative z-10">
          <div className="space-y-1 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center justify-center gap-1.5">
              <Stars className="w-4 h-4 text-purple-400" />
              The Soul Inside
            </span>
            <h3 className="font-serif-title font-bold text-2xl text-white">
              What Makes {coupleConfig.partner2Name}'s Heart So Beautiful
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {traits.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl glass-card-luxury border ${t.color} flex flex-col justify-between space-y-4 hover:scale-[1.03] transition-all shadow-xl`}
              >
                <div className="text-3xl">{t.icon}</div>
                <div className="space-y-1.5">
                  <h4 className="font-serif-title font-bold text-lg text-white">
                    {t.trait}
                  </h4>
                  <p className="text-xs text-slate-300/85 font-sans-ui leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      <WriteMemoryModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onAdd={onAddAppreciation}
      />
    </section>
  );
});
