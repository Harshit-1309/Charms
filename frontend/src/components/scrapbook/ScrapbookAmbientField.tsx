import React, { useEffect, useRef } from 'react';
import { AppreciationCategory } from '../../types';

interface ScrapbookAmbientFieldProps {
  activeCategory?: AppreciationCategory | 'All' | null;
  hoveredCategory?: AppreciationCategory | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  rotation: number;
  vRot: number;
  type: 'petal' | 'stardust' | 'gold_spark' | 'heart_glow';
  color: string;
}

export const ScrapbookAmbientField: React.FC<ScrapbookAmbientFieldProps> = ({
  activeCategory,
  hoveredCategory
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentTheme = hoveredCategory || activeCategory || 'All';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = Math.max(canvas.parentElement?.clientWidth || 0, window.innerWidth || 800));
    let height = (canvas.height = Math.max(canvas.parentElement?.clientHeight || 0, window.innerHeight || 600));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.max(canvas.parentElement?.clientWidth || 0, window.innerWidth || 800);
      height = canvas.height = Math.max(canvas.parentElement?.clientHeight || 0, window.innerHeight || 600);
    };
    window.addEventListener('resize', handleResize);

    // Particle collection
    const particleCount = 45;
    const particles: Particle[] = [];

    const getThemeConfig = () => {
      switch (currentTheme) {
        case 'Little Things':
        case 'Sweet':
        case 'Quirks':
          return {
            type: 'petal' as const,
            colors: ['rgba(251, 207, 232, ', 'rgba(244, 114, 182, ', 'rgba(254, 215, 170, '],
            vyRange: [0.3, 0.8],
            vxRange: [-0.4, 0.4]
          };
        case 'Things I Never Told You':
        case 'Quiet Moments':
        case 'Deep':
          return {
            type: 'stardust' as const,
            colors: ['rgba(196, 181, 253, ', 'rgba(167, 139, 250, ', 'rgba(224, 231, 255, '],
            vyRange: [-0.2, 0.4],
            vxRange: [-0.3, 0.3]
          };
        case "Reasons I'd Choose You Again":
        case 'Favorite Memories':
        case 'Memories':
          return {
            type: 'gold_spark' as const,
            colors: ['rgba(253, 224, 71, ', 'rgba(251, 191, 36, ', 'rgba(245, 158, 11, '],
            vyRange: [-0.5, -0.1],
            vxRange: [-0.2, 0.2]
          };
        case 'The Magic You Bring Into My Life':
        default:
          return {
            type: 'heart_glow' as const,
            colors: ['rgba(244, 63, 94, ', 'rgba(217, 70, 239, ', 'rgba(251, 146, 60, '],
            vyRange: [0.1, 0.5],
            vxRange: [-0.3, 0.3]
          };
      }
    };

    const initParticle = (p?: Partial<Particle>): Particle => {
      const theme = getThemeConfig();
      const colorBase = theme.colors[Math.floor(Math.random() * theme.colors.length)];
      const maxAlpha = Math.random() * 0.5 + 0.2;

      return {
        x: p?.x ?? Math.random() * width,
        y: p?.y ?? Math.random() * height,
        vx: Math.random() * (theme.vxRange[1] - theme.vxRange[0]) + theme.vxRange[0],
        vy: Math.random() * (theme.vyRange[1] - theme.vyRange[0]) + theme.vyRange[0],
        size: theme.type === 'petal' ? Math.random() * 6 + 4 : Math.random() * 3 + 1.5,
        alpha: Math.random() * maxAlpha,
        maxAlpha,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02,
        type: theme.type,
        color: colorBase,
        ...p
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(initParticle());
    }

    let frame = 0;
    let animId: number;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx + Math.sin(frame * 0.02 + idx) * 0.3;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap boundaries
        if (p.y > height + 20) p.y = -10;
        if (p.y < -20) p.y = height + 10;
        if (p.x > width + 20) p.x = -10;
        if (p.x < -20) p.x = width + 10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          // Draw soft sakura petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowColor = 'rgba(244, 114, 182, 0.4)';
          ctx.shadowBlur = 6;
          ctx.fill();
        } else if (p.type === 'gold_spark') {
          // Draw diamond gold sparkle
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size * 1.6);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Draw glowing stardust circle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowColor = 'rgba(192, 132, 252, 0.5)';
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [currentTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
    />
  );
};
