import React from 'react';
import { motion } from 'framer-motion';

interface PandaWatchmanProps {
  isHappy?: boolean;
  className?: string;
  isMovingAside?: boolean;
}

export const PandaWatchman: React.FC<PandaWatchmanProps> = ({ 
  isHappy = false, 
  className = '',
  isMovingAside = false 
}) => {
  return (
    <motion.div 
      initial={{ x: 0, opacity: 1 }}
      animate={{ 
        x: isMovingAside ? 200 : 0, 
        opacity: isMovingAside ? 0 : 1,
        scale: isMovingAside ? 0.8 : 1
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className={`relative w-40 h-40 ${className}`}
    >
      {/* Ears */}
      <motion.div
        animate={{ rotate: [-5, 8, -5] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute top-2 left-2 w-12 h-12 bg-slate-950 rounded-full shadow-inner"
      />
      <motion.div
        animate={{ rotate: [5, -8, 5] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-2 right-2 w-12 h-12 bg-slate-950 rounded-full shadow-inner"
      />
      
      {/* Head */}
      <div className="absolute inset-0 top-6 bg-white rounded-full border-4 border-slate-900 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.5)] overflow-hidden z-10">
        
        {/* Eye Patches */}
        <div className="absolute top-8 left-5 w-11 h-14 bg-slate-950 rounded-[45%] -rotate-[15deg]" />
        <div className="absolute top-8 right-5 w-11 h-14 bg-slate-950 rounded-[45%] rotate-[15deg]" />
        
        {/* Eyes (whites) */}
        <div className="absolute top-[2.4rem] left-[1.8rem] w-4 h-5 bg-white rounded-full flex items-center justify-center">
          <motion.div 
            animate={{ scaleY: isHappy ? [0.1, 0.1] : [1, 0.1, 1], y: isHappy ? [2, 2] : [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] }}
            className="w-2.5 h-2.5 bg-slate-950 rounded-full" 
          />
        </div>
        <div className="absolute top-[2.4rem] right-[1.8rem] w-4 h-5 bg-white rounded-full flex items-center justify-center">
          <motion.div 
            animate={{ scaleY: isHappy ? [0.1, 0.1] : [1, 0.1, 1], y: isHappy ? [2, 2] : [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] }}
            className="w-2.5 h-2.5 bg-slate-950 rounded-full" 
          />
        </div>

        {/* Nose */}
        <div className="absolute top-[4.2rem] left-1/2 -translate-x-1/2 w-4 h-3 bg-slate-900 rounded-[50%] shadow-inner" />
        
        {/* Mouth */}
        {isHappy ? (
          <div className="absolute top-[4.6rem] left-1/2 -translate-x-1/2 w-6 h-4 border-b-4 border-slate-900 rounded-b-full" />
        ) : (
          <div className="absolute top-[4.8rem] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rounded-full" />
        )}
        
        {/* Blushes */}
        <div className="absolute top-14 left-2 w-7 h-4 bg-pink-400/50 rounded-full blur-[3px]" />
        <div className="absolute top-14 right-2 w-7 h-4 bg-pink-400/50 rounded-full blur-[3px]" />
      </div>
      
      {/* Paws holding a little staff or just peeking */}
      <motion.div 
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute -bottom-2 left-8 w-10 h-10 bg-slate-950 rounded-full rotate-45 z-20 shadow-lg border-2 border-slate-800" 
      />
      <motion.div 
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-2 right-8 w-10 h-10 bg-slate-950 rounded-full -rotate-45 z-20 shadow-lg border-2 border-slate-800" 
      />
    </motion.div>
  );
};
