import React, { useEffect, useRef } from 'react';

interface NightSkyCanvasProps {
  onMoonClick?: (stage: number, message: string) => void;
  onSecretUnlock?: () => void;
  isStargazingMode?: boolean;
  isHeartRainMode?: boolean;
  showSakura?: boolean;
  showFireflies?: boolean;
}

export const NightSkyCanvas: React.FC<NightSkyCanvasProps> = React.memo(({
  onMoonClick,
  onSecretUnlock,
  isStargazingMode = false,
  isHeartRainMode = false,
  showSakura = true,
  showFireflies = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moonClicksRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 40;
      targetMouseY = (e.clientY / height - 0.5) * 40;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3 Layers of Parallax Stars
    const starColors = ['#ffffff', '#fbcfe8', '#e9d5ff', '#fef08a', '#bae6fd', '#f472b6', '#fed7aa'];
    
    // Layer 1: Distant stardust (dense, slow)
    const distantStars = Array.from({ length: isStargazingMode ? 380 : 130 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.95,
      radius: Math.random() * (isStargazingMode ? 1.0 : 0.8) + 0.2,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.015 + 0.003,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      depth: 0.15,
    }));

    // Layer 2: Midfield stars (sparkling)
    const midStars = Array.from({ length: isStargazingMode ? 180 : 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.9,
      radius: Math.random() * 1.4 + 0.5,
      alpha: Math.random() * 0.85 + 0.25,
      speed: Math.random() * 0.025 + 0.008,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      hasGlint: Math.random() > 0.65 || isStargazingMode,
      depth: 0.45,
    }));

    // Layer 3: Foreground bright stars
    const brightStars = Array.from({ length: isStargazingMode ? 65 : 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      radius: Math.random() * 2.0 + 1.2,
      alpha: Math.random() * 0.95 + 0.35,
      speed: Math.random() * 0.035 + 0.015,
      twinkleDir: 1,
      color: '#ffffff',
      hasGlint: true,
      depth: 0.9,
    }));

    // Shooting Stars Engine
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.85 + width * 0.05,
        y: Math.random() * height * 0.45,
        length: Math.random() * 140 + 90,
        speed: Math.random() * 14 + 10,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // ~45 deg downward
        opacity: 1,
        active: true,
      });
    };

    // If entering stargazing mode, immediately launch shooting stars
    if (isStargazingMode) {
      spawnShootingStar();
      setTimeout(spawnShootingStar, 600);
    }

    // Organic Fireflies
    const fireflyColors = ['rgba(251, 191, 36, ', 'rgba(244, 114, 182, ', 'rgba(168, 85, 247, '];
    const fireflies = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.2,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: Math.random() * 0.03 + 0.01,
      speed: Math.random() * 0.6 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      baseColor: fireflyColors[Math.floor(Math.random() * fireflyColors.length)],
    }));

    // Sakura Blossom Petals
    const sakuraCount = 24;
    const petals = Array.from({ length: sakuraCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 6 + 4,
      speedY: Math.random() * 1.1 + 0.45,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: Math.random() * 0.025 - 0.012,
      opacity: Math.random() * 0.5 + 0.35,
    }));

    // Heart Rain Emojis
    const heartSymbols = ['💖', '✨', '🌸', '🤍', '💫', '💕', '💗', '🌹', '✨'];
    const hearts = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 12,
      speedY: Math.random() * 1.6 + 0.9,
      speedX: Math.sin(Math.random() * Math.PI) * 1.2,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.75 + 0.3,
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
    }));

    // Click Ripple Stardust
    const ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; alpha: number; color: string }> = [];

    // Moon coordinates
    const moonRadius = 42;
    let auraOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth parallax interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // 1. Deep Midnight Obsidian Sky Gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#030712'); // obsidian black
      skyGradient.addColorStop(0.35, '#090d1c'); // midnight navy
      skyGradient.addColorStop(0.7, '#171336'); // deep royal purple
      skyGradient.addColorStop(1, '#2a0e4e'); // rose-purple bottom horizon
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Multi-layer Breathing Aurora Waves
      auraOffset += 0.003;
      const auroraGradient = ctx.createLinearGradient(0, height * 0.05, width, height * 0.65);
      const alphaGlow1 = (Math.sin(auraOffset) + 1) * 0.045 + 0.025;
      const alphaGlow2 = (Math.cos(auraOffset * 0.8) + 1) * 0.035 + 0.02;

      auroraGradient.addColorStop(0, `rgba(244, 114, 182, ${alphaGlow1})`); // blush rose
      auroraGradient.addColorStop(0.45, `rgba(192, 132, 252, ${alphaGlow2 * 1.3})`); // lavender
      auroraGradient.addColorStop(0.8, `rgba(99, 102, 241, ${alphaGlow1 * 0.8})`); // soft indigo
      auroraGradient.addColorStop(1, `rgba(251, 191, 36, ${alphaGlow2 * 0.5})`); // warm amber starlight
      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Render Stars with Depth Parallax
      const renderStarGroup = (starList: typeof distantStars) => {
        starList.forEach((star) => {
          star.alpha += star.speed * star.twinkleDir;
          if (star.alpha >= 1) {
            star.alpha = 1;
            star.twinkleDir = -1;
          } else if (star.alpha <= 0.15) {
            star.alpha = 0.15;
            star.twinkleDir = 1;
          }

          const renderX = star.x + currentMouseX * star.depth;
          const renderY = star.y + currentMouseY * star.depth;

          ctx.save();
          ctx.beginPath();
          ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha;
          ctx.shadowColor = star.color;
          ctx.shadowBlur = star.radius > 1.1 ? 8 : 2;
          ctx.fill();

          // Star glint cross flare
          if ((star as any).hasGlint || isStargazingMode) {
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.4;
            const flareLen = star.radius * 3.5;
            ctx.beginPath();
            ctx.moveTo(renderX - flareLen, renderY);
            ctx.lineTo(renderX + flareLen, renderY);
            ctx.moveTo(renderX, renderY - flareLen);
            ctx.lineTo(renderX, renderY + flareLen);
            ctx.stroke();
          }
          ctx.restore();
        });
      };

      renderStarGroup(distantStars);
      renderStarGroup(midStars);
      renderStarGroup(brightStars);

      // Stargazing Constellation Lines (Link bright stars together)
      if (isStargazingMode) {
        ctx.save();
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.18)';
        ctx.lineWidth = 0.6;
        for (let i = 0; i < brightStars.length - 1; i += 2) {
          const s1 = brightStars[i];
          const s2 = brightStars[i + 1];
          const x1 = s1.x + currentMouseX * s1.depth;
          const y1 = s1.y + currentMouseY * s1.depth;
          const x2 = s2.x + currentMouseX * s2.depth;
          const y2 = s2.y + currentMouseY * s2.depth;
          const dist = Math.hypot(x2 - x1, y2 - y1);
          if (dist < 280) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 4. Shooting Stars Logic (Every 4-7s in stargazing mode, else 30-45s)
      const now = Date.now();
      const shootingStarInterval = isStargazingMode
        ? 4500 + Math.random() * 3000
        : 32000 + Math.random() * 15000;
      if (now - lastShootingStarTime > shootingStarInterval) {
        spawnShootingStar();
        lastShootingStarTime = now;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;

        if (s.opacity <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        ctx.stroke();

        // Glowing Star Head
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 240, 138, ${s.opacity})`;
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }

      // 5. Render Glowing Interactive Moon
      const actualMoonX = Math.min(width * 0.86, width - 65);
      const moonY = Math.max(height * 0.18, 70);

      ctx.save();
      // Corona Bloom
      const moonCorona = ctx.createRadialGradient(actualMoonX, moonY, 15, actualMoonX, moonY, 150);
      moonCorona.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
      moonCorona.addColorStop(0.35, 'rgba(244, 114, 182, 0.18)');
      moonCorona.addColorStop(0.7, 'rgba(168, 85, 247, 0.08)');
      moonCorona.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = moonCorona;
      ctx.beginPath();
      ctx.arc(actualMoonX, moonY, 150, 0, Math.PI * 2);
      ctx.fill();

      // Moon Sphere
      const moonGrad = ctx.createRadialGradient(
        actualMoonX - 14,
        moonY - 14,
        6,
        actualMoonX,
        moonY,
        moonRadius
      );
      moonGrad.addColorStop(0, '#ffffff');
      moonGrad.addColorStop(0.65, '#fef9c3');
      moonGrad.addColorStop(0.92, '#fef08a');
      moonGrad.addColorStop(1, '#fde047');

      ctx.beginPath();
      ctx.arc(actualMoonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = moonGrad;
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 32;
      ctx.fill();

      // Subtle Soft Craters
      ctx.fillStyle = 'rgba(217, 119, 6, 0.1)';
      ctx.beginPath();
      ctx.arc(actualMoonX - 10, moonY + 8, 8, 0, Math.PI * 2);
      ctx.arc(actualMoonX + 12, moonY - 10, 6, 0, Math.PI * 2);
      ctx.arc(actualMoonX + 8, moonY + 14, 10, 0, Math.PI * 2);
      ctx.fill();

      // If unlocked 3+ clicks: draw tiny celestial constellation near moon
      if (moonClicksRef.current >= 3) {
        const miniStars = [
          { x: actualMoonX - 65, y: moonY - 30 },
          { x: actualMoonX - 95, y: moonY + 15 },
          { x: actualMoonX - 60, y: moonY + 45 },
          { x: actualMoonX - 25, y: moonY + 70 },
        ];
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        miniStars.forEach((st, idx) => {
          if (idx === 0) ctx.moveTo(st.x, st.y);
          else ctx.lineTo(st.x, st.y);
        });
        ctx.stroke();

        miniStars.forEach((st) => {
          ctx.beginPath();
          ctx.arc(st.x, st.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.shadowColor = '#fef08a';
          ctx.shadowBlur = 6;
          ctx.fill();
        });
      }

      ctx.restore();

      // 6. Stardust Click Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.5;
        r.alpha *= 0.94;

        if (r.alpha < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 7. Fireflies Render
      if (showFireflies) {
        fireflies.forEach((f) => {
          f.angle += f.angleSpeed;
          f.x += Math.cos(f.angle) * f.speed;
          f.y += Math.sin(f.angle) * f.speed * 0.6 - 0.15;

          if (f.x < -10) f.x = width + 10;
          if (f.x > width + 10) f.x = -10;
          if (f.y < -10) f.y = height + 10;
          if (f.y > height + 10) f.y = -10;

          const currentAlpha = (Math.sin(Date.now() * 0.003 * f.pulseSpeed * 100) + 1) * 0.4 + 0.2;

          ctx.save();
          const flyGlow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 4.5);
          flyGlow.addColorStop(0, `${f.baseColor}${currentAlpha})`);
          flyGlow.addColorStop(0.5, `${f.baseColor}${currentAlpha * 0.3})`);
          flyGlow.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = flyGlow;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // 8. Sakura Petals Render
      if (showSakura) {
        petals.forEach((p) => {
          p.y += p.speedY;
          p.x += Math.sin(p.y * 0.015) + p.speedX;
          p.rotation += p.rotSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = `rgba(251, 207, 232, ${p.opacity})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // 9. Heart Rain Render
      if (isHeartRainMode) {
        hearts.forEach((h) => {
          h.y += h.speedY;
          h.x += Math.sin(h.swayOffset + h.y * 0.018) * 1.2;

          if (h.y > height + 25) {
            h.y = -25;
            h.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(h.x, h.y);
          ctx.globalAlpha = h.opacity;
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 10;
          ctx.font = `${h.size}px serif`;
          ctx.fillText(h.symbol, 0, 0);
          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Click handler on canvas: Moon detection + Stardust ripple
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const actualMoonX = Math.min(width * 0.86, width - 65);
      const moonY = Math.max(height * 0.18, 70);

      const distToMoon = Math.hypot(clickX - actualMoonX, clickY - moonY);
      if (distToMoon <= moonRadius + 28) {
        moonClicksRef.current += 1;
        const currentCount = moonClicksRef.current;

        let message = '';
        if (currentCount === 1) {
          message = 'The night looks prettier with you. 🌙';
        } else if (currentCount === 3) {
          message = '✨ You discovered a hidden constellation near the moon!';
        } else if (currentCount === 5) {
          message = "You're my favorite moon. 💖";
        } else if (currentCount === 10) {
          message = '💎 Celestial Secret Unlocked: Infinite Love Sanctuary!';
          if (onSecretUnlock) onSecretUnlock();
        } else {
          message = `Moon stardust resonance level ${currentCount} ✨`;
        }

        if (onMoonClick) {
          onMoonClick(currentCount, message);
        }
      }

      // Add celestial stardust ripple
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 80,
        alpha: 0.85,
        color: distToMoon <= moonRadius + 28 ? 'rgba(251, 191, 36, 0.9)' : 'rgba(244, 114, 182, 0.8)',
      });
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onMoonClick, onSecretUnlock, isStargazingMode, isHeartRainMode, showSakura, showFireflies]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0 cursor-pointer transition-opacity duration-1000"
      title="Click anywhere for stardust or tap the glowing moon for secret blessings!"
    />
  );
});
