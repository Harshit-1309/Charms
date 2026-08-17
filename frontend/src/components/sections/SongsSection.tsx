import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SongItem } from '../../types';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Disc,
  Sparkles,
  Heart,
  Radio
} from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface SongsSectionProps {
  songs: SongItem[];
  currentSongId: string;
  isPlaying: boolean;
  onPlaySong: (id: string) => void;
  onTogglePlay: () => void;
}

export const SongsSection: React.FC<SongsSectionProps> = React.memo(({
  songs,
  currentSongId,
  isPlaying,
  onPlaySong,
  onTogglePlay,
}) => {
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeSong = songs.find((s) => s.id === currentSongId) || songs[0];

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setPlaybackSeconds(romanticAudio.getCurrentTime());
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Audio spectrum visualizer effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Gradient stroke
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, 'rgba(244, 114, 182, 0.2)');
      grad.addColorStop(0.5, 'rgba(244, 114, 182, 0.9)');
      grad.addColorStop(1, 'rgba(168, 85, 247, 0.2)');

      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      phase += isPlaying ? 0.08 : 0.02;
      for (let x = 0; x < width; x++) {
        const freq = isPlaying ? 0.03 : 0.008;
        const amp = isPlaying ? 14 : 2;
        const y = Math.sin(x * freq + phase) * amp * Math.sin(x / width * Math.PI) + height / 2;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(244, 114, 182, 0.6)';
      ctx.shadowBlur = isPlaying ? 10 : 2;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleNextTrack = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSongId);
    const nextIndex = (currentIndex + 1) % songs.length;
    onPlaySong(songs[nextIndex].id);
    setPlaybackSeconds(0);
  };

  const handlePrevTrack = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSongId);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    onPlaySong(songs[prevIndex].id);
    setPlaybackSeconds(0);
  };

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 max-w-6xl mx-auto z-10 relative space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">

        <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white tracking-wide text-glow">
          Our Songs
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/85 font-sans-ui max-w-lg mx-auto leading-relaxed">
          Analog warmth and synthesized stardust for our quiet midnight slow dances.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Vinyl Turntable Display */}
        <div className="lg:col-span-7 glass-card-luxury p-8 rounded-3xl border border-white/15 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-amber-900/10 pointer-events-none" />

          {/* Vinyl Container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4">
            
            {/* Spinning Vinyl Disc */}
            <div
              className={`w-full h-full rounded-full bg-slate-950 border-4 border-slate-800 shadow-2xl flex items-center justify-center relative overflow-hidden ring-2 ring-white/15 animate-spin`}
              style={{ 
                animationDuration: '10s',
                animationPlayState: isPlaying ? 'running' : 'paused',
                boxShadow: isPlaying ? '0 0 40px rgba(244, 114, 182, 0.4), inset 0 0 25px rgba(0, 0, 0, 0.8)' : '0 0 20px rgba(0, 0, 0, 0.8)' 
              }}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-3 rounded-full border border-slate-800/90" />
              <div className="absolute inset-8 rounded-full border border-slate-800/80" />
              <div className="absolute inset-14 rounded-full border border-slate-800/80" />
              <div className="absolute inset-20 rounded-full border border-slate-800/80" />

              {/* Center Album Art Sticker */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-slate-900 shadow-inner relative">
                <img
                  src={activeSong.coverUrl}
                  alt={activeSong.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            </div>

            {/* Realistic Tonearm */}
            <motion.div
              initial={false}
              animate={{ rotate: isPlaying ? 20 : 0 }}
              transition={{ type: 'spring', stiffness: 45, damping: 12, mass: 1 }}
              className="absolute -top-2 right-0 sm:right-2 w-12 h-64 origin-[24px_24px] pointer-events-none z-30"
              style={{ filter: "drop-shadow(-8px 12px 16px rgba(0,0,0,0.6))" }}
            >
              {/* Pivot Base */}
              <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-gradient-to-tr from-slate-800 via-slate-600 to-slate-400 border-[3px] border-slate-900 shadow-inner flex items-center justify-center ring-1 ring-white/20">
                <div className="w-4 h-4 rounded-full bg-slate-950 border border-slate-700 shadow-inner" />
              </div>
              
              {/* Counterweight */}
              <div className="absolute -top-4 left-[14px] w-5 h-6 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-md shadow-lg border-x border-t border-slate-500" />

              {/* Metallic Arm */}
              <div className="absolute top-10 left-[21px] w-1.5 h-44 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 shadow-md" />
              
              {/* Headshell */}
              <div className="absolute top-[208px] left-[12px] w-6 h-10 bg-gradient-to-br from-zinc-800 to-black rounded-b-md rounded-t-sm shadow-2xl transform rotate-[18deg] origin-top border-t-[3px] border-slate-300 flex flex-col items-center justify-end pb-1 ring-1 ring-white/10">
                {/* Stylus glowing tip */}
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,1)] mb-1" />
              </div>
            </motion.div>

          </div>

          {/* Active Song Info */}
          <div className="text-center space-y-1.5 mt-3 z-10">
            <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white">
              {activeSong.title}
            </h3>
            <p className="text-xs text-rose-300 font-medium tracking-wide">
              {activeSong.artist}
            </p>
            <p className="font-handwriting text-xl sm:text-2xl text-rose-200/90 max-w-md mx-auto">
              "{activeSong.feelingNote}"
            </p>
          </div>

          {/* Audio Wave Visualizer Canvas */}
          <div className="w-full h-10 mt-4">
            <canvas ref={canvasRef} width={400} height={40} className="w-full h-full" />
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-6 mt-6 z-10">
            <button
              onClick={handlePrevTrack}
              className="p-3.5 rounded-full glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onTogglePlay}
              className="p-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-xl shadow-rose-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer ring-2 ring-white/20"
              title={isPlaying ? "Pause Track" : "Play Track"}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="p-3.5 rounded-full glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Right Side: Synchronized Lyrics & Track Playlist */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Synchronized Lyrics Card */}
          <div className="glass-card-luxury p-6 rounded-3xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Live Synchronized Lyrics
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                00:{playbackSeconds < 10 ? `0${playbackSeconds}` : playbackSeconds}
              </span>
            </div>

            <div className="space-y-5 min-h-[180px] flex flex-col justify-center overflow-hidden">
              {(() => {
                const activeIdx = activeSong.lyrics.findIndex((line, idx) => {
                  return playbackSeconds >= line.time && (idx === activeSong.lyrics.length - 1 || playbackSeconds < activeSong.lyrics[idx + 1].time);
                });
                
                const currentIdx = activeIdx >= 0 ? activeIdx : 0;
                
                const startIdx = Math.max(0, currentIdx - 1);
                const endIdx = Math.min(activeSong.lyrics.length, currentIdx + 3);
                
                return activeSong.lyrics.slice(startIdx, endIdx).map((line, sliceIdx) => {
                  const actualIdx = startIdx + sliceIdx;
                  const isActive = actualIdx === currentIdx;
                  const distance = Math.abs(actualIdx - currentIdx);
                  
                  return (
                    <p
                      key={actualIdx}
                      className={`transition-all duration-700 font-sans-ui ${
                        isActive
                          ? 'text-rose-200 font-bold scale-105 text-lg text-glow origin-left'
                          : distance === 1
                          ? 'text-slate-400 text-sm scale-95 opacity-80 origin-left'
                          : 'text-slate-500/50 text-xs scale-90 opacity-40 origin-left'
                      }`}
                    >
                      {line.text}
                    </p>
                  );
                });
              })()}
            </div>
          </div>

          {/* Track Playlist Selector */}
          <div className="glass-card-luxury p-6 rounded-3xl border border-white/15 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
              <Disc className="w-4 h-4 text-purple-400" />
              Playlist Records ({songs.length})
            </h4>

            <div className="space-y-2">
              {songs.map((song) => {
                const isCurrent = song.id === currentSongId;
                return (
                  <button
                    key={song.id}
                    onClick={() => {
                      onPlaySong(song.id);
                      setPlaybackSeconds(0);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-rose-500/25 border border-rose-400/50 text-rose-100 shadow-md shadow-rose-500/20'
                        : 'glass-pill hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={song.coverUrl}
                          alt={song.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-serif-title font-semibold text-xs text-white">
                          {song.title}
                        </p>
                        <p className="text-[10px] text-slate-400">{song.artist}</p>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono">
                      {song.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
});
