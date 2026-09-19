import { useRef, useEffect } from 'react';
import { motion, useTransform, useVelocity, useSpring } from 'motion/react';

interface DynamicBackgroundProps {
  scrollProgress: any;
}

export function DynamicBackground({ scrollProgress }: DynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollVelocity = useVelocity(scrollProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let currentVelocity = 0;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const particles: Particle[] = [];
    // Détection mobile pour ultra optimisation
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 60; // Réduit drastiquement pour performances

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      const unsubscribe = smoothVelocity.on('change', (v) => {
        currentVelocity = Math.abs(v) * 4000;
      });

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const speedMultiplier = 1 + currentVelocity * 0.025;
        particle.y += particle.speed * speedMultiplier;

        if (particle.y > canvas.height + 10) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }

        particle.twinklePhase += particle.twinkleSpeed;
        const twinkle = Math.sin(particle.twinklePhase) * 0.3 + 0.7;
        const opacity = particle.opacity * twinkle;

        // Particule avec petit halo - optimisé (seulement pour les plus grosses)
        if (particle.size > 1.8) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.5})`);
          gradient.addColorStop(0.6, `rgba(255, 255, 255, ${opacity * 0.15})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Point central
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
      return unsubscribe;
    };

    const unsubscribe = animate();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [smoothVelocity]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/30" />
      </div>

      <motion.div
        style={{
          opacity: useTransform(scrollProgress, [0, 0.5, 1], [0.04, 0.07, 0.04]),
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-[130px] pointer-events-none z-0"
      />
    </>
  );
}
