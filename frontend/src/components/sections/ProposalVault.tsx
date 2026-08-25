import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CoupleConfig, PhotoItem } from '../../types';
import {
  Heart,
  Sparkles,
  Lock,
  Unlock,
  ShieldAlert,
  ArrowRight,
  Smile,
  Gem,
  Stars
} from 'lucide-react';
import { triggerHeartConfetti, triggerFireworksBurst } from '../../utils/confetti';
import { romanticAudio } from '../../utils/audio';
import { PandaWatchman } from '../ui/PandaWatchman';
import { MagicalDoors } from '../ui/MagicalDoors';
import { RunawayButton } from '../ui/RunawayButton';
import { useActivityLogger } from '../../hooks/useActivityLogger';

interface ProposalVaultProps {
  coupleConfig: CoupleConfig;
  photos: PhotoItem[];
  onAcceptProposal: () => void;
  onNavigateToForever: () => void;
}

export const ProposalVault: React.FC<ProposalVaultProps> = React.memo(({
  coupleConfig,
  photos,
  onAcceptProposal,
  onNavigateToForever,
}) => {
  const [step, setStep] = useState<number>(coupleConfig.isProposalAccepted ? 7 : 0);
  const [showHugModal, setShowHugModal] = useState<boolean>(false);
  const { logActivity } = useActivityLogger();

  useEffect(() => {
    if (coupleConfig.isProposalAccepted) {
      setStep(7);
    }
  }, [coupleConfig.isProposalAccepted]);

  // Confirmation steps texts
  const confirmationQuestions = [
    {
      title: "Are you ready?",
      subtitle: "Behind this door lies a sacred question I've carried in my heart across every constellation.",
      yesText: "Yes, I am ready! ✨",
      noText: "Let me catch my breath..."
    },
    {
      title: "Really ready?",
      subtitle: "Once unlocked, there's no turning back from infinite love and lifetime adventures.",
      yesText: "Absolutely, take me in! 💖",
      noText: "Wait a moment!"
    },
    {
      title: "Really, really ready?",
      subtitle: "My heart is racing so fast right now... I can feel every beat longing for you.",
      yesText: "My heart is racing too! 🌟",
      noText: "Almost ready..."
    },
    {
      title: "Last chance to run away...",
      subtitle: "...though in my heart I already know you are my home forever.",
      yesText: "I'm staying right here forever! 💍",
      noText: "I could never run from you."
    }
  ];

  const handleNextConfirmation = (isYes: boolean) => {
    romanticAudio.playHeartbeat();
    
    if (step > 0 && step <= 4) {
      const currentQ = confirmationQuestions[step - 1];
      logActivity('QUESTION_ANSWERED', {
        question: currentQ.title,
        answer: isYes ? currentQ.yesText : currentQ.noText,
        step: step
      });
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Step 5: Door Opens!
      setStep(5);
      romanticAudio.playCelebrationChime();
      setTimeout(() => {
        setStep(6); // Cinematic Proposal Sequence
        romanticAudio.startSongMelody('moonlight', '/MeriBanogi.mp3');
        triggerHeartConfetti();
      }, 2500);
    }
  };

  const handleFinalYes = () => {
    triggerFireworksBurst();
    triggerHeartConfetti();
    romanticAudio.playCelebrationChime();
    logActivity('PROPOSAL_ACCEPTED', {
      message: 'User accepted the final proposal!'
    });
    onAcceptProposal();
    setStep(7); // Final Accepted View
  };

  const handleHugFirst = () => {
    setShowHugModal(true);
    romanticAudio.playHeartbeat();
    logActivity('PROPOSAL_HUG_REQUESTED', {
      message: 'User asked for a hug before answering.'
    });
  };

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 max-w-4xl mx-auto z-10 relative flex flex-col items-center justify-center space-y-8">

      {/* Doors and Panda Scene (Steps 0 to 5) */}
      <AnimatePresence>
        {step <= 5 && (
          <motion.div
            exit={{ opacity: 0, scale: 1.5, filter: 'brightness(2) blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="relative w-full flex flex-col items-center justify-center max-w-2xl mx-auto"
          >
            {/* The Magical Doors */}
            <MagicalDoors isOpen={step === 5} />

            {/* The Panda Watchman */}
            <div className="absolute -bottom-8 left-0 sm:left-8 lg:-left-16 z-50">
              <PandaWatchman isHappy={step > 0 && step < 5} isMovingAside={step === 5} />
            </div>

            {/* Panda's Speech Bubble (Steps 0 to 4) */}
            <AnimatePresence mode="wait">
              {step <= 4 && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute bottom-32 sm:bottom-36 left-2 sm:left-10 lg:-left-12 z-40 w-[calc(100%-1rem)] sm:w-[360px] max-w-[380px]"
                >
                  <div className="glass-card-luxury p-5 sm:p-6 rounded-3xl border border-rose-500/30 text-center relative shadow-2xl bg-slate-950/80 backdrop-blur-xl">
                    {/* Thought bubble tail coming from Panda's head */}
                    <div className="absolute -bottom-4 left-12 w-5 h-5 rounded-full bg-slate-900 border border-rose-500/30" />
                    <div className="absolute -bottom-8 left-14 w-3 h-3 rounded-full bg-slate-900 border border-rose-500/30" />
                    <div className="absolute -bottom-11 left-16 w-1.5 h-1.5 rounded-full bg-slate-900 border border-rose-500/30" />

                    {step === 0 ? (
                      <div className="space-y-4">
                        <h3 className="font-serif-title text-2xl font-bold text-white tracking-wide">
                          Halt! Who goes there?
                        </h3>
                        <p className="text-sm text-slate-300 font-sans-ui italic">
                          Oh, look who it is... I'm legally obligated to guard this shiny Vault until you answer few totally-not-romantic, highly classified questions. Ready to proceed?
                        </p>
                        <button
                          onClick={() => {
                            romanticAudio.playHeartbeat();
                            setStep(1);
                          }}
                          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-medium text-xs tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all w-full mt-2 cursor-pointer uppercase"
                        >
                          I am ready to answer
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-[10px] text-rose-300 font-medium">
                          <ShieldAlert className="w-3 h-3 text-amber-300" />
                          <span>Question {step} of 4</span>
                        </div>
                        <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white leading-tight">
                          "{confirmationQuestions[step - 1].title}"
                        </h3>
                        <p className="text-xs text-slate-300/90 font-sans-ui leading-relaxed">
                          {confirmationQuestions[step - 1].subtitle}
                        </p>
                        <div className="pt-2 flex flex-col gap-2">
                          <button
                            onClick={() => handleNextConfirmation(true)}
                            className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-medium text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                          >
                            {confirmationQuestions[step - 1].yesText}
                          </button>
                          <button
                            onClick={() => handleNextConfirmation(false)}
                            className="w-full py-2 rounded-full border border-white/20 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer hover:bg-white/10"
                          >
                            {confirmationQuestions[step - 1].noText}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Proposal Sequence (Step 6) - Portaled to document body for true full screen */}
      {step === 6 && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 bg-slate-950 overflow-hidden"
        >
          {/* Full Screen Video Background */}
          <div className="absolute inset-0 z-0 bg-slate-950">
             <video 
               autoPlay 
               loop 
               muted 
               playsInline
               preload="auto"
               disablePictureInPicture
               className="w-full h-full object-cover opacity-40 pointer-events-none"
               style={{ transform: 'translateZ(0)' }}
               src="/my-proposal-video.mp4" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-rose-950/30 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 text-center max-w-4xl w-full flex flex-col items-center justify-center space-y-12">

            {/* The Big Question */}
            <div className="space-y-6 relative z-10">
              <span className="font-handwriting text-4xl sm:text-5xl text-rose-300 block drop-shadow-lg">
                {coupleConfig.partner2Name}, my sweetheart...
              </span>
              <h2 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-wide leading-tight text-glow drop-shadow-2xl">
                "Will you make every tomorrow my favorite day too?"
              </h2>
            </div>

            {/* Action Options */}
            <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 w-full">
              <button
                onClick={handleFinalYes}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-base shadow-[0_0_40px_rgba(225,29,72,0.6)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/30"
              >
                <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
                <span>Yes, A Thousand Times Yes! 💖</span>
              </button>

              <button
                onClick={handleHugFirst}
                className="w-full sm:w-auto px-8 py-5 rounded-full glass-card hover:bg-white/10 text-rose-200 font-medium text-sm border border-rose-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smile className="w-5 h-5 text-amber-300" />
                <span>Need a Hug First 🤗</span>
              </button>
              
              <RunawayButton className="w-full sm:w-auto px-10 py-5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 font-medium text-base shadow-lg hover:text-white transition-colors cursor-pointer">
                <span>No</span>
              </RunawayButton>
            </div>
          </div>
        </motion.div>,
        document.body
      )}

      {/* Proposal Accepted State (Step 7) */}
      {step === 7 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden text-center glass-card-luxury rounded-3xl border-2 border-amber-400/50 max-w-2xl w-full shadow-2xl"
        >
          {/* Video Background completely decoupled from flex content */}
          <div className="absolute inset-0 z-0 bg-slate-950">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              disablePictureInPicture
              controls={false}
              className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
              style={{ transform: 'translateZ(0)' }}
              src="/my-proposal-video.mp4" 
            />
            {/* Dark gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 px-6 py-8 sm:px-12 sm:py-10 flex flex-col items-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-amber-500/50 mx-auto animate-bounce ring-4 ring-white/20">
              <Unlock className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Proposal Accepted! 🎉
              </span>
              <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white text-glow">
                Forever Unlocked
              </h2>
              <p className="font-handwriting text-3xl text-rose-200 leading-relaxed">
                "You just made me the happiest person in the entire universe."
              </p>
            </div>

            <button
              onClick={onNavigateToForever}
              className="px-9 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-bold text-sm tracking-wider uppercase shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer border border-white/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter Forever Sanctuary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Warm Hug Modal (Now Full Screen Sequence Portaled) */}
      {createPortal(
        <AnimatePresence>
          {showHugModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-4 bg-slate-950 overflow-hidden"
            >
            {/* Cute Hugging Background Blur */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="/hug.gif" 
                 alt="Cute Hug Bg"
                 className="w-full h-full object-cover opacity-20 blur-xl pointer-events-none"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-rose-950/60 to-slate-950/80 pointer-events-none" />
            </div>

            <div className="relative z-10 text-center max-w-4xl w-full flex flex-col items-center justify-center space-y-8">
              
              <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full overflow-hidden border-8 border-rose-500/30 shadow-[0_0_50px_rgba(225,29,72,0.4)] mb-4 bg-white flex items-center justify-center">
                 <img 
                   src="/hug.gif" 
                   alt="Cute Hug"
                   className="w-full h-full object-cover scale-110 pointer-events-none"
                 />
              </div>

              <div className="space-y-4">
                <h3 className="font-serif-title font-bold text-4xl sm:text-5xl text-white">
                  Sending You A Big Warm Hug!
                </h3>
                <p className="font-handwriting text-2xl sm:text-3xl text-rose-200">
                  "Wrapping my arms around you tightly... holding you close..."
                </p>
                <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white tracking-wide leading-tight text-glow pt-8 drop-shadow-lg">
                  Now... Will you make every tomorrow my favorite day too?
                </h2>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 w-full">
                <button
                  onClick={() => {
                    setShowHugModal(false);
                    handleFinalYes();
                  }}
                  className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-base shadow-[0_0_40px_rgba(225,29,72,0.6)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/30"
                >
                  <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
                  <span>Yes, I am ready now! 💖</span>
                </button>
                
                <RunawayButton className="w-full sm:w-auto px-10 py-5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 font-medium text-base shadow-lg hover:text-white transition-colors cursor-pointer">
                  <span>No</span>
                </RunawayButton>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
});
