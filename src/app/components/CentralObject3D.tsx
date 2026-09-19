import { useRef, useEffect } from 'react';
import { motion, useTransform } from 'motion/react';

interface CentralObject3DProps {
  scrollProgress: any;
  currentSection: number;
}

export function CentralObject3D({ scrollProgress }: CentralObject3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * 3 * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight * 3}px`;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    let animationId: number;
    let time = 0;

    const draw = () => {
      time += 0.003; // Ralenti pour optimisation

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight * 3);

      const centerX = window.innerWidth / 2;
      const totalHeight = window.innerHeight * 3;
      
      // Paramètres spirale simple - ultra optimisé
      const isMobile = window.innerWidth < 768;
      const numPoints = isMobile ? 120 : 150; // Réduit pour optimisation mobile
      const amplitude = 200; // Amplitude horizontale
      const frequency = 3; // Nombre de vagues

      // Calculer les points de la spirale
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints;
        const y = t * totalHeight;
        
        // Mouvement sinusoïdal simple et fluide
        const wave = Math.sin((t * frequency + time * 0.2) * Math.PI);
        const x = centerX + wave * amplitude;
        
        // Profondeur pour effet 3D subtil
        const z = Math.cos((t * frequency + time * 0.2) * Math.PI) * 30;
        const scale = 1 + z / 400;
        
        points.push({ x, y, z, scale });
      }

      // Dessiner la ligne principale avec courbes Bezier
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      // Glow externe très doux
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 20;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Ligne principale fine et nette
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Particules espacées le long de la ligne - ultra optimisé
      const particleSpacing = isMobile ? 30 : 20;
      for (let i = 0; i < points.length; i += particleSpacing) {
        const p = points[i];
        const pulse = Math.sin(time * 2 + i * 0.1) * 0.3 + 0.7;
        const size = (2 + p.scale) * pulse;
        const opacity = 0.5 * pulse;

        // Halo doux - simplifié sur mobile
        if (!isMobile) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 5);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Point
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const yOffset = useTransform(scrollProgress, [0, 1], ['0%', '-66%']);

  return (
    <motion.div
      style={{ 
        y: yOffset,
        willChange: 'transform'
      }}
      className="absolute top-0 left-0 w-full"
    >
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{
          filter: 'blur(0.5px)',
        }}
      />
    </motion.div>
  );
}
