import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId, CoupleConfig } from '../types';
import {
  Sparkles,
  Music,
  Heart,
  Image as ImageIcon,
  Clock,
  Mail,
  Compass,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  CloudRain,
  Flame,
  UserCheck,
  Orbit,
  LogOut,
  Shield,
  Disc3
} from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface NavbarProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  coupleConfig: CoupleConfig;
  onOpenSettings: () => void;
  onOpenShortcuts: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onLogout: () => void;
  username: string;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({
  currentSection,
  onNavigate,
  coupleConfig,
  onOpenSettings,
  onOpenShortcuts,
  isPlayingMusic,
  onToggleMusic,
  onLogout,
  username,
  isAdmin
}) => {
  const [isRainOn, setIsRainOn] = useState(false);
  const [isFireOn, setIsFireOn] = useState(false);
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState(false);
  const [showLockedNotice, setShowLockedNotice] = useState(false);

  const toggleRain = () => {
    const next = !isRainOn;
    setIsRainOn(next);
    romanticAudio.toggleRain(next);
  };

  const toggleFire = () => {
    const next = !isFireOn;
    setIsFireOn(next);
    romanticAudio.toggleCampfire(next);
  };

  const navItems: { id: SectionId; label: string; icon: React.ReactNode; isLocked?: boolean }[] = [
    { id: 'planets', label: 'Realms', icon: <Orbit className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'About', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'journey', label: 'Journey', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'songs', label: 'Songs', icon: <Music className="w-3.5 h-3.5" /> },
    { id: 'letters', label: 'Letters', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'pieces', label: 'Aesthetic', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'proposal', label: 'Vault', icon: <Heart className="w-3.5 h-3.5 text-rose-400" /> },
    {
      id: 'forever',
      label: 'Afterlife',
      icon: coupleConfig.isProposalAccepted ? <Unlock className="w-3.5 h-3.5 text-amber-300" /> : <Lock className="w-3.5 h-3.5 text-slate-500" />,
      isLocked: !coupleConfig.isProposalAccepted
    }
  ];

  if (isAdmin) {
    navItems.push({
      id: 'admin',
      label: 'Admin',
      icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />
    });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card-luxury rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-2xl pointer-events-auto border border-white/15">
        
        {/* Brand & Couple Names */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ring-2 ring-white/20">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif-title font-bold text-xs sm:text-sm md:text-base tracking-wide bg-gradient-to-r from-rose-200 via-pink-100 to-purple-200 bg-clip-text text-transparent">
              Our Little Universe
            </h1>
            <p className="text-[10px] sm:text-[11px] text-rose-300 font-signature tracking-wider">
              {coupleConfig.partner1Name} & {coupleConfig.partner2Name}
            </p>
          </div>
        </button>

        {/* Section Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                data-cursor={item.id === 'proposal' ? 'ring' : 'pointer'}
                onClick={() => {
                  if (item.isLocked) {
                    setShowLockedNotice(true);
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer group ${
                  isActive
                    ? 'text-rose-100 font-semibold shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/25 via-pink-500/20 to-purple-500/25 border border-rose-400/50 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.3)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="group-hover:rotate-12 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
                
                {/* Active Indicator Underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls & Ambient Audio Quick Switcher */}
        <div className="flex items-center gap-2">
          
          {/* Enhanced Music Play/Pause Toggle with Equalizer & Spinning Vinyl */}
          <button
            onClick={onToggleMusic}
            data-cursor="sparkle"
            title={isPlayingMusic ? "Pause Serenade" : "Play Stardust Serenade"}
            className={`p-2 sm:px-3.5 sm:py-1.5 rounded-full text-xs flex items-center gap-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
              isPlayingMusic
                ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-rose-500/40 ring-2 ring-rose-400/50'
                : 'glass-pill text-slate-300 hover:text-white hover:border-rose-400/30'
            }`}
          >
            {isPlayingMusic ? (
              <>
                {/* Spinning Vinyl Disc */}
                <Disc3 className="w-4 h-4 animate-spin text-amber-200" />
                
                {/* Animated 4-Bar Equalizer */}
                <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                  <span className="w-0.5 bg-white rounded-full animate-equalizer-1 h-3" />
                  <span className="w-0.5 bg-white rounded-full animate-equalizer-2 h-2" />
                  <span className="w-0.5 bg-white rounded-full animate-equalizer-3 h-3.5" />
                  <span className="w-0.5 bg-white rounded-full animate-equalizer-4 h-2.5" />
                </div>

                <span className="hidden md:inline font-medium text-[11px]">Serenade</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline font-medium text-[11px]">Music</span>
              </>
            )}
          </button>

          {/* Ambient Sound Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAudioMenuOpen(!isAudioMenuOpen)}
              className={`p-2 rounded-full glass-pill transition-all cursor-pointer ${
                isRainOn || isFireOn
                  ? 'text-amber-300 border-amber-400/40 bg-amber-500/15 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Ambient Atmosphere Soundscapes"
            >
              <CloudRain className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {isAudioMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 glass-card-luxury rounded-2xl p-3 shadow-2xl flex flex-col gap-2 z-50 text-xs"
                >
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1 border-b border-white/10 pb-1.5">
                    Atmosphere Soundscape
                  </p>
                  
                  <button
                    onClick={toggleRain}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                      isRainOn
                        ? 'bg-sky-500/20 text-sky-200 border border-sky-400/30 shadow-inner'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                      <span>Gentle Rain</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isRainOn ? 'bg-sky-500/30 text-sky-200' : 'text-slate-400'}`}>
                      {isRainOn ? 'ACTIVE' : 'OFF'}
                    </span>
                  </button>

                  <button
                    onClick={toggleFire}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                      isFireOn
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30 shadow-inner'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cozy Campfire</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isFireOn ? 'bg-amber-500/30 text-amber-200' : 'text-slate-400'}`}>
                      {isFireOn ? 'ACTIVE' : 'OFF'}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shortcuts Info Button */}
          <button
            onClick={onOpenShortcuts}
            title="Secret Keyboard Shortcuts (L, S, M, H)"
            className="p-2 rounded-full glass-pill text-slate-300 hover:text-white transition-all hidden sm:flex cursor-pointer hover:border-rose-400/30"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Settings / Customize Names */}
          <button
            onClick={onOpenSettings}
            title="Customize Universe Names & Quote"
            className="p-2 rounded-full glass-pill text-slate-300 hover:text-white transition-all cursor-pointer hover:border-rose-400/30"
          >
            <Settings className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-white/20 hidden sm:block mx-1"></div>
          
          {/* Logout */}
          <button
            onClick={onLogout}
            title={`Log out (${username})`}
            className="p-2 rounded-full glass-pill text-slate-300 hover:text-red-400 transition-all hidden sm:flex cursor-pointer hover:border-red-400/30"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Floating Quick Dock */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-50 glass-card-luxury rounded-full px-2.5 py-1.5 shadow-2xl flex items-center justify-between overflow-x-auto gap-1 border border-white/15 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isLocked) {
                  setShowLockedNotice(true);
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`p-1.5 px-2 rounded-full transition-all flex flex-col items-center gap-0.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-400/40 shadow-md shadow-rose-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[8.5px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Locked Notice Modal */}
      <AnimatePresence>
        {showLockedNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md pointer-events-auto"
            onClick={() => setShowLockedNotice(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full glass-card-luxury p-6 sm:p-8 rounded-3xl border border-rose-500/30 shadow-2xl text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-2">
                <Lock className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="font-serif-title font-bold text-2xl text-white">
                Realm Locked
              </h3>
              <p className="text-slate-300 font-sans-ui text-sm leading-relaxed">
                To enter the Afterlife, please visit the <strong>Vault</strong> tab first and answer all the questions positively. ❤️
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowLockedNotice(false)}
                  className="px-5 py-2.5 rounded-full glass-pill hover:bg-white/10 text-slate-300 text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowLockedNotice(false);
                    onNavigate('proposal');
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm font-medium shadow-lg hover:scale-105 transition-all"
                >
                  Go to Vault
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
