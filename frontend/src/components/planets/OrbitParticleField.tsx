import React, { useEffect, useRef } from 'react';

interface OrbitParticleFieldProps {
  completionCount: number; // 0 to 8 visited sections
  orbitRadius: number;
}

export const OrbitParticleField: React.FC<OrbitParticleFieldProps> = ({
  completionCount,
  orbitRadius,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stardust particles revolving on the orbit lines
    const baseDustCount = 40 + completionCount * 12;
    const dustParticles = Array.from({ length: baseDustCount }, () => {
      const radiusOffset = (Math.random() - 0.5) * 45;
      return {
        r: orbitRadius + radiusOffset,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.0002 + 0.00008) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.6 ? '#fbcfe8' : Math.random() > 0.3 ? '#fed7aa' : '#bae6fd',
      };
    });

    // Periodic Shooting Comets
    const comets: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }> = [];

    const spawnComet = () => {
      if (Math.random() < 0.015 && comets.length < 2) {
        comets.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 60 + 40,
          speed: Math.random() * 5 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1,
          active: true,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw glowing orbit dust
      dustParticles.forEach((p) => {
        p.angle += p.speed;
        const x = centerX + Math.cos(p.angle) * p.r;
        const y = centerY + Math.sin(p.angle) * (p.r * 0.88); // slight perspective flattening

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw active comets
      spawnComet();
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;
        c.opacity -= 0.015;

        if (c.opacity <= 0 || c.x > width + 100 || c.y > height + 100) {
          comets.splice(i, 1);
          continue;
        }

        ctx.save();
        const grad = ctx.createLinearGradient(
          c.x,
          c.y,
          c.x - Math.cos(c.angle) * c.length,
          c.y - Math.sin(c.angle) * c.length
        );
        grad.addColorStop(0, `rgba(254, 240, 138, ${c.opacity})`);
        grad.addColorStop(0.3, `rgba(244, 114, 182, ${c.opacity * 0.8})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(
          c.x - Math.cos(c.angle) * c.length,
          c.y - Math.sin(c.angle) * c.length
        );
        ctx.stroke();

        // Comet Head Glint
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [completionCount, orbitRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};
