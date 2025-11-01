import { useRef, useEffect } from 'react';
import { motion, useTransform } from 'motion/react';

interface AnimatedBackgroundProps {
  scrollVelocity: any;
  scrollProgress: any;
}

export function AnimatedBackground({ scrollVelocity, scrollProgress }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let velocity = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particules pour le fond
    interface Particle {
      x: number;
      y: number;
      baseY: number;
      size: number;
      speedY: number;
      opacity: number;
      angle: number;
      angleSpeed: number;
    }

    // Initialiser les particules
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedY: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.3 + 0.1,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    };
    initParticles();

    // Lignes de grille
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;

      const gridSize = 60;
      const offset = (Date.now() * velocity * 0.0001) % gridSize;

      // Lignes verticales
      for (let x = -gridSize + offset; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Lignes horizontales
      for (let y = -gridSize + offset; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Lignes de connexion dynamiques
    const drawConnections = () => {
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 150) * 0.15 * (1 + velocity * 0.002);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    // Animation
    const animate = () => {
      // Récupérer la vélocité du scroll (via la subscription)
      const unsubscribe = scrollVelocity.on('change', (v: number) => {
        velocity = Math.abs(v);
      });

      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner la grille
      drawGrid();

      // Mettre à jour et dessiner les particules
      particles.forEach(particle => {
        // Mouvement basé sur la vélocité du scroll
        const speed = particle.speedY * (1 + velocity * 0.01);
        particle.y += speed;
        particle.angle += particle.angleSpeed * (1 + velocity * 0.005);

        // Mouvement ondulatoire
        const wave = Math.sin(particle.angle) * 20;
        const drawX = particle.x + wave;

        // Reset si hors écran
        if (particle.y > canvas.height + 50) {
          particle.y = -50;
          particle.baseY = particle.y;
        }

        // Dessiner particule
        ctx.beginPath();
        ctx.arc(drawX, particle.y, particle.size, 0, Math.PI * 2);
        const opacity = particle.opacity * (1 + velocity * 0.003);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity, 0.6)})`;
        ctx.fill();

        // Halo autour de la particule
        const gradient = ctx.createRadialGradient(drawX, particle.y, 0, drawX, particle.y, particle.size * 8);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(drawX - particle.size * 8, particle.y - particle.size * 8, particle.size * 16, particle.size * 16);
      });

      // Dessiner les connexions
      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
      return unsubscribe;
    };

    const unsubscribe = animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [scrollVelocity]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
      
      {/* Vignette gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/30" />
      </div>

      {/* Lueurs ambiantes animées */}
      <motion.div
        style={{
          opacity: useTransform(scrollProgress, [0, 0.25, 0.5, 0.75, 1], [0.15, 0.25, 0.15, 0.25, 0.15]),
          scale: useTransform(scrollProgress, [0, 0.5, 1], [1, 1.3, 1])
        }}
        className="fixed top-1/4 left-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        style={{
          opacity: useTransform(scrollProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]),
          scale: useTransform(scrollProgress, [0, 0.5, 1], [1.2, 1, 1.2])
        }}
        className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none z-0"
      />
    </>
  );
}
