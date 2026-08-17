import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface RunawayButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({ children, className = '' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isAnimating = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const evadeCursor = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setTimeout(() => { isAnimating.current = false; }, 300);
    
    const maxRadiusX = Math.min(300, window.innerWidth / 2 - 60);
    const maxRadiusY = Math.min(300, window.innerHeight / 2 - 60);
    
    let nextX = (Math.random() - 0.5) * 2 * maxRadiusX;
    let nextY = (Math.random() - 0.5) * 2 * maxRadiusY;

    // Ensure it jumps at least 80px away from current target
    if (Math.abs(nextX - position.x) < 80) {
       nextX = nextX > position.x ? nextX + 80 : nextX - 80;
    }
    if (Math.abs(nextY - position.y) < 80) {
       nextY = nextY > position.y ? nextY + 80 : nextY - 80;
    }
    
    // Final clamp to safe boundaries
    nextX = Math.max(-maxRadiusX, Math.min(maxRadiusX, nextX));
    nextY = Math.max(-maxRadiusY, Math.min(maxRadiusY, nextY));

    setPosition({ x: nextX, y: nextY });
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={evadeCursor}
      onMouseMove={evadeCursor}
      onTouchStart={evadeCursor}
      onFocus={evadeCursor}
      onClick={(e) => {
        e.preventDefault(); // Impossible to click, but just in case
        evadeCursor();
      }}
      className={`relative z-[100] ${className}`}
      style={{ touchAction: 'none' }}
    >
      {children}
    </motion.button>
  );
};
