import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SectionId,
  CoupleConfig,
  PhotoItem,
  JourneyMilestone,
  SongItem,
  LoveLetter,
  PieceOfYouItem,
  AppreciationItem
} from './types';
const emptyCoupleConfig: CoupleConfig = {
  partner1Name: 'Partner 1',
  partner2Name: 'Partner 2',
  startDate: new Date().toISOString(),
  customQuote: 'Welcome to your story.',
  isProposalAccepted: false,
  anniversaryTitle: 'Our Journey',
  secretMessage: 'A beautiful journey begins.',
};

import { NightSkyCanvas } from './components/canvas/NightSkyCanvas';
import { WelcomeSequence } from './components/WelcomeSequence';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { PlanetNavigation } from './components/PlanetNavigation';
import { AboutYouSection } from './components/sections/AboutYouSection';
import { GallerySection } from './components/sections/GallerySection';
import { JourneySection } from './components/sections/JourneySection';
import { SongsSection } from './components/sections/SongsSection';
import { LettersSection } from './components/sections/LettersSection';
import { PiecesOfYouSection } from './components/sections/PiecesOfYouSection';
import { ProposalVault } from './components/sections/ProposalVault';
import { ForeverSection } from './components/sections/ForeverSection';
import { AdminDashboard } from './components/sections/AdminDashboard';
import { AuthScreen } from './components/AuthScreen';

import { CoupleCustomizerModal } from './components/modals/CoupleCustomizerModal';
import { ConstellationModal } from './components/modals/ConstellationModal';
import { ShortcutsModal } from './components/modals/ShortcutsModal';
import { HeartbeatHugOverlay } from './components/HeartbeatHugOverlay';

import { triggerHeartConfetti, triggerStardustBurst } from './utils/confetti';
import { romanticAudio } from './utils/audio';
import { Sparkles, Heart, Moon } from 'lucide-react';
import { useActivityLogger } from './hooks/useActivityLogger';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('auth_username'));
  const [isAdmin, setIsAdmin] = useState<boolean>(localStorage.getItem('auth_is_admin') === 'true');
  const [isLoadingDB, setIsLoadingDB] = useState(true);

  const [coupleConfig, setCoupleConfig] = useState<CoupleConfig>(emptyCoupleConfig);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [currentSongId, setCurrentSongId] = useState<string>('');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [letters, setLetters] = useState<LoveLetter[]>([]);
  const [piecesOfYou, setPiecesOfYou] = useState<PieceOfYouItem[]>([]);
  const [appreciations, setAppreciations] = useState<AppreciationItem[]>([]);

  // Active Section
  const [currentSection, setCurrentSection] = useState<SectionId>('landing');

  const [visitedSections, setVisitedSections] = useState<SectionId[]>(() =>
    ['landing', 'planets']
  );

  const { logActivity } = useActivityLogger();

  // Track new section visits and log activity
  useEffect(() => {
    if (!visitedSections.includes(currentSection)) {
      setVisitedSections((prev) => [...prev, currentSection]);
    }
    // Log section visit
    logActivity('VISITED_SECTION', { section: currentSection });
  }, [currentSection, logActivity]);

  // Ambient Toggles
  const [isStargazingMode, setIsStargazingMode] = useState(false);
  const [isHeartRainMode, setIsHeartRainMode] = useState(false);
  const [isHugActive, setIsHugActive] = useState(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isConstellationOpen, setIsConstellationOpen] = useState(false);

  // Ambient HUD Toast & Moon Toast Notification
  const [moonToast, setMoonToast] = useState<{ message: string; stage: number } | null>(null);
  const [ambientToast, setAmbientToast] = useState<{
    id: number;
    icon: string;
    title: string;
    subtitle: string;
    status?: string;
  } | null>(null);

  const showAmbientHUD = useCallback((icon: string, title: string, subtitle: string, status?: string) => {
    setAmbientToast({
      id: Date.now(),
      icon,
      title,
      subtitle,
      status,
    });
  }, []);

  useEffect(() => {
    if (!ambientToast) return;
    const timer = setTimeout(() => setAmbientToast(null), 3200);
    return () => clearTimeout(timer);
  }, [ambientToast]);

  // Distinct Shortcut Action Handlers
  const handleToggleHeartRain = useCallback(() => {
    setIsHeartRainMode((prev) => {
      const next = !prev;
      romanticAudio.playStardustChime();
      showAmbientHUD(
        next ? '💖' : '🌧️',
        'Heart Rain Shower',
        next ? 'Cascading love blossoms & glowing hearts enabled' : 'Heart rain shower turned off',
        next ? 'ACTIVE' : 'OFF'
      );
      return next;
    });
  }, [showAmbientHUD]);

  const handleToggleStargazing = useCallback(() => {
    setIsStargazingMode((prev) => {
      const next = !prev;
      romanticAudio.playStardustChime();
      showAmbientHUD(
        next ? '✨' : '🌌',
        'Deep Stargazing Mode',
        next ? '400+ twinkling stars & shooting stars enabled' : 'Standard night sky restored',
        next ? 'ACTIVE' : 'OFF'
      );
      return next;
    });
  }, [showAmbientHUD]);

  const handleTriggerHug = useCallback(() => {
    romanticAudio.playHeartbeat();
    setIsHugActive(true);
    showAmbientHUD(
      '🤗',
      'Warm Hug & Heartbeat',
      `Sent to ${coupleConfig.partner2Name} with endless love! 💖`,
      'SENT'
    );
  }, [showAmbientHUD, coupleConfig.partner2Name]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('our_couple_config', JSON.stringify(coupleConfig));
  }, [coupleConfig]);
  useEffect(() => {
    if (!token) return;
    
    setIsLoadingDB(true);
    fetch('/api/data', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(async res => {
        if (res.status === 401) {
          handleLogout();
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        if (data && data.coupleConfig) {
          setCoupleConfig(data.coupleConfig);
          setPhotos(data.photos || []);
          setMilestones(data.journey || []);
          setSongs(data.songs || []);
          setLetters(data.letters || []);
          setPiecesOfYou(data.piecesOfYou || []);
          setAppreciations(data.appreciations || []);
        }
      })
      .catch(err => console.error("DB Fetch Error:", err))
      .finally(() => setIsLoadingDB(false));
  }, [token]);

  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isLoadingDB) return;

    fetch('/api/data', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        coupleConfig,
        photos,
        journey: milestones,
        songs,
        letters,
        piecesOfYou,
        appreciations
      })
    }).catch(async err => {
      console.error("DB Save Error:", err);
    });
  }, [coupleConfig, photos, milestones, songs, letters, piecesOfYou, appreciations, isLoadingDB, token]);
  useEffect(() => {
    localStorage.setItem('our_visited_sections', JSON.stringify(visitedSections));
  }, [visitedSections]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing shortcuts when typing in input fields
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'L') {
        e.preventDefault();
        handleToggleHeartRain();
      } else if (key === 'S') {
        e.preventDefault();
        handleToggleStargazing();
      } else if (key === 'M') {
        e.preventDefault();
        toggleMusic();
      } else if (key === 'H') {
        e.preventDefault();
        handleTriggerHug();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayingMusic, currentSongId, songs, coupleConfig.partner2Name]);

  // Music Player Toggle
  const toggleMusic = useCallback(() => {
    if (isPlayingMusic) {
      romanticAudio.stopMelody();
      setIsPlayingMusic(false);
      showAmbientHUD('🔇', 'Romantic Soundtrack', 'Music playback paused', 'PAUSED');
    } else {
      const activeSong = songs.find((s) => s.id === currentSongId) || songs[0];
      romanticAudio.startSongMelody(activeSong.synthMelodyKey, activeSong.audioUrl);
      setIsPlayingMusic(true);
      showAmbientHUD('🎵', 'Romantic Soundtrack', `Playing "${activeSong.title}" (${activeSong.artist})`, 'PLAYING');
    }
  }, [isPlayingMusic, songs, currentSongId, showAmbientHUD]);

  const playSpecificSong = useCallback((songId: string) => {
    setCurrentSongId(songId);
    const song = songs.find((s) => s.id === songId);
    if (song) {
      romanticAudio.startSongMelody(song.synthMelodyKey, song.audioUrl);
      setIsPlayingMusic(true);
      showAmbientHUD('🎵', 'Romantic Soundtrack', `Playing "${song.title}" (${song.artist})`, 'PLAYING');
    }
  }, [songs, showAmbientHUD]);

  // Moon Click Handling -> Opens the celestial constellations & secret quote modal immediately
  const handleMoonClick = useCallback((stage: number, message: string) => {
    triggerStardustBurst();
    romanticAudio.playStardustChime();
    setIsConstellationOpen(true);
  }, []);

  // Handlers for data updates
  const handleToggleFavoritePhoto = useCallback((id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  }, []);

  const handleLikePhoto = useCallback((id: string) => {
    romanticAudio.playHeartbeat();
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  }, []);

  const handleAddPhoto = useCallback((newPhoto: PhotoItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  }, []);

  const handleAddMilestone = useCallback((newMilestone: JourneyMilestone) => {
    setMilestones((prev) => [newMilestone, ...prev]);
  }, []);

  const handleReadLetter = useCallback((id: string) => {
    setLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isRead: true } : l))
    );
  }, []);

  const handleAddLetter = useCallback((newLetter: LoveLetter) => {
    setLetters((prev) => [newLetter, ...prev]);
  }, []);



  const handleAddAppreciation = useCallback((newItem: AppreciationItem) => {
    setAppreciations((prev) => [newItem, ...prev]);
  }, []);

  const handleAcceptProposal = useCallback(() => {
    setCoupleConfig((prev) => ({ 
      ...prev, 
      isProposalAccepted: true,
      proposalAcceptedAt: prev.proposalAcceptedAt || new Date().toISOString()
    }));
  }, []);

  const handleAuthSuccess = (newToken: string, newUsername: string, newIsAdmin?: boolean) => {
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_username', newUsername);
    if (newIsAdmin) localStorage.setItem('auth_is_admin', 'true');
    setToken(newToken);
    setUsername(newUsername);
    setIsAdmin(!!newIsAdmin);
    
    // Log login activity
    fetch('/api/activity/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newToken}`
      },
      body: JSON.stringify({ action: 'LOGIN', details: {} })
    }).catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_is_admin');
    setToken(null);
    setUsername(null);
    setIsAdmin(false);
  };

  if (!token) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-serif-title space-y-4">
        <Heart className="w-12 h-12 text-rose-500 animate-pulse" />
        <h2 className="text-2xl animate-pulse">Connecting to the stars...</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans-ui overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      

      {/* Cinematic First-Visit Intro Sequence */}
      <WelcomeSequence onComplete={() => {}} />

      {/* Dynamic Animated Night Sky Canvas with Parallax & Shooting Stars */}
      <NightSkyCanvas
        onMoonClick={handleMoonClick}
        onSecretUnlock={() => setIsConstellationOpen(true)}
        isStargazingMode={isStargazingMode}
        isHeartRainMode={isHeartRainMode}
      />

      {/* Persistent Floating Navbar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={(sec) => setCurrentSection(sec)}
        coupleConfig={coupleConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={toggleMusic}
        onLogout={handleLogout}
        username={username || ''}
        isAdmin={isAdmin}
      />

      {/* Real-time Heartbeat & Hug Enchantment Overlay */}
      <HeartbeatHugOverlay
        isVisible={isHugActive}
        onClose={() => setIsHugActive(false)}
        coupleConfig={coupleConfig}
      />

      {/* Floating Ambient Shortcut HUD Toast */}
      <AnimatePresence>
        {ambientToast && (
          <motion.div
            key={ambientToast.id}
            initial={{ opacity: 0, y: -25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto glass-card-luxury border border-rose-400/40 p-3 px-5 rounded-full shadow-[0_0_35px_rgba(244,63,94,0.35)] flex items-center justify-between gap-4 pointer-events-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl shrink-0">{ambientToast.icon}</span>
              <div>
                <p className="text-xs font-serif-title font-bold text-white tracking-wide">
                  {ambientToast.title}
                </p>
                <p className="text-[11px] text-rose-200/90 font-sans-ui">
                  {ambientToast.subtitle}
                </p>
              </div>
            </div>
            {ambientToast.status && (
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 font-bold uppercase tracking-wider shrink-0">
                {ambientToast.status}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Moon Easter Egg Toast */}
      <AnimatePresence>
        {moonToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm glass-card-luxury border border-amber-300/40 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-none"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-200 uppercase tracking-wider">
                Celestial Blessing
              </p>
              <p className="text-xs text-rose-100 font-handwriting text-base text-glow">
                {moonToast.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Sections with Framer Motion Page Transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentSection === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingHero
                coupleConfig={coupleConfig}
                onBegin={() => setCurrentSection('about')}
                onExplorePlanets={() => setCurrentSection('planets')}
              />
            </motion.div>
          )}

          {currentSection === 'planets' && (
            <motion.div
              key="planets"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <PlanetNavigation
                onSelectSection={(sec) => setCurrentSection(sec)}
                coupleConfig={coupleConfig}
                visitedSections={visitedSections}
              />
            </motion.div>
          )}

          {currentSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AboutYouSection
                coupleConfig={coupleConfig}
                appreciationList={appreciations}
                onAddAppreciation={handleAddAppreciation}
              />
            </motion.div>
          )}

          {currentSection === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <GallerySection
                photos={photos}
                onToggleFavorite={handleToggleFavoritePhoto}
                onLikePhoto={handleLikePhoto}
                onAddPhoto={handleAddPhoto}
              />
            </motion.div>
          )}

          {currentSection === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <JourneySection
                milestones={milestones}
                onAddMilestone={handleAddMilestone}
              />
            </motion.div>
          )}

          {currentSection === 'songs' && (
            <motion.div
              key="songs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SongsSection
                songs={songs}
                currentSongId={currentSongId}
                isPlaying={isPlayingMusic}
                onPlaySong={playSpecificSong}
                onTogglePlay={toggleMusic}
              />
            </motion.div>
          )}

          {currentSection === 'letters' && (
            <motion.div
              key="letters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LettersSection
                letters={letters}
                onReadLetter={handleReadLetter}
                onAddLetter={handleAddLetter}
              />
            </motion.div>
          )}

          {currentSection === 'pieces' && (
            <motion.div
              key="pieces"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PiecesOfYouSection pieces={piecesOfYou} />
            </motion.div>
          )}

          {currentSection === 'proposal' && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProposalVault
                coupleConfig={coupleConfig}
                photos={photos}
                onAcceptProposal={handleAcceptProposal}
                onNavigateToForever={() => setCurrentSection('forever')}
              />
            </motion.div>
          )}

          {currentSection === 'forever' && (
            <motion.div
              key="forever"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ForeverSection
                coupleConfig={coupleConfig}
                appreciationList={appreciations}
              />
            </motion.div>
          )}

          {currentSection === 'admin' && isAdmin && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AdminDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <CoupleCustomizerModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        coupleConfig={coupleConfig}
        onSave={(updated) => setCoupleConfig(updated)}
      />

      {/* Constellation Moon Easter Egg Modal */}
      <ConstellationModal
        isOpen={isConstellationOpen}
        onClose={() => setIsConstellationOpen(false)}
        secretQuote={coupleConfig.secretMessage}
      />

      {/* Shortcuts Cheat Sheet Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        isHeartRainMode={isHeartRainMode}
        isStargazingMode={isStargazingMode}
        isPlayingMusic={isPlayingMusic}
        onToggleHeartRain={handleToggleHeartRain}
        onToggleStargazing={handleToggleStargazing}
        onToggleMusic={toggleMusic}
        onTriggerHug={handleTriggerHug}
      />

    </div>
  );
}
