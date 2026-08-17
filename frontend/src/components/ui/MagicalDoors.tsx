import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Stars } from 'lucide-react';

interface MagicalDoorsProps {
  isOpen: boolean;
}

export const MagicalDoors: React.FC<MagicalDoorsProps> = ({ isOpen }) => {
  return (
    <div 
      className="relative w-full max-w-lg h-[65vh] min-h-[500px] max-h-[700px] mx-auto z-0"
      style={{ perspective: '1500px' }}
    >
      {/* Door Frame */}
      <div className="absolute inset-[-16px] border-[16px] border-slate-950 rounded-t-[200px] shadow-[0_0_50px_rgba(225,29,72,0.2)] bg-slate-950 flex overflow-hidden ring-4 ring-slate-900">
        
        {/* Glow behind the doors (seen when opening) */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/50 via-purple-500/30 to-slate-950 flex items-center justify-center -z-10">
           <Stars className="w-32 h-32 text-amber-200 animate-pulse opacity-60" />
           <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
        </div>

        {/* Left Door */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -105 : 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }} // smooth ease out
          style={{ transformOrigin: "left" }}
          className="relative w-1/2 h-full bg-gradient-to-br from-slate-800 to-slate-900 border-r-2 border-slate-950 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.8)] z-10"
        >
          {/* Engravings */}
          <div className="absolute inset-4 border-2 border-rose-500/20 rounded-tl-[180px] opacity-60" />
          <div className="absolute inset-8 border border-purple-500/10 rounded-tl-[160px] opacity-40" />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
          
          {/* Handle */}
          <div className="absolute top-1/2 right-6 w-3 h-20 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full shadow-[2px_2px_10px_rgba(0,0,0,0.8)] border border-amber-400/40 -translate-y-1/2" />
        </motion.div>

        {/* Right Door */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? 105 : 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "right" }}
          className="relative w-1/2 h-full bg-gradient-to-bl from-slate-800 to-slate-900 border-l-2 border-slate-950 shadow-[inset_10px_0_20px_rgba(0,0,0,0.8)] z-10 flex items-center justify-start"
        >
          {/* Engravings */}
          <div className="absolute inset-4 border-2 border-rose-500/20 rounded-tr-[180px] opacity-60" />
          <div className="absolute inset-8 border border-purple-500/10 rounded-tr-[160px] opacity-40" />
          <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
          
          {/* Handle */}
          <div className="absolute top-1/2 left-6 w-3 h-20 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full shadow-[2px_2px_10px_rgba(0,0,0,0.8)] border border-amber-400/40 -translate-y-1/2" />

          {/* Center Lock Ornament */}
          <motion.div 
            animate={{ 
              opacity: isOpen ? 0 : 1, 
              scale: isOpen ? 0.8 : 1,
              rotate: isOpen ? 90 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-1/2 -left-[3.5rem] w-28 h-28 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-800 border-[6px] border-slate-950 shadow-[0_0_40px_rgba(225,29,72,0.6)] flex items-center justify-center -translate-y-1/2 z-20"
          >
            {isOpen ? <Unlock className="w-10 h-10 text-white/90 drop-shadow-md" /> : <Lock className="w-10 h-10 text-white/90 drop-shadow-md" />}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
