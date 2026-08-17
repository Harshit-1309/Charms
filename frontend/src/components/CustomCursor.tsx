import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Heart, Sparkles, Diamond } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'heart' | 'sparkle' | 'ring' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing circle
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect cursor context
      if (target.closest('[data-cursor="heart"]') || target.closest('.btn-romantic') || target.closest('button.bg-gradient-to-r')) {
        setCursorType('heart');
      } else if (target.closest('[data-cursor="ring"]') || target.closest('[href="#proposal"]') || target.closest('button:has(.text-rose-400)')) {
        setCursorType('ring');
      } else if (target.closest('[data-cursor="sparkle"]') || target.closest('img') || target.closest('.glass-card-luxury')) {
        setCursorType('sparkle');
      } else if (target.closest('button') || target.closest('a') || target.closest('[role="button"]') || target.classList.contains('cursor-pointer')) {
        setCursorType('pointer');
      } else if (target.closest('p') || target.closest('h1') || target.closest('h2') || target.closest('h3')) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Glowing Trailing Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'pointer' || cursorType === 'heart' || cursorType === 'ring' || cursorType === 'sparkle' ? 1.6 : cursorType === 'text' ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.18 }}
        className={`w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-[1px] transition-colors duration-200 ${
          cursorType === 'heart'
            ? 'border-rose-400/80 bg-rose-500/15 shadow-[0_0_16px_rgba(244,114,182,0.6)]'
            : cursorType === 'ring'
            ? 'border-amber-300/80 bg-amber-400/15 shadow-[0_0_16px_rgba(251,191,36,0.6)]'
            : cursorType === 'sparkle'
            ? 'border-purple-300/80 bg-purple-500/15 shadow-[0_0_16px_rgba(192,132,252,0.6)]'
            : cursorType === 'pointer'
            ? 'border-pink-400/60 bg-pink-500/10 shadow-[0_0_12px_rgba(244,114,182,0.4)]'
            : 'border-white/40 bg-white/5 shadow-[0_0_8px_rgba(255,255,255,0.25)]'
        }`}
      >
        {/* Dynamic Inner Micro-Icon */}
        {cursorType === 'heart' && (
          <Heart className="w-3 h-3 text-rose-300 fill-rose-400 animate-pulse" />
        )}
        {cursorType === 'ring' && (
          <Diamond className="w-3 h-3 text-amber-300 animate-spin" />
        )}
        {cursorType === 'sparkle' && (
          <Sparkles className="w-3 h-3 text-purple-200 animate-pulse" />
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
          cursorType === 'heart'
            ? 'bg-rose-300'
            : cursorType === 'ring'
            ? 'bg-amber-200'
            : 'bg-white'
        }`}
      />
    </div>
  );
};
